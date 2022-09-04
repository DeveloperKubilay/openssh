# Openssh
Version: **openssh@1.0.4**
Module owner: **kubi#5443**
## Information:
**Help:** [Help server](https://discord.gg/4Xpwwz6pgN)
### Usage:

## Setting up a server:
```js
//npm i express openssh

const settings = {
  "password":"abc123",//set password
  "port": 80,//port
  "background": false//Write to console or run in background? Boolean
};

const express = require('express');
var app = express();
const server = app.listen(settings.port);
require('openssh')(server,settings.password,settings.background);

```
## Setting up a client:
```js
//npm i ansi-colors@4.1.3 readline@1.3.0 socket.io-client@4.5.1 latinize@0.5.0

const settings = {
"password":"abc123", //set password
"url": "http://localhost" //url
};
    
const io = require('socket.io-client')(settings.url);
const c = require('ansi-colors');
const readline = require('readline');
const latinize = require('latinize');
const rl = readline.createInterface({input: process.stdin,output: process.stdout});

console.log(c.yellow('Connecting to server...'));

io.emit("openssh",{password:settings.password,type:2,date:Date.now()});
prefix = c.blue('@Openssh >: ');
rl.setPrompt(prefix, prefix.length);

rl.on('line', function(line) {
  if(line.trim() === "exit" || line.trim() === "exit 0") {process.exit(0);}
  else if(line.trim() === "reload" || line.trim() === "reset") {
    console.clear();
    return io.emit("openssh",{password:settings.password,type:2,date:Date.now()});
  } else if(line.trim() === "clear" || line.trim() === "cls") {
    console.clear();
    return rl.prompt();
  } else
    io.emit("openssh",{console:latinize(line.trim()),password:settings.password,type:0});
})

process.stdin.on("keypress", function (event,k) { 
  if(k.ctrl && k.name === "c") process.exit(0);
  io.emit("openssh",{console:latinize(k).sequence,password:settings.password,type:1});
});

io.on('opensshclient', function(msg){
  if(msg.type === 0) {
   console.log(msg.console)
   rl.prompt();
  }
  if(msg.type === 1) console.log(latinize(msg.console));
  if(msg.type === 2) console.log(c.red(latinize(msg.console)));
  if(msg.type === 3) {
  if(msg.console != 0) console.log(c.red("Process exited ("+msg.console+")"));

  rl.prompt();
  }
});


/*////Manuel \\\\
io.on('opensshclient', function(msg){
 if(msg.type === 1) console.log(latinize(msg.console));
 if(msg.type === 2) console.log(c.red(latinize(msg.console)));
 if(msg.type === 3 && msg.console != 0) console.log(c.red("Process exited ("+msg.console+")"));
});

io.emit("openssh",{password:settings.password,type:2,date:Date.now()});
io.emit("openssh",{console:latinize("echo Hello World"),password:settings.password,type:0});
*/
```
##### Openssh
- ```npm i openssh```

##### If you have a problem, feel free to join our [help server](https://discord.gg/4Xpwwz6pgN)
