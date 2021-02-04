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
          <div class="column-row-item">{{ track.title }}</div>
          <!-- Artist -->
          <div class="column-row-item">{{ track.artist }}</div>
          <!-- Album -->
          <div class="column-row-item">{{ track.album }}</div>
          <!-- Duration -->
          <div class="column-row-item">{{ track.duration }}</div>
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
  props: ['tracks'],
  data() {
    return {
      // tracks: [
      //   {
      //     title: 'Work',
      //     artist: 'Gang Starr',
      //     album: 'Moment Of Truth',
      //     duration: '2:58',
      //   },
      //   {
      //     title: 'Deadly Combination',
      //     artist: 'Big L, Tupac',
      //     album: 'The Big Picture',
      //     duration: '2:32',
      //   },
      //   {
      //     title: 'Still',
      //     artist: 'Geto Boys',
      //     album: 'The Resurrection',
      //     duration: '4:00',
      //   },
      //   {
      //     title: 'Drop',
      //     artist: 'The Pharcyde',
      //     album: 'Labcabincalifornia',
      //     duration: '5:34',
      //   },
      //   {
      //     title: 'Grown Man Sport',
      //     artist: 'Pete Rock, Inl',
      //     album: 'Center of Attention',
      //     duration: '4:36',
      //   },
      // ],
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
  font-size: 13px;
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
