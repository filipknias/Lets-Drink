<template>
  <li class="place">
      <img v-if="place.country" :src="flagImageSource" class="placesList__item__flag">
      <div class="place__center">
        <h1 class="place__center__header">{{ place.name }}</h1>
        <div class="place__center__bottomInfo">
          <div class="place__center__bottomInfo__item">
            <font-awesome-icon icon="map-marker-alt" class="place__center__bottomInfo__item__icon" />
            <h4 class="place__center__bottomInfo__item__text">{{ preventNullValue(place.street) }}</h4>
          </div>
          <div class="place__center__bottomInfo__item">
            <font-awesome-icon icon="phone" class="place__center__bottomInfo__item__icon" />
            <h4 class="place__center__bottomInfo__item__text">{{ preventNullValue(place.phone) }}</h4>
          </div>
          <div class="place__center__bottomInfo__badge">{{ place.brewery_type }}</div>
        </div>
      </div>
      <div class="place__right">
        <Tooltip message="Location">
          <button class="place__right__button">
            <font-awesome-icon icon="map" class="place__right__button__icon" />
          </button>
        </Tooltip>
        <Tooltip message="Add to favourites">
          <button class="place__right__button">
            <font-awesome-icon icon="star" class="place__right__button__icon" />
          </button>
        </Tooltip>
      </div>
    </li>
</template>

<script>
import Tooltip from "./Tooltip.vue";
import { COUNTRY_FLAGS_BASE_URL as API } from "../constants";
export default {
  name: 'PlaceListElement',
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  methods: {
    preventNullValue(value) {
      if (value === null) return "Unknown";
      else return value;
    },
  },
  computed: {
    flagImageSource() {
      let formattedCountryName = null;
      switch(this.place.country) {
        case "United States": {
          formattedCountryName = "us";
          break;
        };
        case "England": {
          formattedCountryName = "gb";
          break;
        };
        case "Ireland": {
          formattedCountryName = "ie";
          break;
        };
        case "Scotland": {
          formattedCountryName = "gb";
          break;
        };
      }
      return `${API}/${formattedCountryName}/flat/48.png`;
    },
  },
  components: { Tooltip },
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/resets";
.place {
    display: flex;
    align-items: center;
    gap: 1.4rem;
    background-color: white;
    box-shadow: $place-container-box-shadow;
    border-radius: 5px;
    padding: 0.7rem;
    @media (max-width: $breakpoint-sm) {
      gap: 0.8rem;
      cursor: pointer;
    }
    @media (min-width: $breakpoint-sm) {
      pointer-events: none;
    }
    .place__center { 
      flex: 1;
      .place__center__header {
        font-size: 1.4rem;
        @media (max-width: $breakpoint-sm) {
          font-size: 1rem;
        }
      }
      .place__center__bottomInfo {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 0.2rem;
        @media (max-width: $breakpoint-sm) {
          gap: 0.5rem;
          justify-content: space-between;
        }
        .place__center__bottomInfo__item {
          display: flex;
          align-items: center;
          .place__center__bottomInfo__item__icon {
            margin-right: 0.4rem;
            font-size: $place-container-bottom-section-font-size;
            color: $text-dark;
          }
          .place__center__bottomInfo__item__text {
            font-size: $place-container-bottom-section-font-size;
            color: $text-dark;
            @media (max-width: $breakpoint-sm) {
              font-size: 0.7rem;
            }
          }
        }
        .place__center__bottomInfo__badge {
          background-color: $badge-bg-color;
          border-radius: 20px;
          padding: 0.3rem 0.5rem;
          text-align: center;
          font-size: $place-container-bottom-section-font-size;
        }
      }
    }
    .place__right {
        display: flex;
        align-items: center;
        gap: 1rem;
        @media (max-width: $breakpoint-sm) {
          display: none;
        }
        .place__right__button {
          pointer-events: all;
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
          .place__right__button__icon {
            color: white;
            font-size: 1rem;
          }
        }
      }
  }
</style>