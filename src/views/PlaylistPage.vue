<template>
  <div class="content">
    <base-card>
      <div class="playlist">
        <div class="table-header">
          <!-- Title -->
          <div class="column-header-item title">Title</div>
          <!-- Artist -->
          <div class="column-header-item">Artist</div>
          <!-- Album -->
          <div class="column-header-item">Album</div>
          <!-- Duration -->
          <div class="column-header-item duration">Duration</div>
          <!-- Remove -->
          <div class="column-header-item remove">Remove</div>
        </div>
        <div class="table-row" v-for="(track, index) in tracks" :key="index">
          <!-- Title -->
          <div class="column-row-item title">{{ track.name }}</div>
          <!-- Artist -->
          <div class="column-row-item">{{ track.artist }}</div>
          <!-- Album -->
          <div class="column-row-item">{{ track.album }}</div>
          <!-- Duration -->
          <div class="column-row-item duration">{{ track.duration }}</div>
          <!-- Remove -->
          <button class="column-row-item remove">X</button>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseCard from '../components/ui/BaseCard.vue';

export default {
  components: {
    BaseCard,
  },
  data() {
    return {
      tracks: this.$store.getters['getTracks'],
    };
  },
};
</script>

<style scoped>
.content {
  min-height: 93vh;
  margin-top: 2rem;
}
.playlist {
  display: flex;
  flex-direction: column;
  background: #1d1f20;
  color: white;
}

.table-header,
.table-row {
  display: flex;
  min-height: 40px;
  padding: 5px;
  color: #fff;
  font-size: 15px;
  border-bottom: 1px solid #333;
}
.column-header-item,
.column-row-item {
  flex: 0 1 250px;
  align-self: center;
  margin: 0 10px;
}
.column-row-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  flex: 0 0 250px;
}
.duration {
  flex: 0 0 80px;
  text-align: center;
}
.remove {
  flex: 0 0 60px;
}
.column-row-item.remove {
  border: none;
  background: transparent;
  color: red;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
}
.column-row-item.remove:hover {
  background: red;
  color: black;
}
</style>
