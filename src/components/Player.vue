<template>
  <HeaderLink to="/history" exact>History</HeaderLink>
  <div className="title">MiniGame</div>
  <div className="wrapper">
    <div className="player">
    <IndicatorList />
    <ButtonList />
    </div>
    <History />
  </div>
  <Modal />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IndicatorList from './IndicatorList.vue'
import ButtonList from './ButtonList.vue'
import History from './History.vue'
import Modal from './Modal.vue'
import HeaderLink from './HeaderLink.vue'

export default defineComponent({
  components: {
    IndicatorList,
    ButtonList,
    History,
    Modal,
    HeaderLink
  },
})
</script>
