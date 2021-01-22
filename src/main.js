// Vue imports
import { createApp } from 'vue';

// Local imports
import App from './App.vue';
import router from './router';
import store from './store';

// UI Imports
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';

createApp(App)
  .use(store)
  .use(router)
  .component('base-card', BaseCard)
  .component('base-button', BaseButton)
  .mount('#app');
