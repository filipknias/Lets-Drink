<template>
<div class="topbar">
  <h2 class="topbar__label">{{ label }}</h2>
  <select class="topbar__select" v-model="selectedFilter">
    <option value="all">All</option>
    <option value="location">By Location</option>
    <option value="favourite">Favourite</option>
  </select>
</div>
<ul class="list">
  <PlaceListElement 
    v-for="place in places" 
    :key="place.id" 
    :place="place" 
  />
</ul>
</template>

<script>
import PlaceListElement from "./PlaceListElement.vue";
import { BREWERY_API_BASE_URL as API, FAVOURITE_PLACES_LOCAL_STORAGE_KEY as LOCAL_STORAGE_KEY } from "../constants";
import axios from "axios";
export default {
  name: 'PlacesList',
  props: {
    places: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      label: "Breweries around the world",
      selectedFilter: "all",
    }
  },
  watch: {
    async selectedFilter(newFilter) {
      switch (newFilter) {
        case "all": {
          this.label = "Breweries around the world";
          this.$emit("query-params-changed", { page: 1 });
          break;
        };
        case "location": {
          this.label = "Breweries around your area";
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
              this.$emit("query-params-changed", { page: 1, by_dist: `${coords.latitude},${coords.longitude}` });
            });
          }
          break;
        };
        case "favourite": {
          this.label = "Your favourite breweries";
          // Take id's from local storage and fetch them
          const favouritePlaces = localStorage.getItem(LOCAL_STORAGE_KEY);
          const parsedPlaces = JSON.parse(favouritePlaces);
          if (!parsedPlaces) return this.$emit("places-changed", []);
          const placesPromises = parsedPlaces.map(async (id) => {
            const { data } = await axios.get(`${API}/breweries/${id}`);
            return data;
          });
          const places = await Promise.all(placesPromises);
          this.$emit("places-changed", places);
          break;
        };
      }
    },
  }, 
  components: { PlaceListElement },
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/shared";
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .topbar__label {
    font-size: 1.4rem;
    @media (max-width: $breakpoint-sm) {
     font-size: 1rem;
    }
  }
  .topbar__select {
    @include selectStyles(150px);
    @media (max-width: $breakpoint-md) {
      width: 100px;
    }
  }
}
.list {
  margin: 1.2rem 0rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
}
</style>