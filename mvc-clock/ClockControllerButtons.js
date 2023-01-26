function ClockControllerButtons() {
   let myModel = null; // с какой моделью работаем
   let myField = null; // внутри какого элемента вёрстка
   let intervalCheck = true; // флаг для кнопок


// инициализация модели и контейнера с версткой
   this.init = function(model, field) {
     myModel = model;
     myField = field;
		// запуск часов после загрузки страницы
    //  document.addEventListener("DOMContentLoaded", this.updateClock);
		 this.updateClock();
		// находим кнопки
     let buttons = myField.querySelector('.button-wrapper');
     
     buttons.addEventListener('click', this.buttonHadler);
   }

	// активация кнопок и пердача значений в модель
   this.buttonHadler = function (e){
       e.preventDefault();
       if(e.target.className ==='button-start'){
         intervalCheck = true;
     // console.log(intervalCheck)
     myModel.intervalStatus(intervalCheck);
       }
       if(e.target.className === 'button-stop'){
         intervalCheck = false;
     // console.log(intervalCheck)
     myModel.intervalStatus(intervalCheck);
       }
     };

   this.updateClock = function(){
   myModel.intervalStatus(intervalCheck);
   };

 };
