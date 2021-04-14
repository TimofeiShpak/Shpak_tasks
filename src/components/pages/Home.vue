<template>
  <Header />
  <div class="main-wrapper">
    <Main />
    <ActionList />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import HeaderLink from './HeaderLink.vue';
import Header from '../header/Header.vue';
import Main from '../main/Main.vue'
import ActionList from '../actions/ActionList.vue';

export default defineComponent({
  components: {
    HeaderLink,
    Header, 
    Main,
    ActionList
  }
})
</script>