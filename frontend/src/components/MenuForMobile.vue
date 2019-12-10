<template>
  <div>
    <v-layout >
      <v-btn
        color="black"
        dark
        round
        @click.stop="drawer = !drawer"
        v-if="isAuth"
      >
        Меню
      </v-btn>
    </v-layout>

    <v-navigation-drawer
      v-model="drawer"
      app
      width="300px"
      v-bind:height="windowHeight"

    >
      <v-list class="pt-4" dense>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          router :to="item.ref"
        >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>

        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          v-if="this.$store.getters.ID !== null"
          @click="signOut"
        >
          <v-list-tile-action>
            <v-icon class="text-danger">vpn_key</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="text-danger">Выйти</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
        <v-divider v-if="this.$store.getters.ID !== null"></v-divider>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'MenuForMobile',
  data() {
    return {
      items: [
        { title: 'Главная', icon: 'home', ref: '/' },
        { title: 'Документы', icon: 'file_copy', ref: '/documents' },
        { title: 'Изображения', icon: 'photo', ref: '/photo' },
        { title: 'Видео', icon: 'video_library', ref: '/video' },
      ],
      windowHeight: null,
      drawer: false,
      isAuth: false,
    };
  },
  methods: {
    signOut() {
      this.$store.commit('SET_ID', null);
      localStorage.removeItem('FileBase-userID');
      // eslint-disable-next-line no-empty
      while (this.$store.getters.ID !== null && localStorage.getItem('FileBase-userID') !== null) {}
      this.$router.push('auth');
    },
  },
  updated() {
    this.isAuth = localStorage.getItem('FileBase-userID');
  },
  mounted() {
    this.windowHeight = document.documentElement.clientHeight + 100;
  },
};
</script>

<style scoped>
</style>
