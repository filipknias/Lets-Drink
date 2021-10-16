<template>
  <div class="searchContainer">
    <button type="button" class="searchContainer__button">
      <font-awesome-icon icon="search" class="searchContainer__button__icon" />
    </button>
    <input
      type="text" 
      class="searchContainer__input" 
      placeholder="Search"
      v-model="searchInput"
    />
    <button 
      v-if="searchInput!==''" 
      type="button" 
      class="searchContainer__button"
      @click="searchInput=''"
    >
      <font-awesome-icon icon="times" class="searchContainer__button__icon" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'CustomSearchInput',
  data() {
    return {
      searchInput: "",
    }
  },
  watch: {
    searchInput(value) {
      this.$emit('input-value-changed', value);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/resets";
.searchContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $text-input-bg-color;
  border-radius: 25px;
  padding: 0.7rem 1rem;
  gap: 0.6rem;
  .searchContainer__input {
    @include inputReset;
    font-size: 1rem;
    flex: 1;
    background: none;
    color: $text-dark;
  }
  .searchContainer__button {
    @include buttonReset;
    cursor: pointer;
    .searchContainer__button__icon {
      font-size: 1rem;
      color: $text-dark;
    }
  }
}
</style>