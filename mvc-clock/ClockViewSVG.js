function ClockViewSVG (){
   let myField = null; // внутри какого элемента DOM наша вёрстка
   let display = null;
   let secondsArrow = null;
   let minutesArrow = null;
   let hoursArrow = null;
   let timeString = null;
   
	//  инициализация верстки
   this.init = function(field) {
     myField = field;

    //  контейнеп для часов
     let clockContainer = document.createElement('div');
     clockContainer.classList.add('clock');
     myField.append(clockContainer);
      clockContainer.innerHTML = `<svg width = '400' height = '400' xmlns="http://www.w3.org/2000/svg"></svg>`;

		// контейнер для кнопок
      let buttonWrapper = document.createElement('div');
      buttonWrapper.classList.add('button-wrapper');
      clockContainer.prepend(buttonWrapper);
 
      let buttonStart = document.createElement('button');
      buttonStart.classList.add('button-start');
      buttonStart.textContent = 'start';
 
      let buttonStop = document.createElement('button');
      buttonStop.classList.add('button-stop');
      buttonStop.textContent = 'stop';

      timeString = document.createElement('span');
      timeString.textContent = 'timeZone';
      buttonWrapper.prepend(buttonStart);
      buttonStart.after(buttonStop);
      buttonStop.after(timeString);

      const svgNS = 'http://www.w3.org/2000/svg';//стандарт  SVG

      let svg = myField.querySelector('svg');// область для рисования

      let centerY = svg.getAttributeNS(null, 'height')/2;// центр облати по высоте
      let centerX = svg.getAttributeNS(null, 'width')/2;// центр облати по ширине


      display = document.createElementNS(svgNS,'circle');
      display.setAttributeNS(null, 'cx', centerX);
      display.setAttributeNS(null, 'cy', centerY);
      display.setAttributeNS(null, 'r', centerX);
      display.setAttributeNS(null, 'fill', '#fac76e');
      svg.append(display); //дисплей часов

      let ange = 30;//угол поворота кгугов с цифрами

      for(let i = 1; i < 13; i++){

      let num = document.createElementNS(svgNS, 'circle');
         num.setAttributeNS(null, 'r', '30');
         num.setAttributeNS(null, 'fill', '#48B382');

      let radians = parseFloat(ange)/180*Math.PI; //длинна дуги

      let radius = svg.getAttributeNS(null, 'height')/2 - num.getAttributeNS(null, 'r')*1.3;// радиус вставки цифр

      let nX = centerX + radius*Math.sin(radians);
      let nY = centerY - radius*Math.cos(radians);
      let cx = Math.round(nX);//координата вставки цифры по оси Х
      let cy = Math.round(nY); //координата вставки цифры по оси Y

         let textSVG = document.createElementNS(svgNS, 'text'); //вывод текста на аналоговый цициферблат
         let text = document.createTextNode(`${i}`);
         textSVG.setAttributeNS(null, 'width', '100%');
         textSVG.setAttributeNS(null, 'height', 'auto');
         textSVG.setAttributeNS(null, 'font-family', 'Roboto Mono');
         textSVG.setAttributeNS(null, 'font-size', '25');
         // textSVG.setAttributeNS(null, 'font-weight', '700');
         textSVG.setAttributeNS(null, 'text-anchor', 'middle');
         textSVG.setAttributeNS(null, 'dominant-baseline', 'mathematical');
         textSVG.setAttributeNS(null, 'x', `${cx}`);	
         textSVG.setAttributeNS(null, 'y', `${cy-5}`);	
         textSVG.appendChild(text);
         
         num.setAttributeNS(null, 'cx', `${cx}`);
         num.setAttributeNS(null, 'cy',`${cy}`);
         ange+=30;
         svg.append(num);
         svg.appendChild(textSVG);
      };
      
      secondsArrow = document.createElementNS(svgNS, 'line');
      secondsArrow.setAttributeNS(null, 'x1', centerX);
      secondsArrow.setAttributeNS(null, 'x2', centerX);
      secondsArrow.setAttributeNS(null, 'y1', (centerY - 180));
      secondsArrow.setAttributeNS(null, 'y2', (centerY+20));
      secondsArrow.setAttributeNS(null, 'rx', '5');
      secondsArrow.setAttributeNS(null, 'ry', '5');
      secondsArrow.setAttributeNS(null, 'stroke', 'black');
      secondsArrow.setAttributeNS(null,'stroke-width', '4');
      svg.append(secondsArrow);// секундная стрелка
      
      minutesArrow = document.createElementNS(svgNS, 'line');
      minutesArrow.setAttributeNS(null, 'x1', centerX);
      minutesArrow.setAttributeNS(null, 'x2', centerX);
      minutesArrow.setAttributeNS(null, 'y1', (centerY - 150));
      minutesArrow.setAttributeNS(null, 'y2', (centerY+20));
      minutesArrow.setAttributeNS(null, 'rx', '5');
      minutesArrow.setAttributeNS(null, 'ry', '5');
      minutesArrow.setAttributeNS(null, 'stroke', 'black');
      minutesArrow.setAttributeNS(null,'stroke-width', '6');
      svg.append(minutesArrow);//минутная стрелка
      
      hoursArrow = document.createElementNS(svgNS, 'line');
      hoursArrow.setAttributeNS(null, 'x1', centerX);
      hoursArrow.setAttributeNS(null, 'x2', centerX);
      hoursArrow.setAttributeNS(null, 'y1', (centerY- 110));
      hoursArrow.setAttributeNS(null, 'y2', (centerX+20));
      hoursArrow.setAttributeNS(null, 'rx', '5');
      hoursArrow.setAttributeNS(null, 'ry', '5');
      hoursArrow.setAttributeNS(null, 'stroke', 'black');
      hoursArrow.setAttributeNS(null,'stroke-width', '10');
      svg.append(hoursArrow);//стрелка часов
   
     }
// обновление данных и отрисовка стрелок
   this.update = function(data) {
     if (!data) {
       console.error("Ошибка получения данных из модели!");
       return;
     }   
     timeString.textContent = data.date;
     secondsArrow.setAttribute('transform', 'rotate('+ data.seconds +' 200 200)');
     minutesArrow.setAttribute('transform', 'rotate('+ data.minutes +' 200 200)');
     hoursArrow.setAttribute('transform', 'rotate('+ data.hours +' 200 200)');
   }
   
   };