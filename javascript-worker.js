export default {
  async fetch(request, env) {
    return new Response(generatePasswords(5,12))
  }
}

function generatePasswords(passwordCount, passwordLength) {
  const possibleCharacters = "abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&";
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