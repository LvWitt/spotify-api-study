

const redirect_uri = "http://127.0.0.1:5500/index.html";
const client_id = "aeda74075eec4ffa897944adb9682ba5";

const loginPlaceholder = document.getElementById("login-content");

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
    
        window.localStorage.setItem('code_verifier', codeVerifier);
    
        let args = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        redirect_uri: redirect_uri,
        scope: 'user-read-private user-read-email user-top-read user-read-recently-played',
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
        });
    
        window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
}

function requestAcessToken(){
    let codeVerifier = window.localStorage.getItem('code_verifier');

    let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect_uri,
    client_id: client_id,
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
    }, historyDataFunction())
    .then(data => {
        window.localStorage.setItem('access_token', data.access_token);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    getProfile(response.access_token).then((data) => {

        var content = '<p class="login-message-menu"> Logged in, ' + data.display_name + '!</p>';
        $('.login-warning').remove();
        $('.login-warning-menu').remove();
        $('#btn-login').css('display', 'none')
        $('#login-content').append(content);
    });
    
}

async function getProfile(accessToken) {
    accessToken = window.localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    console.log("DATA");
    console.log(data);
    return data;
}

function getTopArtists() {
    accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
        let time_range = $("input[type='radio']:checked").val().toString();
        let limit = $("input[type='radio']#topArtists-btn-limit:checked").val().toString();

        $.ajax({
              url: 'https://api.spotify.com/v1/me/top/artists',
              data: {
              time_range: time_range,
              limit: limit,
            },
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            success: function(response) {
            $('#topArtists-results').empty();
            let resultsHtml = '';
            response.items.forEach((item, i) => {
                let name = item.name;
                let url = item.external_urls.spotify;
                let image = item.images[1].url;
                resultsHtml += '<div class="dataItems"><a href="' 
                + url + '" target="_blank"><img class="topArtistsImg" src="' + image + '"></a><p class="artistName">' 
                + (i + 1) + '. ' + name + '</p></div>';
            });
            $('#topArtists-results').html(resultsHtml);
            },
        });
    }
  }

function getTopTracks() {
  accessToken = window.localStorage.getItem('access_token');
  if (accessToken) {
      let time_range = $("input[type='radio']:checked").val().toString();
      let limit = $("input[type='radio']#topTracks-btn-limit:checked").val().toString();

      $.ajax({
            url: 'https://api.spotify.com/v1/me/top/tracks',
            data: {
            time_range: time_range,
            limit: limit,
          },
          headers: {
              Authorization: 'Bearer ' + accessToken,
          },
          success: function(response) {
          $('#topTracks-results').empty();
          console.log(response);
          let resultsHtml = '';
          response.items.forEach((item, i) => {
              let trackName = item.name;
              let artistName = item.artists[0].name;
              let url = item.external_urls.spotify;
              let image = item.album.images[1].url;
              resultsHtml += '<div class="dataItems"><a href="' 
              + url + '" target="_blank"><img class="topTracksImg" src="' + image + '"></a>' 
              + '<p class="trackName">' + (i + 1) + '. ' + trackName + ' <br><b>' + artistName + '</b></p>' + '</div>';
          });
          $('#topTracks-results').html(resultsHtml);
          },
      });
  }
}

function getRecentlyPlayedTracks() {
  accessToken = window.localStorage.getItem('access_token');

  if (accessToken) {
      //let time_range = $("input[type='radio']:checked").val().toString();
      //let limit = $("input[type='radio']#topTracks-btn-limit:checked").val().toString();

      $.ajax({
            url: 'https://api.spotify.com/v1/me/player/recently-played',
            data: {
              limit: '50'
            },
          headers: {
              Authorization: 'Bearer ' + accessToken,
          },
          success: function(response) {
          console.log(response);
          let resultsHtml = '<table class="recentlyPlayedSection">' + '<thead>' + '<tr>' + '<th></th>' + '<th>Artist</th>' + '<th>Track</th>' + '<th>Date</th>' + '</tr>' + '</thread>' + '<tr>';
          response.items.forEach((item, i) => {
              let trackName = item.track.name;
              let artistName = item.track.artists[0].name;
              let url = item.track.external_urls.spotify;
              let image = item.track.album.images[1].url;
              let datePlayed = new Date (item.played_at);
              resultsHtml += '<tr>' + '<td class="recentlyPlayedImgSection">' + '<a href="' + url 
              + '" target="_blank"><img class="recentlyPlayedImg" src="' + image + '"></a>' + '</td>' 
              + '<td class="trackName">' + (i + 1) + '. ' + trackName + '</td>' 
              + '<td><b>' + artistName + '</b></td>' 
              + '<td>' + datePlayed.toUTCString(); + '</td>' + '</tr>';
          });
          resultsHtml += '</table>';
          console.log(resultsHtml);
          $('.recentlyPlayed-data-container').html(resultsHtml);
          },
      });
  }
}

function setDashboard(){
    accessToken = window.localStorage.getItem('access_token');

    getProfile(accessToken).then((data) => {
        let resultsHtml = '<p>Hi, ' + data.display_name + '!</p>'
        
        $('.dashboard-content').html(resultsHtml);
    });
}


const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

if (code) {
    requestAcessToken();
}

