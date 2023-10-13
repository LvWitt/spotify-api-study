<template>
    <MenuSidebar />
    <div class="main-content">
        <header class="function-header">
            <h1>Manager</h1>
        </header>
        <div class="manager-section">
            <h1>Create Tracks</h1>
            <div class="alert-danger" v-if="errors.length">
                <ul>
                    <li v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
            <div class="form" v-if="updateForm == 0">
                <form @submit.prevent="saveTrack" novalidate>
                    <label>Track ID</label>
                    <input class="form-id" type="text" name="id" v-model="formData.id" />
                    <label>Track Name</label>
                    <input type="text" name="track_name" v-model="formData.track_name" />
                    <label>Artist Name</label>
                    <input type="text" name="artist_name" v-model="formData.artist_name" />
                    <label>Image URL</label>
                    <input type="text" name="img_url" v-model="formData.img_url" />
                    <input type="submit" value="Create Track" />
                </form>
            </div>

            <div class="form" v-if="updateForm == 1">
                <form @submit.prevent="updateTrack" novalidate>
                    <label>Track IDDD</label>
                    <input class="form-id" type="text" name="id" v-model="formData.id" />
                    <label>Track Name</label>
                    <input type="text" name="track_name" v-model="formData.track_name" />
                    <label>Artist Name</label>
                    <input type="text" name="artist_name" v-model="formData.artist_name" />
                    <label>Image URL</label>
                    <input type="text" name="img_url" v-model="formData.img_url" />
                    <input type="submit" value="Update Track" />
                </form>
            </div>

            <h1>Read</h1>
            <table class="allData">
                <tr>
                    <th>track_id</th>
                    <th>track_name</th>
                    <th>artist_name</th>
                    <th>img_url</th>
                </tr>
                <tr v-for="(tracks) in tracks">
                    <td v-text="tracks.id"></td>
                    <td v-text="tracks.track_name"></td>
                    <td v-text="tracks.artist_name"></td>
                    <td v-text="tracks.img_url"></td>
                    <td>
                        <input type='button' value='Update' @click="loadUpdateTrack(tracks.id)">
                        <input type='button' value='Delete' @click.prevent="deleteTrack(tracks.id)">
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
            errors: [],
            updateForm: 0,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async saveTrack() {
            this.errors = [];
            if (!this.formData.id) {
                this.errors.push("Id is Required!")
            }
            if (!this.formData.track_name) {
                this.errors.push("Track Name is Required!")
            }
            if (!this.formData.artist_name) {
                this.errors.push("Artist Name is Required!")
            }

            if (!this.errors.length) {
                let url = "http://127.0.0.1:8000/api/saveTrack";

                await axios.post(url, this.formData).then((response) => {

                    if (response.status == 200) {
                        this.formData.id = "";
                        this.formData.track_name = "";
                        this.formData.artist_name = "";
                        this.formData.img_url = "";
                        this.getData();

                    } else {
                        console.log('error');
                    }
                }).catch(error => {
                    this.errors.push(error.response);
                });
            }
        },
        async getData() {
            let url = 'http://127.0.0.1:8000/api/tracks';
            await axios.get(url).then(response => {
                this.tracks = response.data.tracks;
            }).catch(error => {
                console.log(error);
            });

        },
        async loadUpdateTrack(id){
            let url = `http://127.0.0.1:8000/api/getTrack/${id}`;
            await axios.get(url).then((response) => {
                this.formData = response.data;
                if (response.status == 200) {
                    this.updateForm = 1;
                }
            });
        },
        async updateTrack() {
            this.errors = [];
            if (!this.formData.id) {
                this.errors.push("Id is Required!")
            }
            if (!this.formData.track_name) {
                this.errors.push("Track Name is Required!")
            }
            if (!this.formData.artist_name) {
                this.errors.push("Artist Name is Required!")
            }

            if (!this.errors.length) {
                let url = `http://127.0.0.1:8000/api/updateTrack/${this.formData.id}`;

                await axios.post(url, this.formData).then((response) => {

                    if (response.status == 200) {
                        this.formData.id = "";
                        this.formData.track_name = "";
                        this.formData.artist_name = "";
                        this.formData.img_url = "";
                        this.updateForm = 0;
                        this.getData();
                    } else {
                        console.log('error');
                    }
                }).catch(error => {
                    this.errors.push(error.response);
                });
            }
        },
        async deleteTrack(id) {
            let url = `http://127.0.0.1:8000/api/deleteTrack/${id}`;
            await axios.delete(url).then(response => {
                if (response.data.code == 200) {
                    this.getData();
                }
            }).catch(error => {
                console.log(error);
            });
        }
    },
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

.allData {
    overflow-x:auto; 
}

.main-content {
    background: rgba(36, 36, 36, 0.63);
    border-radius: 12px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    width: 900px;
    height: 750px;
    margin: 10px 0px 0px 30px;
    color: white;
    overflow: auto;
    display: block;
}
</style>