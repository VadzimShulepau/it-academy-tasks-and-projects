function ClockViewCanvas (){
   let myField = null; // внутри какого элемента DOM наша вёрстка

   let timeString = null;
   let ctx = null;
   let cx = null;
   let cy =null;
   let radius = null;
   let canvas = null;

	// инициализация верстки
   this.init = function(field) {
     myField = field;

    //  контейнер с часами
     let clockContainer = document.createElement('div');
     clockContainer.classList.add('clock');
     myField.append(clockContainer);
      clockContainer.innerHTML = '<canvas width="400" height="400"></canvas>';
  
		// контейнер с ккнопками
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

			// находим канвас
      canvas = myField.querySelector('canvas');
      ctx = canvas.getContext('2d'); 
      cx = canvas.width/2;
      cy = canvas.height/2;      
      radius = cx;

     
     }

	// обновление вью
   this.update = function(data) {
     if (!data) {
       console.error("Ошибка получения данных из модели!");
       return;
     }   

     timeString.textContent = data.date;

     
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.save();
     ctx.translate(cx, cy);// смещение канваса 

      //рисуем дисплей
    ctx.beginPath();
    ctx.fillStyle = '#FAC76E';
    ctx.arc(0, 0, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    
    let ange = 30; // угол распределения номеров циферблата 360/12

        for(let i = 1; i < 13; i++){
        
        let radiusNum = cy - 30*1.3; // расчет радиуса по которому будут вcтавляться цифры
        
        let radians = parseFloat(ange)/180*Math.PI; //расчет радиан на которые будет смещаться каждая цифра по дуге
        let numberX = cx + radiusNum*Math.sin(radians); //координаты центра радиуса для вставки цифры по оси Х
        let numberY = cy - radiusNum*Math.cos(radians);//координаты центра радиуса для вставки цифры по оси У
        let numX = Math.round(numberX); //позиционирование цифры от левого края
        let numY = Math.round(numberY); // позиционироние цифры от верха
        
           //рисуем круги с цифрами
        ctx.save();
        
        ctx.translate(-cx, -cy);//смещаем канвас 
        ctx.beginPath();
        ctx.fillStyle = '#5CA887';
        ctx.arc(numX, numY, 30, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.font = "25px Roboto Mono";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i, numX, numY);
        ctx.closePath();
        
        ctx.restore();
        
        ange+=30; // шаг вставки цифры
        
        }; 
   
              //рисуем стрелки
          
              ctx.save();
              ctx.beginPath(); //секундная стрелка
              ctx.rotate(data.seconds*(Math.PI/180));
              ctx.lineCap = 'round';
              ctx.moveTo(0, 0);
              ctx.lineTo(0, -cy*0.9);
              ctx.lineWidth = '4';
              ctx.stroke();
              ctx.closePath();
              ctx.restore();
          
              ctx.save();
              ctx.beginPath();//минутная стрелка
              ctx.rotate(data.minutes*(Math.PI/180));
              ctx.lineCap = 'round';
              ctx.moveTo(0, 0);
              ctx.lineTo(0, -cy*0.7);
              ctx.lineWidth = '8';
              ctx.stroke();
              ctx.closePath();
              ctx.restore();
          
              ctx.save();
              ctx.beginPath();//часовая стрелка
              ctx.rotate(data.hours*(Math.PI/180));
              ctx.lineCap = 'round';
              ctx.moveTo(0, 0);
              ctx.lineTo(0, -cy*0.5);
              ctx.lineWidth = '10';
              ctx.stroke();
              ctx.closePath();
              ctx.restore();
    ctx.restore();

   }
   
   };

  