<template>
  <li class="place">
      <img v-if="place.country" :src="flagImageSource" class="placesList__item__flag">
      <div class="place__center">
        <h1 class="place__center__header">{{ place.name }}</h1>
        <div class="place__center__bottomInfo">
          <div class="place__center__bottomInfo__item">
            <font-awesome-icon icon="map-marker-alt" class="place__center__bottomInfo__item__icon" />
            <h4 class="place__center__bottomInfo__item__text">{{ preventNullValue(place.city) }}</h4>
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
        <Tooltip :message="isFavourite ? 'Remove from favourites' : 'Add to favourites'">
          <button class="place__right__button" @click="handleFavouriteToggle">
            <font-awesome-icon 
              icon="star" 
              :class="['place__right__button__icon', { 'place__right__button__icon--favourite': isFavourite }]" 
            />
          </button>
        </Tooltip>
      </div>
    </li>
</template>

<script>
import Tooltip from "./Tooltip.vue";
import { COUNTRY_FLAGS_BASE_URL as API, FAVOURITE_PLACES_LOCAL_STORAGE_KEY as LOCAL_STORAGE_KEY } from "../constants";
export default {
  name: 'PlaceListElement',
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFavourite: false,
    }
  },
  mounted() {
    // Check if place is saved in favourites
    const favouriteItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedItems = JSON.parse(favouriteItems);
    if (parsedItems && parsedItems.some((id) => id === this.place.id)) this.isFavourite = true;
    else this.isFavourite = false;
  },
  methods: {
    preventNullValue(value) {
      if (value === null) return "Unknown";
      else return value;
    },
    handleFavouriteToggle() {
      this.isFavourite = !this.isFavourite;
      const storageItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsedItems = JSON.parse(storageItems);
      if (this.isFavourite) {
        // Add to local storage
        let itemsToSave = [this.place.id];
        if (parsedItems) itemsToSave = itemsToSave.concat(parsedItems);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(itemsToSave));
      } else {
        // Remove from local storage
        const updatedItems = parsedItems.filter((id) => id !== this.place.id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
      }
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
          gap: 0.7rem;
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
          gap: 0.7rem;
          flex-direction: column;
        }
        .place__right__button {
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
          @media (max-width: $breakpoint-sm) {
            width: 30px;
            height: 30px;
          }
          .place__right__button__icon {
            color: white;
            font-size: 1rem;
            &.place__right__button__icon--favourite {
              color: $favourite-icon-color;
            }
            @media (max-width: $breakpoint-sm) {
              font-size: 0.7rem;
            }
          }
        }
      }
  }
</style>