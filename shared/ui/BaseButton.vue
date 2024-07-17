<script setup lang="ts">
interface Props {
  color?: "default" | "fold" | "check" | "bet";
  radius?: "S" | "M";
  size?: "S" | "M" | "L";
  disabled?: boolean;
}

const props = defineProps<Props>();
const slots = useSlots();

const { color = "default", radius = "M", size = "S", disabled = false } = props;

const classes = [
  "button",
  `size_${size}`,
  `color_${color}`,
  `radius_${radius}`,
];
</script>

<template>
  <button :class="classes" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button.size_S {
  width: 61px;
  height: 32px;
}
.button.size_M {
  width: 104px;
  height: 64px;
}

.button.color_default {
  backdrop-filter: blur(2px);
  background: rgba(64, 82, 94, 0.24);
}
.button.color_fold {
  background: rgb(233, 123, 136);
  color: rgb(4, 7, 6);
}

.button.color_check {
  background: rgb(64, 82, 94);
  color: rgb(152, 222, 227);
}
.button.color_bet {
  background: rgb(152, 222, 227);
  color: rgb(4, 7, 6);
}

.button.radius_S {
  border-radius: 24px;
  border: none;
}
.button.radius_M {
  border-radius: 16px;
  border: none;
}
</style>
