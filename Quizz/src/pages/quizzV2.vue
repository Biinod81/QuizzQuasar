<template>

  <div class="q-pa-xl" v-if="this.paysDejaSelectionne.length <= this.NB_QUESTION">
    <div class="MsSemiBold row justify-center">
      <q-btn style="background: goldenrod; color: white" label="START" @click="choixPaysAleatoire(); afficherBtn()" v-if="!isStart"/>
      <q-btn style="background: #FF0080; color: white" label="RESET" @click="reset()" v-if="isStart"/>
      <q-btn style="background: goldenrod; color: white" label="SUIVANT" @click="choixPaysAleatoire(); viderChamp()" v-if="!questionEnCours"/>
    </div>
    <!-- Corps du quizz (questions + boutons) -->
    <div v-if="isStart">

      <!--Indique le numéro de la questio en cours + l'énoncé de la question-->
      <div class="row justify-center">
        <h4 class="MsSemiBold">Question #{{ this.numQuestion }}/{{ this.NB_QUESTION }}<div class="MsBlack">Quelle est la capitale du pays : {{ this.pays }}</div></h4>
      </div>

      <!--Affiche les boutons actifs si il y a une question en cours-->
      <div v-if="this.questionEnCours">
        <div class="q-gutter-xl row justify-center">
            <q-btn class="MsSemiBold" color="white" text-color="black" v-for="indexBtn in this.tabCapitaleAleatoire" :key="indexBtn" :label=paysCapitales[indexBtn].capitale @click="verificationReponse($event)"/>
        </div>
      </div>
      <!--Affiche les boutons désactivés si il n'y a pas de question en cours-->
      <div v-else>
        <div class="q-gutter-xl row justify-center">
            <q-btn class="MsSemiBold" color="white" text-color="black" v-for="indexBtn in this.tabCapitaleAleatoire" :key="indexBtn" disabled :label=paysCapitales[indexBtn].capitale @click="verificationReponse($event)"/>
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
      <q-btn style="background: #FF0080; color: white" label="RESTART" @click="reset()" v-if="isStart"/>
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
        { pays: 'Corée du Sud', capitale: 'Séoul' },
        { pays: 'Mali', capitale: 'Bamako' },
        { pays: 'Grèce', capitale: 'Athène' },
        { pays: 'Liban', capitale: 'Beyrouth' },
        { pays: 'Philippines', capitale: 'Manille' },
        { pays: 'Mozambique', capitale: 'Maputo' },
        { pays: 'Yémen', capitale: 'Sanaa' },
        { pays: 'Biélorussie', capitale: 'Minsk' },
        { pays: 'Croatie', capitale: 'Zagreb' },
        { pays: 'Nouvelle-Zélande', capitale: 'Wellington' },
        { pays: 'Maroc', capitale: 'Rabat' },
        { pays: 'Cuba', capitale: 'La Havane' },
        { pays: 'Suisse', capitale: 'Berne' },
        { pays: 'Belgique', capitale: 'Bruxelles' }
      ],
      paysDejaSelectionne: [], // stock l'index des pays déjà sélectionnés
      tabCapitaleAleatoire: [],
      NB_QUESTION: 5, // Nombre total de questions posées
      NB_BTN: 4, // Nombre de boutons dispo pour l'utilisateur
      reponseQuestion: '', // réponse de la réponse
      index: 0, // index permettant de choisir les capitales / pays
      pays: '',
      capitale: '',
      score: 0, // score du joueur
      numQuestion: 1, // indique le numéro de la question
      isStart: false, // VRAI si la partie a commencé, FAUX sinon
      questionEnCours: true, // VRAI si il y a une question en cours, FAUX sinon
      success: true, // VRAI = cadrant de la réponse VERT, FAUX = cadrant de la réponse ROUGE
      hide: true // cache le cadrant de la réponse à la question si VRAI, la dévoile si FAUX
    }
  },
  methods: {

    // vérifie la réponse de l'utilisateur et show un text en fonction de la réponse
    verificationReponse: function (reponse) {
      // si VRAI, on augemente le score du joueur et passe success à TRUE pour afficher le cadrant de la réponse en vert
      if (reponse.target.textContent.toUpperCase() === this.capitale.toUpperCase()) {
        this.reponseQuestion = 'Bien joué !'
        this.score++
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
      // reset le tableau des capitales aléatoires pour n'avoir que 4 bouttons affichés
      this.tabCapitaleAleatoire = []

      do { // Permet de ne pas choisir 2 fois le même pays
        this.index = Math.floor(Math.random() * Math.floor(this.paysCapitales.length)) // Choisis un index aléatoirement
        console.log('Index sélectionné : ' + this.index) // renvoie l'index qui a été choisis
      } while (this.paysDejaSelectionne.includes(this.index))

      this.paysDejaSelectionne.push(this.index)
      this.tabCapitaleAleatoire.push(this.index)
      let v
      // modifier NB_BTN pour modifier le nombre de boutons affichés
      for (let i = 0; i < this.NB_BTN - 1; i++) {
        do {
          v = Math.floor(Math.random() * Math.floor(this.paysCapitales.length))
        } while (this.tabCapitaleAleatoire.includes(v))
        this.tabCapitaleAleatoire.push(v)
      }
      // Mélange le tableau des capitales de façon à ne pas avoir la réponse sur le même bouton
      this.shuffle(this.tabCapitaleAleatoire)
      console.log('Index des Pays déjà sélectionné : ' + this.paysDejaSelectionne)
      console.log('Tab des capitales aléatoire : ' + this.tabCapitaleAleatoire)

      this.capitale = this.paysCapitales[this.index].capitale // attribut la capitale choisie aléatoirement
      this.pays = this.paysCapitales[this.index].pays // attribut le pays choisi aléatoirement
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
      this.numQuestion++
      this.hide = true
    },

    // Permet d'afficher les boutons pour que le joueur puissent choisir une réponse
    afficherBtn () {
      this.isStart = true
    },

    // Reset de toutes les valeurs pour pouvoir redémarrer une partie correctement
    reset () {
      console.clear()
      this.isStart = false
      this.questionEnCours = true
      this.hide = true
      this.score = 0
      this.numQuestion = 1
      this.tabCapitaleAleatoire = []
      this.paysDejaSelectionne = []
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
.MsSemiBold {
  font-family: 'Montserrat SemiBold';
}
.MsBlack {
  font-family: 'Montserrat Black';
}
</style>
