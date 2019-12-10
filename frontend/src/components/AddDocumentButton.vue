<template>
    <div id="upload-form">
      <div id="status"></div>
      <v-text-field v-bind:label="'Выберите файл'"
                    @click='pickFile'
                    v-model='fileName'
                    prepend-icon='attach_file'
      ></v-text-field>
      <input
        type="file"
        style="display: none"
        ref="file"
        @change="onFilePicked"
      />
      <v-btn
        round
        style="background: #000; color: white"
        v-on:click="submitFile"
      >
        Отправить
      </v-btn>
    </div>
</template>

<script>
const funcForApi = require('../axiosFuncForApi.js');

export default {
  name: 'AddDocumentButton',
  data() {
    return {
      fileFromDevice: null,
      fileName: '',
      fileUrl: '',
    };
  },
  methods: {
    submitFile() {
      document.querySelector('#status').innerHTML = `
                    <div class="text-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Загрузка...</span>
                      </div>
                    </div>`;
      funcForApi.sendFile(this.fileFromDevice, this.$store.getters.ID)
        .then((tempStatus) => {
          if (tempStatus) {
            document.querySelector('#status').innerHTML = `
              <h5 class="text-center text-success">Файл успешно загружен.</h5>
            `;
          } else {
            document.querySelector('#status').innerHTML = `
              <h5 class="text-center text-danger">Ошибка, попробуйте позже.</h5>
            `;
          }
        });
    },
    pickFile() {
      this.$refs.file.click();
    },
    onFilePicked(e) {
      const filesFromDevice = e.target.files;

      if (filesFromDevice[0] !== undefined) {
        this.fileName = filesFromDevice[0].name;
        if (this.fileName.lastIndexOf('.') <= 0) {
          return;
        }

        const fr = new FileReader();

        fr.readAsDataURL(filesFromDevice[0]);
        fr.addEventListener('load', () => {
          const zero = 0;

          this.fileUrl = fr.result;
          this.fileFromDevice = filesFromDevice[zero];
        });
      } else {
        this.fileName = '';
        this.fileFromDevice = null;
        this.fileUrl = '';
      }
    },
  },
  mounted() {
    const windowWidth = document.documentElement.clientWidth;

    if (windowWidth < 420) {
      document.querySelector('#upload-form').style.width = '80%';
    } else if (windowWidth > 420) {
      document.querySelector('#upload-form').style.width = '300px';
    }
  },
};

</script>

<style scoped>
  #upload-form {
    width: 40%;
    margin: 40px auto;
  }
</style>
