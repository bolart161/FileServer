<template>
  <v-list style="background: rgba(0,0,0,0);" class="p-0">
    <div id="status"></div>
    <v-divider v-if="this.videoList.length > 0"></v-divider>
    <ListOfDoc
      @my-event="update"
      v-for="video in videoList"
      v-bind:doc="video"
      v-bind:key="video.id"
    ></ListOfDoc>
    <v-divider v-if="this.videoList.length > 0"></v-divider>
  </v-list>
</template>

<script>
import ListOfDoc from '@/components/ListOfDoc.vue';

const funcForApi = require('../axiosFuncForApi');

export default {
  name: 'Video',
  components: {
    ListOfDoc,
  },
  data() {
    return {
      videoList: [],
    };
  },
  methods: {
    update(id) {
      funcForApi.getFiles('video', this.$store.getters.ID)
        .then((tempList) => {
          this.videoList = tempList;
          if (tempList.length !== 0) {
            document.querySelector(`#status-for-item-${id}`).innerHTML = '';
            document.querySelector('#status').innerHTML = '';
          } else {
            document.querySelector('#status').innerHTML = `
                <h4 class="text-center text-info">У вас нет видео</h4>
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
      funcForApi.getFiles('video', this.$store.getters.ID)
        .then((tempList) => {
          this.videoList = tempList;
          if (tempList.length !== 0) {
            document.querySelector('#status').innerHTML = '';
          } else {
            document.querySelector('#status').innerHTML = `
                <h4 class="text-center text-info">У вас нет видео</h4>
            `;
          }
        });
    }
  },
};
</script>

<style scoped>
</style>
