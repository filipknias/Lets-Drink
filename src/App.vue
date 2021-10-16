<template>
  <div class="container">
    <div id="map" class="map"></div>
    <PlacesBrowser 
      :places="places" 
      v-on:query-params-changed="handleParamsChange"
      v-on:next-page="handleNextPage" 
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
      queryParams: { page: 1 },
    }
  },  
  methods: {
    handleNextPage() {
      this.queryParams = { ...this.queryParams, page: this.queryParams.page + 1 };
    },
    handleParamsChange(newParams) {
      this.queryParams = newParams;
      this.places = [];
    },
  },
  computed: {
    queryParamsString() {
      return Object.entries(this.queryParams).map(([key, value]) => `${key}=${value}`).join("&");
    },
  },  
  async mounted() {
    // Setup mapbox
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/filipknias/ckummyqir01lt18qr4lxhljdg',
      center: [-74.5, 40], // Set first brewery coords
      zoom: 12,
    });
    // Fetch places from api
    const { data } = await axios.get(`${API}/breweries?page=${this.queryParams.page}`);
    this.places = data;
  },
  watch: {
    async queryParams() {
      console.log(this.queryParams)
      // Fetch data from api with changed query params
      const { data } = await axios.get(`${API}/breweries?${this.queryParamsString}`);
      this.places = [...this.places, ...data];      
    },
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
