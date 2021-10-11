<template>
  <form class="searchContainer">
    <button type="submit" class="searchContainer__submitButton">
      <font-awesome-icon icon="search" class="searchContainer__submitButton__icon" />
    </button>
    <input
      type="text" 
      class="searchContainer__input" 
      placeholder="Search"
      @change="handleInputChange"
    />
  </form>
</template>

<script>
export default {
  name: 'CustomSearchInput',
  methods: {
    handleInputChange(e) {
      this.$emit('input-value-changed', e.target.value);
    }
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
  .searchContainer__submitButton {
    @include buttonReset;
    cursor: pointer;
    .searchContainer__submitButton__icon {
      font-size: 1rem;
      color: $text-dark;
    }
  }
}
</style>