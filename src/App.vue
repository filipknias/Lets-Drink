<template>
  <div class="container">
    <div id="map" class="map"></div>
    <PlacesBrowser 
      :places="places" 
      v-on:query-params-changed="handleParamsChange"
      v-on:next-page="handleNextPage" 
      v-on:places-changed="handlePlacesChange"
      v-on:search-places="handleSearching"
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
      markers: [],
      queryParams: { page: 1 },
      center: [30, 40],
    }
  },  
  methods: {
    handleNextPage() {
      if (this.queryParams === null) return;
      this.queryParams = { ...this.queryParams, page: this.queryParams.page + 1 };
    },
    handleParamsChange(newParams) {
      this.queryParams = newParams;
      this.places = [];
    },
    handlePlacesChange(places) {
      this.queryParams = null;
      this.places = places;
    },
    async handleSearching({ search, filter }) {
      if (search === "") return this.handleParamsChange({ page: 1 });
      if (filter === "city") this.handleParamsChange({ page: 1, by_city: search });
      else {
        // Make a request for searching query
        const { data } = await axios.get(`${API}/breweries/search?query=${search}`);
        this.handlePlacesChange(data);
      }
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
      center: [-73.93, 40.73], 
      zoom: 12,
    });
    // Fetch places from api
    const { data } = await axios.get(`${API}/breweries?page=${this.queryParams.page}`);
    this.places = data;
  },
  watch: {
    async queryParams(params) {
      if (params === null) return;
      // Fetch data from api with changed query params
      const { data } = await axios.get(`${API}/breweries?${this.queryParamsString}`);
      this.places = [...this.places, ...data];      
    },
    places(places) {
      // Remove old markers from map
      this.markers.forEach((marker) => marker.remove());
      this.markers = [];
      // Add markers on map and push into state
      places.forEach((place) => {
        if (place.longitude === null || place.latitude === null) return;
        // Add marker to map
        const popupText = `<h2 style="white-space:nowrap;">${place.name}</h2>`;
        const popup = new mapboxgl.Popup().setHTML(popupText);
        const marker = new mapboxgl
                          .Marker()
                          .setPopup(popup)
                          .setLngLat([place.longitude, place.latitude])
                          .addTo(this.map);
        this.markers.push(marker);
      });
      // Center map on first brewery with coords
      const placeToCenter = places.find(({ longitude, latitude }) => longitude && latitude);
      if (placeToCenter) {
        this.map.jumpTo({ center: [placeToCenter.longitude, placeToCenter.latitude] });
      }
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
.popup {
  padding: 1rem;
}
</style>
