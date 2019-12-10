<template>
    <v-card class="elevation-4 p-3 m-auto" color="rgba(0,0,0,0)"  id="register-form">
      <v-toolbar flat color="rgba(0,0,0,0)">
        <v-toolbar-title>Регистрация</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          prepend-icon="person"
          color="black"
          required
          counter="16"
          clearable
          solo
          name="login"
          label="Логин"
          type="text"
          autofocus
          v-model="login"
        ></v-text-field>
        <v-text-field
          prepend-icon="person"
          color="black"
          required
          counter="16"
          clearable
          solo
          name="name"
          label="Имя"
          type="text"
          v-model="name"
        ></v-text-field>
        <v-text-field
          prepend-icon="person"
          color="black"
          required
          counter="16"
          clearable
          solo
          name="surname"
          label="Фамилия"
          type="text"
          v-model="surname"
        ></v-text-field>
        <v-text-field
          color="black"
          required
          clearable
          solo
          prepend-icon="lock"
          name="password"
          label="Пароль"
          type="password"
          v-model="password"
        ></v-text-field>
        <v-text-field
          color="black"
          required
          clearable
          solo
          prepend-icon="lock"
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          v-model="confirmPassword"
        ></v-text-field>
      </v-card-text>
      <div id="status"></div>
      <v-card-actions id = "control-buttons-reg">
        <v-spacer></v-spacer>
        <v-btn
          dark
          round
          color="black"
          v-on:click="register"
          id="reg-btn"
        >
          Зарегистрироваться
        </v-btn>
        <v-btn
          dark
          round
          color="#444"
          router :to="'/auth'"
          id="sign-btn"
        >
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>

</template>

<script>
const funcForApi = require('../axiosFuncForApi');

function errorMesg(mesg) {
  const errorElem = document.querySelector('#status');
  errorElem.innerHTML = `
              <div class="text-danger">
                ${mesg}
              </div>
            `;
}
function successMesg(mesg) {
  const errorElem = document.querySelector('#status');
  errorElem.innerHTML = `
              <h4 class="text-success text-center pb-3">
                ${mesg}
              </h4>
            `;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: 'FormRegister',
  data() {
    return {
      login: '',
      password: '',
      confirmPassword: '',
      name: '',
      surname: '',
    };
  },
  methods: {
    register() {
      if (this.login.trim().length === 0
          || this.name.trim().length === 0
          || this.surname.trim().length === 0
          || this.password.trim().length === 0
          || this.confirmPassword.trim().length === 0) {
        errorMesg('Заполните все поля.');
      } else if (this.password !== this.confirmPassword) {
        errorMesg('Пароли не совпадают.');
      } else {
        errorMesg('');
        const userInfo = {
          login: this.login,
          name: this.name,
          surname: this.surname,
          password: this.password,
        };
        funcForApi.register(userInfo)
          .then(async (status) => {
            if (status === 'Ok') {
              successMesg('Регистрация прошла успешно!');
              await sleep(2000);
              this.$router.push('auth');
            } else {
              errorMesg('Ошибка, попробуйте позже.');
            }
          });
      }
    },
  },
  mounted() {
    const windowWidth = document.documentElement.clientWidth;
    if (windowWidth < 420) {
      document.querySelector('#register-form').style.width = '90%';
    } else if (windowWidth > 420) {
      document.querySelector('#register-form').style.width = '500px';
    }

    if (windowWidth < 350) {
      document.querySelector('#control-buttons-reg').classList += 'btn-group-vertical text-center';
      document.querySelector('#sign-btn').style.width = `${document.querySelector('#reg-btn').clientWidth}px`;
    }
  },
};
</script>

<style scoped>
</style>
