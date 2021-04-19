<template>
  <div class="app-wrapper">
    <div class="app">
      <Header />
      <div class="main-wrapper">
        <Main />
        <ActionList />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../header/Header.vue';
import Main from '../main/Main.vue'
import ActionList from '../actions/ActionList.vue';

export default defineComponent({
  components: {
    Header, 
    Main,
    ActionList
  }
})
</script>