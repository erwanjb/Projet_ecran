<template>
  <div id="mainAccueil">

    <div class="start">

      <div class="start_icone">
        <img class="img_start_icone" src="../../assets/menu1.svg" alt="" />
      </div>

      <div class="start_text">
        <p>Pour commencer, </br> cliquez sur le bouton "Creer une slide".</p>

        <button>Créer une slide</button>
      </div>

    </div>


    <div id="cartouches_container">



      <div class="box one">
        <div class="en-tete">
          <img src="../../assets/menu2.svg" alt="">
          <p>Mes slides enregistrées :</p>
        </div>
        <div class="corps">
          <p>Vous n'avez pas encore de slide, veuillez cliquer
          sur le bouton <span>"Créer une slide"</span></p>
          <bouton>Voir mon calendrier</bouton>
        </div>
      </div>

      <div class="box two">
        <div class="en-tete">
          <img src="../../assets/menu3.svg" alt="">
          <p>Mes anciennes slides :</p>
        </div>
        <div class="corps">
          <p>Vous n'avez pas encore de slide archivée.</p>

          <bouton>Voir mes archives</bouton>
        </div>
      </div>

      <div class="box three">
        <div class="en-tete">
          <img src="../../assets/menu4.svg" alt="">
          <p>Mes informations</p>
        </div>
        <div class="corps">
          <p>Votre prénom:</p>
          <p>Justine</p>

          <p>Votre nom :</p>
          <p>Dubois</p>

          <p>Votre e-mail:</p>
          <p>Justine.Db@gmail.com</p>
          <bouton>Voir mon profil</bouton>
        </div>
      </div>

      <div class="box four">
        <div class="en-tete">
          <img src="../../assets/menu5.svg" alt="">
          <p>Besoin d'aide :</p>
        </div>
        <div class="corps">
          <p>La typographie</p>
          <p>Permet de modifier le texte,
          en changeant la typographie,
        sa taille, sa graisse, etc.</p>

          <p>Les formes</p>
          <p>Permet de créer des formes,
          de choisir sa couleur et gerer le contour de celle-ci </p>
          <bouton>Voir la suite</bouton>
        </div>
      </div>



    </div>









  </div>

</template>


<script>
export default{
  data () {
    return{
    }
  }
}

</script>




<style lang="scss" scoped>

#mainAccueil{
.start{
  border: 1px solid #1799a6;
  margin: 120px auto 200px;
  display: flex;
  width: 70%;

    .start_icone{
      width: 100px;
      background-color: #1799a6;
      display: flex;
      justify-content: center;
      align-items: center;
      .img_start_icone{
        width:40px;
        height:40px;
      }
   }
   .start_text{
     display: flex;
     justify-content: space-around;
     align-items: center;
     width : calc(100% - 100px);
     p{
       text-align: center;
       width : calc(100% - 145px);
     }
     button{
       margin-right: 25px;
       width: 120px;
       height:35px;
     }
   }


}
}




#cartouches_container{
  display: flex;
  justify-content: space-around;



.box{
  width:calc(25% - 25px);
  border:1px solid #1799a6;

    .en-tete{
      padding: 20px 0 20px 0;
      background-color: #1799a6;
      text-align:center;
      color:#fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 50px;
        height: 50px;
      }
      p{
        margin: 0;
      }
    }
    .corps{
      padding: 20px;
      span{
        font-size: bold;
      }
    }
    &.one .en-tete p span{
      font-size: bold;
    }
}





}//fin cartouches_container




</style>
