<script setup lang="ts">
import BaseJoinTableButton from "~/shared/ui/BaseJoinTableButton.vue";
</script>

<template>
  <div class="free-player-container">
    <div class="player-footer">
      <BaseJoinTableButton />
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
