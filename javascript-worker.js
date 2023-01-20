function generatePasswords(passwordCount, passwordLength, isSpecial) {
  let possibleCharacters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  possibleCharacters += isSpecial ? "!@#$%^&" : "";
  const passwords = [];
  
  for (let i = 0; i < passwordCount; i++) {
	  let password = "";
	  for (let j = 0; j < passwordLength; j++) {
	    password += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
	  }
	  passwords.push(password);
  }
  
  return passwords;
}

function getHead(){
  return `<head>`
       + `<title>Password</title>`
       + `<meta charset="utf-8">`
       + `<meta name="viewport" content="width=device-width, initial-scale=1">`
       + `<script src="https://cdn.jsdelivr.net/gh/gurinderc/gcservices-libs/javascript/dist/gcserviceslib.js"></script>`
       + `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">`
       + `</head>`;
}

function getHeading(){
  return `<div class="content is-medium has-text-centered"><h1>Ready to use random passwords</h1></div>`;
}

function getTable(num, length, isSpecial){
  let t = `<table class="table is-hoverable is-fullwidth is-striped">`;
  t += `<thead><tr><th width=20px>#</th><th>Length: ${length} Characters ${isSpecial? "(include specials)" : ""} </th><th width=60px></th></tr></thead>`;
  let m = `<tbody>`;
  var passwords = generatePasswords(num, length, isSpecial);
  for (var i = 0; i < passwords.length; i++) {
    m += `<tr><td class="p-1">${i+1}</td><td class="p-1" id="pwd-${i+1}-${length}-${isSpecial}">${passwords[i]}</td>`;
    m += `<td class="p-1"><button class="button is-small is-outlined is-rounded" onclick="GCServices.copy2Clipboard('pwd-${i+1}-${length}-${isSpecial}')">Copy</button></td></tr>`;
  }
  m+=`</tbody>`;
  return t+m+`</table>`;
}

function getGrid(){
  return `<div class="my-5 mx-5">`
       + `<div class="columns">`
       + `<div class="column">`
       + getTable(5,8,true)
       + `</div>`
       + `<div class="column">`
       + getTable(5,12,true)
       + `</div>`
       + `<div class="column">`
       + getTable(5,15,true)
       + `</div>`
       + `</div>`
       + `<div class="columns">`
       + `<div class="column">`
       + getTable(5,8,false)
       + `</div>`
       + `<div class="column">`
       + getTable(5,12,false)
       + `</div>`
       + `<div class="column">`
       + getTable(5,15,false)
       + `</div>`
       + `</div>`
       + `</div>`;
}

function getRefresh() {
  return `<div class="content is-medium has-text-centered">`
       + `<button class="button is-rounded has-background-info-dark has-text-white is-size-5" onclick="window.location.reload();">Refresh</button>`
       + `</div>`
}

function getHtml(){
  try {
    return `<!DOCTYPE html><html>` 
           + getHead() 
           + `<body>`
           + getHeading()
           + getGrid() 
           + getRefresh()
           + `</body></html>`;
  }
  catch(error) {
    return error;
  }
}

async function handleRequest(request) {
  return new Response(getHtml(), {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}

if (typeof module !== 'undefined' && !module.parent) {
  const content = getHtml();
  console.log(content);
  const fs = require('fs');
  fs.writeFile('test.html', content, err => {
    if (err) {
      console.error(err);
    }
  });
} else {
  addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
  });
}