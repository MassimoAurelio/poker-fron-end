<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

useSeoMeta({
  title: "LOGIN PAGE",
});

const authStore = useAuthStore();
const router = useRouter();

interface AuthField {
  username: string;
  password: string;
}

const authField: AuthField = {
  username: "",
  password: "",
};

interface LoginResponse {
  token: string;
  user: {
    username: string;
  };
}

const login = async (username: string, password: string) => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const data: LoginResponse = await response.json();
    console.log("Server response:", data);
    if (data.token) {
      authStore.login(data.token, { username: data.user.username });
      router.push("/");
    } else {
      throw new Error("Аутентификация не удалась");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="main-container">
    <h2>Авторизация</h2>
    <form
      class="main-container"
      @submit.prevent="login(authField.username, authField.password)"
    >
      <input type="text" placeholder="name" v-model="authField.username" />
      <input
        type="password"
        placeholder="password"
        v-model="authField.password"
      />
      <button type="submit">Login</button>
      <p>{{ authStore.isAuthenticated }}</p>
    </form>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
