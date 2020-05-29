<template>
  <LoginFormCard
    title="Register user"
    submit-btn-text="Create your account"
    login-action-switcher-link="/login"
    @submit="registerFormSubmit"
  />
</template>

<script>
import LoginFormCard from '../components/LoginFormCard';

export default {
  name: "register",
  layout: 'login',
  middleware: ['allowLoginPage'],
  components: {
    LoginFormCard,
  },
  methods: {
    registerFormSubmit(data) {
      this.$store.dispatch('userState/register', data);
    },
  },
};
</script>
