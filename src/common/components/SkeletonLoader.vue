<script setup lang="ts">
withDefaults(
  defineProps<{
    height?: string;
    width?: string;
    borderRadius?: string;
		className?: string;
  }>(),
  {
    height: "2rem",
    width: "100%",
    borderRadius: "5px",
		className: "any",
  }
);
</script>
<template>
  <div class="placeholder" :class="className" style="background-color: darkgrey">&nbsp;</div>
</template>

<style scoped lang="scss">
.placeholder {
  display: inline-block;
  height: v-bind(height);
  width: v-bind(width);
  border-radius: v-bind(borderRadius);
  position: relative;
  overflow: hidden;
  background-color: #DDDBDD;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
