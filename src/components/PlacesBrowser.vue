<template>
  <div class="browserContainer">
    <div class="browserContainer__navbar">
      <div v-if="!isMobileSearchOpen" class="browserContainer__navbar__logoContainer">
        <img src="../assets/brandLogo.png" class="browserContainer__navbar__logoContainer__logo" />
        <h3 class="browserContainer__navbar__logoContainer__brand">Let's Drink</h3>
      </div>
      <div v-if="isMobileSearchOpen" class="browserContainer__navbar__mobileSearchContainer">
        <font-awesome-icon 
          class="browserContainer__navbar__mobileSearchContainer__icon" 
          icon="arrow-left" 
          title="Go Back"
          @click="this.isMobileSearchOpen=false"
        />
        <div class="browserContainer__navbar__mobileSearchContainer__customSearch">
          <CustomSearchInput />  
        </div>
      </div>
      <div class="browserContainer__navbar__customSearch">
        <CustomSearchInput />
      </div>
      <div v-if="!isMobileSearchOpen" class="browserContainer__navbar__linksContainer">
        <font-awesome-icon 
          class="browserContainer__navbar__linksContainer__link browserContainer__navbar__linksContainer__link--mobileLink" 
          icon="search" 
          title="Search"
          @click="this.isMobileSearchOpen=true"
        />
        <font-awesome-icon 
          class="browserContainer__navbar__linksContainer__link" 
          icon="history" 
          title="History"
        />
        <font-awesome-icon 
          class="browserContainer__navbar__linksContainer__link" 
          icon="star" 
          title="Favourites"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomSearchInput from "./CustomSearchInput.vue";
export default {
  name: 'PlacesBrowser',
  data() {
    return {
      isMobileSearchOpen: false,
    }
  },
  mounted() {
    // Set mobile search open state to false on resize
    window.addEventListener("resize", () => {
      this.isMobileSearchOpen = false;
    });
  },
  components: { CustomSearchInput }, 
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
  width: 40%;
  height: 100%;
  box-shadow: $browser-container-box-shadow;
  @media (max-width: $breakpoint-lg) {
    width: 60%;
  }
  @media (max-width: $breakpoint-md) {
    width: 100%;
  }
  .browserContainer__navbar {
    padding: 1rem;
    border-bottom: 1px solid $gray;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
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
      }
    }
    .browserContainer__navbar__customSearch {
      flex: 1;
      @media (max-width: $breakpoint-md) {
        display: none;
      }
    }
    .browserContainer__navbar__mobileSearchContainer {
      display: flex;
      align-items: center;
      gap: 1.4rem;
      width: 100%;
      .browserContainer__navbar__mobileSearchContainer__icon {
        font-size: 1.5rem;
        color: $green;
        cursor: pointer;
      }
      .browserContainer__navbar__mobileSearchContainer__customSearch {
        flex: 1;
      }
    }
    .browserContainer__navbar__linksContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      .browserContainer__navbar__linksContainer__link {
        font-size: 1.5rem;
        cursor: pointer;
        color: $green;
        &.browserContainer__navbar__linksContainer__link--mobileLink {
          @media (min-width: $breakpoint-md) {
            display: none;
          }
        }
      }
    }
  }
}
</style>