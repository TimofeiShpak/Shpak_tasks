<template>
  <li class="todo">
    <p class="todo__text">{{ text }}</p>
    <span class="todo__progress" :class="progressClass">{{ progress }}</span>
    <span class="todo__status" :class="statusClass">{{ status }}</span>
    <ul class="todo__userList">
      <li
        class="todo__user"
        v-for="user in userList"
        :key="user">
        {{ user }}
      </li>
    </ul>
    <div class="todo__button-wrapper">
      <button 
        class="todo__button" 
        @click="changeIdActiveButton(id)">
      </button>
      <ul class="button-list" v-if="isActive && idActiveButton === id">
        <li>
          <button 
            class="button-list__item" 
            v-if="isUser"
            @click="openEditTodo({ data, id })">
            Edit
          </button>
        </li>
        <li>
          <button class="button-list__item">Comments</button>
        </li>
      </ul>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue'
import { mapActions, mapMutations } from 'vuex';
import { useStore } from '../../store/store';

export default defineComponent({
  props: {
    text: String,
    status: String,
    progress: String,
    progressClass: String,
    statusClass: String,
    author: String,
    creator: String,
    id: String,
    isActive: Boolean,
    userList: Array,
  },
  setup(props) {
    let { progress, status, author, creator, text } = props;
    let store = useStore();
    let userName = store.state.userData.userName;

    let idActiveButton = computed(() => store.state.idActiveButton);
    let isUser = computed(() => userName === author || userName === creator);
    let data = computed(() => [text, progress, status, creator]);

    return {
      idActiveButton,
      isUser,
      data,
    }
  },
  methods: {
    ...mapMutations(['changeIdActiveButton']),
    ...mapActions(['openEditTodo'])
  }
})
</script>