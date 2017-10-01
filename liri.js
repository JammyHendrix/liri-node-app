var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var tKeys = require('./keys.js');
var input = process.argv;
var command = input[2];
var movieorsong = '';
var queryUrl = "http://www.omdbapi.com/?t=" + movieorsong + "&y=&plot=short&apikey=40e9cece";

var client = new Twitter({
  consumer_key: tKeys.consumer_key,
  consumer_secret: tKeys.consumer_secret,
  access_token_key: tKeys.access_token_key,
  access_token_secret: tKeys.access_token_secret
});
var params = {trollman_jr: 'liri.js'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
    console.log(JSON.stringify(tweets, null, 2));
  }
});

var spotify = new Spotify({
  id: '63d3ad1779db482fbb861ca8c7153c4e',
  secret: '4c49db3714ce4ee3a0216168e51b9827'
});



for (var i=3; i<input.length; i++) {
	movieorsong = movieorsong + ' ' + input[i];
}
console.log(movieorsong);
//console.log(command);

if (command == 'my-tweets'){
client.post('statuses/update', {status: 'Sup'},  function(error, tweet, response) {
  if (!error) throw error;
 // console.log(tweet);  // Tweet body. 
  //console.log(response);  // Raw response object.
  console.log(JSON.parse(tweet, null, 2)); 
});
}else if (command == 'spotify-this-song') {
	spotify.search({ type: 'track', query: movieorsong }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
	console.log(JSON.stringify(data)); 
});

}else if (command == 'movie-this') {
	request(queryUrl, function(error, response, body) {
  // If the request is successful
  if (!error && response.statusCode === 200) {

    console.log("Release Year: " + JSON.parse(body).Year);
  }
});
  // If the request is successful
  if (!error && response.statusCode === 200) {
	console.log('movie time');
}else if (command == 'do-what-it-says') {
	fs.appendFile(movieorsong, "", function(err) {
  // If an error was experienced we say it.
  if (err) {
    console.log(err);
  }
  else {
    console.log("Content Added!");
  }
});
	console.log('doing it');
}
}

//console.log(tKeys.consumer_key);
