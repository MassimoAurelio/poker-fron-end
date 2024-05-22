<script setup lang="ts">
import { getPlayerName, getBalance, getLastBet, isFold } from "@/utils/api";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const fold = ref(isFold(props));
const balance = ref(getBalance(props));
const lastBet = ref(getLastBet(props));
const userName = ref(getPlayerName(props));
</script>

<template>
  <div class="player-footer">
    <div class="player-avatar"><NuxtImg src="/dealer.svg" /></div>
    <div class="first-block">
      <div class="player-balance">{{ balance }}</div>
    </div>
    <div class="player-footer-info" v-if="fold">
      <div class="name">{{ userName }}</div>
      <div class="lastBet">{{ lastBet }} chips</div>
    </div>

    <div class="player-footer-infoFold" v-else>
      <div class="name">{{ userName }}</div>
      <div class="lastBet">FOLD</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.player-footer {
  width: 265px;
  height: 80px;
  background-color: #33414bcc;
  border-radius: 10px;

  .player-footer-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .player-footer-infoFold {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 1px;
    backdrop-filter: blur(16px);
    background: linear-gradient(
      90deg,
      rgb(233, 123, 136) 6.289%,
      rgba(55, 71, 82, 0) 91.893%
    );
  }
  .player-avatar {
    position: absolute;
    z-index: 1000;
    top: 0;
    margin-top: 50px;
    width: 72px;
    height: 72px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .first-block {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 264px;
    height: 48px;
    border-radius: 1px;
    backdrop-filter: blur(16px);
    background-color: #40525ecc;

    .player-balance {
      padding-right: 10px;
    }
  }
}
</style>
