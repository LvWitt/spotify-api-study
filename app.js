

const redirect_uri = "http://127.0.0.1:5500/index.html";
const client_id = "aeda74075eec4ffa897944adb9682ba5";
/*
function authorize(){
    //const redirect_uri = "https://lvwitt.github.io/spotify-api-study/";
    const redirect_uri = "http://127.0.0.1:5500/index.html";
    const client_id = "aeda74075eec4ffa897944adb9682ba5";

    let url = 'https://accounts.spotify.com/authorize'
    + '?response_type=code'
    + '&client_id=' + encodeURIComponent(client_id)
    + '&redirect_uri=' + encodeURIComponent(redirect_uri);
    console.log(url)
    
//window.location = url;

 ;
} 

authorize()*/


function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

async function generateCodeChallenge(codeVerifier) {
function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

const encoder = new TextEncoder();
const data = encoder.encode(codeVerifier);
const digest = await window.crypto.subtle.digest('SHA-256', data);

return base64encode(digest);
}


function requestAuthorization(){
    let codeVerifier = generateRandomString(128);
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
        let state = generateRandomString(16);
        //let scope = 'user-read-private user-read-email';
    
        localStorage.setItem('code_verifier', codeVerifier);
    
        let args = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        redirect_uri: redirect_uri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
        });
    
        window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
}

function requestAcessToken(){
    let codeVerifier = localStorage.getItem('code_verifier');

    let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
    });

    const response = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('access_token', data.access_token);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    console.log("RESPONSE");
    console.log(response);
    
}

async function getProfile(accessToken) {
    accessToken = localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    console.log("DATA");
    console.log(data);
}




const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');
console.log("CODE");
console.log(code);