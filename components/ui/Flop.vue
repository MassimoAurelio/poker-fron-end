<script setup lang="ts">
import { usePlayers } from "~/store/usePlayers";
const playersStore = usePlayers();
</script>

<template>
  <div class="total-pot">TOTAL POT: 5000</div>
  <div class="flop-container">
    <div class="flop-card">
      <div class="flop-suite">♠</div>
      <div class="flop-value">A</div>
    </div>
    <div class="flop-card">
      <div class="flop-suite">♠</div>
      <div class="flop-value">K</div>
    </div>
    <div class="flop-card">
      <div class="flop-suite">♠</div>
      <div class="flop-value">Q</div>
    </div>
    <div class="flop-card">
      <div class="flop-suite">♠</div>
      <div class="flop-value">J</div>
    </div>
    <div class="flop-card">
      <div class="flop-suite">♠</div>
      <div class="flop-value">10</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flop-container {
  display: flex;
  gap: 10px;
  width: auto;
  height: 168px;

  .flop-card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 80px;
    height: 120px;
    border-radius: 3px;
    background: radial-gradient(
      98% 100% at 50% 100%,
      rgb(69, 84, 95),
      rgb(44, 58, 68) 100%
    );

    .flop-suite {
      position: absolute;
      width: 24px;
      height: 24px;
      top: 0;
      font-size: 30px;
      color: #e97b88;
    }
    .flop-value {
      position: absolute;
      width: 47px;
      height: 48px;
      font-size: 48px;
      font-weight: 400;
      top: 55px;
      right: 0px;
      color: #e97b88;
    }
  }
}
</style>
