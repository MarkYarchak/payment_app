<template>
  <v-card
    style="max-width: 400px; width: 100%;"
    color="grey lighten-3"
    elevation="4"
  >
    <v-form @submit.prevent="submitForm">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="loginForm.username"
          label="username"
          outlined
        />
        <v-text-field
          v-model="loginForm.password"
          label="password"
          outlined
          hide-details
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue"
          block
          dark
          type="submit"
        >
          {{ submitBtnText }}
        </v-btn>
        <v-spacer />
      </v-card-actions>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          small
          :to="loginActionSwitcherLink"
        >
          {{ loginActionSwitcherLink }}
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-form>

    <v-snackbar
      v-model="messageSnackbar.active"
      bottom
      :timeout="4000"
    >
      {{ messageSnackbar.text }}
      <v-btn
        text
        color="red"
        @click="messageSnackbar.active = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    submitBtnText: {
      type: String,
      default: '',
    },
    loginActionSwitcherLink: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      messageSnackbar: {
        active: false,
        text: '',
      },
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    errorHandler({ message }) {
      this.messageSnackbar = {
        active: true,
        text: message,
      };
    },
    submitForm() {
      const { username, password } = this.loginForm;
      this.$emit('submit', { username, password, error: this.errorHandler });
    },
  },
};
</script>
