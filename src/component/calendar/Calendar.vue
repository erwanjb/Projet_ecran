<template>
	<div id="content-date">
		<div id="info" v-if="hebdomadaire">
			<button @click="nextSemaine($event)">précédent</button>
			<span>semaine du {{weekActive[0]}} au {{weekActive[6]}}</span>
			<button @click="nextSemaine($event)">suivant</button>
		</div>		
		<div v-if="hebdomadaire">
			<h3>ajouter un évènement sur :</h3>
			<p>Une ou plusieurs périodes ayant une date de début et une date de fin(standard):
				<a @click="addEvent()">
					<i class="far fa-calendar-alt addE"></i>
				</a>
			</p>
			<p>Un ou plusieurs jours avec des horaires identiques(template avancé):
				<a @click="addEventT()">
					<i class="far fa-calendar-alt addE"></i>
				</a>
			</p>
		</div>
		<calendar-month v-if="pickDate" v-bind:pickDate="true" :event="eventsWeek" @dateChosed="handleDateChosed"></calendar-month>		
		<calendar-month v-if="pickDateT" v-bind:pickDate="'template'" :event="eventsWeek" @dateChosed="handleDateChosed"></calendar-month>
		<calendar-month v-if="mensuelle" v-bind:pickDate="false" :event="eventsWeek"></calendar-month>
		
		<div id="divWeek" v-if="hebdomadaire">
			<div id="divHour">
				<div id="hour-header">heure</div>
				<div v-for="h in hour" class="hour">{{h}}</div>
			</div>
			<div id="divDay">
				<div class="dayW one">
					<p>Lundi</p>
					<p>{{weekActive[0]}}</p>
				</div>
				<div class="dayW two">
					<p>Mardi</p>
					<p>{{weekActive[1]}}</p>
				</div>
				<div class="dayW tree">
					<p>Mercredi</p>
					<p>{{weekActive[2]}}</p>
				</div>
				<div class="dayW four">
					<p>Jeudi</p>
					<p>{{weekActive[3]}}</p>
				</div>
				<div class="dayW five">
					<p>Vendredi</p>
					<p>{{weekActive[4]}}</p>
				</div>
				<div class="dayW six">
					<p>Samedi</p>
					<p>{{weekActive[5]}}</p>
				</div>
				<div class="dayW seven">
					<p>Dimanche</p>
					<p>{{weekActive[6]}}</p>
				</div>
			</div>
			<div id="divEvent">
				<div v-for="date in dateWeekActive" class="dayWeek">
					<span v-for="e in eventsWeek" v-if="(new Date(date.getFullYear(),date.getMonth(), date.getDate(), 0,0) >= new Date(e.debut) && new Date(date.getFullYear(),date.getMonth(), date.getDate() + 1, 0, -1)<=new Date(e.fin))||( new Date(date.getFullYear(),date.getMonth(), date.getDate(), 0,0) >= new Date(e.debut) && new Date(date.getFullYear(),date.getMonth(), date.getDate() + 1, 0, -1) <= new Date(e.fin))||(new Date(date.getFullYear(),date.getMonth(), date.getDate(), 0,0) <= new Date(e.debut) && new Date(date.getFullYear(),date.getMonth(), date.getDate() + 1, 0, -1) >= new Date(e.debut))||( new Date(date.getFullYear(),date.getMonth(), date.getDate(), 0,0) < new Date(e.fin) && new Date(date.getFullYear(),date.getMonth(), date.getDate() + 1, 0, -1) >= new Date(e.fin))" v-bind:style="{backgroundColor: e.color}" class="eventMonth">{{e.name}}</span>
				</div>
			</div>
			<div id="contentDay">
				<div v-for="date in dateWeekActive" class="divDayW">
					<span v-for="e in eventsWeek" v-if="new Date(date.getFullYear(),date.getMonth(), date.getDate(), 0,0) >= new Date(e.debut) && new Date(date.getFullYear(),date.getMonth(), date.getDate() + 1, 0, -1) <= new Date(e.fin)" class="eventWeek" v-bind:style="{backgroundColor: e.color, top: 0, bottom: 0}"></span>
					<span v-for="e in eventsWeek" v-if="new Date(date.getFullYear(),date.getMonth(), date.getDate(), 0,0) <= new Date(e.debut) && new Date(date.getFullYear(),date.getMonth(), date.getDate() + 1, 0, -1) >= new Date(e.fin)" class="eventWeek" v-bind:style="{backgroundColor: e.color, top: ((new Date(e.debut)).getHours()*60+(new Date(e.debut)).getMinutes())+'px', bottom: 1440-((new Date(e.fin)).getHours()*60+(new Date(e.fin)).getMinutes())+'px'}"></span>
					<span v-for="e in eventsWeek" v-if="new Date(date.getFullYear(),date.getMonth(), date.getDate(), 0,0) >= new Date(e.debut) && new Date(date.getFullYear(),date.getMonth(), date.getDate() + 1, 0, -1) >= new Date(e.fin) && new Date(date.getFullYear(),date.getMonth(), date.getDate(), 0,0) <= new Date(e.fin)" class="eventWeek" v-bind:style="{backgroundColor: e.color, top: 0, bottom: 1440-((new Date(e.fin)).getHours()*60+(new Date(e.fin)).getMinutes())+'px'}"></span>
					<span v-for="e in eventsWeek" v-if="new Date(date.getFullYear(),date.getMonth(), date.getDate(), 0,0) <= new Date(e.debut) && new Date(date.getFullYear(),date.getMonth(), date.getDate() + 1, 0, -1) >= new Date(e.debut) && new Date(date.getFullYear(),date.getMonth(), date.getDate() + 1, 0, -1) <= new Date(e.fin)" class="eventWeek" v-bind:style="{backgroundColor: e.color, top: ((new Date(e.debut)).getHours()*60+(new Date(e.debut)).getMinutes())+'px', bottom: 0}"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CalendarMonth from '../calendarMonth/CalendarMonth.vue'
	export default{
		components:{
			CalendarMonth
		},
		data () {
    		return {
    			pickDate: false,
    			pickDateT: false,
				eventsWeek:[],
				event: {
					color: null,
					name: null,
					debut: null,
					fin: null
				},
				selectedColor:['red', 'blue', 'green', 'orange', 'yellow', 'black', 'grey', 'brown','violet'],
				hour: [],
				minutes: [],
				mensuelle: false,
				hebdomadaire: true,
				vue: (this.mensuelle) ? 'vue mensuelle' : 'vue semaine',
				weekActive: [],
				dateWeekActive : [],
    		}
  		},
  		mounted() {
  			this.createNum(new Date());
  			for (let i = 0; i < 24; i++) {
  				this.hour.push(i);
  			}
  		},
  		updated() {

  		},
  		methods: {
			nextSemaine(e){
				var date = this.dateMonth;
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDate();
				var content = e.target.innerHTML;

				if (content === "suivant"){
					this.createNum(new Date(year, month, day + 7));
				}else{
					this.createNum(new Date(year, month, day - 7));
				}
			},
			getMois(mois){
				var nameMois=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"];
				return nameMois[mois];
			},
			createNum(date){
				var year = date.getFullYear();
				var month = date.getMonth();
				var dateNow = date.getDate()
				this.weekActive = [];
				this.dateWeekActive = [];
				var dayNow = date.getDay();
				if(dayNow === 0){
					dayNow = 7;
				}
				if(dayNow!==0){
					var decompt = dayNow;
					var compt = 0;
					while(decompt!=1){
						decompt--;
						compt++;
					}
				}
				for(let i= 0;i<7;i++){
					var eachDay =new Date(year,month,dateNow-compt+i);
					this.weekActive.push(eachDay.getDate()+"/"+(eachDay.getMonth()+1)+"/"+eachDay.getFullYear());
					this.dateWeekActive.push(eachDay);
				}
				var lundi = new Date(year,month,dateNow-compt);
				var dimanche =  new Date(year,month,dateNow-compt+6);
				this.dateMonth = date;
				this.month = this.getMois(month) + ' ' + year;
				this.week =  "semaine du: " + lundi.getDate() + "/" + (lundi.getMonth() + 1) + "/" +lundi.getFullYear() + " au " + dimanche.getDate() + "/" + (dimanche.getMonth() + 1) + "/" + dimanche.getFullYear();
			},
			addEvent(){
				var name = prompt("veuillez choisir un nom pour l'évènement");
				var nameExisted = this.eventsWeek.find(item => item.name === name);
				var color;
				if(nameExisted){
					var confirmName = confirm("il existe déjà un évènement du même nom, voulez vous lui ajouter de nouvelles dates ?");
					if(confirmName){
						color = nameExisted.color
					}else{
						return
					}
				}
				do {
					color = (!!this.selectedColor.find(sel => sel === color)) ? color : prompt('veuillez choisir une couleur: '+this.selectedColor.join());
				} while (!this.selectedColor.find(sel => sel === color));
				this.hebdomadaire = false;
				this.pickDate = true;
				this.event.name = name;
				this.event.color = color;
				 setTimeout(() => {
				 	this.$root.$emit('transmitArray', this.eventsWeek);
				 }, 1000);
			},
			addEventT(){
				var name = prompt("veuillez choisir un nom pour l'évènement");
				var nameExisted = this.eventsWeek.find(item => item.name === name);
				var color;
				if(nameExisted){
					var confirmName = confirm("il existe déjà un évènement du même nom, voulez vous lui ajouter de nouvelles dates ?");
					if(confirmName){
						color = nameExisted.color
					}else{
						return
					}
				}
				do {
					console.log("yy");
					color = (!!this.selectedColor.find(sel => sel === color)) ? color : prompt('veuillez choisir une couleur: '+this.selectedColor.join());
				} while (!this.selectedColor.find(sel => sel === color));
				this.hebdomadaire = false;
				this.pickDateT = true;
				this.event.name = name;
				this.event.color = color;
				 setTimeout(() => {
				 	this.$root.$emit('transmitArray', this.eventsWeek);
				 }, 1000);
			},
			handleDateChosed(e){
				this.pickDate = false;
				this.pickDateT = false;
				this.hebdomadaire = true;
				for (let i = 0; i < e.length; i++) {
					e[i].name = this.event.name; 
					e[i].color = this.event.color;
				}
				this.eventsWeek.push(...e);
				this.event = {
					color: null,
					name: null,
					debut: null,
					fin: null
				}
			},
  		}
	};
</script>

<style lang="scss" scoped>
	#divWeek{
		position: relative;
		width: 1150px;
		height: 1600px;
		border: 1px solid black;
		margin: 0 auto;
	}
	#divHour{
		width: 100px;
		height: 100%;
		position: absolute;
		top:0;
		left:0;
		border: 1px solid red;
	}
	#hour-header{
		height: 80px;
		border-bottom: 1px solid red;
	}
	.hour{
		height: 60px;
	}
	.hour:nth-child(2){
		margin-top: 72px;
	}
	#divDay{
		position: absolute;
		top:0;
		left: 100px;
		height: 80px;
		width: 1050px;
		border: 1px solid green;
		display: flex;
	}
	.dayW{
		width: 150px;
		border-left: 1px solid green;
	}
	#divEvent{
		position: absolute;
		top: 80px;
		left: 100px;
		border: 1px solid orange;
		width: 1050px;
		height: 80px;
		display: flex;
	}
	.dayWeek{
		width: 150px;
		height: 80px;
		border: 1px solid orange;
	}
	.eventMonth{
		display: block;
		color: white;
		width: 80%;
		margin: 0 auto;
	}
	#contentDay{
		position: absolute;
		left: 100px;
		top: 160px;
		display: flex;
		width: 1050px;
		height: 1440px;
		border: 1px solid blue;
	}
	.divDayW{
		width: 150px;
		height: 1440px;
		border: 1px solid blue;
		position: relative;
	}
	.minutes{
		width: 100%;
		height: 1px;
	}
	.minutes:nth-child(60n+1){
		border-bottom: 1px solid blue;
	}
	.daysW:hover{
		background-color:blue;
	}
	.eventWeek{
		position: absolute;
		display: block;
		width: 80%;
		right: 10%;
	}
	button{
		background-color: white;
		color: blue;
		border: 1px solid blue;
	}
	button:hover{
		background-color: blue;
		color: white;
	}
</style>