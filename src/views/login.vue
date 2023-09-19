<template>
    <div class="login-page">
        <div class="login-wrapper">
            <div class="login-header">
                <h1 class="login-message">Log in to your</h1>
                <h1 class="login-message">Spotify account</h1>
                <h2 class="login-sub-message">and check your listening stats</h2>
            </div>
            <div class="login-section">
                <button id="login-btn" class="login-btn" @click="authStore.redirectToAuth();"><b>Log in</b></button>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../auth/requestAuth.js';

export default {
    name: "Login",
    setup() {
        const authStore = useAuthStore();
        return { authStore }
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

html,
body {
    height: 100%;
    margin: 0px;
    padding: 0px;
}

.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d0d0d0;
    background-image: linear-gradient(160deg, #d0d0d0 0%, #83d080 100%);
    min-height: 100%;
    width: 100%;
}

.login-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 35px;
}

.login-message {
    font-size: 70px;
    margin: 0px;
    padding: 0px;
    line-height:75px;
}


.login-header {
    font-family: 'Poppins', sans-serif;
    color: white;
    margin-left: -450px;
}

.login-btn {
    color: #fff;
    background-color: #0ea13f;
    font-size: 17px;
    line-height: 1;
    border-radius: 500px;
    padding: 28px 48px 28px;
    transition-property: background-color;
    transition-duration: .5s;
    border-width: 0;
    letter-spacing: 2px;
    min-width: 190px;
    text-transform: uppercase;
    white-space: normal;
    cursor: pointer;
}

.login-btn:hover {
    background-color: #41ca7a;
}

.login-sub-message {
    margin-top: 15px;
    padding: 0px;
    text-align: end;
    font-size: 30px;
}

.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>