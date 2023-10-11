<template>
    <aside class="menu-sidebar">
        <div class="main-header">
            <header>
                <h1>Stats for Spotify</h1>
            </header>
            <div class="login-content">
              <div class="user-info">
                <img class="profile-img"  v-bind:src="userImg">
                <p>{{userProfile.display_name}}</p>
              </div>
                  <button class="btn-logout" @click="$router.push('/')">Log out</button>
            </div>
        </div>
        <div class="options">
            <div class="stats-options">
                <button class="btn-topTracks" @click="$router.push('/TopTracks')">Top Tracks</button>
                <button class="btn-topArtists" @click="$router.push('/TopArtists')">Top Artists</button>
                <button class="btn-history" @click="$router.push('/ListeningHistory')">Listening History</button>
                <button class="btn-manager" @click="$router.push('/Manager')">Manager</button>
            </div>
        </div>
    </aside>
</template>

<script>
  import axios from 'axios';

  export default {
      data(){
          return {
              userProfile: [],
              userImg: ""
          }
      },
      async created() {

          console.log("GERUSERPROFILEDATA")

          const accessToken = localStorage.getItem('access_token');
      
          const request = await axios.get('https://api.spotify.com/v1/me', { 
              headers: { 
                  Authorization: `Bearer ${accessToken}` 
              } 
          });
      
          this.userProfile = request.data;
          this.userImg = request.data.images[0].url;
          console.log(this.userImg);
          console.log("DATA");
          console.log(this.userProfile ); 
      }
  }
</script>

<style>
.login-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.589);
  padding-bottom: 10px;
}

.user-info{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.profile-img {
  object-fit: cover;
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.btn-logout {
  appearance: none;
    backface-visibility: hidden;
    background-color: #444444;
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: normal;
    line-height: 1.5;
    outline: none;
    overflow: hidden;
    padding: 5px 10px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transform: translate3d(0, 0, 0);
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    white-space: nowrap;
    width: 70px;
}

.btn-logout:hover {
  background-color: #000000;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

.btn-topTracks,
.btn-topArtists,
.btn-history,
.btn-manager {
    appearance: none;
    backface-visibility: hidden;
    background-color: #161616;
    border-radius: 8px;
    border-style: none;
    box-shadow: rgba(39, 174, 96, .15) 0 4px 9px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: normal;
    line-height: 1.5;
    outline: none;
    overflow: hidden;
    padding: 13px 20px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transform: translate3d(0, 0, 0);
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    white-space: nowrap;
    width: 160px;
}

.btn-manager:hover {
  background-color: #3b3b3b;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

.btn-history:hover {
  background-color: #3b3b3b;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

.btn-topArtists:hover {
  background-color: #3b3b3b;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

.btn-topTracks:hover {
  background-color: #3b3b3b;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}


.btn-manager:active {
  transform: translateY(2px);
  transition-duration: .35s;
}

.btn-history:active {
  transform: translateY(2px);
  transition-duration: .35s;
}

.btn-topArtists:active {
  transform: translateY(2px);
  transition-duration: .35s;
}

.button-68:active {
  transform: translateY(2px);
  transition-duration: .35s;
}

.btn-topTracks:active {
  transform: translateY(2px);
  transition-duration: .35s;
}


.main-header,
.stats-options {
    margin: -1px -1px -1px -1px;
    padding: 20px 0px 20px 0px;
}

.stats-options {
    display: flex;
    gap: 10px;
}

stats-options {
    border: 1px solid black;
}

.stats-options {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.menu-sidebar {
    width: 230px;
    height: 500px;
    text-align: center;
    border: 1px solid black;
    margin: 20px 0px 0px 0px;
    /* From https://css.glass */
    background: rgba(36, 36, 36, 0.63);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    color: white;
}</style>

