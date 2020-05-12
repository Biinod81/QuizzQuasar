<template>
  <div>
    <q-dialog v-model="showRuleDialog">
        <q-card>
            <q-card-section>
            <div class="text-h6">Jeu des capitales - Règles du jeu</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
            Les règles sont simples, vous devez choisir un nombre de questions et de boutons.
            Ensuite une série de pays défileront et vous devrez trouver la capitale du pays en question.<br><br>
            <strong>Bonne chance !</strong>
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showRuleDialog: false,
      alreadyShown: false,
      counter: 0
    }
  },

  destroyed () {
    this.$emit('blockRuleDialog')
  },

  methods: {
    toggleshowRuleDialog () {
      this.showRuleDialog = !this.showRuleDialog
    }
  }
}
</script>
