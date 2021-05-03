<template>
  <div class="edit-profile">
    <form class="form" @submit.prevent="save(isNew)">
      <fieldset>
        <legend>{{ title(isNew) }}</legend>
        <div class="list-wrapper">
          <div class="label-list">
            <label 
              v-for="label in options"
              :key="label"
              for="">
              {{ label }}
            </label>
          </div>
          <div class="input-list">
            <div class="form__wrong" v-if="isWrong">userName is busy, write another</div>
            <input
              v-for="input in inputElements"
              :key="input.option" 
              :required="input.required"
              :value="input.value"
              @input="(event) => onInput({ event, option: input.option} )"
              type="text"
            />
          </div>
        </div>
        <input class="btn-submit" type="submit" value="save" /> 
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default defineComponent({
  props: {
    isNew: Boolean,
  },
  computed: {
    ...mapState('editProfile', ['options', 'isWrong']),
    ...mapGetters('editProfile', ['inputElements', 'title'])
  },
  methods: {
    ...mapMutations('editProfile', ['onInput']),
    ...mapActions('editProfile', ['save']),
  }
})
</script>
