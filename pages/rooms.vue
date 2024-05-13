<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const router = useRouter();
const authField = {
  name: "",
  password: "",
};

const createRoom = async (name: string, password: string) => {
  try {
    const response = await fetch("http://localhost:5000/createroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const data = await response.json();
    await router.push(`/room/${data.roomId}`);
  } catch (error) {
    console.error(error);
  }
};

const enterRoom = async (name: string, password: string) => {
  try {
    const response = await fetch("http://localhost:5000/enterroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const data = await response.json();
    await router.push(`/room/${data.roomId}`);
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
    <div class="create-room">
      <h1>Create Room</h1>
      <form @submit.prevent="createRoom(authField.name, authField.password)">
        <input type="text" placeholder="Room name" v-model="authField.name" />
        <input
          type="password"
          placeholder="Room password"
          v-model="authField.password"
        />
        <button type="submit">Create</button>
      </form>
    </div>

    <div class="enter-room">
      <h1>Enter Room</h1>
      <form @submit.prevent="enterRoom(authField.name, authField.password)">
        <input type="text" placeholder="Room name" v-model="authField.name" />
        <input
          type="password"
          placeholder="Room password"
          v-model="authField.password"
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  .create-room,
  .enter-room {
    width: 300px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
