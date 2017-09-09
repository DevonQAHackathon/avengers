from nltk.chat.util import Chat, reflections
from bottle import Bottle, run, route, static_file, request, response, template

app = Bottle(__name__)

pairs = [
    [
        r'signing in to my blog',
        ['login']
    ],
    [
        r'login to my blog',
        ['login']
    ],
    [
        r'log in to my blog',
        ['login']
    ],
    [
        r'login',
        ['login']
    ],
    [
        r'signing in',
        ['login']
    ],
    [
        r'sign in',
        ['login']
    ],
    [
        r'log in',
        ['login']
    ],
    [
        r'publish',
        ['new_post']
    ],
    [
        r'publish blog post',
        ['new_post']
    ],
    [
        r'publish a post',
        ['new_post']
    ],
    [
        r'publish new post',
        ['new_post']
    ],
    [
        r'add',
        ['new_post']
    ],
    [
        r'add a post',
        ['new_post']
    ],
    [
        r'add blog post',
        ['new_post']
    ],
    [
        r'add post',
        ['new_post']
    ],
    [
        r'submit new post',
        ['new_post']
    ],
    [
        r'share a post',
        ['new_post']
    ],
    [
        r'write post',
        ['draft']
    ],
    [
        r'save draft',
        ['draft']
    ],
    [
        r'draft',
        ['draft']
    ],
    [
        r'save post',
        ['draft']
    ],
    [
        r'save',
        ['draft']
    ],
    [
        r'delete post',
        ['delete']
    ],
    [
        r'delete',
        ['delete']
    ],
    [
        r'modify post',
        ['modify']
    ],
    [
        r'update post',
        ['modify']
    ],
    [
        r'edit post',
        ['modify']
    ],
    [
        r'tweak post',
        ['modify']
    ],
    [
        r'change post',
        ['modify']
    ],
    [
        r'fix post',
        ['modify']
    ],
    [
        r'revise post',
        ['modify']
    ],
    [
        r'approve comment',
        ['approve_comment']
    ],
    [
        r'ok',
        ['approve_comment']
    ],
    [
        r'okay',
        ['approve_comment']
    ],
    [
        r'accept comment',
        ['approve_comment']
    ],
    [
        r'reject comment',
        ['reject_comment']
    ],
    [
        r'delete comment',
        ['reject_comment']
    ],
    [
        r'reply to comment',
        ['reply']
    ],
    [
        r'respond to comment',
        ['reply']
    ],
    [
        r'answer comment',
        ['reply']
    ],
    [
        r'feedback',
        ['reply']
    ]
]

@app.route('/')
def root():
  return 'Avengers Test Chat Server'

@app.route('/nlp/<text>')
def nlp(text):
  chat = Chat(pairs, reflections)
  return {"response": chat.respond(text)}

# def hugot_bot():
#     chat = Chat(pairs, reflections)
#     print chat.respond('login')