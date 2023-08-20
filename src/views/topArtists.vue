<template>
    <div class="topArtists-section">
        <header class="function-header">
            <h1>Top Artists</h1>
        </header>
        <div class="topArtists-content">
            <div id="topArtists-results" class="topArtists-results">

                <div v-for="artist in topArtists" :key="artist.name">       
                    <div class="dataItems">
                        <a :href="artist.external_urls.spotify" target="_blank"><img class="topArtistsImg" :src="artist.images[1].url"></a>
                        <p class="artistName">{{ artist.name }}</p>
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
            topArtists: []
        }
    },
    async created() {
        const accessToken = localStorage.getItem('access_token')
            if (accessToken) {
                const request = await axios.get('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50', { 
                    headers: { 
                        Authorization: `Bearer ${accessToken}` 
                    } 
                });

                this.topArtists = request.data.items;
                console.log("SETOU TOPARTISTAS");
                console.log(this.topArtists);
            }
    } 
   }
</script>

<style>

.topArtists-results{
    display: flex;
    width: 780px;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    gap:10px;
}
.topArtistsImg {
    width: 150px;
    height: 150px;
}

.dataItems {
    text-align: center;
    width: 180px;
    height: 250px;
}

.artistName{
    color: white;
}
</style>