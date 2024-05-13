<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const router = useRouter();

const authField = {
  username: "",
  password: "",
};

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
    const data = await response.json();
    if (data.token) {
      authStore.login(data.token);
      localStorage.setItem("token", data.token);
      router.push("/rooms");
    } else {
      throw new Error("Аутентификация не удалась");
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    authStore.login(token);
  }
});
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
