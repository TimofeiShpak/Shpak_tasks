<template>
  <header class="header">
    <div class="search">
      <button class="search__button" @click="searchTodo"></button>
      <input 
        type="text" 
        class="search__input" 
        placeholder="Search for any training you want"
        :value="searchText"
        @input="updateSearchText">
      <div class="results" v-if="isSearch">
        <div class="results__text">find {{ result.length }} results</div>
        <div class="results__controls" v-if="result.length">
          <span class="results__text">{{ resultText }}</span>
          <div>
            <button class="results__button" @click="nextResult">⋀</button>
            <button class="results__button" @click="prevResult">⋁</button>
          </div>
        </div>
      </div>
    </div>
    <div class="user">
      <div class="icon-wrapper">
        <div 
          class="header__icon"
          :style="{ background: `url(${userSrc}) 50% 30% / cover` }">
        </div>
      </div>
      <button class="btn" @click="logOut">Log out</button>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { mapMutations } from 'vuex';
import { useStore } from '../../store/store';

export default defineComponent({
  setup() {
    let store = useStore();
    let userSrc = computed(() => store.state.userData.userSrc);
    let searchText = computed(() => store.state.search.searchText);
    let result = computed(() => store.state.search.resultSearch);
    let isSearch = computed(() => store.state.search.isSearch);
    let resultText = computed(() => store.getters.resultText);

    return {
      userSrc,
      searchText,
      result,
      resultText,
      isSearch
    }
  },
  methods: {
    ...mapMutations(['logOut', 'updateSearchText', 'searchTodo', 'nextResult', 'prevResult'])
  }
})
</script>

