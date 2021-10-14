<template>
  <div class="container">
    <div id="map" class="map"></div>
    <PlacesBrowser 
      :places="places" 
      v-on:places-changed="handlePlacesChange" 
    />
  </div>
</template>

<script>
import "./styles/index.scss";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import PlacesBrowser from "./components/PlacesBrowser.vue";
import { BREWERY_API_BASE_URL as API } from "./constants";
import axios from "axios";
export default {
  name: 'App',
  data() {
    return {
      map: null,
      places: [],
      page: 1,
    }
  },  
  mounted() {
    // Setup mapbox
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/filipknias/ckummyqir01lt18qr4lxhljdg',
      center: [-74.5, 40], // Set first brewery coords
      zoom: 12,
    });
  },
  async mounted() {
    // Fetch places from api
    const { data } = await axios.get(`${API}/breweries?page=${this.page}`);
    this.places = data;
  },
  components: { PlacesBrowser },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow-y: none;
  .map {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
