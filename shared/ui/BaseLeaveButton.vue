<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { useAuthStore } from "@/store/auth";
import { sendRequestWithBody, checkResponse } from "@/shared/api/requestUtils";
import { methods } from "@/shared/api/apiMethods";

const playersStore = usePlayers();
const authStore = useAuthStore();
const route = useRoute();
const roomId = route.params.id;
</script>

<template>
  <div class="leave">
    <NuxtImg
      src="/leave.svg"
      class="table-position"
      sizes="40"
      name="pepicons-pop:leave"
    />
  </div>
</template>

<style scoped lang="scss"></style>
