<template>
    <aside class="menu-sidebar">
        <div class="main-header">
            <header>
                <h1>Stats for Spotify</h1>
            </header>
            <div id="login-content">
                    <p class="login-warning-menu"></p>
            </div>
        </div>
        <div class="options">
            <div class="stats-options">
                <button class="btn-dashboard" @click="$router.push('/Charts')">Dashboard</button>
                <button class="btn-topTracks" @click="$router.push('/TopTracks')">Top Tracks</button>
                <button class="btn-topArtists" @click="$router.push('/TopArtists')">Top Artists</button>
                <button class="btn-history" @click="$router.push('/ListeningHistory')">Listening History</button>
                <button class="btn-recentlyPlayed" onclick="getRecentlyPlayedTracks()">Recently Played</button>
            </div>
            <div class="fetch-options">
                <label for="4weeks"> <input type="radio" value="short_term" id="4weeks"  name="topic"/> Last 4 weeks </label>
                <label for="6months"> <input type="radio" value="medium_term" id="6months" name="topic"/> Last 6 months </label>
                <label for="alltime"> <input type="radio" value="long_term" id="alltime" name="topic"/> All time </label>
            </div>
        </div>
    </aside>
</template>

<style>
    .main-header, .stats-options, .fetch-options{
        margin: -1px -1px -1px -1px;
        padding:20px 0px 20px 0px;
    }
    .stats-options {
        display: flex;
        gap: 10px;
    }

    stats-options, .fetch-options{
        border: 1px solid black;
    }

    .stats-options, .fetch-options{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }  

    .menu-sidebar{
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
    }  
</style>

