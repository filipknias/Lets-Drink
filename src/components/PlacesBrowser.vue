<template>
  <div :class="['browserContainer', { 'browserContainer--hidden': browserHidden }]"> 
    <div class="browserContainer__handle" @click="browserHidden=!browserHidden">
      <font-awesome-icon :icon="browserHidden ? 'angle-double-right' : 'angle-double-left'" />
    </div>
    <div class="browserContainer__navbar">
      <div v-if="!isMobileSearchOpen" class="browserContainer__navbar__logoContainer">
        <img src="../assets/brandLogo.png" class="browserContainer__navbar__logoContainer__logo" />
        <h3 class="browserContainer__navbar__logoContainer__brand">Let's Drink</h3>
      </div>
      <div class="browserContainer__navbar__customSearch">
        <CustomSearchInput />
      </div>
    </div>
    <div class="browserContainer__content" @scroll="handleBrowserScroll">
      <PlacesList 
        label="Places" 
        :places="places" 
        v-on:query-params-changed="(queryParams) => $emit('query-params-changed', queryParams)"
      />
    </div>
  </div>
</template>

<script>
import CustomSearchInput from "./CustomSearchInput.vue";
import PlacesList from "./PlacesList.vue";

export default {
  name: 'PlacesBrowser',
  props: {
    places: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      browserHidden: false,
    }
  },
  methods: {
    handleBrowserScroll({ target }) {
      // Check if scrolled to bottom of the list
      if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
        this.$emit("next-page");
      }
    },
  },
  components: { CustomSearchInput, PlacesList }, 
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/resets";
.browserContainer {
  background-color: $browser-bg-color;
  color: $text-black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 50%;
  height: 100%;
  box-shadow: $browser-container-box-shadow;
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  &.browserContainer--hidden {
    transform: translateX(-100%);
    .browserContainer__handle {
      right: 0;
    }
  }
  @media (max-width: $breakpoint-md) {
    width: 100%;
  }
  .browserContainer__handle {
    width: $browser-handle-scale;
    height: $browser-handle-scale;
    position: absolute;
    top: 50%;
    right: $browser-handle-right;
    transform: $browser-handle-translate;
    background-color: $browser-handle-bg;
    box-shadow: $browser-handle-box-shadow;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    &:hover {
      background-color: $browser-handle-bg-hover;
    }
    @media (max-width: $breakpoint-md) {
      right: $browser-handle-scale;
    }
  }
  .browserContainer__navbar {
    padding: 1rem;
    border-bottom: 1px solid $gray;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    @media (max-width: $breakpoint-sm) {
      gap: 0.5rem;
    }
    .browserContainer__navbar__logoContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      .browserContainer__navbar__logoContainer__logo {
        width: 50px;
        height: 50px;
        margin-right: 0.7rem;
        @media (max-width: $breakpoint-xl) {
          width: 40px;
          height: 40px;
        }
      }
      .browserContainer__navbar__logoContainer__brand {
        font-size: 1.7rem;
        white-space: nowrap;
        @media (max-width: $breakpoint-xl) {
          font-size: 1.4rem;
        }
        @media (max-width: $breakpoint-sm) {
          display: none;
        }
      }
    }
    .browserContainer__navbar__customSearch {
      flex: 1;
    }
  }
  .browserContainer__content {
    padding: 1rem $browser-handle-scale 1rem 1.5rem;
    flex: 1;
    overflow-y: scroll;
    @include resetScrollbar;
    @media (max-width: $breakpoint-md) {
      padding: 1.5rem 1rem;
    }
  }
}
</style>