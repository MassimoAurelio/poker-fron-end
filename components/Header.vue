<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
</script>

<template>
  <header>
    <div class="main-container">
      <a href="/">ROOMS</a>
      <a href="/login">LOGIN</a>
      <a href="/registration">REGISTRATION</a>
      <a href="/login" @click="authStore.logout">LOG OUT</a>
      <a>АВТОРИЗОВАН? {{ authStore.isAuthenticated }}</a>
    </div>
  </header>
</template>

<style scoped>
.main-container {
  display: flex;
  gap: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
