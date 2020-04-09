<template>
    <q-page padding>

    <div class="col-sm-9" @keyup.enter=verificationReponse(reponseUtilisateur)>
        <q-btn style="background: goldenrod; color: white" label="START / SUIVANT" @click="choixPaysAleatoire(); viderChamp()"/>
        <q-btn style="background: #FF0080; color: white" label="RESET" @click="reset(); viderChamp()"/>
        <h3>Quelle est la capitale du pays : {{ pays }}</h3>

        <div class="q-gutter-y-md" style="max-width: 600px">
            <q-tabs v-for="indexBtn in NB_BTN" :key="indexBtn">
              <q-btn v-model="reponseUtilisateur" color="white" text-color="black" :label=paysCapitales[indexBtn-1].capitale @click="verificationReponse(paysCapitales[indexBtn-1].capitale)" />
            </q-tabs>
        </div>

        <div class="q-gutter-md" style="max-width: 300px">
            <q-input outlined label="Entrez votre réponse ici" v-model="reponseUtilisateur"/>
            <br>
        </div>

        <q-btn color="primary" label="Valider" @click="verificationReponse(reponseUtilisateur)"/>

        <div class="q-gutter-md" style="max-width: 600px">
            <q-field filled stack-label>
            <template v-slot:control>
                <div class="self-center full-width no-outline"> {{ reponseQuestion }}</div>
            </template>
            </q-field>
        </div>

    </div>

  </q-page>
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
      NB_QUESTION: 10, // Nombre total de questions posées
      NB_BTN: 4, // Nombre de boutons dispo pour l'utilisateur
      reponseUtilisateur: '', // réponse de l'utilisateur
      reponseQuestion: '', // réponse de la réponse
      index: 0, // index permettant de choisir les capitales / pays
      pays: '',
      capitale: ''
    }
  },
  methods: {

    // vérifie la réponse de l'utilisateur et show un text en fonction de la réponse
    verificationReponse: function (reponse) {
      if (this.reponse.toUpperCase() === this.capitale.toUpperCase()) {
        this.reponseQuestion = 'Bien joué !'
      } else {
        this.reponseQuestion = 'Dommage, il fallait répondre : ' + this.capitale
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

      this.capitale = this.paysCapitales[this.index].capitale // attribut la capitale choisie aléatoirement à la variable "capitale"
      this.pays = this.paysCapitales[this.index].pays // attribut le pays choisi aléatoirement à la variable "pays"
      console.log('capitales : ' + this.capitale) // renvoie la capitale qui a été choisie
      console.log('pays : ' + this.pays) // renvoie la pays qui a été choisi
    },

    // Vide les champs explication et reponse pour que ce soit moins redondant pour l'utilisateur
    viderChamp () {
      this.reponseUtilisateur = ''
      this.reponseQuestion = ''
    },

    // vide le tableau des pays déjà choisis, remet des valeurs null pour "capitale" et "pays" et clear la console
    reset () {
      console.clear()
      this.paysDejaSelectionne.length = 0
      this.capitale = ''
      this.pays = ''
      console.log('Tableau des pays déjà sélectionné vidé !' + this.paysDejaSelectionne)
    }
  }
}
</script>

<style></style>
