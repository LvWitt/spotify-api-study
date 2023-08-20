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
            console.log("LOLLOLOLOLOLOLOLOLOLOLOLOL");
            if (urlParams.has("code")) {
                console.log("YAYAYAYAYAYAYAYAYAYA");
                authStore.requestAccessToken();
            }

            if (localStorage.getItem("access_token")){
                console.log("ACESOOOOOOOO TOKENNNNNNN");
            }
            else {
                console.log("RIP");
            }
            
        },
    }
</script>

<style>
.callback {
    display: flex;
}
</style>