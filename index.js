//Module version 1.0.4

//The module is licensed by MIT
//Thanks ansi-colors, socket.io, fs, child_process and this module is owned by Discord kubi#5443
//You get my error try to write npm i ansi-colors@4.1.3 socket.io@4.5.1 fs@0.0.1-security child_process@1.0.2 to console
//You still get my error Come to our help server https://discord.gg/4Xpwwz6pgN
//Good day, good coding :)

terminal = require('child_process').exec
c = require('ansi-colors')
fs = require('fs')
db = new Map()
module.exports = (server,password,sconsole)=>{
if(!server) throw new TypeError("Openssh\nExpress is not found" + __dirname)
if(!password) throw new TypeError("Openssh\nYou did not enter password\n" + __dirname)

if(!fs.existsSync("ssh")) fs.mkdirSync("ssh")
const io = require("socket.io")(server);
io.on('connection', function(socket){
socket.on('openssh', function(msg){
 if(msg.password != password) return;
 if(msg.type === 1 && db.get("processing") && this.x && msg.console) {//Processing
  if(db.get("lastcommad") > Date.now()-1000 && msg.console === "\r") return db.set("text","")
  if(msg.console === "\r") {
    if(!sconsole) console.log(db.get("text")+"\r") 
    this.x.stdin.write(db.get("text")+"\r")
    return db.set("text","")
  } 
    db.set("text",db.get("text")+msg.console)
 }
 if(msg.type === 2) {//Login
  if(!sconsole) console.log(c.green("A Client Logined"))
    socket.emit("opensshclient",{
    console:c.green("Connected to server "+(Date.now()-msg.date)+"ms")+
    c.cyan("\nWelcome to Openssh\nVersion: 1.0.4\nSupport: https://discord.gg/4Xpwwz6pgN"),
    type:0
    })
  db.set("processing",false)
 }
 if(msg.type === 0 && !db.get("processing")) {//Welcome to main base
   db.set("lastcommad",Date.now())
 if(!sconsole) console.log(c.blue("@Openssh >: ")+msg.console)
 let x = terminal("cd ssh && "+msg.console)
 this.x = x
 db.set("processing",true)
 x.stdout.on("data", function(data) {//No proplem console
    if(!sconsole) console.log(data.replace("\n",""))
    socket.emit("opensshclient",{
     console:data.replace("\n",""),
     type:1
     })
 })
 x.stderr.on("data", function(data) {//ALERT Its a proplem
     if(!sconsole) console.log(c.red(data.replace("\n","")))
     socket.emit("opensshclient",{
      console:data.replace("\n",""),
      type:2
      })
 })
 x.on("exit", function(data) { //Have great day
  if(!sconsole && data != 0) console.log(c.red("Process exited ("+data+")"))
  db.set("processing",false)
     socket.emit("opensshclient",{
     console:data,
     type:3
     })
 })
}})});
}