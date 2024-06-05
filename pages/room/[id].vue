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
const route = useRoute();
const roomId = route.params.id;
const username = () => {
  return localStorage.getItem("username") ?? "";
};

const joinTable = async (
  nickname: string,
  position: number,
  roomId: string
) => {
  try {
    const body = {
      player: nickname,
      stack: 1000,
      position: position,
      roomId: roomId,
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

const updatepos = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${UPDATEPOSITION}`, "POST");
    checkResponse(response);
    await mbbb();
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
    const response = await sendRequest(`${BASE_URL}${DEAL}`, "POST");
    checkResponse(response);
    const data = await response.json();
    playersStore.setCards(data);
    sessionStorage.setItem("cardsDealt", "true");
  } catch (error) {
    console.error(error);
  }
};

const giveFlop = async () => {
  try {
    const response = await sendRequest("http://localhost:5000/giveflop", "GET");
    checkResponse(response);
    const data = await response.json();
    playersStore.setFlop(data);
    sessionStorage.setItem("flop", JSON.stringify(data));
    console.log(playersStore.flop);
  } catch (error) {
    console.error(error);
  }
};

const turn = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${TURN}`, "POST");
    checkResponse(response);
    const data = await response.json();
    playersStore.setTurn(data);
    sessionStorage.setItem("turn", JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const river = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${RIVER}`, "POST");
    checkResponse(response);
    const data = await response.json();
    playersStore.setRiver(data);
    sessionStorage.setItem("river", JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const winner = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${WINNER}`, "POST");
    checkResponse(response);
  } catch (error) {
    console.error(error);
  }
};

const flop = () => {
  const activePlayers = playersStore.players.filter(
    (player) => player.fold === false && player.roundStage === "preflop"
  );

  if (activePlayers.length === 0) {
    return false;
  }

  if (activePlayers.length > 2) {
    const maxBet = activePlayers.reduce((maxSum, currentPlayer) =>
      maxSum.preFlopLastBet > currentPlayer.preFlopLastBet
        ? maxSum
        : currentPlayer
    );

    const allSameMaxBet = activePlayers.every(
      (player) => player.preFlopLastBet === maxBet.preFlopLastBet
    );
    return allSameMaxBet;
  }
};

const giveTurn = () => {
  const flopPlayers = playersStore.players.filter(
    (player) => player.fold === false && player.roundStage === "flop"
  );

  if (flopPlayers.length === 0) {
    return false;
  }

  const maxBet = flopPlayers.reduce((maxSum, currentPlayer) =>
    maxSum.flopLastBet > currentPlayer.flopLastBet ? maxSum : currentPlayer
  );

  const allSameMaxBet = flopPlayers.every(
    (player) =>
      player.flopLastBet === maxBet.flopLastBet && player.makeTurn === true
  );

  return allSameMaxBet;
};

const giveRiver = () => {
  const turnPlayers = playersStore.players.filter(
    (player) => player.fold === false && player.roundStage === "turn"
  );

  if (turnPlayers.length === 0) {
    return false;
  }

  const maxBet = turnPlayers.reduce((maxSum, currentPlayer) =>
    maxSum.turnLastBet > currentPlayer.turnLastBet ? maxSum : currentPlayer
  );

  const allSameMaxBet = turnPlayers.every(
    (player) =>
      player.turnLastBet === maxBet.turnLastBet && player.makeTurn === true
  );

  return allSameMaxBet;
};

const giveWinner = () => {
  const turnPlayers = playersStore.players.filter(
    (player) => player.fold === false && player.roundStage === "river"
  );

  if (turnPlayers.length === 0) {
    return false;
  }

  const maxBet = turnPlayers.reduce((maxSum, currentPlayer) =>
    maxSum.riverLastBet > currentPlayer.riverLastBet ? maxSum : currentPlayer
  );

  const allSameMaxBet = turnPlayers.every(
    (player) =>
      player.riverLastBet === maxBet.riverLastBet && player.makeTurn === true
  );

  return allSameMaxBet;
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
  intervalId = window.setInterval(fetchPlayers, 1000);
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
    try {
      const parsedFlop = JSON.parse(savedFlop);
      const processedFlop = (parsedFlop.flopCards || []).map(
        (card: string) => card || {}
      );

      playersStore.setFlop(processedFlop);
    } catch (error) {
      console.error("Error parsing savedFlop:", error);
    }
  }

  watch(
    () => playersStore.players.length,
    (newLength) => {
      if (newLength === 0) {
        sessionStorage.clear();
        playersStore.setFlop({ flopCards: [] });
      }
    }
  );

  watch(
    () => playersStore.players.length,
    (newLength) => {
      if (newLength === 6) giveCards();
    }
  );

  watch(
    () => flop(),
    (flop) => {
      if (flop) {
        setTimeout(() => {
          giveFlop();
        }, 500);
      }
    }
  );

  watch(
    () => giveTurn(),
    (tern1) => {
      if (tern1) {
        setTimeout(() => {
          turn();
        }, 500);
      }
    }
  );

  watch(
    () => giveRiver(),
    (giveRiver) => {
      if (giveRiver) {
        setTimeout(() => {
          river();
        }, 500);
      }
    }
  );
  watch(
    () => giveWinner(),
    (winner1) => {
      if (winner1) {
        setTimeout(() => {
          winner();
        }, 500);
      }
    }
  );
});
onUnmounted(stopFetchingPlayers);
</script>

<template>
  <div class="main-container">
    <div class="table">
      <UiPlayerFreeSpace
        @click="joinTable(username(), 1, roomId.toString())"
        class="Player1"
      />
      <UiPlayerFreeSpace
        @click="joinTable(username(), 2, roomId.toString())"
        class="Player2"
      />
      <UiPlayerFreeSpace
        @click="joinTable(username(), 3, roomId.toString())"
        class="Player3"
      />
      <UiPlayerFreeSpace
        @click="joinTable(username(), 4, roomId.toString())"
        class="Player4"
      />
      <UiPlayerFreeSpace
        @click="joinTable(username(), 5, roomId.toString())"
        class="Player5"
      />
      <UiPlayerFreeSpace
        @click="joinTable(username(), 6, roomId.toString())"
        class="Player6"
      />
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
