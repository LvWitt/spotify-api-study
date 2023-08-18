<template>
    <div class="app-area">

        <div class="main-content"><RouterView /></div>
    </div>
    
</template>

<script>
    

export default {
  
}
</script>

<style>
body {
    background-color: #1db954;
    background-image: linear-gradient(160deg, #1db954 0%, #80D0C7 100%);
    font-family: 'Open Sans', sans-serif;
}    

.app-area{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 100vh; 
}

.main-content{
    background: rgba(36, 36, 36, 0.63);
    border-radius: 12px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    width: 900px;
    height: 800px;
    margin: 10px 0px 0px 30px;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
}
</style>