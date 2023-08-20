<template>
    <div class="login-section">
        <button id="login-btn" class="login-btn" @click="authStore.redirectToAuth();">Login</button>

    </div>
</template>

<script>
    import {useAuthStore} from '../auth/requestAuth.js';

    export default {
        name: "Login",
        setup () {
            const authStore = useAuthStore();
            return {authStore}
        },
    }
</script>

<style>
.login-section {
    display: flex;
}
</style>