<template>
  <div 
    class="message-wrapper" 
    :data-id="message.id" 
    :data-iduser="message.idUser" 
    @click="click"
  >
    <div class="message-date" v-if="message.show">
      <div class="message-date__border"></div>
      <div class="message-date__item">
          {{ message.show }}
      </div>
      <div class="message-date__border"></div>
    </div>                    
    <div class="message" :class="{ 'message_active': isActive(message.id)}">
      <img 
        :alt="message.author"
        class="user-item__img" 
        :src="message.avatarSrc" 
      />
      <div class="message__content">
        <div class="message__info">
          <div class="message__author" >
            {{ message.author }}
          </div>
          <div>{{ message.time }}</div>
          <div v-if="message.isEdit">edited</div>
          <div 
            class="message__button-list" 
            v-if="isActive(message.id)"
          >
            <button 
              class="message__btn" 
              v-if="isUser(message.idUser) && !idEdit" 
              @click="editMessage({ id: message.id, text: message.text })">
              Edit
            </button>
            <button 
              class="message__btn" 
              v-if="isUser(message.idUser) && idEdit" 
              @click="saveMessage">
              Save
            </button>
            <button 
              class="message__btn" 
              v-if="isUser(message.idUser) && idEdit" 
              @click="resetMessage">
              Cancel
            </button>
            <button 
              class="message__btn" 
              v-if="isUser(message.idUser)"
              @click="deleteMessage(message.id)">
              Delete
            </button>
            <button 
              class="message__btn" 
              v-else 
              @click="addAddressee(message.idUser)">
              Write
            </button>
          </div>
        </div>
          <div class="message__text-wrapper">
            <span class="message__addressee" v-if="message.addressee" @click="setProfile(message.idAddressee)">
                {{ message.addressee }}
            </span>
            <div class="message__text" v-if="message.id !== idEdit">
              {{ message.text.trim() }}
            </div>
            <input 
              v-else
              class="message__input" 
              :value="textEdit"
              @input="updateTextEdit"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { Message } from '../../store/components/MessageListData'

export default defineComponent({
  props: {
    message: Object as () => Message,
  },
  computed: {
    ...mapGetters('messageListData', ['isActive']),
    ...mapGetters('userListData', ['isUser']),
    ...mapState('messageListData', ['idEdit', 'textEdit'])
  },
  methods: {
    ...mapActions('messageListData', ['click', 'deleteMessage', 'editMessage', 'updateTextEdit', 
      'saveMessage']),
    ...mapMutations('userListData', ['addAddressee']),
    ...mapMutations('messageListData', ['resetMessage']),
    ...mapMutations('profileData', ['setProfile']),
  }
})
</script>
