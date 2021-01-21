<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: '',
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #fff;
  border: 1px solid #fff;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #ccc;
  border-color: #ccc;
}

.flat-green {
  background-color: #32cd32;
  border: none;
  color: black;
  font-weight: bold;
}
.flat-dark {
  background-color: #222327;
  border: none;
  color: #32cd32;
  font-weight: bold;
}
.flat-light {
  background-color: #fff;
  border: none;
  color: #32cd32;
  font-weight: bold;
}

.flat-green:hover,
.flat-green:active {
  background-color: #00a300;
}

.flat-dark:hover,
.flat-dark:active {
  background-color: #32343a;
}

.flat-light:hover,
.flat-light:active {
  background-color: #ddd;
}
</style>
