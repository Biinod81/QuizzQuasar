<template>
  <div>
    <q-field outlined>
      <template v-slot:prepend>
        <q-icon name="timer" />
      </template>

      <template v-slot:control>
        <div class="self-center full-width no-outline">{{ minutes }} : {{ secondes }}</div>
      </template>
    </q-field>
  </div>
</template>

<script>
export default {
  data () {
    return {
      minutes: '00',
      secondes: '00',
      isStoped: true,
      x: null
    }
  },
  methods: {
    compteur () {
      if (this.isStoped === false) {
        // compte une seconde
        setTimeout(this.secondes = this.zeroPrefix(this.secondes), 1000)
        if (this.secondes === 60) {
          this.minutes = this.zeroPrefix(this.minutes)
          this.secondes = '00'
        }
      }
    },
    // start le chrono
    start () {
      this.isStoped = false
      this.timer()
    },
    // stop le chrono
    stop () {
      this.isStoped = true
      clearInterval(this.x)
    },
    reset () {
      this.secondes = '00'
      this.minutes = '00'
    },
    // place un 0 avant chaque chiffre entre 0-9 pour avoir '01' au lieux de '1'
    zeroPrefix: function (v) {
      if (v > 8) {
        v++
      } else {
        v = '0' + ++v
      }
      return v
    },
    // permet de compter à chaque secondes
    timer () {
      this.x = setInterval(this.compteur, 1000)
    }
  }
}
</script>
