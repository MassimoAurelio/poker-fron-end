<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { BASE_URL, NEXT_PLAYER, JOIN, LEAVE, PLAYERS } from "@/utils/api";

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
  <div>
    <ActivePlayer
      :name="props.name"
      :position="1"
      @click="joinAndGetInfo(1)"
      v-if="playersStore.players.some((player) => player.name === props.name)"
    />

    <FreeSpace
      :name="props.name"
      :position="1"
      @click="joinAndGetInfo(1)"
      v-if="!playersStore.players.some((player) => player.name === props.name)"
    ></FreeSpace>
  </div>
</template>

<style scoped lang="scss"></style>
