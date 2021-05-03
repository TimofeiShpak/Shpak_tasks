<template>
  <div class="input-message-wrapper">
    <div class="addressee" v-if="addressee.length > 1">
      <div class="addressee__text">
        write to: 
        <span class="addressee__user">{{ addressee }}</span>
      </div>
      <button class="addressee__btn" @click="addAddressee('')">X</button>
    </div>
    <div class="input-message">
      <textarea
        class="input-message__textarea"
        type="text"
        @input="updateInputValue"
        :style="{ height: height }"
        :value="value"
        :placeholder="[`Message in #${channel}`]"
      />
      <div class="smiles" @click="changeShowSmiles">
        <button class="smiles__btn"></button>
        <div class="smiles__list" v-if="isShowSmiles">
          <span 
            v-for="smile in smiles"
            :key="smile.id" 
            class="smiles__item" 
            @click="smile.onClick">
            {{ smile.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapMutations, mapState } from 'vuex';

export default defineComponent({
  computed: {
    ...mapState('inputMessage', ['value', 'isShowSmiles', 'height', 'addressee']),
    ...mapGetters('inputMessage', ['smiles']),
    ...mapState('channelData', ['channel'])
  },
  methods: {
    ...mapMutations('inputMessage', ['updateInputValue', 'changeShowSmiles', 'handleMessage']),
    ...mapMutations('userListData', ['addAddressee'])
  },
  mounted() {
    this.handleMessage();
  }
})
</script>
