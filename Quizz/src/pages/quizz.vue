<template>
    <q-page padding>

        <div class="col-sm-9">
          <h4>Version avec les boutons</h4>
          <q-btn style="background: goldenrod; color: white" label="START" @click="choixPaysAleatoire()"/>
          <h3>Quelle est la capitale du pays : {{ pays }}</h3>
          <!--
          <ul>
            <li v-for="pays in paysCapitales" :key="pays.paysCapitales">{{ pays }}</li>
          </ul>
          -->
          <div class="row q-gutter-lg">
            <div class="col-8 col-sm-6">
                <q-btn id="btn1" color="white" text-color="black" :label=capitale @click="clickReponse('paris')"/>
            </div>
            <div class="col-4 col-sm-6">
                <q-btn id="btn2" color="white" text-color="black" :label=capitale @click="clickReponse('monaco')"/>
            </div>
            <div class="col-8 col-sm-6">
                <q-btn id="btn3" color="white" text-color="black" :label=capitale @click="clickReponse('madrid')"/>
            </div>
            <div class="col-4 col-sm-6">
                <q-btn id="btn4" color="white" text-color="black" :label=capitale @click="clickReponse('barcelone')"/>
            </div>
          </div>
      </div>

    </q-page>
</template>

<script>
export default {
  data () {
    return {
      paysCapitales: [
        ['France', 'Espagne', 'Italie', 'Angleterre', 'Autriche', 'Mali', 'Gabon', 'Chili', 'Corée du sud'],
        ['Paris', 'Madrid', 'Rome', 'Londres', 'Viennes', 'Oslo', 'Bamako', 'Libreville', 'Santiago', 'Seoul']
      ],
      success: true,
      pays: '',
      capitale: '',
      index: 0,
      random: Math.random()
    }
  },
  methods: {
    choixPaysAleatoire () {
      this.index = Math.floor(Math.random() * Math.floor(this.paysCapitales.lenght))
      this.pays = this.paysCapitales[1][this.index]
      this.capitale = this.paysCapitales[0][this.index]
      console.log(this.capitale)
      console.log(this.pays)
    },
    clickReponse: function (reponse) {
      if (reponse === 'paris') {
        alert('Gagné !')
      } else {
        alert('Perdu ...')
      }
    }
  }
}
</script>

<style></style>
