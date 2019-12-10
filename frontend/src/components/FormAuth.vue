<template>
  <v-card class="elevation-4 p-3 m-auto" color="rgba(0,0,0,0)" id="auth-form">
    <v-toolbar flat color="rgba(0,0,0,0)">
      <v-toolbar-title>Вход</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
        <v-text-field
          color="black"
          required
          counter="16"
          clearable
          solo
          prepend-icon="person"
          name="login"
          label="Логин"
          type="text"
          autofocus
          v-model="login"
        ></v-text-field>
        <v-text-field
          color="black"
          required
          clearable
          solo
          prepend-icon="lock"
          name="password"
          label="Пароль"
          id="password"
          type="password"
          v-model="password"
        ></v-text-field>
    </v-card-text>
    <div id="status"></div>
    <v-card-actions id = "control-buttons">
      <v-spacer></v-spacer>
      <v-btn
        dark
        round
        color="#444"
        router :to="'/register'"
        id="reg-btn"
      >
        Зарегистрироваться
      </v-btn>
      <v-btn
        dark
        round
        color="black"
        v-on:click="signAPI"
        id="sign-btn"
      >
        Войти
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
const funcForApi = require('../axiosFuncForApi.js');

export default {
  name: 'FormAuth',
  props: ['setAuth'],
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    signAPI() {
      if (this.login.trim().length !== 0 && this.password.trim().length !== 0) {
        document.querySelector('#status').innerHTML = `
                    <div>
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>`;
        funcForApi.signIn(this.login, this.password)
          .then((data) => {
            // eslint-disable-next-line no-underscore-dangle
            if (data._id !== null) {
              // eslint-disable-next-line no-underscore-dangle
              this.$store.dispatch('setID', data._id);
              return;
            }

            // eslint-disable-next-line consistent-return
            return Promise.reject();
          })
          .then(() => {
            while (this.$store.getters.ID === null) {
              // empty
            }
            document.querySelector('#status').innerHTML = '';
            localStorage.setItem('FileBase-userID', this.$store.getters.ID);
            this.setAuth(true);
            this.$router.push('/');
          })
          .catch(() => {
            const errorElem = document.querySelector('#status');
            errorElem.innerHTML = `
                <div class="text-danger">
                  Неверный логин или пароль, попробуйте еще раз.
                </div>
              `;
          });
      } else {
        const errorElem = document.querySelector('#status');
        errorElem.innerHTML = `
                <div class="text-danger">
                  Логин и пароль не должны быть пустые.
                </div>
              `;
      }
    },
  },
  mounted() {
    const windowWidth = document.documentElement.clientWidth;

    if (windowWidth < 420) {
      document.querySelector('#auth-form').style.width = '90%';
    } else if (windowWidth > 420) {
      document.querySelector('#auth-form').style.width = '500px';
    }

    if (windowWidth < 350) {
      document.querySelector('#control-buttons').classList += 'btn-group-vertical text-center';
      document.querySelector('#sign-btn').style.width = `${document.querySelector('#reg-btn').clientWidth}px`;
    }

    const id = localStorage.getItem('FileBase-userID');

    if (id !== null) {
      this.$store.commit('setID', id);
      while (this.$store.getters.ID === null) {
        // empty
      }
      this.$router.push('/');
    }
  },
};

</script>

<style scoped>
</style>
