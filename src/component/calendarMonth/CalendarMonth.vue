<template>
  <div v-if="dately || timely" id="mainCalendarMonth">
    <div id="info">
      <div v-if="dately">
        <button @click="next($event)">précédent</button>
        <span id="mois">{{month}}</span>
        <button @click="next($event)">suivant</button>
      </div>
      <div v-if="pickDate===true && selectionDate1">
        <p>
          Sélection de la date 1 :
          <span
            v-if="dateregister1"
          >{{dateregister1.getDate()}}/{{dateregister1.getMonth()+1}}/{{dateregister1.getFullYear()}} à {{hour.firstFigureH}}{{hour.secondFigureH}}H{{hour.firstFigureM}}{{hour.secondFigureM}}m</span>
        </p>
      </div>
      <div v-if="pickDate==='template'">
        <p
          v-if="dately"
        >Sélectionner tous les jours auxquels vous voudriez appliquer les mêmes heures pour votre évènement</p>
        <p v-if="timely">Sélectionner les heures que vous voulez appliquer aux jours sélectionnés</p>
        <p v-if="timely && selectionHeure1">Sélection de l'heure 1</p>
        <p v-if="timely && !selectionHeure1">Sélection de l'heure 2</p>
        <span
          v-if="timely && pickDate==='template'"
        >{{hour.firstFigureH}}{{hour.secondFigureH}}H{{hour.firstFigureM}}{{hour.secondFigureM}}m</span>
      </div>
      <div v-if="pickDate===true && !selectionDate1">
        <p>
          Sélection de la date 2 :
          <span
            v-if="dateregister2"
          >{{dateregister2.getDate()}}/{{dateregister2.getMonth()+1}}/{{dateregister2.getFullYear()}} à {{hour.firstFigureH}}{{hour.secondFigureH}}H{{hour.firstFigureM}}{{hour.secondFigureM}}m</span>
        </p>
      </div>
    </div>
    <div id="content">
      <div id="divMonth" v-if="dately">
        <div class="day one">Lundi</div>
        <div class="day two">Mardi</div>
        <div class="day tree">Mercredi</div>
        <div class="day four">Jeudi</div>
        <div class="day five">Vendredi</div>
        <div class="day six">Samedi</div>
        <div class="day seven">Dimanche</div>
        <div
          v-for="day in nbDayThisMonth"
          v-if="day.active"
          v-bind:style="{gridRow: day.row, gridColumn: day.column}"
          :class="(pickDate && day.select===true) ? 'daysH daysActivated' : (pickDate) ? 'daysH' : 'days'"
          :value="day.value"
          @click="(pickDate===true) ? registerDate($event) : (pickDate==='template') ? registerDateT($event) :''"
        >
          <span>{{day.num}}</span>
          <span
            v-for="e in eventM"
            v-if="(new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num, 0,0) >= new Date(e.debut) && new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num + 1, 0, -1)<=new Date(e.fin))||( new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num, 0,0) >= new Date(e.debut) && new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num + 1, 0, -1) <= new Date(e.fin))||(new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num, 0,0) <= new Date(e.debut) && new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num + 1, 0, -1) >= new Date(e.debut))||( new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num, 0,0) < new Date(e.fin) && new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num + 1, 0, -1) >= new Date(e.fin))"
            v-bind:style="{backgroundColor: e.color}"
            class="eventMonth"
          >{{e.name}}</span>
          <span
            v-for="e in events"
            v-if="(new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num, 0,0) >= new Date(e.debut) && new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num + 1, 0, -1)<=new Date(e.fin))||( new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num, 0,0) >= new Date(e.debut) && new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num + 1, 0, -1) <= new Date(e.fin))||(new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num, 0,0) <= new Date(e.debut) && new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num + 1, 0, -1) >= new Date(e.debut))||( new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num, 0,0) < new Date(e.fin) && new Date(dateMonth.getFullYear(),dateMonth.getMonth(), day.num + 1, 0, -1) >= new Date(e.fin))"
            v-bind:style="{backgroundColor: 'darkgrey'}"
            class="eventMonth"
          >saisie</span>
        </div>
      </div>
      <div v-if="timely" id="divHour">
        <div id="headerHour">
          <span class="timeField fieldActived">{{hour.firstFigureH}}</span>
          <span class="timeField">{{hour.secondFigureH}}</span>
          <span>H</span>
          <span class="timeField">{{hour.firstFigureM}}</span>
          <span class="timeField">{{hour.secondFigureM}}</span>
          <span>m</span>
        </div>
        <div id="contentHour">
          <span class="num" @click="(num[0]) ? registerTime($event) : ''">1</span>
          <span class="num" @click="(num[1]) ? registerTime($event) : ''">2</span>
          <span class="num numLocked" @click="(num[2]) ? registerTime($event) : ''">3</span>
          <span class="num numLocked" @click="(num[3]) ? registerTime($event) : ''">4</span>
          <span class="num numLocked" @click="(num[4]) ? registerTime($event) : ''">5</span>
          <span class="num numLocked" @click="(num[5]) ? registerTime($event) : ''">6</span>
          <span class="num numLocked" @click="(num[6]) ? registerTime($event) : ''">7</span>
          <span class="num numLocked" @click="(num[7]) ? registerTime($event) : ''">8</span>
          <span class="num numLocked" @click="(num[8]) ? registerTime($event) : ''">9</span>
          <span class="num" @click="nextField($event)"><</span>
          <span class="num" @click="registerTime($event)">0</span>
          <span class="num" @click="nextField($event)">></span>
        </div>
      </div>
      <div id="button">
        <p>{{message}}</p>
        <button v-if="timely && pickDate===true" @click="archiveTime()">enregistrer l'heure</button>
        <button v-if="dately && pickDate===true" @click="archiveDate()">enregistrer la date du jour</button>
        <button
          v-if="dately && pickDate==='template'"
          @click="archiveDateT()"
        >enregistrer les jours sélectionnés</button>
        <button
          v-if="timely && pickDate==='template' && selectionHeure1"
          @click="archiveTime1()"
        >enregistrer l'heure 1</button>
        <button
          v-if="timely && pickDate==='template' && !selectionHeure1"
          @click="archiveTime2()"
        >enregistrer l'heure 2</button>
        <br v-if="timely && pickDate==='template' && events.length">
        <button
          v-if="timely && pickDate==='template' && events.length"
          @click="archiveTimeT()"
        >confirmer les heures enregistrées</button>
        <br>
        <button v-if="dately" @click="confirmSelects()">
          fermer le calendrier
          <span v-if="pickDate && events.length">et enregistrer les dates</span>
        </button>
        <br>
        <button v-if="pickDate" @click="resetCurrent()">effacer la sélection actuelle</button>
        <button v-if="pickDate" @click="resetAll()">effacer toutes les sélections</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nbDayThisMonth: [],
      monthAlready: [],
      eventM: [],
      events: [],
      eventTampon: [],
      dateMonth: null,
      datesTemplate: [],
      month: null,
      dately: true,
      timely: false,
      selectionDate1: true,
      selectionHeure1: true,
      dateregister1: null,
      dateregister2: null,
      timeregister1: null,
      timeregister2: null,
      hour: {
        firstFigureH: "-",
        secondFigureH: "-",
        firstFigureM: "-",
        secondFigureM: "-"
      },
      num: {
        0: true,
        1: true,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
      },
      message: null
    };
  },
  props: ["pickDate"],
  mounted() {
    this.createNum(new Date());
    this.$root.$on("transmitArray", tab => {
      if (tab) {
        this.eventM = tab;
      }
    });
  },
  methods: {
    confirmSelects() {
      this.$emit("dateChosed", this.events);
    },
    resetAll() {
      var confirmation = confirm(
        "voulez vous vraiment effacer toutes les sélections"
      );
      if (confirmation) {
        this.dately = true;
        this.timely = false;
        this.dateregister1 = null;
        this.dateregister2 = null;
        this.selectionDate1 = true;
        this.events = [];
        this.selectionHeure1 = true;
        this.hour.firstFigureH = "-";
        this.hour.secondFigureH = "-";
        this.hour.firstFigureM = "-";
        this.hour.secondFigureM = "-";
        this.eventTampon = [];
        this.timeregister1 = null;
        this.timeregister2 = null;
        this.datesTemplate = [];
      }
    },
    resetCurrent() {
      var confirmation = confirm(
        "voulez vous vraiment effacer la sélection actuelle ?"
      );
      if (confirmation) {
        this.dately = true;
        this.timely = false;
        this.dateregister1 = null;
        this.dateregister2 = null;
        this.selectionDate1 = true;
        this.selectionHeure1 = true;
        this.hour.firstFigureH = "-";
        this.hour.secondFigureH = "-";
        this.hour.firstFigureM = "-";
        this.hour.secondFigureM = "-";
        this.eventTampon = [];
        this.timeregister1 = null;
        this.timeregister2 = null;
        this.datesTemplate = [];
      }
    },
    next(e) {
      var date = this.dateMonth;
      var year = date.getFullYear();
      var month = date.getMonth();
      var thisMonth = new Date(year, month, 1);
      if (!this.monthAlready.find(m => m.toString() === thisMonth.toString())) {
        this.monthAlready.push(thisMonth);
      }
      for (let i = 0; i < this.nbDayThisMonth.length; i++) {
        if (this.nbDayThisMonth[i].active) {
          this.nbDayThisMonth[i].active = false;
        }
      }
      var content = e.target.innerHTML;
      if (content === "suivant") {
        var nextMonth = new Date(year, month + 1, 1);
        if (
          !this.monthAlready.find(m => m.toString() === nextMonth.toString())
        ) {
          this.createNum(nextMonth);
        } else {
          for (let i = 0; i < this.nbDayThisMonth.length; i++) {
            if (
              new Date(
                this.nbDayThisMonth[i].value.getFullYear(),
                this.nbDayThisMonth[i].value.getMonth(),
                1
              ).toString() === nextMonth.toString()
            ) {
              this.nbDayThisMonth[i].active = true;
              this.month =
                this.getMois(nextMonth.getMonth()) +
                " " +
                nextMonth.getFullYear();
              this.dateMonth = nextMonth;
            }
          }
        }
      } else {
        var prevMonth = new Date(year, month - 1, 1);
        if (
          !this.monthAlready.find(m => m.toString() === prevMonth.toString())
        ) {
          this.createNum(prevMonth);
        } else {
          for (let i = 0; i < this.nbDayThisMonth.length; i++) {
            if (
              new Date(
                this.nbDayThisMonth[i].value.getFullYear(),
                this.nbDayThisMonth[i].value.getMonth(),
                1
              ).toString() === prevMonth.toString()
            ) {
              this.nbDayThisMonth[i].active = true;
              this.month =
                this.getMois(prevMonth.getMonth()) +
                " " +
                prevMonth.getFullYear();
              this.dateMonth = prevMonth;
            }
          }
        }
      }
    },
    getNbJoursMois(mois, annee) {
      var lgMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if ((annee % 4 == 0 && annee % 100 != 0) || annee % 400 == 0) {
        lgMois[1] = 29;
      }
      return lgMois[mois]; // 0 < mois <11
    },
    getMois(mois) {
      var nameMois = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre"
      ];
      return nameMois[mois];
    },
    createNum(date) {
      var year = date.getFullYear();
      var month = date.getMonth();
      var dateDayOne = new Date(year, month, 1);
      var nbDayThisMonth = this.getNbJoursMois(month, year);
      var dayStart = dateDayOne.getDay();
      var dateNow = date.getDate();
      var dayNow = date.getDay();
      if (dayNow === 0) {
        dayNow = 7;
      }
      this.dateMonth = date;
      this.month = this.getMois(month) + " " + year;
      var row = 2;
      var column = dayStart;
      for (let i = 1; i <= nbDayThisMonth; i++) {
        const newDay = {};
        newDay.num = i;
        newDay.value = new Date(year, month, i);
        newDay.active = true;
        newDay.row = row;
        newDay.column = column;
        this.nbDayThisMonth.push(newDay);
        column++;
        if (column === 8) {
          column = 1;
          row++;
        }
      }
    },
    registerDate(e) {
      var days = e.target.getAttribute("value");
      var previousDay = document.getElementsByClassName(
        "daysH daysActivated"
      )[0];
      if (previousDay) {
        previousDay.setAttribute("class", "daysH");
      }
      e.target.setAttribute("class", "daysH daysActivated");
      if (this.selectionDate1 === true) {
        this.dateregister1 = new Date(days);
      } else {
        this.dateregister2 = new Date(days);
      }
    },
    registerDateT(e) {
      var days = new Date(
        new Date(e.target.getAttribute("value")).getFullYear(),
        new Date(e.target.getAttribute("value")).getMonth(),
        new Date(e.target.getAttribute("value")).getDate()
      );
      var daysFound = this.nbDayThisMonth.find(
        d =>
          new Date(
            d.value.getFullYear(),
            d.value.getMonth(),
            d.value.getDate()
          ).toString() === days.toString()
      );
      if (e.target.getAttribute("class") === "daysH daysActivated") {
        e.target.setAttribute("class", "daysH");
        if (daysFound) {
          daysFound.select = false;
        }
      } else {
        e.target.setAttribute("class", "daysH daysActivated");
        if (daysFound) {
          daysFound.select = true;
        }
      }
    },
    archiveDate() {
      if (
        (this.dateregister1 != null && this.selectionDate1) ||
        (this.dateregister2 != null && !this.selectionDate1)
      ) {
        this.message = null;
        this.dately = false;
        this.timely = true;
      } else {
        this.message = "veuillez sélectionner un jour";
      }
    },
    archiveDateT() {
      for (let i = 0; i < this.nbDayThisMonth.length; i++) {
        if (this.nbDayThisMonth[i].select) {
          this.datesTemplate.push(this.nbDayThisMonth[i].value);
        }
      }
      if (this.datesTemplate.length) {
        this.message = null;
        this.dately = false;
        this.timely = true;
      } else {
        this.message = "veuillez sélectionner au moins un jour";
      }
    },
    datesCoincidenteW(d, f) {
      var debut = new Date(d);
      var year = debut.getFullYear();
      var month = debut.getMonth();
      var days = debut.getDate();
      var hours = debut.getHours();
      var minutes = debut.getMinutes();
      var nbMinute = (f - d) / (1000 * 60);
      var accumulateur = [];
      var tab = [];
      tab.push(...this.eventM, ...this.events);
      for (let i = 0; i <= nbMinute; i++) {
        var eachMinute = new Date(year, month, days, hours, minutes + i);
        for (let j = 0; j < tab.length; j++) {
          if (tab[j].debut < eachMinute && tab[j].fin > eachMinute) {
            accumulateur.push(
              eachMinute.getDate() +
                "/" +
                eachMinute.getMonth() +
                "/" +
                eachMinute.getFullYear() +
                " à " +
                eachMinute.getHours() +
                "H" +
                eachMinute.getMinutes() +
                "mn"
            );
          }
        }
      }
      if (!accumulateur.length) {
        return null;
      } else {
        return accumulateur;
      }
    },
    nextField(e) {
      var field = document.querySelectorAll(".timeField");
      var iNext;
      for (let i = 0; i < field.length; i++) {
        if (field[i].getAttribute("class").match("fieldActived")) {
          field[i].setAttribute("class", "timeField");
          iNext = e.target.innerHTML === "&gt;" ? i + 1 : i - 1;
          if (iNext === -1) {
            iNext = 3;
          }
          if (iNext === 4) {
            iNext = 0;
          }
        }
      }
      var num = document.querySelectorAll(".num");
      if (iNext === 0) {
        if (this.hour.secondFigureH != "-" && +this.hour.secondFigureH > 3) {
          for (let i = 1; i < 9; i++) {
            num[i].setAttribute("class", "num numLocked");
            this.num[i] = false;
          }
        } else {
          num[1].setAttribute("class", "num");
          this.num[1] = true;
          for (let i = 2; i < 9; i++) {
            num[i].setAttribute("class", "num numLocked");
            this.num[i] = false;
          }
        }
        num[0].setAttribute("class", "num");
        this.num[0] = true;
      }
      if (iNext === 1) {
        if (this.hour.firstFigureH === "2") {
          num[1].setAttribute("class", "num");
          this.num[1] = true;
          for (let i = 2; i < 4; i++) {
            num[i].setAttribute("class", "num");
            this.num[i] = true;
          }
          for (let i = 4; i < 9; i++) {
            num[i].setAttribute("class", "num numLocked");
            this.num[i] = false;
          }
        } else {
          num[1].setAttribute("class", "num");
          this.num[1] = true;
          for (let i = 2; i < 9; i++) {
            num[i].setAttribute("class", "num");
            this.num[i] = true;
          }
        }
        num[0].setAttribute("class", "num");
        this.num[0] = true;
      }
      if (iNext === 2) {
        if (this.hour.firstFigureH === "2" && this.hour.secondFigureH === "4") {
          for (let i = 0; i < 9; i++) {
            num[i].setAttribute("class", "num numLocked");
            this.num[i] = false;
          }
        } else {
          num[0].setAttribute("class", "num");
          this.num[0] = true;
          num[1].setAttribute("class", "num");
          this.num[1] = true;
          for (let i = 2; i < 5; i++) {
            num[i].setAttribute("class", "num");
            this.num[i] = true;
          }
          for (let i = 5; i < 9; i++) {
            num[i].setAttribute("class", "num numLocked");
            this.num[i] = false;
          }
        }
      }
      if (iNext === 3) {
        if (this.hour.firstFigureH === "2" && this.hour.secondFigureH === "4") {
          for (let i = 0; i < 9; i++) {
            num[i].setAttribute("class", "num numLocked");
            this.num[i] = false;
          }
        } else {
          for (let i = 0; i < 9; i++) {
            num[i].setAttribute("class", "num");
            this.num[i] = true;
          }
        }
      }
      field[iNext].setAttribute("class", "timeField fieldActived");
    },
    registerTime(e) {
      var field = document.querySelectorAll(".timeField");
      if (field[0].getAttribute("class").match("fieldActived")) {
        this.hour.firstFigureH = e.target.innerHTML;
      }
      if (field[1].getAttribute("class").match("fieldActived")) {
        this.hour.secondFigureH = e.target.innerHTML;
      }
      if (field[2].getAttribute("class").match("fieldActived")) {
        this.hour.firstFigureM = e.target.innerHTML;
      }
      if (field[3].getAttribute("class").match("fieldActived")) {
        this.hour.secondFigureM = e.target.innerHTML;
      }
    },
    archiveTime() {
      if (
        this.hour.firstFigureH != "-" &&
        this.hour.secondFigureH != "-" &&
        this.hour.firstFigureM != "-" &&
        this.hour.secondFigureM != "-"
      ) {
        this.selectionDate1 = !this.selectionDate1;
        this.message = null;
        if (this.dateregister2 === null && this.dateregister1 != null) {
          this.dateregister1 = new Date(
            this.dateregister1.getFullYear(),
            this.dateregister1.getMonth(),
            this.dateregister1.getDate(),
            this.hour.firstFigureH + this.hour.secondFigureH,
            this.hour.firstFigureM + this.hour.secondFigureM
          );
          this.timely = false;
          this.dately = true;
        } else {
          this.dateregister2 = new Date(
            this.dateregister2.getFullYear(),
            this.dateregister2.getMonth(),
            this.dateregister2.getDate(),
            this.hour.firstFigureH + this.hour.secondFigureH,
            this.hour.firstFigureM + this.hour.secondFigureM
          );
          var orderDate =
            this.dateregister1 <= this.dateregister2
              ? this.dateregister1.getDate() +
                "/" +
                this.dateregister1.getMonth() +
                "/" +
                this.dateregister1.getFullYear() +
                " à " +
                this.dateregister1.getHours() +
                ":" +
                this.dateregister1.getMinutes() +
                " et " +
                this.dateregister2.getDate() +
                "/" +
                this.dateregister2.getMonth() +
                "/" +
                this.dateregister2.getFullYear() +
                " à " +
                this.dateregister2.getHours() +
                ":" +
                this.dateregister2.getMinutes()
              : this.dateregister2.getDate() +
                "/" +
                this.dateregister2.getMonth() +
                "/" +
                this.dateregister2.getFullYear() +
                " à " +
                this.dateregister2.getHours() +
                ":" +
                this.dateregister2.getMinutes() +
                " et " +
                this.dateregister1.getDate() +
                "/" +
                this.dateregister1.getMonth() +
                "/" +
                this.dateregister1.getFullYear() +
                " à " +
                this.dateregister1.getHours() +
                ":" +
                this.dateregister1.getMinutes();
          var confirmation = confirm(
            "voulez vous enregistrez l'évènement entre les dates: " + orderDate
          );
          var debut =
            this.dateregister1 <= this.dateregister2
              ? this.dateregister1
              : this.dateregister2;
          var fin =
            debut === this.dateregister1
              ? this.dateregister2
              : this.dateregister1;
          this.dateregister1 = null;
          this.dateregister2 = null;
          this.timely = false;
          this.dately = true;
          if (debut.toString() === fin.toString()) {
            alert(
              "vous ne pouvez pas avoir la date de début égale à la date de fin"
            );
          } else {
            if (confirmation === true) {
              if (!this.datesCoincidenteW(debut, fin)) {
                this.events.push({
                  debut: debut,
                  fin: fin
                });
              } else {
                alert(
                  "vous avez déja un évènement prévu " +
                    (this.datesCoincidenteW(debut, fin).length === 1
                      ? "à la date "
                      : "aux dates ") +
                    this.datesCoincidenteW(debut, fin).join(" ,")
                );
              }
            }
          }
        }
        this.hour.firstFigureH = "-";
        this.hour.secondFigureH = "-";
        this.hour.firstFigureM = "-";
        this.hour.secondFigureM = "-";
        this.num[1] = true;
        for (let i = 2; i < 9; i++) {
          this.num[i] = false;
        }
      } else {
        this.message =
          "veuillez remplir tous les champs pour avoir une heure exacte";
      }
    },
    archiveTime1() {
      if (
        this.hour.firstFigureH != "-" &&
        this.hour.secondFigureH != "-" &&
        this.hour.firstFigureM != "-" &&
        this.hour.secondFigureM != "-"
      ) {
        this.timeregister1 = {
          heure: this.hour.firstFigureH + this.hour.secondFigureH,
          minute: this.hour.firstFigureM + this.hour.secondFigureM
        };
        this.selectionHeure1 = false;
        this.hour.firstFigureH = "-";
        this.hour.secondFigureH = "-";
        this.hour.firstFigureM = "-";
        this.hour.secondFigureM = "-";
      } else {
        this.message =
          "veuillez remplir tous les champs pour avoir une heure exacte";
      }
    },
    archiveTime2() {
      if (
        this.hour.firstFigureH != "-" &&
        this.hour.secondFigureH != "-" &&
        this.hour.firstFigureM != "-" &&
        this.hour.secondFigureM != "-"
      ) {
        this.timeregister2 = {
          heure: this.hour.firstFigureH + this.hour.secondFigureH,
          minute: this.hour.firstFigureM + this.hour.secondFigureM
        };
        this.selectionHeure1 = true;
        this.hour.firstFigureH = "-";
        this.hour.secondFigureH = "-";
        this.hour.firstFigureM = "-";
        this.hour.secondFigureM = "-";
        var debut =
          this.timeregister1.heure + this.timeregister1.minute <=
          this.timeregister2.heure + this.timeregister2.minute
            ? this.timeregister1
            : this.timeregister2;
        var fin =
          debut === this.timeregister1
            ? this.timeregister2
            : this.timeregister1;
        var confirmation = confirm(
          "voulez vous enregistrez l'évènement entre les heures: " +
            debut.heure +
            "H" +
            debut.minute +
            "m et " +
            fin.heure +
            "H" +
            fin.minute +
            "m"
        );
        if (debut.heure === fin.heure && debut.minute === fin.minute) {
          alert(
            "vous ne pouvez pas avoir l'heure de début égale à l'heure de fin"
          );
        } else {
          if (confirmation === true) {
            var notConcidence = true;
            for (let i = 0; i < this.datesTemplate.length; i++) {
              var debutT = new Date(
                this.datesTemplate[i].getFullYear(),
                this.datesTemplate[i].getMonth(),
                this.datesTemplate[i].getDate(),
                debut.heure,
                debut.minute
              );
              var finT = new Date(
                this.datesTemplate[i].getFullYear(),
                this.datesTemplate[i].getMonth(),
                this.datesTemplate[i].getDate(),
                fin.heure,
                fin.minute
              );
              if (!this.datesCoincidenteW(debutT, finT)) {
                this.eventTampon.push({
                  debut: debutT,
                  fin: finT
                });
              } else {
                alert(
                  "vous avez déja un évènement prévu " +
                    (this.datesCoincidenteW(debutT, finT).length === 1
                      ? "à la date "
                      : "aux dates ") +
                    this.datesCoincidenteW(debutT, finT).join(" ,")
                );
                notConcidence = false;
              }
            }
            if (notConcidence) {
              this.events.push(...this.eventTampon);
            } else {
              if (this.eventTampon.length) {
                var demande = confirm(
                  "voulez vous quand même enregistrer les dates qui n'ont aucune coïncidence, celles qui ont une coïncidence ne seront pas enregistrées"
                );
                if (demande) {
                  this.events.push(...this.eventTampon);
                }
              } else {
                alert(
                  "aucune date ne peut être enregistrée elles comportent toutes des coïncidences"
                );
              }
            }
          }
        }
        this.eventTampon = [];
        this.timeregister1 = null;
        this.timeregister2 = null;
      } else {
        this.message =
          "veuillez remplir tous les champs pour avoir une heure exacte";
      }
    },
    archiveTimeT() {
      this.selectionHeure1 = true;
      this.hour.firstFigureH = "-";
      this.hour.secondFigureH = "-";
      this.hour.firstFigureM = "-";
      this.hour.secondFigureM = "-";
      this.eventTampon = [];
      this.timeregister1 = null;
      this.timeregister2 = null;
      this.datesTemplate = [];
      this.timely = false;
      this.dately = true;
      for (let i = 0; i < this.nbDayThisMonth.length; i++) {
        if (this.nbDayThisMonth[i].select) {
          this.nbDayThisMonth[i].select = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#divMonth {
  margin: 0 auto;
  width: 600px;
  height: 600px;
  right: calc(50% - 150px);
  border: 1px solid blue;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
}
.days {
  border-top: 1px solid red;
  border-right: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  overflow-y: auto;
}
.days:nth-child(8) {
  border-left: 1px solid red;
}
.days:nth-last-child(-n + 7) {
  border-bottom: 1px solid red;
}
.daysH {
  border-top: 1px solid red;
  border-right: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  overflow-y: auto;
}
.daysH:nth-child(8) {
  border-left: 1px solid red;
}
.daysH:nth-last-child(-n + 7) {
  border-bottom: 1px solid red;
}
.daysH:hover {
  background-color: blue;
  color: white;
}
.daysActivated {
  background-color: blue;
  color: white;
}
.day {
  font-size: 10px;
}
.one {
  grid-column: 1;
  grid-row: 1;
}
.two {
  grid-column: 2;
  grid-row: 1;
}
.tree {
  grid-column: 3;
  grid-row: 1;
}
.four {
  grid-column: 4;
  grid-row: 1;
}
.five {
  grid-column: 5;
  grid-row: 1;
}
.six {
  grid-column: 6;
  grid-row: 1;
}
.seven {
  grid-column: 7;
  grid-row: 1;
}
.eventMonth {
  display: block;
  width: 100%;
  height: 10px;
  color: white;
  font-size: 10px;
}
#divHour {
  width: 400px;
  margin: 0 auto;
}
#headerHour {
  width: 100%;
  height: 60px;
  background-color: blue;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.timeField {
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fieldActived {
  background-color: grey;
  height: 100%;
}
#contentHour {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid blue;
}
.num {
  width: 33%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.num:hover {
  background-color: blue;
  color: white;
}
.numLocked {
  color: red;
}
.numLocked:hover {
  background-color: red;
  color: white;
}
button {
  background-color: white;
  color: blue;
  border: 1px solid blue;
  margin: 5px 0 5px 0;
}
button:hover {
  background-color: blue;
  color: white;
}
#content {
  display: flex;
}
#button {
}
</style>