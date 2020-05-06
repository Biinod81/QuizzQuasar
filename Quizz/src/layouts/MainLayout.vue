<template>
  <div>
    <!-- <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
    </head> -->
    <q-layout>
      <rules ref="rules"></rules>
      <q-toolbar class="q-pa-xl MsBlack">
        <q-toolbar-title>
          <q-avatar size="60px">
            <img src="https://image.flaticon.com/icons/svg/814/814513.svg">
          </q-avatar>
          Jeu des capitales
          <q-btn flat round icon='help' @click="showRuleDialog()"></q-btn>
          <q-tabs class="text-secondary">
            <q-route-tab exact v-for="lien in liens" :key="lien.label" :to="lien.to" :icon="lien.icon" :label="lien.label"/>
          </q-tabs>
        </q-toolbar-title>
      </q-toolbar>
      <br>
        <q-page-container>
          <!-- <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight"> -->
            <router-view/>
          <!-- </transition> -->
        </q-page-container>
    </q-layout>
  </div>
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
          label: 'Accueil',
          icon: 'home',
          to: '/'
        },
        {
          label: 'Quiz',
          icon: 'language',
          to: '/quizz'
        }
      ]
    }
  },
  methods: {
    showRuleDialog () {
      this.$refs.rules.toggleshowRuleDialog()
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

.q-page-container
  position: fixed
  width: inherit
</style>
