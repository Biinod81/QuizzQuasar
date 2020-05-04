<template>
  <q-layout view="lHh Lpr lFf">
    <rules ref="rules"></rules>
    <q-toolbar class="q-pa-xl MsBlack">
      <q-toolbar-title>
        <q-avatar size="60px">
          <img src="https://image.flaticon.com/icons/svg/814/814513.svg">
        </q-avatar>
        Jeu des capitales
        <q-btn flat round icon='help' @click="showHelpDialog()"></q-btn>
        <q-tabs class="text-secondary">
          <q-route-tab v-for="nav in navs" :key="nav.label" :to="nav.to" :icon="nav.icon" :label="nav.label"/>
        </q-tabs>
      </q-toolbar-title>
    </q-toolbar>
    <br>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import rules from 'components/rules.vue'
export default {
  name: 'MainLayout',
  data () {
    return {
      navs: [
        {
          label: 'index',
          icon: 'home',
          to: '/'
        },
        {
          label: 'quizz',
          icon: 'language',
          to: '/quizz'
        }
      ]
    }
  },
  methods: {
    showHelpDialog () {
      this.$refs.rules.toggleShowHelpDialog()
    }
  },

  components: {
    rules
  }
}
</script>

<style lang='stylus'>
.MsSemiBold
  font-family: 'Montserrat SemiBold'

.MsBlack
  font-family: 'Montserrat Black'

</style>
