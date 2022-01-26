
<template>
  <div id="app">
        <h1 class="game__title container">Simon</h1>
        <div class="container">

            <div class="game__fiend">
                <div v-for="(btn,i) of simonBtn" :key="i"  class="btn"
                    :class="['btn__'+btn.id, {['active__'+btn.id] : btn.active}]" @click="handlerBtn(btn)" :ref="'btn__'+btn.id"></div>
            </div>

            <div class="game__menu">
                <i class="game__start far fa-play-circle" @click="start" v-if="!game.status"></i>
                <i class="game__start far fa-stop-circle" @click="getGameOver" v-if="game.status"></i>
                <div class="game__score">Счет: {{rounds}}</div>
                <div class="game__step" v-if="!player.step && game.status">Запоминайте!</div>
                <div class="game__step" v-show="player.step">Ваша очередь!</div>
                <div class="game__over" v-show="game.end">
                    <h2 class="game__over_title">Игра закончена!</h2>
                    <div class="game__over_text">Последний счет: {{player.lastResult}}</div>
                    <div class="game__over_text">Рекорд: {{player.recordResult}}</div>
                </div>
                <div class="game__option" :class="{'event-block':game.status}">
                    <form action="#">
                        <h2 class="option-title">Уровень сложности:</h2>
    
                        <div class="option">
                            <input type="radio" value="900" id="easy" v-model="timeout" class="check-lvl">
                            <label for="easy">Легкий</label>
                        </div>
    
                        <div class="option">
                            <input type="radio" value="600" id="standart" v-model="timeout" class="check-lvl" checked>
                            <label for="standart">Средний</label>
                        </div>
    
                        <div class="option">
                            <input type="radio" value="400" id="hard" v-model="timeout" class="check-lvl">
                            <label for="hard">Тяжелый</label>
                        </div>
    
                    </form>
                </div>
            </div>
       </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data(){
      return{
         simonBtn: [{
                id: 0,
                active: false,
                sound: "sounds/sounds_1.mp3"
            },
            {
                id: 1,
                active: false,
                sound: "sounds/sounds_2.mp3"
            },
            {
                id: 2,
                active: false,
                sound: "sounds/sounds_3.mp3"
            },
            {
                id: 3,
                active: false,
                sound: "sounds/sounds_4.mp3"
            }
        ],
        player: {
            step: false,
            pick: [],
            lastResult: 0,
            recordResult: 0,
        },
        game: {
            status: false,
            pick: [],
            end: false
        },
        rounds: 0,
        timeout: 600,
      }
    },

    methods: {
        //Начало 
        start() {
            this.game.status = true;
            this.game.pick = [];
            this.game.end = false;
            this.gameRound();
        },
        
        //Основной метод, задающий последовательнотсь
        gameRound() {
            this.player.step = false;
            this.player.pick = [];
            this.newStep();
            let ticks = 0;
            let interval = setInterval(() => {

                let id = this.game.pick[ticks];
                let btn = this.simonBtn.find((el) => {
                    return el.id == id;
                });

                if(!this.game.end){
                    this.moveBtn(btn);
                    }
                else{
                    clearInterval(interval)
                    }

                ticks++;
                if (ticks == this.game.pick.length) {
                    clearInterval(interval);
                    ticks = 0;
                    this.player.step = true;
                }
            }, this.timeout)


        },

        //Метод обрабатывает окончание игры
        getGameOver() {
            this.game.status = false;
            this.player.step = false;
            this.game.pick = [];
            this.game.end = true;
            this.player.lastResult = this.rounds;
            this.rounds = 0;
            if (this.player.recordResult < this.player.lastResult) {
                this.player.recordResult = this.player.lastResult;
            }
        },

        //Сравнение заданной последовательности и игрока
        compare() {
            this.player.pick.forEach((element, i) => {
                if (element != this.game.pick[i]) {
                    this.getGameOver();
                }
            });
            if (this.player.pick.length == this.game.pick.length) {
                this.rounds++;
                this.gameRound();
            }
        },

        //Метод добавляет новое нажатие в последовательность 
        newStep() {
            let randomId = this.getRandomID();
            let btnFound = this.simonBtn.find((el) => {
                return el.id == randomId;
            })
            this.game.pick.push(btnFound.id);
        },

        //Обработка активирования кнопки
        moveBtn(btn) {
            btn.active = true;
            setTimeout(() => {
                btn.active = false;
            }, 80)
            new Audio(btn.sound).play();

        },

        //Обработчик нажатия игрока
        handlerBtn(btn) {
            if (this.player.step) {
                this.moveBtn(btn);
                this.player.pick.push(btn.id);
                this.compare();
            }
        },

        
        getRandomID() {
            return parseInt(Math.random() * (3 - 0) + 0);
        }
    }
}
</script>

<style src="./css/style.css"></style>