<template>
    <q-page padding>

        <div class="col-sm-9">
            <!--
            <h3>Quelle est la capitale du pays : France ?</h3>
            <ul>
              <li v-for="pays in paysCapitales" :key="pays.paysCapitales">{{ pays }}</li>
            </ul>
            -->
            <div class="row q-gutter-lg">
                <div class="col-8 col-sm-6">
                    <q-btn color="white" text-color="black" v-bind:label=paysCapitales[1][0] v-on:click="clickReponse('paris')"/>
                </div>
                <div class="col-4 col-sm-6">
                    <q-btn color="white" text-color="black" v-bind:label=paysCapitales[2][0] v-on:click="clickReponse('monaco')"/>
                </div>
                <div class="col-8 col-sm-6">
                    <q-btn color="white" text-color="black" v-bind:label=paysCapitales[3][0] v-on:click="clickReponse('madrid')"/>
                </div>
                <div class="col-4 col-sm-6">
                    <q-btn color="white" text-color="black" v-bind:label=paysCapitales[4][0] v-on:click="clickReponse('barcelone')"/>
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
        ['France', 'Espagne', 'Italie', 'Angleterre', 'Autriche'],
        ['Paris', 'Madrid', 'Rome', 'Londres', 'Viennes']
      ]
    }
  },
  methods: {
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
