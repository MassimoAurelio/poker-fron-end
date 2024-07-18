<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { defineProps, defineEmits } from "vue";

const playersStore = usePlayers();

interface Props {
  view: "line" | "window";
  type: "range" | "number";
  name?: string;
  sum?: number;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:sum"]);

const { view = "line", type = "range" } = props;

const classes = ["input", `view_${view}`, `type_${type}`];

const stack = () => {
  const stack = playersStore.players.find(
    (player) => player.name === props.name
  );
  return stack?.stack;
};

const updateSum = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits("update:sum", Number(target.value));
};
</script>

<template>
  <input
    :class="classes"
    :type="type"
    min="0"
    :max="stack()"
    :value="sum"
    @input="updateSum"
  />
</template>

<style scoped lang="scss">
.input.view_line {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  border-radius: 26px;
  background: rgb(152, 222, 227);
}
.input.view_line::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: rgb(214, 233, 253);
  border-radius: 50%;
  cursor: pointer;
}

.input.view_window {
  width: 77px;
  height: 60px;
  left: 1901px;
  cursor: pointer;
  right: -1901px;
  top: 1148px;
  bottom: -1148px;
  border-radius: 1px;
  border: none;
  color: rgb(214, 233, 253);
  backdrop-filter: blur(2px);
  background: rgba(64, 82, 94, 0.24);
}
</style>
