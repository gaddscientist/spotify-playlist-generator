<template>
  <div class="content">
    <base-card>
      <div class="playlist">
        <div class="table-header">
          <!-- Title -->
          <div>Title</div>
          <!-- Artist -->
          <div>Artist</div>
          <!-- Album -->
          <div>Album</div>
          <!-- Date Added -->
          <div>Date Added</div>
          <!-- Duration -->
          <div>Duration</div>
        </div>
        <div class="table-row" v-for="(track, index) in tracks" :key="index">
          <!-- Title -->
          <div>{{ track.title }}</div>
          <!-- Artist -->
          <div>{{ track.artist }}</div>
          <!-- Album -->
          <div>{{ track.album }}</div>
          <!-- Date Added -->
          <div>{{ track.date }}</div>
          <!-- Duration -->
          <div>{{ track.duration }}</div>
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
      tracks: [
        {
          title: 'Work',
          artist: 'Gang Starr',
          album: 'Moment Of Truth',
          date: '2015-05-13',
          duration: '2.58',
        },
        {
          title: 'Deadly Combination',
          artist: 'Big L, Tupac',
          album: 'The Big Picture',
          date: '2019-02-18',
          duration: '2.32',
        },
        {
          title: 'Still',
          artist: 'Geto Boys',
          album: 'The Resurrection',
          date: '2019-03-20',
          duration: '4.00',
        },
        {
          title: 'Drop',
          artist: 'The Pharcyde',
          album: 'Labcabincalifornia',
          date: '2020-02-25',
          duration: '5.34',
        },
        {
          title: 'Grown Man Sport',
          artist: 'Pete Rock, Inl',
          album: 'Center of Attention',
          date: '2018-07-17',
          duration: '4.36',
        },
      ],
    };
  },
};
</script>

<style scoped>
.content {
  background: #333 url('../assets/spotify_background_logo.jpeg') no-repeat fixed
    center/cover;
  min-height: 93vh;
}
.playlist {
  display: flex;
  flex-direction: column;
  background: #1d1f20;
  color: white;
}

.table-header,
.table-row {
  position: relative;
  display: flex;
  min-height: 40px;
  padding: 5px;
  color: #fff;
  background: #1d1f20;
  font-size: 13px;
  line-height: 15px;
  border-bottom: 1px solid #333;
}

div {
  display: flex;
  flex: 1;
  align-items: center;
  position: relative;
  margin-right: 10px;
}
</style>
