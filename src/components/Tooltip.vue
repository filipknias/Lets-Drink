<template>
  <div :class="['tooltip', tooltipPlacementClass]" :data-tooltip="message">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    message: {
      type: String,
      required: true,
    },
    placement: {
      type: String,
      default: "left",
    },
  },
  computed: {
    tooltipPlacementClass() {
      return `tooltip--placement-${this.$props.placement}`;
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
  .tooltip {
    position: relative;
    &:hover {
      &::after {
        content: attr(data-tooltip);
        position: absolute;
        left: 0px;
        top: 110%;
        transform: translateX(-55%);
        background-color: $tooltip-bg;
        color: $text-white;
        padding: 0.7rem;
        border-radius: 5px;
        font-size: 1rem;
        white-space: nowrap;
      }
    }
    &.tooltip--placement-left {
      &::after {
        left: 0px;
      }
    }
    &.tooltip--placement-right {
      &::after {
        left: 40px;
      }
    }
  }
</style>