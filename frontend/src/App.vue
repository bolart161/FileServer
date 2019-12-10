<template>
  <v-app>
    <b-navbar app style="height: 5rem">
      <b-navbar-brand class="headline text-uppercase p-0 m-0">
        <span>FILE</span>
        <span class="font-weight-light">BASE Server</span>
      </b-navbar-brand>
      <v-spacer></v-spacer>

      <HorizontalMenu v-if="!isMobile" :isAuth="isAuth" :setAuth="setAuth"/>

      <MenuForMobile v-else :isAuth="isAuth" :setAuth="setAuth"/>

    </b-navbar>
    <v-content>
      <router-view :setAuth="setAuth"/>
    </v-content>
    <v-footer height="auto">
      <v-card
        class="flex"
        flat
        dark
        tile
      >
        <v-card-title class="pb-0 pt-0 justify-center">
          <v-spacer></v-spacer>
          <v-card-actions style="font-size: medium;">
            &copy;2019&ensp;&mdash;&ensp;<b>DreamTeam inc. (Алёна Мордвинцева, Артем Болтунов)</b>
          </v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-for="icon in icons"
            :key="icon.ref"
            icon
            :href="icon.ref"
            :target="'_blank'"
          >
            <v-icon size="20px">{{ icon.img }}</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import HorizontalMenu from './components/HorizontalMenu.vue';
import MenuForMobile from './components/MenuForMobile.vue';

export default {
  name: 'App',
  components: {
    MenuForMobile,
    HorizontalMenu,
  },
  data() {
    return {
      icons: [
        { img: 'fab fa-vk', ref: 'https://vk.com/bolart161' },
        { img: 'fab fa-vk', ref: 'https://vk.com/mordvincevaa' },
        { img: 'fab fa-google', ref: 'mailto:tema2000.28@gmail.com' },
      ],
      isMobile: false,
      isAuth: false,
    };
  },
  mounted() {
    this.isMobile = (document.documentElement.clientWidth < 1023);

    window.addEventListener('resize', () => {
      this.isMobile = (document.documentElement.clientWidth < 1023);
    });

    this.isAuth = localStorage.getItem('FileBase-userID');
  },
  methods: {
    setAuth(value) {
      this.isAuth = value;
    },
  },
};
</script>

<style>
  a, a:hover {
    text-decoration: none;
  }
</style>
