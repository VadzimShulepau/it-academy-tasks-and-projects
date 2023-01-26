function ClockViewDOM (){
   let myField = null; // внутри какого элемента DOM наша вёрстка
   let display = null;
   let secondsArrow = null;
   let minutesArrow = null;
   let hoursArrow = null;
   let timeString = null;
   
	//  инициализация верстки
   this.init = function(field) {
     myField = field;

    //  добавление контейнера с часами
     let clockContainer = document.createElement('div');
     clockContainer.classList.add('clock');
     myField.append(clockContainer);

     display = document.createElement('div'); //дисплей часов
     display.classList.add('display');
     clockContainer.appendChild(display);

		// контейнер с кнопками
     let buttonWrapper = document.createElement('div');
     buttonWrapper.classList.add('button-wrapper');
     clockContainer.prepend(buttonWrapper);

     let buttonStart = document.createElement('button');
     buttonStart.classList.add('button-start');
     buttonStart.textContent = 'start';

     let buttonStop = document.createElement('button');
     buttonStop.classList.add('button-stop');
     buttonStop.textContent = 'stop';

		// вывод временной зоны
     timeString = document.createElement('span');
     timeString.textContent = 'timeZone';
     buttonWrapper.prepend(buttonStart);
     buttonStart.after(buttonStop);
     buttonStop.after(timeString);

     hoursArrow = document.createElement('div'); //стрелка часов
     hoursArrow.classList.add('hour');
     display.appendChild(hoursArrow);
     
     minutesArrow = document.createElement('div'); //стрелка минут
     minutesArrow.classList.add('minutes');
     display.appendChild(minutesArrow);
     
     secondsArrow = document.createElement('div'); //стрелка секунд
     secondsArrow.classList.add('second');
     display.appendChild(secondsArrow);
     
     let ange = 30; // угол распределения номеров циферблата 360/12
     
     for(let i = 1; i < 13; i++){
           let num = document.createElement('div');
             num.classList.add('display-numb');
             display.appendChild(num);
             
             let radius = display.offsetHeight/2 - num.offsetHeight/1.5; // расчет радиуса по которому будут вcтавляться цифры
     
             let radians = parseFloat(ange)/180*Math.PI; //расчет радиан на которые будет смещаться каждая цифра по дуге
             let numberX = display.offsetWidth/2 + radius*Math.sin(radians); //координаты центра радиуса для вставки цифры по оси Х
             let numberY = display.offsetHeight/2 - radius*Math.cos(radians);//координаты центра радиуса для вставки цифры по оси У
             num.style.left = Math.round(numberX - num.offsetWidth/2) + 'px'; //позиционирование цифры от левого края
             num.style.top = Math.round(numberY - num.offsetHeight/2) + 'px'; // позиционироние цифры от верха
              ange+=30; // шаг вставки цифры
              num.textContent = i; //добавление номера в div 
          };
     
           }
// обновление данных (для поворота стрелок)
   this.update = function(data) {
     if (!data) {
       console.error("Ошибка получения данных из модели!");
       return;
     }   
         timeString.textContent = data.date;
         secondsArrow.style.transform = 'rotate('+data.seconds+'deg)';
         minutesArrow.style.transform = 'rotate('+data.minutes+'deg)';
         hoursArrow.style.transform = 'rotate('+data.hours+'deg)';     
   }
   
   };
