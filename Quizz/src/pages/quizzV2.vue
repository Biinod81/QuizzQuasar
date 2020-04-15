<template>

  <div class="q-pa-xl" v-if="this.paysDejaSelectionne.length <= this.NB_QUESTION">
    <div class="MsSemiBold row justify-center">
      <q-btn style="background: goldenrod; color: white" label="START" @click="choixPaysAleatoire(); afficherBtn()" v-if="isStart"/>
      <q-btn style="background: #FF0080; color: white" label="RESET" @click="reset()" v-if="!isStart"/>
      <q-btn style="background: goldenrod; color: white" label="SUIVANT" @click="choixPaysAleatoire(); viderChamp()" v-if="!enCours"/>
    </div>
    <!-- Corps du quizz (questions + boutons) -->
    <div v-if="!isStart">

      <!--Indique le numéro de la questio en cours-->
      <div class="row justify-center">
        <h4 class="MsSemiBold">Question #{{ this.numQuestion }}/{{ this.NB_QUESTION }}<div class="MsBlack">Quelle est la capitale du pays : {{ this.pays }}</div></h4>
        <!-- Question -->
        <!--<h5 class="MsBlack">Quelle est la capitale du pays : {{ this.pays }}</h5>-->
      </div>

      <!--Affichage des boutons pour le joueur-->
      <div v-if="!this.questionRepondu">
        <div class="q-gutter-xl row justify-center">
            <q-btn class="MsSemiBold" color="white" text-color="black" :label=paysCapitales[indexBtn-1].capitale @click="verificationReponse($event)" v-for="indexBtn in this.NB_BTN" :key="indexBtn"/>
        </div>
      </div>
      <div v-else>
        <div class="q-gutter-xl row justify-center">
            <q-btn class="MsSemiBold" color="white" text-color="black" disabled :label=paysCapitales[indexBtn-1].capitale @click="verificationReponse($event)" v-for="indexBtn in this.NB_BTN" :key="indexBtn"/>
        </div>
      </div>

      <!--Réponse à la question-->
      <br><br><br>
      <div class="row justify-center" v-if="!this.hide">
        <div :class="{ green: success, red: !success }">
          <q-field outlined>
            <template v-slot:control>
              <div class="MsSemiBold" text-color="white"><b>{{ reponseQuestion }}</b></div>
            </template>
          </q-field>
        </div>
      </div>

    </div>
  </div>

  <!-- fin de partie -->
  <div class="q-pa-xl" v-else>
    <div class="row justify-center">
      <q-btn style="background: #FF0080; color: white" label="RESTART" @click="reset()" v-if="!isStart"/>
    </div>
    <div class="MsSemiBold row justify-center">
      <h3>Score final : {{ this.score }} / {{ this.NB_QUESTION }}</h3>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      paysCapitales: [
        { pays: 'France', capitale: 'Paris' },
        { pays: 'Espagne', capitale: 'Madrid' },
        { pays: 'Angleterre', capitale: 'Londres' },
        { pays: 'Italie', capitale: 'Rome' },
        { pays: 'Norvège', capitale: 'Oslo' },
        { pays: 'Singapour', capitale: 'Singapour' },
        { pays: 'Autriche', capitale: 'Viennes' },
        { pays: 'Australie', capitale: 'Canberra' },
        { pays: 'Japon', capitale: 'Tokyo' },
        { pays: 'Thaïlande', capitale: 'Bangkok' },
        { pays: 'Gabon', capitale: 'Libreville' },
        { pays: 'Chili', capitale: 'Santiago' },
        { pays: 'Corée du Sud', capitale: 'Séoul' }
      ],
      paysDejaSelectionne: [], // stock l'index des pays déjà sélectionnés
      NB_QUESTION: 5, // Nombre total de questions posées
      NB_BTN: 4, // Nombre de boutons dispo pour l'utilisateur
      reponseQuestion: '', // réponse de la réponse
      index: 0, // index permettant de choisir les capitales / pays
      pays: '',
      capitale: '',
      score: 0, // score du joueur
      numQuestion: 1, // indique le numéro de la question
      isStart: true, // VRAI si la partie n'a pas encore commencé, FAUX sinon
      enCours: true, // VRAI si il y a une question en cours, FAUX sinon
      success: true,
      questionRepondu: false,
      hide: true // cache la réponse à la question si VRAI, la dévoile si FAUX
    }
  },
  methods: {

    // vérifie la réponse de l'utilisateur et show un text en fonction de la réponse
    verificationReponse: function (reponse) {
      if (reponse.target.textContent.toUpperCase() === this.capitale.toUpperCase()) {
        this.reponseQuestion = 'Bien joué !'
        this.reponseQuestion.fontcolor('green')
        this.score++
        this.success = true
        console.log('Score du joueur : ' + this.score)
      } else {
        this.reponseQuestion.fontcolor('red')
        this.reponseQuestion = 'Dommage, la bonne réponse était : ' + this.capitale
        this.success = false
      }
      this.hide = false
      this.questionRepondu = true
      this.enCours = false
    },

    // Choisis aléatoirement un pays parmis le tableau d'objet "paysCapitales"
    choixPaysAleatoire () {
      do { // Permet de ne pas choisir 2 fois le même pays
        this.index = Math.floor(Math.random() * Math.floor(this.paysCapitales.length)) // Choisis un index aléatoirement
        console.log('Index sélectionné : ' + this.index) // renvoie l'index qui a été choisis
      } while (this.paysDejaSelectionne.includes(this.index))

      // ajoute l'index choisis aléatoirement dans le tableau paysDejaSelectionné
      this.paysDejaSelectionne.push(this.index)
      console.log('Index des Pays déjà sélectionné : ' + this.paysDejaSelectionne)

      this.capitale = this.paysCapitales[this.index].capitale // attribut la capitale choisie aléatoirement
      this.pays = this.paysCapitales[this.index].pays // attribut le pays choisi aléatoirement
      console.log('capitales : ' + this.capitale) // renvoie la capitale qui a été choisie
      console.log('pays : ' + this.pays) // renvoie la pays qui a été choisi

      this.enCours = true
    },

    // Vide les champs explication et reponse pour que ce soit moins redondant pour l'utilisateur
    viderChamp () {
      this.questionRepondu = false
      this.reponseQuestion = ''
      this.numQuestion++
      this.hide = true
    },

    // Permet d'afficher les boutons pour que le joueur puissent choisir une réponse
    afficherBtn () {
      this.isStart = false
    },

    // Remet les mêmes valeurs qu'en début de partie
    reset () {
      console.clear()
      this.score = 0
      this.questionRepondu = false
      this.hide = true
      this.numQuestion = 1
      this.isStart = true
      this.enCours = true
      this.paysDejaSelectionne.length = 0
      this.capitale = ''
      this.pays = ''
      this.reponseQuestion = ''
    }
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
.white {
  background-color: #ffffff;
}
.MsSemiBold {
  font-family: 'Montserrat SemiBold';
}
.MsBlack {
  font-family: 'Montserrat Black';
}
</style>
