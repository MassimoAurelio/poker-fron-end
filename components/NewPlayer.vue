<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { BASE_URL, JOIN, PLAYERS } from "@/utils/api";

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
const playerAndCurrentPlayerId = () => {
  return playersStore.players.some(
    (player) => player.name === props.name && player.currentPlayerId === true
  );
};
</script>

<template>
  <div class="player">
    <ActivePlayer
      :name="props.name"
      :position="props.position"
      @click="joinAndGetInfo(props.position)"
      v-if="playersStore.players.some((player) => player.name === props.name)"
    />

    <FreeSpace
      :name="props.name"
      :position="props.position"
      @click="joinAndGetInfo(props.position)"
      v-if="!playersStore.players.some((player) => player.name === props.name)"
    ></FreeSpace>
    <div class="panel" v-if="playerAndCurrentPlayerId()">
      <UiPlayerPanel :name="props.name" :position="props.position" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.player {
  .panel {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-bottom: 150px;
    margin-right: 300px;
  }
}
</style>
