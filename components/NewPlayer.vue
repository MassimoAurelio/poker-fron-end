<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import {
  BASE_URL,
  UPDATEPOSITION,
  JOIN,
  PLAYERS,
  MBBB,
  DEAL,
  GIVEFLOP,
  TERN,
  sendRequest,
  checkResponse,
  sendRequestWithBody,
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
    const body = {
      player: props.name,
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

const playerExists = () => {
  return playersStore.players.some((player) => player.name === props.name);
};
const playerNotExists = () => {
  return !playersStore.players.some((player) => player.name === props.name);
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
      v-if="playerExists()"
    />

    <FreeSpace
      :name="props.name"
      :position="props.position"
      @click="joinAndGetInfo(position)"
      v-if="playerNotExists()"
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
