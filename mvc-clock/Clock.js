
      function Clock (){
         let myView = null;
         let seconds = null;
         let minutes = null;
         let hours = null;
        let timeZ = null;
        let date = null;
				let intervalStat = true;
        let modelData = {};
        let interval;
         
				// получаем данные контейнера и временной зоны
         this.init = function (view, time){
           myView = view; 
           timeZ = time;  
         }

				// устанавливаем интервал
         this.intervalStatus = function(intervalCheck){
					 intervalStat = intervalCheck;
          if(intervalStat){
            interval = setInterval(this.updateDate, 1000);
          }else{
            clearInterval(interval);
          }

         };

				// обновляем данные и отправляем во Вью
         this.updateDate = function (){
			
        date = new Date(new Date().toLocaleString('en-EN', {timeZone: timeZ}));
          
        seconds = date.getSeconds()*6;
        minutes = date.getMinutes()*6;
        hours = date.getHours()*30 + (minutes/12);

          modelData = {
          date: timeZ,
          seconds: seconds,
          minutes: minutes,
          hours: hours
        }

        myView.update(modelData);


         }

      };
