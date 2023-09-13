<template>
    <MenuSidebar />
    <div class="main-content">
        <header class="function-header">
            <h1>Manager</h1>
        </header>
        <div class="manager-section">
            <h1>Create Tracks</h1>
            <div class="form">
                <form method="POST" action="http://localhost/PHP-VUE/create.php" v-on:submit.prevent="doCreate">
                    <label>Track ID</label>
                    <input type="text" name="id" v-model="formData.id" />
                    <label>Track Name</label>
                    <input type="text" name="track_name" v-model="formData.track_name" />
                    <label>Artist Name</label>
                    <input type="text" name="artist_name" v-model="formData.artist_name" />
                    <label>Image URL</label>
                    <input type="text" name="img_url" v-model="formData.img_url" />
                    <input type="submit" value="Create Track" @click="sendData" />
                </form>
            </div>

            <h1>Read</h1>
            <table>
                <tr>
                    <th>track_id</th>
                    <th>track_name</th>
                    <th>artist_name</th>
                    <th>img_url</th>
                </tr>

                <tr v-for="(tracks, index) in tracks">
                    <td v-text="tracks.id"></td>
                    <td v-text="tracks.track_name"></td>
                    <td v-text="tracks.artist_name"></td>
                    <td v-text="tracks.img_url"></td>
                    <td>
                        <input type='button' value='Update' >
                        <input type='button' value='Delete' >
                    </td>
                </tr>
            </table>
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
            formData: {
                id: '',
                track_name: '',
                artist_name: '',
                img_url: '',
            },
            tracks: {
                id: '',
                track_name: '',
                artist_name: '',
                img_url: '',
            },
            trackid: 0,
        };
    },
    methods: {
        sendData() {
            axios.post('http://localhost/PHP-VUE/create.php', this.formData,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getData() {
            var outer_this;
            outer_this = this;

            axios.get('http://localhost/PHP-VUE/read.php')
                .then(function (response) {
                    outer_this.tracks = response.data;
                }).catch(function (error) {
                    console.error(error);
                });

        },
    },
    mounted() {
        this.getData()
    }
}
</script>

<style>
input[type=text],
select {
    width: 100%;
    padding: 8px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #0c0c0c;
    background-color: rgba(36, 36, 36, 0.63);
    border-radius: 4px;
    box-sizing: border-box;
    color: white;
}

.function-header {
    text-align: left;
}

.form {
    width: 45%;
}

.manager-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    overflow: auto;
    display: block;
}
</style>