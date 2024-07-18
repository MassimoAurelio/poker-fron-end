<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { useAuthStore } from "@/store/auth";
import { sendRequestWithBody, checkResponse } from "@/shared/api/requestUtils";
import { methods } from "@/shared/api/apiMethods";
import { NotActivePlayer, PlayerFooterInfo } from "@/widgets/player";
import BaseLeaveButton from "@/shared/ui/BaseLeaveButton.vue";
import BaseCard from "@/shared/ui/BaseCard.vue";

const playersStore = usePlayers();
const authStore = useAuthStore();
const route = useRoute();
const roomId = route.params.id;

const props = defineProps<{
  name: string;
  roomId: string;
}>();

const leaveFromTable = async (
  name: string | undefined,
  roomId: string | string[]
) => {
  if (!roomId || !name) {
    console.error("roomId or name is undefined");
    return;
  }
  try {
    const body = { player: name, roomId };
    const response = await sendRequestWithBody(
      methods.leave.path,
      "POST",
      body
    );
    checkResponse(response);
  } catch (error) {
    console.error(error);
  }
};

const isActivePlayer = computed(() => {
  return authStore.user?.username === props.name;
});

const losers = computed(() => {
  return playersStore.players.filter((player) => player.loser === true);
});

watch(
  losers,
  (newLosers) => {
    newLosers.forEach((newLoser) => {
      leaveFromTable(newLoser.name, roomId);
    });
  },
  { immediate: true }
);
</script>

<template>
  <div class="active-player-container" v-if="isActivePlayer">
    <BaseCard :name="props.name" />
    <PlayerFooterInfo :name="props.name" />
    <BaseLeaveButton @click="leaveFromTable(props.name, props.roomId)" />
  </div>
  <NotActivePlayer :name="props.name" v-else />
</template>

<style scoped lang="scss">
.active-player-container {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 264px;
  height: 160px;

  .timer {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    left: -50px;
    top: 120px;
    border-radius: 80px;
  }
}

.Not-active-player-container {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 264px;
  height: 160px;

  .card-container {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 50px;
    display: flex;
    .first-card {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 64px;
      height: 88px;
      font-size: 30px;
      padding: 5%;
      border-radius: 3px;
      box-shadow: -1px 0px 2px 0px rgba(20, 28, 33, 0.56);
      background: radial-gradient(
        98% 100% at 50% 100%,
        rgb(17, 92, 146),
        rgb(44, 58, 68) 100%
      );

      .foo {
        width: 100%;
        height: 100%;
        transform: rotate(180deg);
      }
    }
    .second-card {
      position: relative;
      width: 64px;
      height: 88px;
      font-size: 30px;
      border-radius: 3px;
      box-shadow: -1px 0px 2px 0px rgba(20, 28, 33, 0.56);
      background: radial-gradient(
        98% 100% at 50% 100%,
        rgb(17, 92, 146),
        rgb(44, 58, 68) 100%
      );
    }
  }
}
</style>
