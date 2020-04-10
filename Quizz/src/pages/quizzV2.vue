<template>

  <div class="q-pa-xl" v-if="this.paysDejaSelectionne.length <= this.NB_QUESTION">
      <q-btn style="background: goldenrod; color: white" label="START" @click="choixPaysAleatoire(); afficherBtn()" v-if="isHidden"/>
      <q-btn style="background: #FF0080; color: white" label="RESET" @click="reset(); viderChamp()" v-if="!isHidden"/>
      <q-btn style="background: goldenrod; color: white" label="SUIVANT" @click="choixPaysAleatoire(); viderChamp()" v-if="!enCours"/>

      <!-- Corps du quizz (questions + boutons) -->
      <div  v-if="!isHidden">
        <!-- Question -->
        <h3>Quelle est la capitale du pays : {{ pays }}</h3>

        <div class="row" style="height: 75px" v-for="indexBtn in NB_BTN" :key="indexBtn">
          <div class="col">
            <q-btn color="white" text-color="black" :label=paysCapitales[indexBtn-1].capitale @click="verificationReponse($event)" />
          </div>
        </div>

        <div style="max-width: 600px">
            <q-field filled stack-label>
            <template v-slot:control>
                <div class="self-center full-width no-outline"> {{ reponseQuestion }}</div>
            </template>
            </q-field>
        </div>
      </div>
  </div>

  <!-- fin de partie -->
  <div v-else>
    <q-btn style="background: #FF0080; color: white" label="RESTART" @click="reset(); viderChamp()" v-if="!isHidden"/>
    <h2>Bien joué</h2>
    <h2>Voici votre score : {{ this.score }} / {{ this.NB_QUESTION }}</h2>
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
      score: 0,
      isHidden: true, // VRAI si la partie n'a pas encore commencé, FAUX sinon
      enCours: true // VRAI si il y a une question en cours, FAUX sinon
    }
  },
  methods: {

    // vérifie la réponse de l'utilisateur et show un text en fonction de la réponse
    verificationReponse: function (reponse) {
      if (reponse.target.textContent.toUpperCase() === this.capitale.toUpperCase()) {
        this.reponseQuestion = 'Bien joué !'
        this.enCours = false
        this.score++
        console.log('Score du joueur : ' + this.score)
      } else {
        this.reponseQuestion = 'Dommage, la bonne réponse était : ' + this.capitale
        this.enCours = false
      }
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
      this.reponseQuestion = ''
    },

    afficherBtn () {
      this.isHidden = false
    },

    // vide le tableau des pays déjà choisis, remet des valeurs null pour "capitale" et "pays" et clear la console
    reset () {
      console.clear()
      this.score = 0
      this.isHidden = true
      this.paysDejaSelectionne.length = 0
      this.capitale = ''
      this.pays = ''
      console.log('Tableau des pays déjà sélectionné vidé !' + this.paysDejaSelectionne)
    }
  }
}
</script>

<style></style>
