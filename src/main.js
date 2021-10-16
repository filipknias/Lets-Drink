import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { 
    faHistory, 
    faStar, 
    faSearch, 
    faArrowLeft, 
    faAngleRight,
    faAngleDoubleLeft, 
    faAngleDoubleRight, 
    faMapMarkerAlt,
    faMap,
    faPhone,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

const icons = [
    faHistory, 
    faStar, 
    faSearch, 
    faArrowLeft, 
    faAngleDoubleLeft, 
    faAngleDoubleRight, 
    faAngleRight,
    faMapMarkerAlt,
    faMap,
    faPhone,
    faTimes,
];
library.add(icons);

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app');
