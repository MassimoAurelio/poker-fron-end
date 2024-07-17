<script setup lang="ts"></script>

<template>
  <div class="free-place">
    <NuxtImg src="/emptyPlace.svg" />
    <NuxtImg src="krest.svg" class="krest" sizes="10" />
  </div>
</template>

<style lang="scss">
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
</style>
