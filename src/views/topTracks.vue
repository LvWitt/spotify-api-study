<template>
    <MenuSidebar />
    <div class="main-content">
        <div class="topTracks-section">
            <header class="function-header">
                <h1>Top Tracks</h1>
            </header>
            <div class="topTracks-content">
                <div class="fetch-options-top">
                    <label for="4weeks"> <input type="radio"  @change="getTerm(), getTopTracks()" v-model="term" value="short_term" id="4weeks"  name="topic" checked="checked"/> Last 4 weeks </label>
                    <label for="6months"> <input type="radio" @change="getTerm(), getTopTracks()" v-model="term" value="medium_term" id="6months" name="topic"/> Last 6 months </label>
                    <label for="alltime"> <input type="radio" @change="getTerm(), getTopTracks()" v-model="term" value="long_term" id="alltime" name="topic"/> All time </label>
                </div>
                <div id="topTracks-results" class="topTracks-results">
                    <div v-for="(track, index) in topTracks" :key="track.name">
                        <div class="dataItems">
                            <a :href="track.external_urls.spotify" target="_blank"><img class="topTracksImg"
                                    :src="track.album.images[1].url"></a>
                            <p class="trackName"><b>{{ index + 1 }}</b> - {{ track.name }}<br><b>{{ track.artists[0].name }}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MenuSidebar from '../components/MenuSidebar.vue';
import axios from 'axios';
export default {
    components: {
        MenuSidebar,
    },
    data() {
        return {
            topTracks: [],
            term: "",
            termvalue: "short_term"
        }
    },
    async created() {
        this.getTopTracks()
    },
    methods: {
        getTerm: function () {
			this.termvalue = this.term;
            console.log(this.termvalue)
		},
        async getTopTracks() {
            const accessToken = localStorage.getItem('access_token')
            if (accessToken) {
                const request = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${this.termvalue}&limit=50`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                this.topTracks = request.data.items;
            }
        }
    }
}
</script>

<style>
.fetch-options-top {
    display: flex;
    justify-content: end;
    margin-right: 70px;
    margin-bottom: 10px;
}

.topTracks-results {
    display: flex;
    border-radius: 12px;
    width: 780px;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.075);
    padding-top: 28px;
}

.topTracksImg {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.3);
}

.dataItems {
    text-align: center;
    width: 180px;
    height: 250px;
}

.main-content {
    background: rgba(36, 36, 36, 0.63);
    border-radius: 12px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    width: 900px;
    height: 800px;
    margin: 10px 0px 0px 30px;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
}
</style>