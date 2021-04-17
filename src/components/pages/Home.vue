<template>
  <Loading v-if="isLoading"/>
  <div class="app-wrapper">
    <div className="app" v-show="!isLoading">
      <Header />
      <div class="main-wrapper">
        <Main />
        <ActionList />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent } from 'vue'
import HeaderLink from './HeaderLink.vue';
import Header from '../header/Header.vue';
import Main from '../main/Main.vue'
import ActionList from '../actions/ActionList.vue';
import Loading from '../pages/Loading.vue';
import { useStore } from '../../store/store';

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      isLoading: computed(() => store.state.isLoading)
    }
  },
  components: {
    HeaderLink,
    Header, 
    Main,
    ActionList,
    Loading
  }
})
</script>