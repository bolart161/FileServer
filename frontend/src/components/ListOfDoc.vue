<template>
  <v-list-tile
    :key="doc.id"
    @click="''"
  >
    <v-list-tile-content>
      <v-list-tile-title v-html="doc.text"></v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action v-bind:id="'status-for-item-' + doc.id ">
    </v-list-tile-action>
    <v-list-tile-action>
      <a v-bind:href="`http://localhost:3333/${doc.ref}`" download target="_blank">
        <v-btn icon ripple>
          <v-icon>cloud_download</v-icon>
        </v-btn>
      </a>
    </v-list-tile-action>
    <v-list-tile-action>
      <v-btn icon ripple @click="rmFile">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
const funcForApi = require('../axiosFuncForApi.js');

export default {
  name: 'ListOfDoc',
  props: ['doc'],
  data() {
    return {
      pdfFile: null,
    };
  },
  methods: {
    rmFile() {
      document.querySelector(`#status-for-item-${this.doc.id}`).innerHTML = `
                    <div class="text-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>`;
      funcForApi.deleteFile(this.doc.text, this.doc.fileType, this.$store.getters.ID)
        .then((res) => {
          if (res.status === 'Ok') {
            this.$emit('my-event', this.doc.id);
          }
        });
    },
  },
};
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
