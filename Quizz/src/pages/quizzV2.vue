<template>
  <div>
    <!--Sélection du nombre de questions et de boutons-->
    <div class="q-pa-xl" v-if=isSelect>
      <div class="q-gutter-md row justify-center">
        <div class="col-3">
          <q-select outlined v-model="modelNbQuestion" :options="optionsNbQuestion" label="Nombre de questions" />
        </div>
        <div class="col-3">
          <q-select outlined v-model="modelNbBouton" :options="optionsNbBoutons" label="Nombre de boutons" />
        </div>
      </div>
      <br>
      <!--Désactive le bouton START tant que le nombre de boutons et de questions n'a pas été sélectionné-->
      <div class="q-gutter-lg MsSemiBold row justify-center" v-if="this.modelNbBouton === null || this.modelNbQuestion === null">
          <q-btn style="background: goldenrod; color: white" disabled label="VALIDER"/>
      </div>
      <div class="q-gutter-lg MsSemiBold row justify-center" v-else>
          <q-btn style="background: goldenrod; color: white" label="VALIDER" @click="activerStart(); loadData()" v-if="!actif"/>
          <q-btn style="background: goldenrod; color: white" label="START" @click="choixPaysAleatoire(); afficherBtn()" v-if="actif"/>
      </div>
    </div>

    <!--jeu-->
    <div v-else>
      <div class="q-pa-xl" v-if="this.paysDejaSelectionne.length <= this.getNBQuestion">
        <!--score du joueur + bouton reset-->
        <div class="q-gutter-md MsSemiBold row justify-end">
          <div class="q-gutter-lg col-3">
            <q-btn v-if="isStart">SCORE : {{ this.getScoreJoueur }}</q-btn>
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
              <q-btn style="background: goldenrod; color: white" label="SUIVANT" @click="choixPaysAleatoire(); viderChamp()" v-if="!questionEnCours"/>
            </div>
          </div>

        </div>
      </div>

      <!-- fin de partie -->
      <div class="MsBlack q-pa-xl" v-else>
        <div class="row justify-center">
          <q-btn style="background: #FF0080; color: white" label="RESTART" @click="reset()" v-if="isStart"/>
        </div>
        <div class="row justify-center">
          <h4>Score final : {{ this.getScoreJoueur }} / {{ this.getNBQuestion }}</h4>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      modelNbQuestion: null,
      modelNbBouton: null,
      optionsNbQuestion: [
        '5', '10', '15'
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
      actif: false, // VRAI si le bouton start est actif, FAUX sinon
      isStart: false, // VRAI si la partie a commencé, FAUX sinon
      isSelect: true, // VRAI si le joueur est en train de sélectionner le nb de bouton / question, FAUX si il est en train de jouer
      questionEnCours: true, // VRAI si il y a une question en cours, FAUX sinon
      success: true, // VRAI = cadrant de la réponse VERT, FAUX = cadrant de la réponse ROUGE
      hide: true // cache le cadrant de la réponse à la question si VRAI, la dévoile si FAUX
    }
  },
  methods: {
    // Permet d'afficher les boutons pour que le joueur puissent choisir une réponse
    afficherBtn () {
      this.isStart = true
      this.isSelect = false
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
      this.setNbQuestion(this.modelNbQuestion)
      this.setNbBouton(this.modelNbBouton)
      // reset le tableau des capitales aléatoires pour n'avoir que 4 bouttons affichés
      this.tabCapitaleAleatoire = []

      do { // Permet de ne pas choisir 2 fois le même pays
        this.index = Math.floor(Math.random() * Math.floor(this.tabPays.length)) // Choisis un index aléatoirement
        console.log('Index sélectionné : ' + this.index) // renvoie l'index qui a été choisis
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
      console.log('Index des Pays déjà sélectionné : ' + this.paysDejaSelectionne)
      console.log('Tab des capitales aléatoire : ' + this.tabCapitaleAleatoire)

      this.capitale = this.tabCapitales[this.index] // attribut la capitale choisie aléatoirement
      this.pays = this.tabPays[this.index] // attribut le pays choisi aléatoirement
      console.log('capitales : ' + this.capitale) // renvoie la capitale qui a été choisie
      console.log('pays : ' + this.pays) // renvoie la pays qui a été choisi

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
      this.reponseQuestion = ''
      this.nextQuestion()
      this.hide = true
    },

    activerStart () {
      this.actif = true
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

    ...mapActions('quizzStore', ['addPts', 'resetPts', 'nextQuestion', 'resetNumQuestion', 'setNbQuestion', 'setNbBouton', 'loadData', 'resetTab'])
  },

  computed: {
    ...mapGetters('quizzStore', ['getScoreJoueur', 'getNumQuestion', 'getNBQuestion', 'getNbBTN', 'getTabCapitales', 'getTabPays']),
    ...mapState('quizzStore', ['tabCapitales', 'tabPays'])
  }
}
</script>

<style>
.red {
  background-color: #CB4335;
}
.green {
  background-color: #28B463;
}
.MsSemiBold {
  font-family: 'Montserrat SemiBold';
}
.MsBlack {
  font-family: 'Montserrat Black';
}
</style>
