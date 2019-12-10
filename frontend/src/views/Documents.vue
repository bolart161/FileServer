<template>
  <v-list style="background: rgba(0,0,0,0);" class="p-0">
    <div id="status"></div>
    <v-divider v-if="this.documentList.length > 0"
      class="m-0"></v-divider>
    <ListOfDoc
      @my-event="update"
      v-for="doc in documentList"
      v-bind:doc="doc"
      v-bind:key="doc.id"
    ></ListOfDoc>
    <v-divider v-if="this.documentList.length > 0"
      class="m-0"></v-divider>
  </v-list>
</template>

<script>
import ListOfDoc from '@/components/ListOfDoc.vue';

const funcForApi = require('../axiosFuncForApi.js');

export default {
  name: 'Documents',
  components: {
    ListOfDoc,
  },
  data() {
    return {
      documentList: [],
    };
  },
  methods: {
    update(id) {
      funcForApi.getFiles('docs', this.$store.getters.ID)
        .then((tempList) => {
          this.documentList = tempList;
          if (tempList.length !== 0) {
            document.querySelector(`#status-for-item-${id}`).innerHTML = '';
            document.querySelector('#status').innerHTML = '';
          } else {
            document.querySelector('#status').innerHTML = `
                <h4 class="text-center text-info">У вас нет документов</h4>
            `;
          }
        })
        .then(this.$emit('update-doc'));
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
      funcForApi.getFiles('docs', this.$store.getters.ID)
        .then((tempList) => {
          if (tempList.length !== 0) {
            this.documentList = tempList;
            document.querySelector('#status').innerHTML = '';
          } else {
            document.querySelector('#status').innerHTML = `
              <h4 class="text-center text-info">У вас нет документов</h4>
            `;
          }
        });
    }
  },
};
</script>

<style scoped>
</style>
