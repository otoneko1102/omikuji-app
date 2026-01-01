<script setup>
  import TheHeader from "./components/TheHeader.vue";
  import OmikujiCard from "./components/OmikujiCard.vue";
  import TheFooter from "./components/TheFooter.vue";
</script>

<template>
  <div class="app-layout">
    <TheHeader />
    <main class="main-content">
      <OmikujiCard />
    </main>
    <TheFooter />
  </div>
</template>

<style>
  body {
    margin: 0;
    background-color: #fff6d1;
    color: #333;
    font-family:
      "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans",
      Meiryo, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  .app-layout {
    height: 100vh;
    box-sizing: border-box;
    padding-top: 50px;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
