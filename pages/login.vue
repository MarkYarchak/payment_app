<template>
  <LoginFormCard
    title="Login"
    submit-btn-text="Start right now"
    login-action-switcher-link="/register"
    @submit="submitLoginForm"
  />
</template>

<script>
import LoginFormCard from '../components/LoginFormCard';

export default {
  name: "login",
  layout: 'login',
  components: {
    LoginFormCard,
  },
  methods: {
    submitLoginForm(data) {
      this.$store.dispatch('userState/login', data);
    },
  },
};
</script>
