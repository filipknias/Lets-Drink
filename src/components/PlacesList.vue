<template>
<h2 class="label">{{ label }}</h2>
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
import { BREWERY_API_BASE_URL as API } from "../constants";
import axios from "axios";
export default {
  name: 'PlacesList',
  props: {
    label: { type: String },
  },
  data() {
    return {
      places: [],
      page: 1,
    }
  },
  async mounted() {
    // Fetch places from api
    const { data } = await axios.get(`${API}/breweries?page=${this.page}`);
    this.places = data;
  },
  components: { PlaceListElement },
}
</script>

<style lang="scss" scoped>
.label {
  font-size: 1.4rem;
}
.list {
  margin: 1.2rem 0rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
}
</style>