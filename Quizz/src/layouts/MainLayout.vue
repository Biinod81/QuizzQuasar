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
          <q-route-tab exact v-for="lien in liens" :key="lien.label" :to="lien.to" :icon="lien.icon" :label="lien.label"/>
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
      // permet d'ajouter autant de lien que l'on veut sans avoir à les rajouter un par un dans le q-route-tab
      liens: [
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
