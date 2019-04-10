<template>
  <div v-on:click="transitionMenu" id="menu" v-if="afficheMenu">



    <section>
      <div id="croix-contenair">
        <img class="croix" src="../../assets/crossTop.svg" alt="">
      </div>
      <img class="img-id" src="../../assets/id-img.png" alt="">
      <p>Bienvenue, <span>{{name}}</span></p>
    </section>

    <ul>
      <router-link class="ul-li" v-for="(p, n) in pages" :to="{name:p}" :key="n" tag="li" active-class="is-active" exact>
        <img class="icone-menu" :src="'/dist/assets/menu'+n+'.svg'" />
        <span>
          {{p}}
        </span>

      </router-link>

    </ul>

  </div>
</template>




<script>
import{EventBus} from "../../event-bus.js"
export default{
 data (){
   return{
     pages:["Accueil", "Liste de Slides", "Calendrier", "Archives", "Profil", "Aide","Deconnection"],
     afficheMenu:false,
     name: this.$store.state.name
   }
 },
 mounted(){
   EventBus.$on("show", p=>{
    this.afficheMenu=p;
   })
 },
 methods : {
   transitionMenu : function(){
     this.afficheMenu = !this.afficheMenu
   }
 }
}
</script>




<style lang="scss">

#menu{
  width:200px;
  position: fixed;
  background-color: #fff;

  section{
  text-align: center;
  border-left: 1px solid #1799a6;
  border-right: 1px solid #1799a6;


  #croix-contenair{
    display: flex;
    justify-content: flex-end;

  .croix{
    width:30px;
    height: 30px;
    margin:10px 10px 0 0;
    }
  }

  .img-id{
    margin-top: 20px;
    width:100px;
    height:100px;
  }

  p{
    margin:0 ;
    padding-bottom: 40px;
    span{
      font-weight: bold;
    }
  }

}//fin section

ul{
  display: flex;
  flex-direction:column;
  margin-top: 0;
  .ul-li{
    display: flex;
    align-items: center;
    margin: 0;

    border:1px solid #1799a6;
    .icone-menu{
      width: 25px;
      padding:10px;
    }

    &.is-active, &:hover{
      background-color: #1799a6;
      color:#fff;

    }

  }
}




}// fin menu





</style>
