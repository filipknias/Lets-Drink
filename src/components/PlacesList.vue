<template>
  <h2 class="listLabel">{{ label }}</h2>
  <ul class="placesList">
    <li v-for="place in places" :key="place.id" class="placesList__item">
      <img src="https://www.countryflags.io/us/flat/48.png" class="placesList__item__flag">
      <div class="placesList__item__center">
        <h1 class="placesList__item__center__header">{{ place.name }}</h1>
        <div class="placesList__item__center__bottomInfo">
          <div class="placesList__item__center__bottomInfo__item">
            <font-awesome-icon icon="map-marker-alt" class="placesList__item__center__bottomInfo__item__icon" />
            <h4 class="placesList__item__center__bottomInfo__item__text">Example Address</h4>
          </div>
          <div class="placesList__item__center__bottomInfo__item">
            <font-awesome-icon icon="phone" class="placesList__item__center__bottomInfo__item__icon" />
            <h4 class="placesList__item__center__bottomInfo__item__text">123456789</h4>
          </div>
          <div class="placesList__item__center__bottomInfo__badge">{{ place.brewery_type }}</div>
        </div>
      </div>
      <div class="placesList__item__right">
        <Tooltip message="Location">
          <button class="placesList__item__right__button">
            <font-awesome-icon icon="map" class="placesList__item__right__button__icon" />
          </button>
        </Tooltip>
        <Tooltip message="Add to favourites">
          <button class="placesList__item__right__button">
            <font-awesome-icon icon="star" class="placesList__item__right__button__icon" />
          </button>
        </Tooltip>
      </div>
    </li>
  </ul>
</template>

<script>
import Tooltip from "./Tooltip.vue";
export default {
  name: 'PlacesList',
  props: {
    label: { type: String },
    places: { type: Array },
  },
  mounted() {
    console.log(this.$props.places);
  },
  components: { Tooltip },
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/resets";
.listLabel {
  font-size: 1.4rem;
}
.placesList {
  margin-top: 1.2rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  .placesList__item {
    display: flex;
    align-items: center;
    gap: 1.4rem;
    background-color: white;
    box-shadow: $place-container-box-shadow;
    border-radius: 5px;
    padding: 0.7rem;
    @media (max-width: $breakpoint-sm) {
      gap: 0.8rem;
    }
    .placesList__item__center { 
      flex: 1;
      .placesList__item__center__header {
        font-size: 1.4rem;
        @media (max-width: $breakpoint-sm) {
          font-size: 1rem;
        }
      }
      .placesList__item__center__bottomInfo {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 0.2rem;
        @media (max-width: $breakpoint-sm) {
          gap: 0.5rem;
        }
        .placesList__item__center__bottomInfo__item {
          display: flex;
          align-items: center;
          .placesList__item__center__bottomInfo__item__icon {
            margin-right: 0.4rem;
            font-size: $place-container-bottom-section-font-size;
            color: $text-dark;
          }
          .placesList__item__center__bottomInfo__item__text {
            font-size: $place-container-bottom-section-font-size;
            color: $text-dark;
            white-space: nowrap;
            @media (max-width: $breakpoint-sm) {
              font-size: 0.7rem;
            }
          }
        }
        .placesList__item__center__bottomInfo__badge {
          background-color: $badge-bg-color;
          border-radius: 20px;
          padding: 0.3rem 0.5rem;
          text-align: center;
          font-size: $place-container-bottom-section-font-size;
        }
      }
    }
    .placesList__item__right {
        display: flex;
        align-items: center;
        gap: 1rem;
        .placesList__item__right__button {
          @include buttonReset;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: $green;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease-in-out;
          &:hover {
            background-color: $green-hover;
          }
          .placesList__item__right__button__icon {
            color: white;
            font-size: 1rem;
          }
        }
      }
  }
}
</style>