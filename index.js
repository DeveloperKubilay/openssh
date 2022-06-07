//Module version 1.0.3

//The module is licensed by MIT
//axios works with the help of the child_process modular and this module is owned by Discord kubi#5443
// you get my error try to write npm i axios child_process to console
//You still get my error Come to our help server https://discord.gg/4Xpwwz6pgN
//Good day, good coding :)

const fetch = require('axios').default;
const temp = new Map()
module.exports = class kubitdbonline {
constructor(url,password,sendconsole){
this.url = url
if(!this.url) throw new TypeError("Openssh\nYou did not enter the url\n" + __dirname)
this.password = password
if(!this.password) throw new TypeError("Openssh\nYou did not enter a password\n" + __dirname)
this.sendconsole = sendconsole
}

send(data) {
if(!data || temp.get("lastest") === data) return;
temp.set("lastest",data)
if(this.sendconsole) console.log("@Openssh >: "+data)
fetch.post(`${this.url}/opensshlog/`,{password:this.password,console:data}).catch(() => {return false})
return true}

get() {
const api = fetch.get(`${this.url}/openssh/${this.password}`).catch(()=>{ return false})
if (api.error) return false;
return api
}}

