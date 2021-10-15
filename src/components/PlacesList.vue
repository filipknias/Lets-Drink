<template>
<div class="topbar">
  <h2 class="topbar__label">{{ label }}</h2>
  <select class="topbar__select" v-model="selectedFilter">
    <option value="all">All</option>
    <option value="location">By Location</option>
    <option value="favourite">Favourite</option>
    <option value="history">History</option>
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
      label: "Places",
      selectedFilter: "location",
    }
  },
  watch: {
    selectedFilter(newFilter) {
      switch (newFilter) {
        case "all": {
          this.label = "Breweries around you";
          // TODO: Fetch all breweries
          break;
        };
        case "location": {
          this.label = "Breweries around you";
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
              console.log(coords.longitude, coords.latitude);
              
            });
          }
          break;
        };
        case "favourite": {
          this.label = "Your favourite breweries";
          // TODO: Take id's from local storage and fetch them
          break;
        };
        case "history": {
          this.label = "Your search history";
          // TODO: Take id's from local storage and fetch them
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
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .topbar__label {
    font-size: 1.4rem;
  }
  .topbar__select {
    width: 150px;
    padding: 0.5rem;
    font-family: $font-primary;
    font-size: 1rem;
    border-radius: 5px;
    outline: none;
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