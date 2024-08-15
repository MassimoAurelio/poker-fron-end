<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();

const router = useRouter();

useSeoMeta({
  title: "REGISTRATION PAGE",
});

interface AuthField {
  username: string;
  password: string;
}

const authField: AuthField = {
  username: "",
  password: "",
};

const registration = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    const response = await fetch("http://localhost:5001/api/auth/register", {
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
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (token && username) {
    authStore.login(token, { username: username });
  }
});
</script>

<template>
  <div
    class="main-container"
    @submit.prevent="registration(authField.username, authField.password)"
  >
    <h2>Регистрация</h2>
    <form class="main-container">
      <input type="text" placeholder="name" v-model="authField.username" />
      <input
        type="password"
        placeholder="password"
        v-model="authField.password"
      />
      <button type="submit">Registration</button>
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
