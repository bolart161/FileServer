<template>
  <FormAuth :setAuth="setAuth"/>
</template>

<script>
import FormAuth from '../components/FormAuth.vue';

export default {
  name: 'Auth',
  props: ['setAuth'],
  components: {
    FormAuth,
  },
};
</script>
