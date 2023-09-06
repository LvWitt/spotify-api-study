<template>
    <div class="callback">
        <h1>Loading...</h1>
    </div>
</template>

<script>  
    import {useAuthStore} from '../auth/requestAuth.js'; 
    export default {
        name: 'Callback',
        created() {
            console.log("Aqui foi")
            const authStore = useAuthStore();
            const urlParams = new URLSearchParams(window.location.search)
            if (urlParams.has("code")) {
                console.log("request accessToken");
                authStore.requestAccessToken();
            }

            if (localStorage.getItem("access_token")){
                console.log("access_token found");
            }
            else {
                console.log("Error");
            }
            
        },
    }
</script>

<style>
.callback {
    display: flex;
}
</style>