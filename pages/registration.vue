<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const authField = {
  username: "",
  password: "",
};

const registration = async (username: string, password: string) => {
  try {
    const response = await fetch("http://localhost:5000/register", {
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
