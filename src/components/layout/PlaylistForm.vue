<template>
  <!-- FIX DISPLAY ISSUES WITH DEVTOOLS OPEN -->
  <base-card>
    <form>
      <h1>Generate a Playlist</h1>
      <div class="form-control">
        <label for="multi">Multireddit</label>
        <input type="text" id="multi" />
        <!-- <p>Multireddit must not be empty</p> -->
      </div>
      <div class="form-control">
        <label for="num-songs">Number of songs</label>
        <input type="number" id="num-songs" />
        <!-- <p>Number of songs must be greater than 0</p> -->
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
        <!-- <p>At least one sort method must be selected</p> -->
      </div>
      <!-- <p>Please fix the above errors and submit again.</p> -->
      <base-button mode="flat-green">Create Playlist</base-button>
    </form>
  </base-card>
</template>

<style scoped>
form {
  width: 20rem;
}

.form-control {
  margin: 0.5rem 0;
}
.form-control div {
  display: inline-block;
  margin: 0 1rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='radio'] + label {
  font-weight: normal;
  display: block;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus {
  /* background-color: #f0e6fd; */
  outline: none;
  border: 1px solid #1ed760;
}

input[type='radio'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='radio']:focus {
  outline: #3d008d solid 1px;
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
