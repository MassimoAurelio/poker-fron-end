<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import {
  BASE_URL,
  NEXT_PLAYER,
  COLL,
  JOIN,
  LEAVE,
  PLAYERS,
  FOLD,
  RAISE,
} from "@/utils/api";

const playersStore = usePlayers();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
});

const joinTable = async (position: number) => {
  try {
    const response = await fetch(`${BASE_URL}${JOIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: props.name,
        stack: 1000,
        position: position,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при отправке данных");
    }
  } catch (error) {
    console.error(error);
  }
};

const leaveFromTable = async (position: number) => {
  try {
    const response = await fetch(`${BASE_URL}${LEAVE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        position: position,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
  } catch (error) {
    console.error(error);
  }
};

const getInfo = async () => {
  try {
    const response = await fetch(`${BASE_URL}${PLAYERS}`);
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const data = await response.json();
    playersStore.setPlayers(data);
  } catch (error) {
    console.error(error);
  }
};

const joinAndGetInfo = async (position: number) => {
  try {
    await joinTable(position);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const leaveAndGetInfo = async (positon: number) => {
  try {
    await leaveFromTable(positon);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};





const userTern = async () => {
  try {
    const response = await fetch(`${BASE_URL}${NEXT_PLAYER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    playersStore.showInput = false;
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};


function createIconComputed(position: number) {
  return computed(() => {
    return playersStore.players.some((player) => player.position === position)
      ? "fluent-emoji-flat:wheelchair-symbol"
      : "flat-color-icons:plus";
  });
}

const getLastBet = () => {
  const player = playersStore.players.find(
    (player) => player.name === props.name
  );
  return player?.lastBet || 0;
};

const playerExists = () => {
  return playersStore.players.some((player) => player.name === props.name);
};

const playerAndCurrentPlayerId = () => {
  return playersStore.players.some(
    (player) => player.name === props.name && player.currentPlayerId === true
  );
};
</script>

<template>
  <div class="player">
    <Icon
      class="table-position"
      size="50"
      :name="createIconComputed(props.position).value"
      @click="joinAndGetInfo(props.position)"
    />
    <Icon
      class="table-position"
      size="50"
      name="pepicons-pop:leave"
      @click="leaveAndGetInfo(props.position)"
      v-if="playerExists()"
    />
    <div>
      {{ getLastBet() }}
    </div>
    <div v-if="playerAndCurrentPlayerId()">
      <!-- <div class="buttons">
        <button @click="fold(props.name)">Fold</button>
        <div class="input">
          <button @click="playersStore.toggleInput">Raise</button>
          <input
            v-if="playersStore.showInput"
            v-model="sum"
            type="text"
            size="1"
          />

          <button v-if="playersStore.showInput" @click="raise(props.name)">
            Raise
          </button>
        </div>
        <button @click="coll(props.name)">Coll</button>

        <button @click="check(props.name)">Check</button>
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.buttons {
  position: absolute;
  width: 200px;
  height: 100px;
  left: 538px;
  right: 0px;
  top: 400px;
  bottom: 279px;
}
</style>
