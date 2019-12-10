<template>
  <FormAddFile/>
</template>

<script>
import FormAddFile from '../components/AddDocumentButton.vue';

export default {
  components: {
    FormAddFile,
  },
  created() {
    if (this.$store.getters.ID === null) {
      this.$router.push('/auth');
    }
  },
  updated() {
    if (this.$store.getters.ID === null) {
      this.$router.push('/auth');
    }
  },
};
</script>
