<script setup lang="ts">
import { PlayerFooterInfo } from "@/widgets/player";
const props = defineProps<{
  name: string;
}>();
</script>

<template>
  <div class="Not-active-player-container">
    <div class="card-container">
      <div class="first-card">
        <div class="foo" />
      </div>
      <div class="second-card" />
    </div>
    <PlayerFooterInfo :name="props.name" />
  </div>
</template>

<style lang="scss">
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
