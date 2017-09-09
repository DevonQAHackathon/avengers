const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const qs = require('querystring')
const cors = require('cors')


const app = express()

const token = "EAAHGqJDZATz4BAMAVobyB7WBY3rCPvVZBzBPLZCrGazmpvkgZB3re57eZAkO3n33EwLgGJ5ZAANoKzuQ4ZCHFklw1mNNXwMY2zteIvpZBZBFVY2IQs9YScQUdCGqa44K63IiyLv3C6LkknAHoszkI7Uq7sVJpJFn6xKa2JDGeQs05IwZDZD"

var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID

var url = 'mongodb://localhost:27017/avenger'

app.set('port', (process.env.PORT || 5005))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(cors())

app.get('/', function (req, res) {
	res.send('KP Agent Server')
})

app.get('/sendImg/:filename', function(req, res){
	res.sendFile('/home/suraj/Desktop/dev/testavenger/fbBot/img/'+req.params.filename)
})

app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

app.post('/webhook/', function (req, res) {
	var messaging_events = req.body.entry[0].messaging

	console.log('EVENT : ' + messaging_events)
	
	for (var i = 0; i < messaging_events.length; i++) {
		var event = req.body.entry[0].messaging[i]
		console.log(JSON.stringify(event))
		var sender = event.sender.id
		console.log('Sender : '+sender+' |||||||||||||||||||||||||||||||||||||||||||||||||')
		authUser(sender, event)
	}
	res.send('OK')
})



function authUser(sender, event){
	MongoClient.connect(url, function(err, db) {
	  	var cursor = db.collection('fb_user_profile').find({ "fb_id": parseInt(sender) }).toArray(function(err, res){
	  		console.log('RES LENGTH : ' + res.length)
	   	if(res.length != 0){
            eventHandle(sender, event)
         }else{
         	console.log('INSIDE LOG')
            request("https://graph.facebook.com/v2.6/"+sender+"?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token="+token, function(error, response, body) {

               var data = JSON.parse(body)

               console.log('DATA LOG : ' + JSON.stringify(data))
               if(data.error){
                    sendMessage(sender, {text: 'Error authenticating'}, 'error', 'error', 'ERROR', Date.now())
               }else{
                  var cursor = db.collection('fb_user_profile').insertOne({
                     "first_name": data.first_name,
                     "last_name": data.last_name,
                     "profile_pic": data.profile_pic,
                     "locale": data.locale,
                     "timezone": data.timezone,
                     "gender": data.gender,
                     "username": "",
                     "email": "",
                     "mobile": "",
                     "fb_id": parseInt(sender),
                     "time_stamp": Date.now()
                  }, function(err){
                     if(err){
                       sendMessage(sender, {text: 'Error authenticating'}, 'error', 'error', 'ERROR', Date.now())
                    }else{
                       eventHandle(sender, event)
                    }
                  })
               }
            })
         }
	   })
	})
}


function eventHandle(sender, event){
	MongoClient.connect(url, function(err, db) {
	  	var cursor = db.collection('fb_user_profile').find({ "fb_id": parseInt(sender) }).toArray(function(err, res){
	  		console.log(event.message)
			if (event.message && event.message.quick_reply){

				var text = event.message.quick_reply.payload

				if(text == 'NEW_PROJ'){
					var msgData = {
						"text":"Which language you want the test code in?",
					    "quick_replies":[
					      {
					        "content_type":"text",
					        "title":"Java",
					        "payload":"JAVA"
					      }
					    ]
					}

					sendMessage(sender, msgData, 'Start New Project', 'New Project Flow', 'NEW_PROJ', Date.now())
				}else if(text == 'OLD_PROJ'){
					var msgData = {"text": "Old project flow"}

					sendMessage(sender, msgData, 'Old New Project', 'Old Project Flow', 'OLD_PROJ', Date.now())
				}else if(text == 'JAVA' || text == 'PYTHON'){
					//create new project with selected language
					var msgData = {text: 'Tell me about the scenario :-)'}

					sendMessage(sender, msgData, 'Feature', 'Feature', 'NEW_PROJ_FEATURE', Date.now())
				}

			}else if(event.message && event.message.attachments){

				

			}else if (event.message && event.message.text && event.message.nlp) {

				console.log('INSIDE EVENT MESSAGE')

				var text = event.message.text

				var entity = event.message.nlp.entities

				if(entity.greetings && entity.greetings[0].confidence > 0.7){

					var msgData = {
						"text":"Hey "+res[0].first_name+"!! Whats the plan today :-)",
					    "quick_replies":[
					      {
					        "content_type":"text",
					        "title":"Start New Project",
					        "payload":"NEW_PROJ"
					      },{
					        "content_type":"text",
					        "title":"Check Old Project",
					        "payload":"OLD_PROJ"
					      }
					    ]
					}

					sendMessage(sender, msgData, 'Greeting', 'Intro message', 'GREETING', Date.now())

				}else if(entity.thanks && entity.thanks[0].confidence > 0.7)	{
					var msgData = { text: 'You are welcome :-)'}
					var sent_msg = text
					var received_msg = msgData.text
					var msg_cat = 'THANKS'
					var time_stamp = Date.now()

					sendMessage(sender, msgData, sent_msg, received_msg, msg_cat, time_stamp)
				}else if(entity.bye && entity.bye[0].confidence > 0.7)	{
					var msgData = { text: 'See you soon ' + res[0].first_name + ' :-)'}
					var sent_msg = text
					var received_msg = msgData.text
					var msg_cat = 'BYE'
					var time_stamp = Date.now()

					sendMessage(sender, msgData, sent_msg, received_msg, msg_cat, time_stamp)
				}else{
	  				
	  				var cursor = db.collection('fb_msg_log').find({ "fb_id": parseInt(sender) }).sort({"$natural": -1}).limit(1).toArray(function(err, res){
						if(res.length != 0){
							if(res[0].msg_cat == 'NEW_PROJ_FEATURE'){
								request("http://localhost:8000/nlp/"+text, function(error, response, body) {
		  							var resp = body
		  							var a = JSON.parse(resp)

		  							var msgData = {"attachment":{"payload":{"template_type":"generic","elements":[{"buttons":[{"type":"web_url","webview_height_ratio":"tall","title":"View Feature File","url":"https://d7d859f5.ngrok.io"},{"type":"web_url","webview_height_ratio":"tall","title":"View Test Code","url":"https://d7d859f5.ngrok.io"}],"title": a.response,"image_url": "https://d7d859f5.ngrok.io/sendImg/"+a.response+'.png'}]},"type":"template"}}

									sendMessage(sender, msgData, 'scenario', a.response, 'FEATURE', Date.now())
		  						})
		  						/*var msgData = {text: 'Your scenario category is ' + text}

								sendMessage(sender, msgData, msgData.text, msgData.test, 'FEATURE', Date.now())*/
							}else{
								var msgData = {text: text}

								sendMessage(sender, msgData, msgData.text, msgData.test, 'ECHO', Date.now())
							}
						}else{
							var msgData = {text: text}

							sendMessage(sender, msgData, msgData.text, msgData.test, 'ECHO', Date.now())
						}
					})
				}

			}else if (event.postback) {
				var payload = event.postback.payload

				if(payload == 'HELP'){
					var msgData = {
						"text":"Hey "+res[0].first_name+"!! I'll be your testing partner :-)",
					    "quick_replies":[
					      {
					        "content_type":"text",
					        "title":"Start New Project",
					        "payload":"NEW_PROJ"
					      },{
					        "content_type":"text",
					        "title":"Check Old Project",
					        "payload":"OLD_PROJ"
					      }
					    ]
					}

					sendMessage(sender, msgData, 'Greeting', 'Intro message', 'GREETING', Date.now())

				}else if(payload == 'NEW_PROJ'){
					var msgData = {
						"text":"Which language you want the test code in?",
					    "quick_replies":[
					      {
					        "content_type":"text",
					        "title":"Java",
					        "payload":"JAVA"
					      }
					    ]
					}

					sendMessage(sender, msgData, 'Start New Project', 'New Project Flow', 'NEW_PROJ', Date.now())
										
				}else if(payload == 'OLD_PROJ'){
					var msgData = {"text": "Old project flow"}

					sendMessage(sender, msgData, 'Old New Project', 'Old Project Flow', 'OLD_PROJ', Date.now())
				}

			}
		})
	})
}




function sendMessage(sender, msgData, sent_msg, received_msg, msg_cat, time_stamp){

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: msgData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}else{
			insertLog(sender, sent_msg, received_msg, msg_cat, time_stamp)
		}
	})
}

function insertLog(sender, sent_msg, received_msg, msg_cat, time_stamp){
	MongoClient.connect(url, function(err, db) {
		var cursor = db.collection('fb_msg_log').insertOne({
			"fb_id": parseInt(sender),
			"sent_msg": sent_msg,
			"received_msg": received_msg,
			"msg_cat": msg_cat,
			"timestamp": time_stamp
		}, function(err){
			if(err){
				console.log('Error logging message')
			}
		})
	})
}

app.listen(5005, function () {
  console.log('Test Avenger messenger app listening on port 5005!')
})