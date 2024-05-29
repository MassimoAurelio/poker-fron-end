<script setup lang="ts">
import { io } from "socket.io-client";
import { usePlayers } from "@/store/usePlayers";
import { useAuthStore } from "@/store/auth";

useSeoMeta({
  title: "POKER STAGE",
});

const socket = io("http://localhost:5000");
const playersStore = usePlayers();
const authStore = useAuthStore();

const username = () => {
  return localStorage.getItem("username") ?? "";
};

const joinTable = async (nickname: string, position: number) => {
  try {
    const body = {
      player: nickname,
      stack: 1000,
      position: position,
    };
    const response = await sendRequestWithBody(
      `${BASE_URL}${JOIN}`,
      "POST",
      body
    );
    checkResponse(response);
  } catch (error) {
    console.error(error);
  }
};

let intervalId: unknown;

async function fetchPlayers() {
  try {
    socket.emit("getPlayers");
    socket.on("playersData", (receivedPlayers) => {
      playersStore.setPlayers(receivedPlayers);
    });
  } catch (error) {
    console.error("Error sending request:", error);
  }
}

function startFetchingPlayers() {
  intervalId = window.setInterval(fetchPlayers, 2000);
}

function stopFetchingPlayers() {
  if (typeof intervalId === "number") {
    clearInterval(intervalId);
  }
}

onMounted(() => {
  startFetchingPlayers();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (token && username) {
    authStore.login(token, { username: username });
  }

  const savedFlop = sessionStorage.getItem("flop");
  if (savedFlop) {
    playersStore.setFlop(JSON.parse(savedFlop));
  }
});
onUnmounted(stopFetchingPlayers);
</script>

<template>
  <div class="main-container">
    <div class="table">
      <UiPlayerFreeSpace @click="joinTable(username(), 1)" class="Player1" />
      <UiPlayerFreeSpace @click="joinTable(username(), 2)" class="Player2" />
      <UiPlayerFreeSpace @click="joinTable(username(), 3)" class="Player3" />
      <UiPlayerFreeSpace @click="joinTable(username(), 4)" class="Player4" />
      <UiPlayerFreeSpace @click="joinTable(username(), 5)" class="Player5" />
      <UiPlayerFreeSpace @click="joinTable(username(), 6)" class="Player6" />
      <div v-for="item in playersStore.players" :key="item.id">
        <NewPlayer
          :name="item.name"
          :position="item.position"
          :class="`Player${item.position}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-container {
  min-height: 200px;
  height: auto;
  .table-info {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.main-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1500px;
  height: 1200px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 33px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: url(),
    radial-gradient(76% 100% at 50% 0%, rgb(54, 68, 78), rgb(16, 25, 30) 100%);
}

.table {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 1108px;
  height: 500px;
  background: radial-gradient(
      55% 100% at 50% 0%,
      rgba(47, 60, 69, 0),
      rgba(7, 12, 15, 0.48) 100%
    ),
    rgba(52, 66, 77, 0.56);
  opacity: 0.88;
  border: solid black;
  border-width: 15px;
  border-radius: 300px;
  gap: 40px;
}
.Player1 {
  position: absolute;
  width: 264px;
  height: 144px;
  left: -100px;
  top: -100px;
}

.Player2 {
  position: absolute;
  width: 264px;
  height: 144px;
  left: 400px;
  top: -170px;
}

.Player3 {
  position: absolute;
  width: 264px;
  height: 144px;
  left: 900px;
  top: -100px;
  right: 336px;
}

.Player4 {
  position: absolute;
  width: 264px;
  height: 144px;
  left: 900px;
  top: 350px;
}

.Player5 {
  position: absolute;
  width: 264px;
  height: 144px;
  left: 400px;
  top: 400px;
}

.Player6 {
  position: absolute;
  width: 264px;
  height: 144px;
  left: -100px;
  top: 350px;
}
</style>
