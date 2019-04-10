import Accueil from "./component/pages/Accueil.vue";
import Slide from "./component/pages/Slide.vue";
import ListeSlide from "./component/pages/ListeSlide.vue";
import Calendrier from "./component/pages/Calendrier.vue";
import Archives from "./component/pages/Archives.vue";
import Profil from "./component/pages/Profil.vue";
import Aide from "./component/pages/Aide.vue";
import SignIn from './component/pages/SignIn.vue';
import SignUp from './component/pages/SignUp.vue';
import Deconnection from './component/pages/Deconnection.vue';


export const routes = [
  {
    path:"/",
    name:"Accueil",
    component: Accueil,
    meta : {
      requiresAuth: true
    }
  },

  {
    path:"/Slide",
    name:"Slide",
    component: Slide,
    meta : {
      requiresAuth: true
    }
  },

  {
    path:"/Liste_Slide",
    name:"Liste de Slides",
    component: ListeSlide,
    meta : {
      requiresAuth: true
    }
  },

  {
    path:"/Calendrier",
    name:"Calendrier",
    component: Calendrier,
    meta : {
      requiresAuth: true
    }
  },

  {
    path:"/Archives",
    name:"Archives",
    component: Archives,
    meta : {
      requiresAuth: true
    }
  },

  {
    path:"/Profil",
    name:"Profil",
    component: Profil,
    meta : {
      requiresAuth: true
    }
  },

  {
    path:"/Aide",
    name:"Aide",
    component: Aide
  },

  {
    path:"/Sign_in",
    name:"Sign_in",
    component: SignIn,
    meta : {
      requiresVistor : true
    }
  },
  {
    path:"/Sign_up",
    name:"Sign_up",
    component: SignUp,
    meta : {
      requiresVistor : true
    }
  },
  {
    path:"/Deconnection",
    name:"Deconnection",
    component: Deconnection,
    meta : {
      requiresAuth : true
    }
  }

]
