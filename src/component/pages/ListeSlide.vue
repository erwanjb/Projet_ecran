<template>
  <div id="ListeSlide">
    <h2>Liste de Slides</h2>
    <ul>
        <router-link v-for="e in events" :to="{name: 'Slide'}" @click.native="afficheSlide(e.sequence_id)">
            <span>{{e.sequence_name}}</span>
        </router-link>
    </ul>
  </div>

</template>

<script>
import { EventBus } from "../../event-bus.js";
export default{
    data () {
        return{
            events: this.$store.state.events,
        }
    },
    mounted(){
        if(!this.events.length){
            this.$store.dispatch('importEvents')
        }
        console.log(this.events)
    },
    methods: {
        afficheSlide(id){
            setTimeout(()=>{
                EventBus.$emit('emitId', id)
            }, 100)
        }
    }
}

</script>

<style lang="scss" scoped>
#ListeSlide{
    text-align: center;
}
span{
    display: block;
}
</style>