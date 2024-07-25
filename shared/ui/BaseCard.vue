<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { useAuthStore } from "@/store/auth";
const playersStore = usePlayers();
const authStore = useAuthStore();

const props = defineProps<{
  name: string;
}>();

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

const getSuiteColorFirstCard = () => {
  if (getSuiteFirstCard() === "♠") {
    return { color: "rgb(152, 222, 227)" };
  } else if (getSuiteFirstCard() === "♦") {
    return { color: "rgb(234, 166, 128)" };
  } else if (getSuiteFirstCard() === "♣") {
    return { color: "rgb(122, 167, 255)" };
  } else if (getSuiteFirstCard() === "♥") {
    return { color: "rgb(233, 123, 136)" };
  }
};

const getValueSecondCard = () => {
  const cards = getPlayerCards();
  return cards[1]?.value;
};

const getSuiteSecondCard = () => {
  const cards = getPlayerCards();
  return cards[1]?.suit;
};

const getSuiteColorSecondCard = () => {
  if (getSuiteSecondCard() === "♠") {
    return { color: "rgb(152, 222, 227)" };
  } else if (getSuiteSecondCard() === "♦") {
    return { color: "rgb(234, 166, 128)" };
  } else if (getSuiteSecondCard() === "♣") {
    return { color: "rgb(122, 167, 255)" };
  } else if (getSuiteSecondCard() === "♥") {
    return { color: "rgb(233, 123, 136)" };
  }
};
const hasActivePlayers = computed(() => {
  return playersStore.players.some((player) => player.fold === false);
});
</script>

<template>
  <div class="card-container">
    <div class="first-card">
      <div class="suit" :style="getSuiteColorFirstCard()">
        {{ getSuiteFirstCard() }}
        <div class="card_number-container">
          <div class="card-number" :style="getSuiteColorFirstCard()">
            {{ getValueFirstCard() }}
          </div>
        </div>
      </div>
    </div>
    <div class="second-card">
      <div class="suit" :style="getSuiteColorSecondCard()">
        {{ getSuiteSecondCard() }}
        <div class="card_number-container">
          <div class="card-number" :style="getSuiteColorSecondCard()">
            {{ getValueSecondCard() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
</style>
