# spotify-stats-spa
This website displays your top Artists and Tracks organized by different time periods, also you can view your recently listening tracks.
<br>
<br>
All data is obtained by consuming the Spotify API and it uses authorization code flow with Proof Key for Code Exchange (PKCE) to request an access token that can be refreshed without using a client secret, allowing flow to be fully client-side and it provides protection against attacks where the authorization code may be intercepted.
<br>
<br>
There is a functionality under development to register songs that are not on Spotify in the database using Laravel API -> https://github.com/LvWitt/stats-app-api
(At the moment this only works on localhost)
<br>
<br>
![](https://github.com/LvWitt/spotify-api-study/blob/main/sample.gif)
<br>
<br>
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
