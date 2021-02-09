<template>
  <div class="content">
    <base-card>
      <div class="playlist">
        <div class="table-header">
          <!-- Title -->
          <div class="column-header-item">Title</div>
          <!-- Artist -->
          <div class="column-header-item">Artist</div>
          <!-- Album -->
          <div class="column-header-item">Album</div>
          <!-- Duration -->
          <div class="column-header-item">Duration</div>
        </div>
        <div class="table-row" v-for="(track, index) in tracks" :key="index">
          <!-- Title -->
          <!-- <div class="column-row-item">{{ track.title }}</div> -->
          <div class="column-row-item">{{ track.data.name }}</div>
          <!-- Artist -->
          <!-- <div class="column-row-item">{{ track.artist }}</div> -->
          <div class="column-row-item">{{ track.data.artists[0].name }}</div>
          <!-- Album -->
          <div class="column-row-item">{{ track.album }}</div>
          <div class="column-row-item">{{ track.data.album.name }}</div>
          <!-- Duration -->
          <div class="column-row-item">{{ track.data.duration_ms / 1000 }}</div>
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
  mounted() {
    console.log(this.$store.getters['getTracks']);
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
  display: flex;
  flex: 1;
  align-items: center;
  position: relative;
  margin-right: 10px;
}
</style>
