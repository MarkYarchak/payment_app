<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click="showDrawer = !showDrawer" />
      <v-toolbar-title>SimplePay</v-toolbar-title>
      <v-spacer />
      <v-btn
        color="orange darken-1"
        dark
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="showDrawer"
      app
    >
      <v-subheader>Users list</v-subheader>
      <v-list>
        <v-list-item
          v-for="(user, uIndex) in registeredUsers"
          :key="uIndex"
          :to="`/profile/${user.username}`"
        >
          {{ user.username }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import $axios from 'axios';

export default {
  middleware: ['profile'],
  data () {
    return {
      showDrawer: this.$vuetify.breakpoint.mdAndUp,
      registeredUsers: [],
    }
  },
  computed: {
    accountData() {
      return this.$store.state.userState.user;
    },
  },
  async beforeMount() {
    await this.setUsersList();
  },
  methods: {
    async setUsersList() {
      const { token } = this.accountData;
      const res = await $axios.post(`/users/get`, { token })
        .catch(() => { console.log('You got an error with users list request'); });
      console.log(res);
      this.registeredUsers = [];
    },
    logout() {
      this.$store.dispatch('userState/logout');
      setTimeout(() => {
        this.$router.push('/login');
      });
    },
  },
}
</script>
