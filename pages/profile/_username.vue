<template>
  <div class="profile-layout">
    <v-card style="width: 100%; max-width: 900px">
      <v-card-title style="flex-wrap: wrap">
        <span>{{ params.username }}</span>
        <v-spacer />
        <span class="subtitle-1">Balance: {{ accountData.balance }}</span>
      </v-card-title>
      <v-divider />

      <div v-show="accountData.username !== params.username">
        <v-card-text>
          <v-text-field
            label="Price"
            :value="newPayment.price"
            prefix="$"
          ></v-text-field>
          <div class="d-flex">
            <v-btn
              outlined
            >
              Close
            </v-btn>
            <v-spacer />
            <v-btn
              color="blue"
              dark
              @click="submitPayment"
            >
              Submit payment
            </v-btn>
          </div>
        </v-card-text>
      </div>

      <v-list>
        <v-list-item
          v-for="(operation, opIndex) in profileUser.paymentOperations"
          :key="opIndex"
        >
          {{ operation }}
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import $axios from 'axios';

export default {
  layout: 'account',
  validate({ params }) {
    return params.username.length < 3;
  },
  data() {
    return {
      profileUser: {},
      newPayment: {
        price: '0',
      },
    };
  },
  computed: {
    accountData() {
      return this.$store.state.userState.user;
    },
  },
  asyncData: ({ params }) => ({ params }),
  async beforeMount() {
    await this.setProfileUser();
  },
  methods: {
    async submitPayment() {
      // this.newPayment
      const response = await $axios.post('/payment/make', {})
        .catch(() => {});
      console.log(response);
    },
    async setProfileUser() {
      const { token } = this.accountData;
      const res = await $axios.post(`/users/get/${this.params.username}`, { token })
        .catch(() => { console.log('You got an error with profile request'); });
      console.log(res);
      this.profileUser = {};
    },
  },
};
</script>

<style scoped>
  .profile-layout {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
</style>
