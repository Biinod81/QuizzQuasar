<template>
  <q-layout view="lHh Lpr lFf">
    <q-toolbar>
      <q-toolbar-title class="q-pa-xl text-center MsBlack">
        <q-avatar size="60px">
          <img src="https://image.flaticon.com/icons/svg/814/814513.svg">
        </q-avatar>
        Jeu des capitales
      </q-toolbar-title>
    </q-toolbar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style>
.MsSemiBold {
  font-family: 'Montserrat SemiBold';
}
.MsBlack {
  font-family: 'Montserrat Black';
}
</style>
