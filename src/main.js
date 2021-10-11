import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHistory, faStar, faSearch } from "@fortawesome/free-solid-svg-icons";

const icons = [faHistory, faStar, faSearch];
library.add(icons);

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app');
