<template>
    <div class="topTracks-section">
        <header class="function-header">
            <h1>Top Tracks</h1>
        </header>
        <div class="topTracks-content">
            <div id="topTracks-results" class="topTracks-results">
                <div v-for="(track, index) in topTracks" :key="track.name">      
                        <div class="dataItems">
                            <a :href="track.external_urls.spotify" target="_blank"><img class="topTracksImg" :src="track.album.images[1].url"></a>
                            <p class="trackName"><b>{{index+1}}</b> - {{track.name}}<br><b>{{track.artists[0].name}}</b></p>
                        </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
   import axios from 'axios';
   export default {
    data(){
        return {
            topTracks: []
        }
    },
    async created() {
        const accessToken = localStorage.getItem('access_token')
            if (accessToken) {
                const request = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', { 
                    headers: { 
                        Authorization: `Bearer ${accessToken}` 
                    } 
                });

                this.topTracks = request.data.items;
            }
    } 
   }
</script>

<style>
.topTracks-results{
    display: flex;
    width: 780px;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    gap:10px;
}

.topTracksImg {
    width: 150px;
    height: 150px;
}

.dataItems {
    text-align: center;
    width: 180px;
    height: 250px;
}
</style>