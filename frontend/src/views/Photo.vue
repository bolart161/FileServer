<template>
  <v-list id = "list-of-doc" style="background: rgba(0,0,0,0);" class="p-0">
    <div id="status"></div>
    <v-divider v-if="this.photoList.length > 0"></v-divider>
    <ListOfDoc
      @my-event="update"
      v-for="photo in photoList"
      v-bind:doc="photo"
      v-bind:key="photo.id"
    ></ListOfDoc>
    <v-divider v-if="this.photoList.length > 0"></v-divider>
  </v-list>
</template>

<script>
import ListOfDoc from '@/components/ListOfDoc.vue';

const funcForApi = require('../axiosFuncForApi');

export default {
  name: 'Photo',
  components: {
    ListOfDoc,
  },
  data() {
    return {
      photoList: [],
    };
  },
  methods: {
    update(id) {
      funcForApi.getFiles('photo', this.$store.getters.ID)
        .then((tempList) => {
          this.photoList = tempList;
          if (tempList.length !== 0) {
            document.querySelector(`#status-for-item-${id}`).innerHTML = '';
            document.querySelector('#status').innerHTML = '';
          } else {
            document.querySelector('#status').innerHTML = `
                <h4 class="text-center text-info">У вас нет изображений</h4>
            `;
          }
        });
    },
  },
  mounted() {
    if (this.$store.getters.ID === null) {
      this.$router.push('/auth');
    } else {
      document.querySelector('#status').innerHTML = `
                    <div class="text-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>`;
      funcForApi.getFiles('photo', this.$store.getters.ID)
        .then((tempList) => {
          if (tempList.length !== 0) {
            this.photoList = tempList;
            document.querySelector('#status').innerHTML = '';
          } else {
            document.querySelector('#status').innerHTML = `
                <h4 class="text-center text-info">У вас нет изображений</h4>
            `;
          }
        });
    }
  },
};
</script>

<style scoped>
</style>
