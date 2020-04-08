<template>
    <q-page padding>

        <div class="col-sm-9">
            <h3>Quelle est la capitale du pays : France ?</h3>

            <div class="row q-gutter-lg">
                <div class="col-8 col-sm-6">
                    <q-btn id="Paris" color="white" text-color="black" label="Paris" v-on:click="clickReponse('paris')"/>
                </div>
                <div class="col-4 col-sm-6">
                    <q-btn id="Monaco" color="white" text-color="black" label="Monaco" v-on:click="clickReponse('monaco')"/>
                </div>
                <div class="col-8 col-sm-6">
                    <q-btn id="Madrid" color="white" text-color="black" label="Madrid" v-on:click="clickReponse('madrid')"/>
                </div>
                <div class="col-4 col-sm-6">
                    <q-btn id="Barcelone" color="white" text-color="black" label="Barcelone" v-on:click="clickReponse('barcelone')"/>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
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
