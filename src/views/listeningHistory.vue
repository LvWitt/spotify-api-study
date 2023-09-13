<template>
    <MenuSidebar />
    <div class="main-content">
        <div class="recentlyPlayedTracks">
            <header class="function-header">
                <h1>Recently Played Tracks</h1>
            </header>
            <div class="recentlyPlayed-content">
                <div class="recentlyPlayed-data-container">

                    <table class="recentlyPlayedSection">
                        <tr>
                            <th></th>
                            <th>Track</th>
                            <th>Artist</th>
                            <th>Date</th>
                        </tr>
                        <tr v-for="recently in recentlyPlayed" :key="recently.track.name">
                            <td class="recentlyPlayedImgSection">
                                <a :href="recently.track.external_urls.spotify" target="_blank">
                                    <img class="recentlyPlayedImg" :src="recently.track.album.images[1].url"></a>
                            </td>
                            <td class="trackName">
                                {{ recently.track.name }}
                            </td>
                            <td>
                                <b>{{ recently.track.artists[0].name }}</b>
                            </td>
                            <td>
                                {{ recently.played_at }}
                            </td>
                        </tr>
                    </table>
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
            recentlyPlayed: []
        }
    },
    async created() {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {
            const request = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });


            this.recentlyPlayed = request.data.items;
        }
    }
}
</script>

<style>
.recentlyPlayed-data-container ul,
tr {
    padding: 0;
    margin: 0;
}

.recentlyPlayed-data-container li,
td {
    margin-bottom: 5px;
    padding: 5px 10px;
    background: #00000086;
    color: #fafafa;
    overflow: hidden;
    white-space: nowrap;
}

.recentlyPlayed-data-container li,
td:first-child {
    width: 60px;
    text-align: center;
}

.recentlyPlayed-data-container li,
td:nth-child(2) {
    width: 200px;
}

.recentlyPlayed-data-container li,
td:nth-child(3) {
    width: 120px;
}

.recentlyPlayedSection {
    border-collapse: collapse;
    font-size: 14px;
}

.recentlyPlayedImgSection {
    width: 60px;
}

.recentlyPlayedImg {
    width: 50px;
}

.trackName,
.artistName {
    color: white;
}

.recentlyPlayed-content {
    display: flex;
    align-items: center;
    flex-direction: column;
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
}</style>