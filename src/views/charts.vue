<template>
    <div class="dashboard-section">
        <header class="function-header">
            <h1>Dashboard</h1>
        </header>
        <div class="dashboard-content">
        </div>
    </div>
</template>

<script>
//ver para renderizar esse componente dps de apertar login, esse cod de baixo vai ficar rodando ate ter code eu espero...
    import axios from 'axios';

   export default {
        data(){
            return {
                userProfile: []
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
            
                this.userProfile = request;
                console.log("DATA");
                console.log(this.userProfile );
            
        }
    }
</script>

<style>
    
</style>


