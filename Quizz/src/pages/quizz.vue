<template>
  <q-page padding>

  <div class="col-sm-9" @keyup.enter=verificationReponse(reponseUtilisateur)>
      <q-btn style="background: goldenrod; color: white" label="SUIVANT" @click="choixPaysAleatoire(); viderChamp()"/>
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
    </div>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      paysCapitales: [
        ['France', 'Espagne', 'Italie', 'Angleterre', 'Autriche', 'Norvege', 'Mali', 'Gabon', 'Chili', 'Corée du sud'],
        ['Paris', 'Madrid', 'Rome', 'Londres', 'Viennes', 'Oslo', 'Bamako', 'Libreville', 'Santiago', 'Seoul']
      ],
      paysDejaSelectionne: [], // stock l'index des pays déjà sélectionnés
      pays: '',
      capitale: '',
      reponseUtilisateur: '', // réponse de l'utilisateur
      reponseQuestion: '', // réponse de la réponse
      index: 0
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
      this.index = Math.floor(Math.random() * Math.floor(this.paysCapitales[0].length))
      this.capitale = this.paysCapitales[1][this.index]
      this.pays = this.paysCapitales[0][this.index]
      // renvoie l'index / le pays / la capitale dans la console (pour les tests)
      console.log('Index : ' + this.index)
      console.log('Pays : ' + this.paysCapitales[0][this.index])
      console.log('Capitale : ' + this.paysCapitales[1][this.index])
    },
    // Vide les champs explication et reponse pour que ce soit moins redondant pour l'utilisateur
    viderChamp () {
      this.reponseUtilisateur = ''
      this.reponseQuestion = ''
    }
  }
}
</script>

<style></style>
