<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import Button from "@/shared/ui/BaseButton.vue";
import Input from "@/shared/ui/BaseInput.vue";
import {
  BASE_URL,
  NEXT_PLAYER,
  COLL,
  FOLD,
  RAISE,
  CHECK,
  sendRequest,
  sendRequestWithBody,
  checkResponse,
} from "@/utils/api";

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

const sum = ref<number>(50);
const playersStore = usePlayers();

const fold = async (name: string) => {
  try {
    const body = {
      name: name,
    };
    const response = await sendRequestWithBody(
      `${BASE_URL}${FOLD}`,
      "POST",
      body
    );
    checkResponse(response);

    await userTern();
  } catch (error) {
    console.error(error);
  }
};

const raise = async (name: string) => {
  try {
    const body = {
      name: name,
      raiseAmount: sum.value,
    };
    const response = await sendRequestWithBody(
      `${BASE_URL}${RAISE}`,
      "POST",
      body
    );
    checkResponse(response);

    await userTern();
  } catch (error) {
    console.error(error);
  }
};
const coll = async (name: string) => {
  try {
    const body = {
      name: name,
    };
    const response = await sendRequestWithBody(
      `${BASE_URL}${COLL}`,
      "POST",
      body
    );
    checkResponse(response);

    await userTern();
  } catch (error) {
    console.log(error);
  }
};

const userTern = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${NEXT_PLAYER}`, "POST");
    checkResponse(response);
  } catch (error) {
    console.error(error);
  }
};

const check = async (name: string) => {
  try {
    const body = {
      name: name,
    };
    const response = await sendRequestWithBody(
      `${BASE_URL}${CHECK}`,
      "POST",
      body
    );
    checkResponse(response);

    await userTern();
  } catch (error) {
    console.error(error);
  }
};

const stack = () => {
  const player = playersStore.players.find(
    (player) => player.name === props.name
  );
  if (player) {
    return () => player.stack ?? 0;
  } else {
    return () => 0;
  }
};

/* const time = ref(30);
let timer: NodeJS.Timeout | null = null;

const tick = () => {
  time.value--;
  if (time.value === 0) {
    fold(props.name);

    time.value = 30;
  }
};

onMounted(() => {
  timer = setInterval(tick, 1000);
});

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
}); */
</script>

<template>
  <div class="main-container">
    <div class="second-buttons">
      <div class="up_buttons">
        <div class="buttons_">
          <Button color="default" size="S" radius="M" icon="/emptyPlace.svg"
            >MIN</Button
          >
          <Button color="default" size="S" radius="M">3/4</Button>
          <Button color="default" size="S" radius="M">POT</Button>
          <Button color="default" size="S" radius="M">MAX</Button>
        </div>
        <Input
          view="line"
          type="range"
          :name="props.name"
          :max="stack()"
          v-model="sum"
        />
      </div>
      <Input view="window" type="number" :name="props.name" />
    </div>
    <div class="main-buttons">
      <Button @click="fold(props.name)" color="fold" size="M" radius="M"
        >FOLD</Button
      >
      <Button @click="check(props.name)" color="check" size="M" radius="M"
        >CHECK</Button
      >
      <Button @click="coll(props.name)" color="check" size="M" radius="M"
        >CALL</Button
      >
      <Button @click="raise(props.name)" color="bet" size="M" radius="M"
        >BET</Button
      >
    </div>
    <div class="timer">
      <!-- <p class="text">Time: {{ time }}</p> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-end;
  width: 440px;
  height: 148px;
  left: 100px;
  top: 234px;
  bottom: 279px;

  .second-buttons {
    display: flex;
    gap: 10px;

    .up_buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .buttons_ {
        display: flex;
      }
    }
  }
  .main-buttons {
    display: flex;
    gap: 8px;
  }
}
</style>
