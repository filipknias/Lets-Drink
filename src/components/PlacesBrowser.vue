<template>
  <div class="browserContainer">
    <div class="browserContainer__navbar">
      <div class="browserContainer__navbar__logoContainer">
        <img src="../assets/brandLogo.png" class="browserContainer__navbar__logoContainer__logo" />
        <h3 class="browserContainer__navbar__logoContainer__brand">Let's Drink</h3>
      </div>
      <form class="browserContainer__navbar__searchContainer">
        <button type="submit" class="browserContainer__navbar__searchContainer__submitButton">
          <font-awesome-icon icon="search" class="browserContainer__navbar__searchContainer__submitButton__icon" />
        </button>
        <input
          type="text" 
          class="browserContainer__navbar__searchContainer__input" 
          placeholder="Search"
        />
      </form>
      <div class="browserContainer__navbar__linksContainer">
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
export default {
  name: 'PlacesBrowser',

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
  box-shadow: 2px 0px 10px 0px rgba(36, 36, 36, 0.67);
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
      }
      .browserContainer__navbar__logoContainer__brand {
        font-size: 1.7rem;
      }
    }
    .browserContainer__navbar__searchContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $text-input-bg-color;
      flex: 1;
      border-radius: 25px;
      padding: 0.7rem 1rem;
      gap: 0.6rem;
      color: $text-dark;
      .browserContainer__navbar__searchContainer__input {
        @include inputReset;
        font-size: 1rem;
        flex: 1;
        background: none;
      }
      .browserContainer__navbar__searchContainer__submitButton {
        @include buttonReset;
        cursor: pointer;
        .browserContainer__navbar__searchContainer__submitButton__icon {
          font-size: 1rem;
        }
      }
    }
    .browserContainer__navbar__linksContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      .browserContainer__navbar__linksContainer__link {
        font-size: 1.5rem;
        cursor: pointer;
        color: $green;
      }
    }
  }
}
</style>