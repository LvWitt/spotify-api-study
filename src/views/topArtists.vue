<template>
    <MenuSidebar />
    <div class="main-content">
        <div class="topArtists-section">
            <header class="function-header">
                <h1>Top Artists</h1>
            </header>
            <div class="topArtists-content">
                <div class="fetch-options-top">
                    <label for="4weeks"> <input type="radio"  @change="getTerm(), getTopArtists()" v-model="term" value="short_term" id="4weeks"  name="topic" checked="checked"/> Last 4 weeks </label>
                    <label for="6months"> <input type="radio" @change="getTerm(), getTopArtists()" v-model="term" value="medium_term" id="6months" name="topic"/> Last 6 months </label>
                    <label for="alltime"> <input type="radio" @change="getTerm(), getTopArtists()" v-model="term" value="long_term" id="alltime" name="topic"/> All time </label>
                </div>
                <div id="topArtists-results" class="topArtists-results">
                    <div v-for="(artist, index) in topArtists" :key="artist.name">
                        <div class="dataItems">
                            <a :href="artist.external_urls.spotify" target="_blank"><img class="topArtistsImg"
                                    :src="artist.images[1].url"></a>
                            <p class="artistName"><b>{{ index + 1 }}</b> - {{ artist.name }}</p>
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
            topArtists: [],
            term: "",
            termvalue: "short_term"
        }
    },
    async created() {
        this.getTopArtists()
    },
    methods: {
        getTerm: function () {
			this.termvalue = this.term;
            console.log(this.termvalue)
		},
        async getTopArtists() {
            const accessToken = localStorage.getItem('access_token')
            if (accessToken) {
                const request = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${this.termvalue}&limit=50`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                this.topArtists = request.data.items;
            }
        }
    },
}
</script>

<style>
.fetch-options-top {
    display: flex;
    justify-content: end;
    margin-right: 70px;
    margin-bottom: 10px;
}

.topArtists-results {
    display: flex;
    border-radius: 12px;
    width: 780px;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    gap: 0px;
    background-color: rgba(0, 0, 0, 0.075);
    padding-top: 28px;
}

.topArtistsImg {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.3);
}

.dataItems {
    text-align: center;
    width: 180px;
    height: 220px;
}

.artistName {
    color: white;
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