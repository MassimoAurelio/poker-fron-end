<script setup lang="ts">
import { io } from "socket.io-client";
import { usePlayers } from "@/store/usePlayers";
import { useAuthStore } from "@/store/auth";
import { Flop } from "@/widgets/flop";
import { Player } from "@/widgets/player";
import { FreeSpace } from "@/widgets/freeSpace";

useSeoMeta({
  title: "POKER STAGE",
});

const socket = io("http://localhost:5000");

const playersStore = usePlayers();
const authStore = useAuthStore();
const route = useRoute();
const roomId = route.params.id;

const username = () => {
  return localStorage.getItem("username") ?? "";
};

const joinTable = (nickname: string, position: number, roomId: string) => {
  const body = {
    player: nickname,
    stack: 1000,
    position: position,
    roomId: roomId,
  };
  socket.emit("join", body);
};

let intervalId: number | unknown;

function fetchPlayers(roomId: string) {
  socket.emit("getPlayers", roomId);
}

function startFetchingPlayers(roomId: string) {
  intervalId = window.setInterval(() => fetchPlayers(roomId), 1000);
}

function stopFetchingPlayers() {
  if (typeof intervalId === "number") {
    clearInterval(intervalId);
  }
}

socket.on("clearTableCards", () => {
  playersStore.clearFlop();
});

socket.on("playersData", (receivedPlayers) => {
  playersStore.setPlayers(receivedPlayers);
});

socket.on("dealFlop", (card) => {
  if (card && card.flop && Array.isArray(card.flop.tableCards)) {
    playersStore.setFlop(card);
  } else {
    console.error("Received invalid flop data:", card);
  }
});

socket.on("dealTurn", (card) => {
  if (card && card.flop && Array.isArray(card.flop.tableCards)) {
    playersStore.setFlop(card);
  } else {
    console.error("Received invalid flop data:", card);
  }
});
socket.on("dealRiver", (card) => {
  if (card && card.flop && Array.isArray(card.flop.tableCards)) {
    playersStore.setFlop(card);
  } else {
    console.error("Received invalid flop data:", card);
  }
});

onMounted(() => {
  startFetchingPlayers(roomId.toString());
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (token && username) {
    authStore.login(token, { username: username });
  }

  const savedFlop = sessionStorage.getItem("flop");
  if (savedFlop) {
    try {
      const parsedFlop = JSON.parse(savedFlop);
      console.log("Loaded saved flop from sessionStorage:", parsedFlop);
      playersStore.setFlop(parsedFlop);
    } catch (error) {
      console.error("Error parsing savedFlop:", error);
    }
  }
});

onUnmounted(() => {
  stopFetchingPlayers();
  socket.off("playersData");
});
</script>

<template>
  <div class="main-container">
    <div class="table">
      <FreeSpace
        @click="joinTable(username(), 1, roomId.toString())"
        class="Player1"
      />
      <FreeSpace
        @click="joinTable(username(), 2, roomId.toString())"
        class="Player2"
      />
      <FreeSpace
        @click="joinTable(username(), 3, roomId.toString())"
        class="Player3"
      />
      <FreeSpace
        @click="joinTable(username(), 4, roomId.toString())"
        class="Player4"
      />
      <FreeSpace
        @click="joinTable(username(), 5, roomId.toString())"
        class="Player5"
      />
      <FreeSpace
        @click="joinTable(username(), 6, roomId.toString())"
        class="Player6"
      />
      <div class="flop">
        <Flop v-if="playersStore.players.length > 0" />
      </div>
      <div v-for="item in playersStore.players" :key="item.id">
        <Player
          :name="item.name"
          :position="item.position"
          :roomId="roomId.toString()"
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
