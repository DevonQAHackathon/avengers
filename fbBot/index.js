const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const qs = require('querystring')
const cors = require('cors')


const app = express()

const token = ""

var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID

var url = ''

app.set('port', (process.env.PORT || 3003))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(cors())

app.get('/', function (req, res) {
	res.send('KP Agent Server')
})

app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

app.post('/webhook/', function (req, res) {
	var messaging_events = req.body.entry[0].messaging
	
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
                  sendTextMessage(sender, 'Error authenticating', 'error')
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
                     "interests": [],
                     "last_loc": "",
                     "city": "",
                     "fb_id": parseInt(sender),
                     "time_stamp": Date.now()
                  }, function(err){
                     if(err){
                       sendTextMessage(sender, 'Error authenticating', 'error')
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
	  		//console.log(event.message)
			if (event.message && event.message.quick_reply){
				

			}else if(event.message && event.message.attachments){

				

			}else if (event.message && event.message.text && event.message.nlp) {
				

			}else if (event.postback) {
				

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

app.listen(3003, function () {
  console.log('Test Avenger messenger app listening on port 3003!')
})