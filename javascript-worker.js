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
       + `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">`
       + `</head>`;
}

function getHeading(){
  return `<div class="content is-medium has-text-centered"><h1>Ready to use random passwords</h1></div>`;
}

function getTable(num, length, isSpecial){
  let t = `<table class="table is-hoverable is-fullwidth is-striped is-bordered">`;
  t += `<thead><tr><th>#</th><th>Length: ${length} Characters ${isSpecial? "(include specials)" : ""} </th></tr></thead>`;
  let m = `<tbody>`;
  var passwords = generatePasswords(num, length, isSpecial);
  for (var i = 0; i < passwords.length; i++) {
    m += `<tr><td>${i+1}</td><td>${passwords[i]}</td></tr>`;
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

function getHtml(){
  try {
    return `<!DOCTYPE html><html>` 
           + getHead() 
           + `<body>` 
           + getHeading()
           + getGrid() 
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

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request));
});
