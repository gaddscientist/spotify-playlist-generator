<template>
  <!-- FIX DISPLAY ISSUES WITH DEVTOOLS OPEN -->
  <base-card>
    <form>
      <h1>Generate a Playlist</h1>
      <div class="form-row">
        <div class="form-control">
          <label for="user">Username</label>
          <input type="text" id="user" />
          <!-- <p>Username must not be empty</p> -->
        </div>
        <div class="form-control">
          <label for="multi">Multireddit</label>
          <input type="text" id="multi" />
          <!-- <p>Multireddit must not be empty</p> -->
        </div>
      </div>
      <div class="form-row">
        <div class="form-control">
          <label for="num-songs">Number of songs</label>
          <input type="number" id="num-songs" />
          <!-- <p>Number of songs must be greater than 0</p> -->
        </div>
        <div class="form-control">
          <label for="upvotes">Minimum Upvotes</label>
          <input type="number" id="numsongs" />
          <!-- <p>Minimum number of upvotes must be greater than 0</p> -->
        </div>
      </div>
      <div class="form-control">
        <h3>Sort By</h3>
        <div>
          <label for="hot">Hot</label>
          <input name="sort" type="radio" id="hot" value="hot" />
        </div>
        <div>
          <label for="top">Top</label>
          <input name="sort" type="radio" id="top" value="top" />
        </div>
        <div>
          <label for="new">New</label>
          <input name="sort" type="radio" id="new" value="new" />
        </div>
        <div>
          <label for="rising">Rising</label>
          <input name="sort" type="radio" id="rising" value="rising" />
        </div>
        <!-- <p>At least one sort method must be selected</p> -->
      </div>
      <!-- <p>Please fix the above errors and submit again.</p> -->
      <base-button mode="flat-green">Create Playlist</base-button>
    </form>
  </base-card>
</template>

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
