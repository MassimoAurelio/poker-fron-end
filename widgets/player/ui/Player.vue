<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { useAuthStore } from "@/store/auth";

const playersStore = usePlayers();
const authStore = useAuthStore();

const props = defineProps<{
  name: string;
  position: number;
  roomId: string;
}>();

const playerExists = () => {
  return playersStore.players.some(
    (player) => player.name === props.name && player.position === props.position
  );
};

const playerAndCurrentPlayerId = () => {
  const player = playersStore.players.find(
    (player) => player.name === props.name && player.currentPlayerId === true
  );
  return player && player.name === authStore.user?.username;
};
</script>

<template>
  <div class="player">
    <UiPlayerActivePlayer
      :name="props.name"
      :roomId="props.roomId"
      v-if="playerExists()"
    />

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
