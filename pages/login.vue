<script setup lang="ts">

definePageMeta({
  layout: "auth",
});

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
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="main-container">
    <h2>Авторизация</h2>
    <form class="main-container" @submit.prevent="login(authField.username, authField.password)">
      <input type="text" placeholder="name" v-model="authField.username" />
      <input
        type="password"
        placeholder="password"
        v-model="authField.password"
      />
      <button
        type="submit"
      >
        Login
      </button>
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