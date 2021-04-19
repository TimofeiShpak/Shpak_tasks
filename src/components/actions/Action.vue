<template>
  <div class="action">
    <div class="icon-wrapper" :class="{ 'icon_user': isUser }">
        <div 
          class="icon" 
          :style="{ background: `url(${userSrc}) 50% 30% / cover` }">
        </div>
    </div>
    <div class="action__info">
      <div class="action__topic">
        <div class="action__userName">{{ userName }}</div>
        <div class="action__time">- {{ getTime(time) }}</div>
      </div>
      <div class="action__text">
        {{ text }}
        <span class="action__subtext">{{ subtext }}</span>
      </div>
      <div class="action__comment" v-if="comment">
        {{ comment }}
      </div>
      <div class="action__changes" v-if="editedOptionList?.length">
        <div>Changes</div>
        <ul>
          <li 
            v-for="option in editedOptionList"
            :key="option.name">
              <span class="action__subtext">
                {{ optionName(option) }} :
              </span> 
              {{ option.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../store/store'

export default defineComponent({
  props: {
    userName: String,
    text: String,
    time: String,
    userSrc: String,
    subtext: String,
    comment: String,
    editedOptionList: Array,
  },
  setup(props) {
    let store = useStore();
    let getTime = store.getters.time;
    let optionName = store.getters.optionName;
    let currentUserName = store.state.userData.userName;
    let isUser = computed(() => currentUserName === props.userName);

    return {
      getTime,
      optionName,
      isUser
    }
  }
})
</script>
