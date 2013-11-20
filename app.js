var osc = require('node-osc'),
    client = require('google-images'),
    S = require('string'),
    randomWords = require('random-words');

var searchString = randomWords();
var config = {
  path:'/Users/gabrielstuff/Documents/images/'
};

var oscServer = new osc.Server(9999, '127.0.0.1');
oscServer.on("message", function(msg, rinfo) {
  console.log("TUIO message:");
  console.log(msg);
});

oscServer.on("pyying/shoot", function(msg, rinfo) {
  console.log("Shoot message:");
  searchImage();
});

var searchImage = function(){
  searchString = randomWords();
  client.search(searchString, function(err, images) {
    if(err)
      console.log(err)
    else{
      if(images.length > 0)
        images[Math.floor((Math.random()*(images.length-1)))].writeTo(config.path+S(searchString).slugify()+'.jpg', function() {
          console.log("image with "+searchString+" written.");
        });
    }
  });
}

var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  if (key && key.ctrl && key.name === 'c')
    process.exit();
  else if(key.name==="space"){
    console.log("Searching... and writing");
    searchImage();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

console.log("press space to wirte a random image !");
