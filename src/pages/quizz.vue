<template>
  <div>
    <!--Sélection du nombre de questions et de boutons-->
    <rules ref="rules" @blockRuleDialog="toggleRuleDialogShowing()"></rules>
    <div class="q-gutter-md row MsSemiBold justify-center">
      <chrono ref="chrono"></chrono>
    </div>
    <div class="q-pa-xl" v-if=isSelect>
      <div class="q-gutter-md row justify-center">
        <div class="col-2">
          <q-select outlined v-model="modelNbQuestion" :options="optionsNbQuestion" label="Nombre de questions" />
        </div>
        <div class="col-2">
          <q-select outlined v-model="modelNbBouton" :options="optionsNbBoutons" label="Nombre de boutons" />
        </div>
      </div>
      <br>
      <!--Désactive le bouton START tant que le nombre de boutons et de questions n'a pas été sélectionné-->
      <div class="q-gutter-lg MsSemiBold row justify-center" v-if="this.modelNbBouton === null || this.modelNbQuestion === null">
          <q-btn color="secondary" disabled label="JOUER"/>
      </div>
      <div class="q-gutter-lg MsSemiBold row justify-center" v-else>
          <q-btn color="secondary" label="JOUER" @click="choixPaysAleatoire(); afficherBtn(); startChrono()"/>
      </div>
    </div>

    <!--jeu-->
    <div v-else>
      <div class="q-pa-xl" v-if="this.paysDejaSelectionne.length <= this.getNBQuestion">
        <!--score du joueur + bouton reset-->
        <div class="q-gutter-md MsSemiBold row justify-end">
          <div class="q-gutter-lg col-3">
            <p v-if="isStart">SCORE : {{ this.getScoreJoueur }}</p>
          </div>
        </div>
        <!-- Corps du quizz (questions + boutons) -->
        <div v-if="isStart">

          <!--Indique le numéro de la questio en cours + l'énoncé de la question-->
          <div class="row justify-center">
            <h4 class="MsSemiBold">Question #{{ this.getNumQuestion }}/{{ this.getNBQuestion }}<div class="MsBlack">Quelle est la capitale du pays : {{ this.pays }}</div></h4>
          </div>

          <!--Affiche les boutons actifs si il y a une question en cours-->
          <div v-if="this.questionEnCours">
            <div class="q-gutter-xl row justify-center">
                <q-btn class="MsSemiBold" color="white" text-color="black" v-for="indexBtn in this.tabCapitaleAleatoire" :key="indexBtn" :label=tabCapitales[indexBtn] @click="verificationReponse($event)"/>
            </div>
          </div>
          <!--Affiche les boutons désactivés si il n'y a pas de question en cours-->
          <div v-else>
            <div class="q-gutter-xl row justify-center">
                <q-btn class="MsSemiBold" color="white" text-color="black" v-for="indexBtn in this.tabCapitaleAleatoire" :key="indexBtn" disabled :label=tabCapitales[indexBtn] @click="verificationReponse($event)"/>
            </div>
          </div>

          <br><br><br>
          <!--Réponse à la question + bouton suivant-->
          <div class="q-gutter-lg column items-center" v-if="!this.hide">
            <div :class="{ green: success, red: !success }" class="col">
              <q-field outlined>
                <template v-slot:control>
                  <div class="MsSemiBold" text-color="white"><b>{{ reponseQuestion }}</b></div>
                </template>
              </q-field>
            </div>
            <div class="MsSemiBold col">
              <q-btn color="primary" label="SUIVANT" @click="choixPaysAleatoire(); viderChamp()" v-if="!questionEnCours"/>
            </div>
          </div>

        </div>
      </div>

      <!-- fin de partie -->
      <div class="MsBlack q-pa-xl" v-else>
        <div class="row justify-center">
          <q-btn color="accent" label="RESTART" @click="reset(); resetChrono(); loadData()" v-if="isStart"/>
        </div>
        <div class="column items-center" style="height: 100px">
          <h4 class="col">Score final : {{ this.getScoreJoueur }} / {{ this.getNBQuestion }}</h4>
          <div class="col" v-if="this.getScoreJoueur == this.getNBQuestion">
            <h5>Bravo, score parfait !</h5>
          </div>
          <div class="col" v-else-if="this.getScoreJoueur === 0">
            <h5>Dommage, la prochaine fois peut-être :/</h5>
          </div>
          <div class="col " v-else-if="this.getScoreJoueur < this.getNBQuestion">
            <h5>Pas mal ! Peut mieux faire.</h5>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import chrono from 'components/chrono.vue'
import rules from 'components/rules.vue'

export default {
  data () {
    return {
      modelNbQuestion: null,
      modelNbBouton: null,
      optionsNbQuestion: [
        '5', '10', '15', '20', '25', '30'
      ],
      optionsNbBoutons: [
        '4', '6', '8'
      ],
      paysDejaSelectionne: [], // stock l'index des pays déjà sélectionnés
      tabCapitaleAleatoire: [], // stock les index pour choisir des capitales aléatoires
      reponseQuestion: '', // réponse de la réponse
      index: 0, // index permettant de choisir les capitales / pays
      pays: '', // string contenant le pays choisis aléatoirement
      capitale: '', // string contenant la capitale choisis aléatoirement
      isStart: false, // VRAI si la partie a commencé, FAUX sinon
      isSelect: true, // VRAI si le joueur est en train de sélectionner le nb de bouton / question, FAUX si il est en train de jouer
      questionEnCours: true, // VRAI si il y a une question en cours, FAUX sinon
      success: true, // VRAI = cadrant de la réponse VERT, FAUX = cadrant de la réponse ROUGE
      hide: true // cache le cadrant de la réponse à la question si VRAI, la dévoile si FAUX
    }
  },

  mounted () {
    this.loadData()
    if (this.getIsRuleDialogAlreadyShown === false) {
      this.$refs.rules.toggleshowRuleDialog()
    } else {
      console.log('Dialog Help already shown')
    }
  },

  // beforeRouteLeave (to, from, next) {
  //   const awnser = window.confirm('Êtes-vous sûr de vouloir quitter le quiz maintenant ? Votre progression sera perdue.')

  //   if (awnser) {
  //     next()
  //   } else {
  //     next(false)
  //   }
  // },

  methods: {
    // Permet d'afficher les boutons pour que le joueur puissent choisir une réponse
    afficherBtn () {
      this.isStart = true
      this.isSelect = false
      this.resetPts()
      this.resetNumQuestion()
    },

    // vérifie la réponse de l'utilisateur et show un text en fonction de la réponse
    verificationReponse: function (reponse) {
      // si VRAI, on augemente le score du joueur et passe success à TRUE pour afficher le cadrant de la réponse en vert
      if (reponse.target.textContent.toUpperCase() === this.capitale.toUpperCase()) {
        this.reponseQuestion = 'Bien joué !'
        this.addPts()
        this.success = true
      // si FAUX, on passe success à FALSE pour afficher le cadrant de la réponse en rouge
      } else {
        this.reponseQuestion = 'Dommage, la bonne réponse était : ' + this.capitale
        this.success = false
      }
      // affiche le cadrant de la réponse
      this.hide = false
      this.questionEnCours = false
    },

    // Choisis aléatoirement un pays parmis le tableau d'objet "paysCapitales"
    choixPaysAleatoire () {
      // attribut le nombre de questions et de boutons choisis par le joueur
      this.setNbQuestion(this.modelNbQuestion)
      this.setNbBouton(this.modelNbBouton)
      // reset le tableau des capitales aléatoires pour n'avoir que 4 bouttons affichés
      this.tabCapitaleAleatoire = []

      do { // Permet de ne pas choisir 2 fois le même pays
        this.index = Math.floor(Math.random() * Math.floor(this.tabPays.length)) // Choisis un index aléatoirement
      } while (this.paysDejaSelectionne.includes(this.index))

      this.paysDejaSelectionne.push(this.index)
      this.tabCapitaleAleatoire.push(this.index)
      let v
      // modifier NB_BTN pour modifier le nombre de boutons affichés
      for (let i = 0; i < this.getNbBTN - 1; i++) {
        do {
          v = Math.floor(Math.random() * Math.floor(this.tabPays.length))
        } while (this.tabCapitaleAleatoire.includes(v))
        this.tabCapitaleAleatoire.push(v)
      }
      // Mélange le tableau des capitales de façon à ne pas avoir la réponse sur le même bouton
      this.shuffle(this.tabCapitaleAleatoire)

      this.capitale = this.tabCapitales[this.index] // attribut la capitale choisie aléatoirement
      this.pays = this.tabPays[this.index] // attribut le pays choisi aléatoirement

      this.questionEnCours = true
    },

    // Mélange le tableau des capitales de façon à ne pas avoir la réponse sur le même bouton
    shuffle: function (tab) {
      let IndexActuel = tab.length, v, IndexAleatoire
      // Tant qu'il reste des éléments à mélanger
      while (IndexActuel !== 0) {
        // On choisi un élément restant
        IndexAleatoire = Math.floor(Math.random() * IndexActuel)
        IndexActuel -= 1
        // Et on l'échange avec l'élément actuel
        v = tab[IndexActuel]
        tab[IndexActuel] = tab[IndexAleatoire]
        tab[IndexAleatoire] = v
      }
      return tab
    },

    // Vide les champs explication et reponse pour que ce soit moins redondant pour l'utilisateur
    viderChamp () {
      // stop le chronomètre si la partie est fini
      if (this.paysDejaSelectionne.length > this.getNBQuestion) {
        this.$refs.chrono.stop()
      }
      this.reponseQuestion = ''
      this.nextQuestion()
      this.hide = true
    },

    // Reset toutes les valeurs pour pouvoir redémarrer une partie correctement
    reset () {
      console.clear()
      this.modelNbBouton = null
      this.modelNbQuestion = null
      this.isStart = false
      this.isSelect = true
      this.questionEnCours = true
      this.hide = true
      this.actif = false
      this.resetPts()
      this.resetNumQuestion()
      this.resetTab()
      this.tabCapitaleAleatoire = []
      this.paysDejaSelectionne = []
      this.capitale = ''
      this.pays = ''
      this.reponseQuestion = ''
    },

    startChrono () {
      this.$refs.chrono.start()
    },

    resetChrono () {
      this.$refs.chrono.reset()
    },

    ...mapActions('quizzStore', ['addPts', 'resetPts', 'nextQuestion', 'resetNumQuestion', 'setNbQuestion', 'setNbBouton', 'loadData', 'resetTab', 'toggleRuleDialogShowing'])
  },

  computed: {
    ...mapGetters('quizzStore', ['getScoreJoueur', 'getNumQuestion', 'getNBQuestion', 'getNbBTN', 'getTabCapitales', 'getTabPays', 'getIsRuleDialogAlreadyShown']),
    ...mapState('quizzStore', ['tabCapitales', 'tabPays'])
  },

  components: {
    chrono,
    rules
  }
}
</script>

<style lang="stylus" scoped>
$rouge = #CB4335
$vert = #28B463
.red
  color $rouge
  background rgba(@color,0.85)

.green
  background rgba($vert,0.9)

MsSemiBold
  font-family 'Montserrat'

MsBlack
  font-family 'Montserrat'

</style>
