<template>
  <header class="header">
    <h1 class="site-title">おみくじ</h1>
  </header>
</template>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    z-index: 10;
  }

  .site-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: normal;
    letter-spacing: 0.2em;
    color: #333;
    font-family: "Yu Mincho", "YuMincho", "Hiragino Mincho ProN", serif;
  }
</style>
