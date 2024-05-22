<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import {
  BASE_URL,
  PLAYERS,
  LEAVE,
  sendRequest,
  checkResponse,
  sendRequestWithBody,
  pos,
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

const leaveFromTable = async (position: number) => {
  try {
    const body = {
      position: position,
    };
    const response = sendRequestWithBody(`${BASE_URL}${LEAVE}`, "POST", body);
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

const leaveAndGetInfo = async (positon: number) => {
  try {
    await leaveFromTable(positon);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const getValueFirstCard = () => {
  const firstCard = playersStore.players.find(
    (player) => player.name === props.name
  );
  return firstCard?.cards[0]?.value;
};

const getSuiteFirstCard = () => {
  const firstCard = playersStore.players.find(
    (player) => player.name === props.name
  );
  return firstCard?.cards[0]?.suit;
};

const getValueSecondCard = () => {
  const firstCard = playersStore.players.find(
    (player) => player.name === props.name
  );
  return firstCard?.cards[1]?.value;
};

const getSuiteSecondCard = () => {
  const firstCard = playersStore.players.find(
    (player) => player.name === props.name
  );
  return firstCard?.cards[1]?.suit;
};

const pos6 = ref(pos(props));
</script>

<template>
  <div class="active-player-container">
    <div class="card-container">
      <div class="first-card">
        <div class="suit">
          {{ getSuiteSecondCard() }}
          <div class="card_number-container">
            <div class="card-number">{{ getValueSecondCard() }}</div>
          </div>
        </div>
      </div>
      <div class="second-card">
        {{ getSuiteFirstCard() }}
        <div class="card_number-container">
          <div class="card-number">{{ getValueFirstCard() }}</div>
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
        @click="leaveAndGetInfo(props.position)"
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
