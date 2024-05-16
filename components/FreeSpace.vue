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
</script>

<template>
  <div class="free-player-container">
    <div class="player-footer">
      <div class="free-place" @click="joinTable(props.position)">
        <NuxtImg src="/emptyPlace.svg" />
        <NuxtImg src="krest.svg" class="krest" sizes="10" />
      </div>
      <div class="first-block">
        <div>Cheps -</div>
      </div>
      Name -
    </div>
  </div>
</template>

<style scoped lang="scss">
.free-player-container {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 264px;
  height: 109px;

  .player-footer {
    width: 264px;
    height: 80px;

    .free-place {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      width: 72px;
      height: 72px;
      display: flex;
      justify-content: flex-end;
      .krest {
        position: absolute;
        width: 18px;
        height: 18px;
        margin-right: 28px;
        margin-top: 25px;
        z-index: 2;
      }
    }
    .first-block {
      display: flex;
      align-items: center;
      width: 264px;
      height: 48px;
      padding-left: 10px;
      border-radius: 1px;
      backdrop-filter: blur(16px);
      background: #40525e33;
    }
  }
}
</style>
