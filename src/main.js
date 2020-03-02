import 'amfe-flexible';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/styles/common.css';

console.log(Vue.config)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
