<template>
    <div class="app-area">
        <RouterView />
    </div>
</template>

<script>
import MenuSidebar from './components/MenuSidebar.vue';

export default {
    components: {
        MenuSidebar
    }
}

</script>

<style>
body {
    background-color: #1db954;
    background-image: linear-gradient(160deg, #1db954 0%, #80D0C7 100%);
    font-family: 'Open Sans', sans-serif;
}

.function-header {
    margin-left: 30px;
}

.app-area {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;
}
</style>