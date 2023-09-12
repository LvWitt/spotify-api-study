<template>
    <div class="topArtists-section">
        <header class="function-header">
            <h1>Manager</h1>
        </header>

        <div id="myApp">
            <div class="container">
                <h1 class="text-center">Create</h1>
                <div class="row">
                    <div class="offset-md-3 col-md-6">
                        <form method="POST" action="http://localhost/PHP-VUE/create.php" v-on:submit.prevent="doCreate">
                            <div class="form-group">
                                <label>id</label>
                                <input type="text" name="id" v-model="formData.id" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Track Name</label>
                                <input type="text" name="track_name" v-model="formData.track_name" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Artist Name</label>
                                <input type="text" name="artist_name" v-model="formData.artist_name" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Image URL</label>
                                <input type="text" name="img_url" v-model="formData.img_url" class="form-control" />
                            </div>
                            <input type="submit" value="Create Track" @click="sendData" class="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <h1 class="text-center">Read</h1>

        <table class="table">
            <tr>
                <th>track_id</th>
                <th>track_name</th>
                <th>artist_name</th>
                <th>img_url</th>
            </tr>

            <tr v-for="(tracks, index) in users">
                <td v-text="tracks.id"></td>
                <td v-text="tracks.track_name"></td>
                <td v-text="tracks.artist_name"></td>
                <td v-text="tracks.img_url"></td>
            </tr>
        </table>

    </div>
</template>

<script>
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js"
export default {
    data() {
        tracks: [];
        trackid: 0;
        return {
            formData: {
                id: '',
                track_name: '',
                artist_name: '',
                img_url: '',
            }
        };
    },
    methods: {
        test() {
            console.log(this.formData)
        },
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
            axios.get('http://localhost/PHP-VUE/read.php')
                .then(function (response) {
                    this.tracks = response.data;
                }).catch(function (error) {
                    console.error(error);
                });

        },
        recordByID() {
            if (this.trackid > 0) {

                axios.get('http://localhost/PHP-VUE/read.php', {
                    params: {
                        trackid: this.trackid
                    }
                })
                    .then(function (response) {
                        this.tracks = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
}
</script>

<style>
.topArtists-results {
    display: flex;
    width: 780px;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    gap: 10px;
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

.artistName {
    color: white;
}
</style>