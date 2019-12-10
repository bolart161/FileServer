<template>
  <b-nav v-if="isAuth">
    <b-nav-item>
      <router-link to="/">
        <v-btn
          flat
        >
          <span class="mr-2">Главная</span>
        </v-btn>
      </router-link>
    </b-nav-item>
    <b-nav-item>
      <router-link to="/documents">
        <v-btn
          flat
        >
          <span class="mr-2">Документы</span>
        </v-btn>
      </router-link>
    </b-nav-item>
    <b-nav-item>
      <router-link to="/photo">
        <v-btn
          flat
        >
          <span class="mr-2">Изображения</span>
        </v-btn>
      </router-link>
    </b-nav-item>
    <b-nav-item>
      <router-link to="/video">
        <v-btn
          flat
        >
          <span class="mr-2">Видео</span>
        </v-btn>
      </router-link>
    </b-nav-item>
    <b-nav-item v-if="this.$store.getters.ID !== null">
        <v-btn
          flat
          @click="signOut"
        >
          <span class="mr-2 text-danger">Выход</span>
        </v-btn>
    </b-nav-item>
  </b-nav>
</template>

<script>
export default {
  name: 'Menu',
  props: ['isAuth', 'setAuth'],
  methods: {
    signOut() {
      this.$store.commit('SET_ID', null);
      localStorage.removeItem('FileBase-userID');
      // eslint-disable-next-line no-empty
      while (this.$store.getters.ID !== null && localStorage.getItem('FileBase-userID') !== null) {}
      this.setAuth(false);
      this.$router.push('auth');
    },
  }
};
</script>

<style scoped>

</style>
