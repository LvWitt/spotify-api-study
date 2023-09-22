import { defineStore } from "pinia";
import { generateRandomString, generateCodeChallenge } from './PKCEaux.js'
import axios from 'axios';

const scopes = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played'
  ];

  
const LOCALSTORAGE_CODE_VERIFIER = "code_verifier"
const LOCALSTORAGE_AUTH_CODE = "auth_code"
const LOCALSTORAGE_ACCESS_TOKEN = "access_token"
const LOCALSTORAGE_REFRESH_TOKEN = "refresh_token"
const LOCALSTORAGE_TOKEN_EXPIRATION = "expires_in"

export const useAuthStore = defineStore("auth", () => {    
    function redirectToAuth() {
        const codeVerifier = generateRandomString(128);
        console.log(codeVerifier)
        generateCodeChallenge(codeVerifier).then(codeChallenge => {
          const state = generateRandomString(16);
          const scope = scopes.join(" ");
    
          localStorage.setItem(LOCALSTORAGE_CODE_VERIFIER, codeVerifier);
    
          const args = new URLSearchParams({
            response_type: "code",
            client_id: "aeda74075eec4ffa897944adb9682ba5",
            scope: scope,
            redirect_uri: "https://lvwitt.github.io/spotify-api-study/Callback",
            state: state,
            code_challenge_method: "S256",
            code_challenge: codeChallenge,
          });
    
          const url = `https://accounts.spotify.com/authorize?${args}`;
          window.location.href = url;
        })
    }

    function getAuthCodeFromURL(){
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        if (code) {
          localStorage.setItem(LOCALSTORAGE_AUTH_CODE, code)
        } 
        return code
    }

    async function requestAccessToken() {
        const authCode = getAuthCodeFromURL()
        const codeVerifier = localStorage.getItem(LOCALSTORAGE_CODE_VERIFIER);
    
        const args = new URLSearchParams({
          grant_type: "authorization_code",
          code: authCode,
          redirect_uri: "https://lvwitt.github.io/spotify-api-study/Callback",
          client_id: "aeda74075eec4ffa897944adb9682ba5",
          code_verifier: codeVerifier,
        });
    
        try {
          const response = await axios.post("https://accounts.spotify.com/api/token", args)
          const { access_token, refresh_token, expires_in } = response.data;
          const expiration = new Date().getTime() + (expires_in * 1000);
          console.log("SETING LOCALSTORAGE VARIABLES");
          localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN, access_token);
          localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN, refresh_token);
          localStorage.setItem(LOCALSTORAGE_TOKEN_EXPIRATION, expiration.toString());
          console.log("LOCALSTORAGE VARIABLES DONE");
          window.location.replace("https://lvwitt.github.io/spotify-api-study/TopArtists");
        } catch (fail) {
          console.error(fail)
        }
    }

    async function refreshAccessToken() {
      refreshToken = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN);
        if (!refreshToken) {
          return;
        }
    
        const args = new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: Config.spotifyClientId,
        });
    
        try {
          const response = await axios.post("https://accounts.spotify.com/api/token", args)
          const { access_token, expires_in } = response.data;
          console.log("refreshed access token", response.data)
          const expiration = new Date().getTime() + (expires_in * 1000);
          localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN, access_token);
          localStorage.setItem(LOCALSTORAGE_TOKEN_EXPIRATION, expiration.toString());
          location.reload()
        } catch (e) {
        }
      }
 
    

    return {redirectToAuth, requestAccessToken}

});