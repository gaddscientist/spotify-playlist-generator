<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  background: #222327;
  box-shadow: 0 2px 24px 8px rgba(0, 0, 0, 1);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
