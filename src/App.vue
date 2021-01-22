<template>
  <the-header />
  <router-view />
  <the-footer />
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

a {
  text-decoration: none;
}
</style>
