<script setup>
  import { APP_CONFIG } from "@/config";

  const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <span class="footer-link">{{ APP_CONFIG.brandUrl }}</span>
      <span class="copyright">
        &copy; {{ currentYear }} {{ APP_CONFIG.brandName }}
      </span>
    </div>
  </footer>
</template>

<style scoped>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: #888;
    font-size: 0.7rem;
    z-index: 10;
  }

  .footer-content {
    display: flex;
    gap: 1rem;
  }

  .footer-link {
    font-family: monospace;
  }
</style>
