<template>
  <div>
    <Header />
    <router-view to="transactions"></router-view>
    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
</script>

<style lang="scss" scoped></style>
