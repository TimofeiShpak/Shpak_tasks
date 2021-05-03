<template>
  <div class="profile__group-btn">
    <button 
      v-for="button in buttonsData"
      :key="button"
      class="btn"
      @click="setFunctionProfile(button)">
      {{ button }}
    </button>
  </div> 
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default defineComponent({
  computed: {
    ...mapGetters('profileData', ['buttonsData']),
    ...mapState('profileData', ['profile'])
  },
  methods: {
    ...mapActions('userListData', ['setFunctionProfile'])
  }
})
</script>
