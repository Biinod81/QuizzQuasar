<template>
  <div>
    <div>
      <span>{{ minutes }} : {{ secondes }}</span>
    </div>
    <q-btn @click="start" label="START"></q-btn>
    <q-btn @click="stop" label="STOP"></q-btn>
    <q-btn @click="reset" label="RESET"></q-btn>
  </div>
</template>

<script>

export default {
  data () {
    return {
      minutes: 0,
      secondes: 0,
      isStoped: true
    }
  },
  methods: {
    compteur () {
      if (this.isStoped === false) {
        setTimeout(this.secondes++, 1000)
        if (this.secondes === 60) {
          setTimeout(this.minutes++, 1000)
          this.secondes = 0
        }
      }
    },
    start () {
      this.isStoped = false
      this.timer()
    },
    stop () {
      this.isStoped = true
    },
    reset () {
      console.log('reset')
      console.clear()
      this.secondes = 0
      this.minutes = 0
    },
    timer () {
      setInterval(this.compteur, 1000)
    }
  }
}
</script>
