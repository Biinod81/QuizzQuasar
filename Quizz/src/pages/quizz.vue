<template>
    <q-page padding>

      <div class="col-sm-9">
        <h4>Version avec les boutons</h4>
        <q-btn style="background: goldenrod; color: white" label="SUIVANT" @click="choixPaysAleatoire()"/>
        <h3>Quelle est la capitale du pays : {{ pays }}</h3>
        <!--
        <ul>
          <li v-for="pays in paysCapitales" :key="pays.paysCapitales">{{ pays }}</li>
        </ul>
        -->
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input outlined label="Entrez votre réponse ici" v-model="reponse"/>
          <br>
        </div>

        <q-btn color="primary" label="Valider" @click="verificationReponse(reponse)"/>

        <div class="q-gutter-md" style="max-width: 600px">
          <q-field filled stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline"> {{ explication }}</div>
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
      reponse: '', // réponse de l'utilisateur
      explication: '',
      index: 0
    }
  },
  methods: {
    verificationReponse: function (reponse) {
      if (this.reponse.toUpperCase() === this.capitale.toUpperCase()) {
        this.explication = 'Bien joué !'
      } else {
        this.explication = 'Dommage, il fallait répondre : ' + this.capitale
      }
    },
    // @keyup.enter="function()" <- execute la function en appuyant sur entrer
    choixPaysAleatoire () {
      this.index = Math.floor(Math.random() * Math.floor(this.paysCapitales[0].length))
      this.capitale = this.paysCapitales[1][this.index]
      this.pays = this.paysCapitales[0][this.index]
      console.log('Index : ' + this.index)
      console.log(this.paysCapitales[1][this.index])
      console.log(this.paysCapitales[0][this.index])
    },
    clickReponse: function (reponse) {
      if (reponse === this.capitale) {
        alert('Gagné !')
      } else {
        alert('Perdu ...')
      }
    }
  }
}
</script>

<style></style>
