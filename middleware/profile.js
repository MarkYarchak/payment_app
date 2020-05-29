import $axios from '@nuxtjs/axios';

export default async ({ store, redirect }) => {
  if (process.client) {
    // const response = await $axios.post('/user/exists');
    // console.log('store', store.state.userState);
    // if (!store.state) {
    //   return redirect('/login')
    // }
    return true // redirect();
  } else return true;
};
