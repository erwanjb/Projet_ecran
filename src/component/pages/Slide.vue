<template>
  <div id="Slide">
    <div class="texte">
      <p>Veuillez selectionner une des parties du template,
        <br>et commencer la création de votre slide, en cliquant sur le menu en bas à gauche.
      </p>
    </div>

    <div class="template">
      <div class="template_box"></div>
    </div>

    <h2 v-if="name_sequence">{{name_sequence}}</h2>

    <div class="sequences">
      <div class="sequences_box" v-for="(t, i) in table_sequences" @click="afficheMenu(i)">
        <img v-if="t.url" :src="'../../../uploads/' + t.url" class="table_sequences" >
        <i class="fas fa-plus fa-3x"></i>
      </div>
    </div>

    <div class="menu_sequences">
      <div class="menu_sequences_icones">
        <a @click="addBox()">
          <img class="sequence_icones" src="../../assets/add.svg">
        </a>
        <img class="sequence_icones" src="../../assets/menu1.svg">
        <img class="sequence_icones" src="../../assets/time.svg">
        <a @click="showModal()">
          <img class="sequence_icones" src="../../assets/menu2.svg">
        </a>
        <img class="sequence_icones" src="../../assets/trash.svg">
      </div>
      <div v-if="mediaTypeActif" class="menu_sequences_menu">
        <select class="select_menu" @change="afficheMenuType($event)">
          <option value>--Choisir un type de media--</option>
          <option value="video">vidéo</option>
          <option value="image">image</option>
          <option value="text">texte</option>
        </select>
      </div>
      <div class="menu_sequence_type">
        <div v-if="mediaTypeActif && mediaTypeActif.type=='video'" class="type_video">
          <div class="sequence_icones">
            <label for="upload_video">
              <i class="fas fa-video x3 fa-3x"></i>
              <i class="fas fa-plus x3 fa-3x"></i>
            </label>
            <input
              type="file"
              id="upload_video"
              accept="video/*"
              @change="uploadMedia($event, 'video')"
            >
          </div>
        </div>
        <div v-if="mediaTypeActif && mediaTypeActif.type=='image'" class="type_image">
          <div class="sequence_icones">
            <label for="upload_image">
              <i class="far fa-image fa-3x"></i>
              <i class="fas fa-plus fa-3x"></i>
            </label>
            <input
              type="file"
              id="upload_image"
              accept="image/*"
              @change="uploadMedia($event, 'image')"
            >
          </div>
          <img class="sequence_icones" src="../../assets/rotate.svg">
          <img class="sequence_icones" src="../../assets/border.svg">
          <img class="sequence_icones" src="../../assets/shape.svg">
        </div>
        <div v-if="mediaTypeActif && mediaTypeActif.type=='text'" class="type_texte">
          <img class="sequence_icones" src="../../assets/typo.svg">
          <img class="sequence_icones" src="../../assets/taille.svg">
          <img class="sequence_icones" src="../../assets/align.svg">
          <img class="sequence_icones" src="../../assets/color.svg">
          <img class="sequence_icones" src="../../assets/espacement.svg">
        </div>
      </div>
    </div>
    <p @click="hello()">click</p>
    <div id="modal">
      <modals-container/>
    </div>
  </div>
</template>


<script>
import { EventBus } from "../../event-bus.js";
import CalendarMonth from "../calendarMonth/CalendarMonth.vue";
import axios from "axios";
export default {
  data() {
    return {
      table_sequences: [{}],
      mediaTypeActif: null,
      color_sequence: null,
      name_sequence: null,
      message: null,
      id: null
    };
  },
  mounted(){
    const _this = this
    EventBus.$on('emitId', id => {
      this.id = id
      axios({
        url: '/getDataSlide',
        method: 'GET',
        params: {
          id: id
        } 
      }).then(res=>{
        this.name_sequence = res.data.sequence_name
        this.color_sequence = res.data.sequence_color
        this.table_sequences = res.data.table_sequences
      })
    })
    EventBus.$on('emitModalToSlide', p => {
      if (p.name_sequence !== this.name_sequence){
        if(this.id === null) {
          axios({
            url: '/createSequence',
            method: 'POST',
            data: {
              name_sequence: p.name_sequence,
              color_sequence: p.color_sequence,
              eventsWeek: p.eventsWeek
            }
          }).then(res => {
            this.$store.dispatch('importEvents')
            this.id = res.data.id
          })
        } else {
          axios({
            url: '/updateNameSequence',
            method: 'POST',
            data: {
              id: this.id,
              name_sequence: p.name_sequence
            }
          }).then(res => {
            this.$store.commit('changeEventName', {
              id: this.id,
              name_sequence: p.name_sequence
            })
          })
        }
      }

      if (this.color_sequence !== p.color_sequence && this.id !== null) {
        axios({
          url: '/updateColorSequence',
          method: 'POST',
          data: {
            id: this.id,
            color_sequence: p.color_sequence
          }
        }).then(res => {
            this.$store.commit('changeEventColor', {
              id: this.id,
              color_sequence: p.color_sequence
            })
        })
      }
      if (p.eventsWeek.length && this.id !== null) {
        axios({
          url: '/insertPeriods',
          method: 'POST',
          data: {
            id: this.id,
            eventsWeek: p.eventsWeek
          }
        }).then(res => {
            
        })
      }
      this.name_sequence = p.name_sequence
      this.color_sequence = p.color_sequence
    })
  },
  methods: {
    hello(){
      console.log(this.name_sequence)
    },
    afficheMenu(i) {
      this.mediaTypeActif = {
        nb: i
      };
    },
    afficheMenuType(e) {
      const nb = this.mediaTypeActif.nb;
      this.mediaTypeActif = {
        nb,
        type: e.target.value
      };
    },
    uploadMedia(e, type) {
      const typeFile = e.target.files[0].type;
      if(this.id=== null){
        return alert('il faut sélectioner un nom pour la séquence')
      }
      if (typeFile.match(type + "\\/")) {
        var formData = new FormData();
        formData.append("image", e.target.files[0], e.target.files[0].name);
        axios({
          url: '/upload/image',
          method: 'POST',
          data: formData
        }).then(res=>{
          if(res.data===`votre enregistrement c'est bien passé`){
            axios({
              url: '/addMedia',
              method: 'POST',
              data: {
                sequence_position: this.mediaTypeActif.nb,
                url: e.target.files[0].name,
                id: this.id
              }
            }).then(res2=>{
              if(res2.data=== "OK"){
                alert(res.data)
                this.table_sequences.splice(this.mediaTypeActif.nb, 1, {
                  url: e.target.files[0].name,
                  sequence_position: this.mediaTypeActif.nb,
                  duration: 100
                })
              }
            })
          } else if (res.data.match(new RegExp('Il existe déja une.+du même nom dans la base'))){
            alert(res.data)
          }
        })
      } else {
        alert(typeFile + " n'est pas une image");
      }
    },
    showModal() {
      setTimeout(() => {
        EventBus.$emit("transmitNameColorSequence", {
          name_sequence: this.name_sequence,
          color_sequence: this.color_sequence
        });
      }, 100);
      this.$modal.show(
        {
          template: `
          <div>
          <div v-if="!pickDateT && !pickDate">
          <h2 v-if="!name_sequence">Choisir un nom et une couleur pour votre séquence</h2>
          <h2 v-else>Voulez vous modifier le nom ou la couleur de votre séquence ?</h2>
          <label for="name_sequence">Choisir le nom de la séquence : </label>
          <input type="text" id="name_sequence" v-model="name_sequence">
          <br>
          <label for="color_sequence">Choisir une couleur : {{color.join(', ')}}</label>
          <input type="text" id="color_sequence" v-model="color_sequence">
          <br>
          <p>Choisir une ou plusieurs dates de manière standard: <a @click="addEvent()"><i class="fas fa-calendar"></i></a></p>
          <p>Choisir une ou plusieurs dates en mode template: <a @click="addEventT()"><i class="fas fa-calendar-alt"></i></a></p>
          <p>{{message}}</p>
          <button @click="close()">enregistrer et fermer</button>
          </div>
          <calendar-month v-if="pickDate" v-bind:pickDate="true" :event="events" @dateChosed="handleDateChosed($event)"></calendar-month>		
          <calendar-month v-if="pickDateT" v-bind:pickDate="'template'" :event="events" @dateChosed="handleDateChosed($event)"></calendar-month>
          </div>`,
          mounted() {
            if(!this.eventsWeek.length){
              this.$store.dispatch('importEventsWeek')
            }
            if(!this.events.length){
              this.$store.dispatch('importEvents')
            }
            EventBus.$on("transmitNameColorSequence", p => {
              this.name_sequence = p.name_sequence
              this.compare_name = p.name_sequence
              this.color_sequence = p.color_sequence
            });
          },
          data() {
            return {
              message: null,
              color: this.$store.state.color,
              name_sequence: "",
              compare_name: "",
              color_sequence: "",
              pickDate: false,
              pickDateT: false,
              eventsWeek: [],
              events: this.$store.state.events,
              event: null
            };
          },
          methods: {
            verifNameColor() {
              if(!this.name_sequence) {
                this.message = "veuillez saisir un nom"
                return false
              }
              console.log(this.name_sequence, this.compare_name)
              if(this.events.find(e=> e.sequence_name === this.name_sequence) && this.compare_name !== this.name_sequence){
                this.message = "le nom de la séquence est déjà pris"
                return false
              }
              if(!this.color.find(c=>c===this.color_sequence)){
                this.message = "veuillez saisir une couleur valide"
                return false
              }
              return true
            },
            addEvent() {
              if(!this.verifNameColor()){
                return
              }
              this.message = null;
              this.pickDate = true;
            },
            addEventT() {
              if(!this.verifNameColor()){
                return
              }
              this.message = null;
              this.pickDateT = true;
            },
            handleDateChosed(e) {
              this.pickDate = false;
              this.pickDateT = false;
              const tab = []
              for (let i = 0; i < e.length; i++) {
                tab[i] = {}
                tab[i].sequence_name = this.name_sequence;
                tab[i].sequence_color = this.color_sequence;
                tab[i].start_date = e[i].debut
                tab[i].end_date = e[i].fin
              }
              this.eventsWeek.push(...tab)
            },
            close(){
              if(this.verifNameColor()){
                this.$emit('close')
                EventBus.$emit('emitModalToSlide', {
                  name_sequence: this.name_sequence,
                  color_sequence: this.color_sequence,
                  eventsWeek: this.eventsWeek
                })
              }
            }
          },
          components: {
            CalendarMonth
          }
        },
        {},
        {
          width: 1000,
          height: 700,
          clickToClose: false
        },
        {}
      );
    },
    addBox(){
      let bool = true;
      this.table_sequences.forEach(t =>{
        if(!t.url){
          bool = false;
        }
      })
      if(bool){
        this.table_sequences.push({})
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cadre {
  border: solid 1px #1799a6;
}

#Slide {
  h2{
    text-align: center;
  }
  .texte {
    p {
      text-align: center;
    }
  }

  .template {
    margin-bottom: 25px;

    .template_box {
      margin: 0 auto;
      width: 400px;
      height: 200px;
      @extend .cadre;
    }
  }

  .input_nom_sequence {
    display: block;
    margin: 0 auto 25px;
  }

  .sequences {
    display: flex;
    justify-content: center;
    .sequences_box {
      display:flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 80px;
      position:relative;
      @extend .cadre;
      .table_sequences{
        position:absolute;
        width: 100%;
        height: 100%;
        top:0;
        right:0;
        left:0;
        bottom:0;
        z-index:1;
      }
      .fa-plus{
        z-index:2;
      }
    }
  }

  .menu_sequences {
    .menu_sequences_icones {
      width: 100%;
      display: flex;
      justify-content: center;
      .sequence_icones {
        margin-right: 50px;
        display: block;
        width: 50px;
        height: 50px;
      }
    }

    .menu_sequence_type {
      .sequence_icones {
        margin-right: 50px;
        display: block;
        width: 50px;
        height: 50px;
      }
      .type_texte,
      .type_image,
      .type_video {
        display: flex;
        justify-content: center;
        #upload_image,
        #upload_video {
          display: none;
        }
      }
    }

    .menu_sequences_menu {
      .select_menu {
        margin: 0 auto;
        display: block;
      }
    }
  }
}
</style>
