<template>
    <div id="header">

      <div  v-if="loggedIn" class="header-logo">
        <img src="../../assets/logo.png" alt="">
      </div>

      <div  v-if="loggedIn" class="header-id">
        <h1>Bonjour, <span>{{name}}</span></h1>
        <img src="../../assets/id-img.png" alt="">
      </div>

      <div  v-if="loggedIn" class="header-home">
          <img src="../../assets/header-home.png" alt="">
      </div>

      <div v-if="loggedIn" class="header-burger" @click="showMenu()">
          <img src="../../assets/burger.svg" alt="">
      </div>

    </div>
</template>



<script>
import{EventBus} from "../../event-bus.js"
import {mapState} from 'vuex'
    export default {
      data(){
        return{
          afficheMenu:false,
          name: this.$store.state.name
        }
      },
      computed : {
        loggedIn(){
          return this.$store.getters.loggedIn
        }
      },
      methods:{
        showMenu(){
          this.afficheMenu=!this.afficheMenu;
          EventBus.$emit("show", this.afficheMenu)
        }
      }
    }
</script>



<style lang="scss">

  #header{
    width:100%;
    height:75px;
    background-color: #1799a6;
    display: flex;
    position: relative;
    z-index:1;

     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

    .header-logo{
      background-color: #fff;
      width:200px;
      display: flex;
      justify-content: center;
      align-items: center;

      img{
      width:60px;
      height:60px;

      display: inline-block;
      }


    }



    .header-id{
      display: flex;
      vertical-align: top;
      width: calc(100% - 352px);
      height: 75px;
      align-items: center;
      justify-content: flex-end;
      padding-right: 20px;

      h1{
        color:#fff;
        font-size: 18px;

        span{
          font-weight: bold;
        }
      }


    img{
      width:60px;
      height: 60px;
      margin-left: 10px;

      }
    }

    .header-home{
      background-color: #fff;
      width:75px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 2px;


      img{

      width:50px;
      height: 50px;
      margin-right: 2px;

    }
      }

    .header-burger{
      background-color: #fff;
      width:75px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover{
        background-color:  #1799a6;
      }

      img{

      width:30px;
      height: 30px;
      }
    }





  }

</style>
