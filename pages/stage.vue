<script setup lang="ts">
import { usePlayers } from "~/store/usePlayers";
import { useAuthStore } from "@/store/auth";
import { io } from "socket.io-client";
import {
  BASE_URL,
  UPDATEPOSITION,
  PLAYERS,
  MBBB,
  DEAL,
  GIVEFLOP,
  TERN,
  RIVER,
  sendRequest,
  checkResponse,
} from "@/utils/api";
import NewPlayer from "~/components/NewPlayer.vue";

const playersStore = usePlayers();
const authStore = useAuthStore();

useSeoMeta({
  title: "POKER STAGE",
});

const getInfo = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${PLAYERS}`, "GET");
    checkResponse(response);
    const data = await response.json();
    playersStore.setPlayers(data);
  } catch (error) {
    console.error(error);
  }
};

const updatepos = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${UPDATEPOSITION}`, "POST");
    checkResponse(response);
    await mbbb();
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const mbbb = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${MBBB}`, "POST");
    checkResponse(response);
  } catch (error) {
    console.error(error);
  }
};

const giveCards = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${DEAL}`, "GET");
    checkResponse(response);
    const data = await response.json();
    playersStore.setCards(data);
    sessionStorage.setItem("cardsDealt", "true");
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const giveFlop = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${GIVEFLOP}`, "GET");
    checkResponse(response);
    const data = await response.json();
    playersStore.setFlop(data);
    sessionStorage.setItem("flop", JSON.stringify(data));

    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const tern = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${TERN}`, "POST");
    checkResponse(response);
    const data = await response.json();
    playersStore.setFlop(data);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const river = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${RIVER}`, "POST");
    checkResponse(response);
    const data = await response.json();
    playersStore.setFlop(data);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const endPreflop = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}endpreflop`, "POST");
    checkResponse(response);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const endflop = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}endflop`, "POST");
    checkResponse(response);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const endtern = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}endtern`, "POST");
    checkResponse(response);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const endriver = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}endriver`, "POST");
    checkResponse(response);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const userName = computed(() =>
  typeof window !== "undefined" ? localStorage.getItem("username") ?? "" : ""
);

onMounted(() => {
  getInfo();
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
</script>

<template>
  <button @click="updatepos">UPDATE POS</button>
  <button @click="endPreflop">End preFlop</button>
  <button @click="endflop">End Flop</button>
  <button @click="endtern">End Tern</button>
  <button @click="endriver">End River</button>
  <button @click="giveCards">Give Card</button>
  <button @click="giveFlop">Give Flop</button>
  <button @click="tern">Tern</button>
  <button @click="river">River</button>

  <div class="main-container">
    <div class="table">
      <NewPlayer name="Player 1" :position="1" class="Player1" />
      <NewPlayer name="Player 2" :position="2" class="Player2" />
      <NewPlayer name="Player 3" :position="3" class="Player3" />
      <NewPlayer name="Player 4" :position="4" class="Player4" />
      <NewPlayer name="Player 5" :position="5" class="Player5" />
      <NewPlayer name="Player 6" :position="6" class="Player6" />
      <div class="flop">
        <UiFlop v-if="playersStore.players.length > 0" />
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
