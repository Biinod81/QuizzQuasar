<template>
  <a-page class="flex flex center">
    <Quizz></Quizz>
  </a-page>
</template>

<script>
import Quizz from './quizz'
export default {
  name: 'PageIndex',
  components: { Quizz }
}
</script>
