<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { useAuthStore } from "@/store/auth";
import {
  BASE_URL,
  LEAVE,
  checkResponse,
  sendRequestWithBody,
  pos,
} from "@/utils/api";

const playersStore = usePlayers();
const authStore = useAuthStore();

const props = defineProps<{
  name: string;
  roomId: string;
}>();

const leaveFromTable = async (name: string, roomId: string) => {
  if (!roomId || !name) {
    console.error("roomId or name is undefined");
    return;
  }
  try {
    const body = { player: name, roomId };
    const response = await sendRequestWithBody(
      `${BASE_URL}${LEAVE}`,
      "POST",
      body
    );
    checkResponse(response);
  } catch (error) {
    console.error(error);
  }
};

const getPlayerCards = () => {
  const player = playersStore.players.find(
    (player) => player.name === props.name
  );
  if (player && player.name === authStore.user?.username) {
    return player.cards;
  }
  return [];
};

const getValueFirstCard = () => {
  const cards = getPlayerCards();
  return cards[0]?.value;
};

const getSuiteFirstCard = () => {
  const cards = getPlayerCards();
  return cards[0]?.suit;
};

const getValueSecondCard = () => {
  const cards = getPlayerCards();
  return cards[1]?.value;
};

const getSuiteSecondCard = () => {
  const cards = getPlayerCards();
  return cards[1]?.suit;
};

const pos6 = ref(pos(props));
</script>

<template>
  <div class="active-player-container">
    <div class="card-container">
      <div class="first-card">
        <div class="suit">
          {{ getSuiteFirstCard() }}
          <div class="card_number-container">
            <div class="card-number">{{ getValueFirstCard() }}</div>
          </div>
        </div>
      </div>
      <div class="second-card">
        {{ getSuiteSecondCard() }}
        <div class="card_number-container">
          <div class="card-number">{{ getValueSecondCard() }}</div>
        </div>
      </div>
    </div>
    <UiPlayerFooterInfo :name="props.name" />
    <NuxtImg src="/del.svg" sizes="40" v-if="pos6" />
    <div class="leave">
      <NuxtImg
        src="/leave.svg"
        class="table-position"
        sizes="40"
        name="pepicons-pop:leave"
        @click="leaveFromTable(props.name, props.roomId)"
      />
    </div>
  </div>
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

  .card-container {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 50px;
    display: flex;
    .first-card {
      position: relative;
      width: 64px;
      height: 88px;
      font-size: 30px;
      border-radius: 3px;
      box-shadow: -1px 0px 2px 0px rgba(20, 28, 33, 0.56);
      background: radial-gradient(
        98% 100% at 50% 100%,
        rgb(69, 84, 95),
        rgb(44, 58, 68) 100%
      );

      .card_number-container {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        top: 40px;
        .card-number {
          width: 31px;
          height: 36px;
          color: rgb(122, 167, 255);
          font-family: Dela Gothic One;
          font-size: 36px;
          font-weight: 400;
          line-height: 100%;
          letter-spacing: -2%;
          text-align: center;
        }
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
        rgb(69, 84, 95),
        rgb(44, 58, 68) 100%
      );
      .card_number-container {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        top: 40px;
        .card-number {
          width: 31px;
          height: 36px;
          color: rgb(122, 167, 255);
          font-family: Dela Gothic One;
          font-size: 36px;
          font-weight: 400;
          line-height: 100%;
          letter-spacing: -2%;
          text-align: center;
        }
      }
    }
  }
}
</style>
