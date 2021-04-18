<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div>Comments</div>
      <div class="comments-wrapper" v-if="comments.length">
        <ul class="commnet-list">
          <li 
            class="comment" 
            v-for="comment in comments"
            :key="comment.id">
            <div class="icon-wrapper" :class="{ icon_user: comment.userName === userName }">
                <div 
                  class="icon"
                  :style="{ background: `url(${comment.userSrc}) 50% 30% / cover` }">
                </div>
            </div>
            <div class="comment__info">
              <div class="comment__topic">
                <div class="comment__userName">{{ comment.userName }}</div>
                <div class="comment__time">- {{ time(comment.time) }}</div>
              </div>
              <div class="comment__text">{{ comment.text }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>no one has left a comment yet</div>
      <form @submit.prevent="addComment">
        <textarea 
          class="modal__textarea"
          :value="value"
          @input="updateComment"
          required
          placeholder="Write your comment"
        />
        <div class="modal__button-list">
          <input type="submit" class="modal__btn" value="Add comment" />
          <input type="reset" class="modal__btn" @click="closeComments" value="Close" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { mapActions, mapMutations } from 'vuex'
import { useStore } from '../../store/store';

export default defineComponent({
  setup() {
    let store = useStore();
    let comments = computed(() => store.state.comments);
    let userName = computed(() => store.state.userData.userName);
    let value = computed(() => store.state.comment);
    let time = store.getters.time;

    return {
      comments,
      userName,
      value,
      time
    }
  },
  methods: {
    ...mapActions(['closeComments']),
    ...mapMutations(['updateComment', 'addComment'])
  }
})
</script>
