<template>
  <!-- FIX DISPLAY ISSUES WITH DEVTOOLS OPEN -->
  <base-card>
    <form @submit.prevent="submitForm">
      <h1>Generate a Playlist</h1>
      <div class="form-row">
        <div class="form-control">
          <label for="user">Username</label>
          <input type="text" id="user" v-model="username" />
          <!-- <p>Username must not be empty</p> -->
        </div>
        <div class="form-control">
          <label for="multi">Multireddit</label>
          <input type="text" id="multi" v-model="multireddit" />
          <!-- <p>Multireddit must not be empty</p> -->
        </div>
      </div>
      <div class="form-row">
        <div class="form-control">
          <label for="num-songs">Number of songs</label>
          <input type="number" id="num-songs" v-model="numSongs" />
          <!-- <p>Number of songs must be greater than 0</p> -->
        </div>
        <div class="form-control">
          <label for="upvotes">Minimum Upvotes</label>
          <input type="number" id="upvotes" v-model="minUpvotes" />
          <!-- <p>Minimum number of upvotes must be greater than 0</p> -->
        </div>
      </div>
      <div class="form-control">
        <h3>Sort By</h3>
        <div>
          <label for="hot">Hot</label>
          <input
            name="sort"
            type="radio"
            id="hot"
            value="hot"
            @change="toggleTop"
            v-model="sort"
          />
        </div>
        <div>
          <label for="top">Top</label>
          <input
            name="sort"
            type="radio"
            id="top"
            value="top"
            @change="toggleTop"
            v-model="sort"
          />
        </div>
        <div>
          <label for="new">New</label>
          <input
            name="sort"
            type="radio"
            id="new"
            value="new"
            @change="toggleTop"
            v-model="sort"
          />
        </div>
        <div>
          <label for="rising">Rising</label>
          <input
            name="sort"
            type="radio"
            id="rising"
            value="rising"
            @change="toggleTop"
            v-model="sort"
          />
        </div>
        <!-- <p>At least one sort method must be selected</p> -->
      </div>
      <div class="form-control" v-if="showTop">
        <h3>Top Posts From...</h3>

        <div>
          <label for="hour">Hour</label>
          <input
            name="time"
            type="radio"
            id="hour"
            value="hour"
            v-model="top"
          />
        </div>
        <div>
          <label for="day">Day</label>
          <input name="time" type="radio" id="day" value="day" v-model="top" />
        </div>
        <div>
          <label for="week">Week</label>
          <input
            name="time"
            type="radio"
            id="week"
            value="week"
            v-model="top"
          />
        </div>
        <div>
          <label for="month">Month</label>
          <input
            name="time"
            type="radio"
            id="month"
            value="month"
            v-model="top"
          />
        </div>
        <div>
          <label for="year">Year</label>
          <input
            name="time"
            type="radio"
            id="year"
            value="year"
            v-model="top"
          />
        </div>
        <div>
          <label for="all">All</label>
          <input name="time" type="radio" id="all" value="all" v-model="top" />
        </div>
        <!-- <p>At least one duration must be selected</p> -->
      </div>
      <div class="form-control">
        <div>
          <label for="albums">Include Albums?</label>
          <input type="checkbox" name="albums" id="albums" v-model="albums" />
        </div>
        <div>
          <label for="playlists">Include Playlists?</label>
          <input
            type="checkbox"
            name="playlists"
            id="playlists"
            v-model="playlists"
          />
        </div>
      </div>
      <!-- <p>Please fix the above errors and submit again.</p> -->
      <base-button mode="flat-green">Create Playlist</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  emits: ['submission'],
  data() {
    return {
      username: '',
      multireddit: '',
      numSongs: 50,
      minUpvotes: 1,
      sort: '',
      top: null,
      albums: false,
      playlists: false,
      showTop: false,
    };
  },
  methods: {
    submitForm() {
      let values = {
        username: this.username,
        multireddit: this.multireddit,
        numsongs: this.numSongs,
        minUpvotes: this.minUpvotes,
        sort: this.sort,
        top: this.top,
        albums: this.albums,
        playlists: this.playlists,
      };

      this.$emit('submission', values);
    },
    toggleTop() {
      this.sort === 'top' ? (this.showTop = true) : (this.showTop = false);
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-control {
  margin: 0.5rem 0;
}
.form-control div {
  display: inline-block;
  margin: 0 1rem;
}

.form-row {
  display: flex;
}
.form-row input {
  width: 10rem;
  margin: 0 0.5rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input {
  font: inherit;
}

input[type='radio'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='radio']:focus {
  outline: #1ed760 solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
