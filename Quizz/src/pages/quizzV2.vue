<template>
    <q-page padding>

    <div class="col-sm-9" @keyup.enter=verificationReponse(reponseUtilisateur)>
        <q-btn style="background: goldenrod; color: white" label="START / SUIVANT" @click="choixPaysAleatoire(); viderChamp()"/>
        <q-btn style="background: goldenrod; color: white" label="RESET" @click="reset(); viderChamp()"/>
        <h3>Quelle est la capitale du pays : {{ pays }}</h3>

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

        <div class="q-gutter-y-md" style="max-width: 600px">
            <q-tabs

            >
                <q-btn color="white" text-color="black" label="test" />
            </q-tabs>
        </div>
    </div>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      TabPaysCapitales: [
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
      NB_QUESTION: 10,
      reponseUtilisateur: '', // réponse de l'utilisateur
      reponseQuestion: '', // réponse de la réponse
      index: 0,
      pays: '',
      capitale: ''
    }
  },
  methods: {
    // vérifie la réponse de l'utilisateur et show un text en fonction de la réponse
    verificationReponse: function (reponse) {
      if (this.reponseUtilisateur.toUpperCase() === this.capitale.toUpperCase()) {
        this.reponseQuestion = 'Bien joué !'
      } else {
        this.reponseQuestion = 'Dommage, il fallait répondre : ' + this.capitale
      }
    },

    // Choisis aléatoirement un pays parmis le tableau
    choixPaysAleatoire () {
      // Permet de ne pas choisir 2 fois le même pays
      do {
        this.index = Math.floor(Math.random() * Math.floor(this.TabPaysCapitales.length)) // Choisis un index aléatoirement
      } while (this.paysDejaSelectionne.includes(this.index))

      // ajoute l'index choisis aléatoirement dans le tableau paysDejaSelectionné
      this.paysDejaSelectionne.push(this.index)
      console.log('Index des Pays déjà sélectionné ' + this.paysDejaSelectionne)

      this.capitale = this.TabPaysCapitales[this.index].capitale // renvoie les capitales
      this.pays = this.TabPaysCapitales[this.index].pays // renvoie les pays
      // renvoie l'index / le pays / la capitale dans la console (pour les tests)
      console.log('Index : ' + this.index) // renvoie l'index actuel
      console.log('capitales : ' + this.capitale)
      console.log('pays : ' + this.pays)
    },
    // Vide les champs explication et reponse pour que ce soit moins redondant pour l'utilisateur
    viderChamp () {
      this.reponseUtilisateur = ''
      this.reponseQuestion = ''
    },
    // vide le tableau des pays déjç choisis
    reset () {
      this.paysDejaSelectionne.length = 0
      this.capitale = ''
      this.pays = ''
      console.log('Tableau des pays déjà sélectionné vidé !' + this.paysDejaSelectionne)
    }
  }
}
</script>

<style></style>
