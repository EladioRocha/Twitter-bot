const env = require('dotenv'),
  Twit = require('twit')
  
env.config()

const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_KEY_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

function tweetStatus(tweet) {
  T.post('statuses/update', tweet, tweeted)
}

function tweeted(err, data, response) {
  if(err) {
    console.log('Ha ocurrido un error')
    console.log(err)
    throw err
  }
  console.log('El tweet ha sido publicado con exito')
  console.log(data)
  console.log(response)
}

const stream = T.stream('statuses/filter', {track: '@BOT_Eladio'})
stream.on('tweet', tweetEvent)

function tweetEvent(tweet) {
  const screenName = tweet.user.screen_name,
    reply = `Thank you very much for your welcome @${screenName}`
  console.log(tweet.id_str)

  tweetStatus({
    status: reply,
    in_reply_to_status_id: tweet.id_str
  })
}

// tweetStatus({status: 'Hello world'})