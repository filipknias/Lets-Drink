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
export default {
  name: 'PlacesList',
  props: {
    label: { type: String },
    places: {
      type: Array,
      required: true,
    },
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