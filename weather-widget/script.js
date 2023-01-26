class WeatherWidget{
   constructor(container){
      this.container = container;
      
      this.navigator = navigator.geolocation;
      this.getWeather();
      this.renderWidget();
   }

  
   getWeather (){

      if(this.navigator){
         this.navigator.getCurrentPosition(this.generateData);
         
      }else{
         let position = {
            coords:{
               latitude: 53.9007,
               longitude: 27.5709
            }
         };
         this.generateData(position);
      }   
       
      }     

      renderWidget(){
      let widget = document.createElement('div');
      widget.classList.add('widget', 'block-hide__pos1');
      this.container.append(widget);

      let city = document.createElement('div');
      city.classList.add('city');
      widget.append(city);

      let temp = document.createElement('div');
      temp.classList.add('temp');
      widget.append(temp);

      let weatherIcon = document.createElement('div');
      weatherIcon.classList.add('weather-icon');
      widget.append(weatherIcon);

      let weatherDescription = document.createElement('div');
      weatherDescription.classList.add('weather-description');
      widget.append(weatherDescription);

      let weatherText = document.createElement('div');
      weatherText.classList.add('weather-text');
      weatherText.innerHTML = 'погода на 3 дня';
      widget.append(weatherText);

      let day = document.createElement('div');
      day.classList.add('day');
      widget.append(day);
      let day2 = document.createElement('div');
      day2.classList.add('day');
      widget.append(day2);
      let day3 = document.createElement('div');
      day3.classList.add('day');
      widget.append(day3);

      let btnLock = document.createElement('div');
      btnLock.classList.add('widget-btn');
      btnLock.innerHTML = 'W';
      widget.append(btnLock);

      let btnDay = document.createElement('div');
      btnDay.classList.add('btn-day');
      btnDay.innerHTML = '@';
      widget.append(btnDay);

      let load = document.createElement('div');
      load.classList.add('load');
      load.innerHTML = 'Загрузка...';
      widget.append(load);

      btnLock.addEventListener('click', clickButtonW);
      function clickButtonW (e){
         e.preventDefault();
         widget.classList.toggle('block-hide__pos2');
         widget.classList.remove('block-hide__pos3'); 
      }

      btnDay.addEventListener('click', clickButtonD);
      function clickButtonD (e){
         e.preventDefault();
         widget.classList.toggle('block-hide__pos3');
      }
   }

   generateData(position){
      const city = document.querySelector('.city');
      const temp = document.querySelector('.temp');
      const weatherIcon = document.querySelector('.weather-icon');
      const weatherDescription = document.querySelector('.weather-description');
      const days = document.querySelectorAll('.day');
      const load = document.querySelector('.load');

         let lat = position.coords.latitude;
         let lon = position.coords.longitude;
				console.log(lat, lon)
         const APIkey = 'c6be1bfbfa6894d1345f3402fccb7d26';
         let exclude = 'hourly,minutely';
      
         let geoloc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${APIkey}`;

         let geoloc3days = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ru&exclude=${exclude}&appid=${APIkey}`;
         console.log(geoloc3days);

         fetch(geoloc)
         .then(response => response.json())
         .then(data => printData(data))
         .catch(error => console.error(error));
      
         fetch(geoloc3days)
         .then(response => response.json())
         .then(data3 => printData3(data3))
         .catch(error => console.error(error));

         function printData(data){

            load.classList.add('hide');

            city.innerHTML = data.name;
            // counrty.innerHTML = data.sys.country;
            temp.innerHTML = Math.round(data.main.temp) + '&#176;C';
            weatherIcon.innerHTML = `<img src='https://openweathermap.org/img/w/${data.weather[0].icon}.png'/>`; 
            weatherDescription.innerHTML = data.weather[0].description;
            load.classList.add('hide');

         
         };
   
   
         function printData3(data3){
   
            days.forEach(function(item, index){
            let dat = new Date(data3.daily[index+1].dt*1000).getDate();
            let mon = new Date(data3.daily[index+1].dt*1000).getMonth()+1;
            
               if(dat < 10){
                  dat = `0${dat}`;
               }
               if (mon < 10){
               mon = `0${mon}`;
               }
            
            item.innerHTML = `
            ${dat} / ${mon} <br>
            макс ${Math.round(data3.daily[index+1].temp.max)}&#176;C <br>
            мин ${Math.round(data3.daily[index+1].temp.min)}&#176;C    
            `;
            });
            }
   
        
      };

      
   };

   
new WeatherWidget(document.querySelector('.wrapper')  ).getWeather();


      // const widget = document.querySelector('.widget');
      // const city = document.querySelector('.city');
      // const counrty = document.querySelector('.country');
      // const temp = document.querySelector('.temp');
      // const weatherIcon = document.querySelector('.weather-icon');
      // const weatherDescription = document.querySelector('.weather-description');
      // const days = document.querySelectorAll('.day');
      // const btnLock = document.querySelector('.widget-btn');
      // const btnDay = document.querySelector('.btn-day');
      // const load = document.querySelector('.load');


// if(navigator.geolocation){
// navigator.geolocation.getCurrentPosition(getPosition);
// }

// function getPosition (position){

//    let lat = position.coords.latitude;
//    let lon = position.coords.longitude;
//    const APIkey = 'c6be1bfbfa6894d1345f3402fccb7d26';
//    let exclude = 'hourly,minutely';

//    let geoloc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${APIkey}`;
//    console.log(geoloc)
//    let geoloc3days = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ru&exclude=${exclude}&appid=${APIkey}`;
//    console.log(geoloc3days)

//    // fetch(geoloc)
//    // .then(response => response.json())
//    // .then(data => printData(data))
//    // .catch(error => console.error(error));
//    // // .finaly()
//    // fetch(geoloc3days)
//    // .then(response => response.json())
//    // .then(data3 => printData3(data3))
//    // .catch(error => console.error(error));
      
//       fetchAsyncData(geoloc, geoloc3days);
// };

// async function fetchAsyncData(geoloc, geoloc3days) {
 
//    try {
//      const response = await fetch(geoloc);
//      const data = await response.json();
//      if(data){
  
//       load.classList.add('hide');
//       printData(data);
//      }
//    } catch (error) {
//      console.error("Error:", error);
//    } finally {

//    }

//    try {
//      const response = await fetch(geoloc3days);
//      const data3 = await response.json();
//      printData3(data3);
//    } catch (error) {
//      console.error("Error:", error);
//    } finally {
//    }
   
//  }

// function printData(data){
//    city.innerHTML = data.name;
//    // counrty.innerHTML = data.sys.country;
//    temp.innerHTML = Math.round(data.main.temp) + '&#176;C';
//    weatherIcon.innerHTML = `<img src='https://openweathermap.org/img/w/${data.weather[0].icon}.png'/>`; 
//    weatherDescription.innerHTML = data.weather[0].description;
   
// };


//    function printData3(data3){
  
//      days.forEach(function(item, index){
//       let dat = new Date(data3.daily[index+1].dt*1000).getDate();
//       let mon = new Date(data3.daily[index+1].dt*1000).getMonth()+1;
      
//         if(dat < 10){
//            dat = `0${dat}`;
//         }
//         if (mon < 10){
//          mon = `0${mon}`;
//         }
        
//       item.innerHTML = `
//       ${dat} / ${mon} <br>
//       макс ${Math.round(data3.daily[index+1].temp.max)}&#176;C <br>
//       мин ${Math.round(data3.daily[index+1].temp.min)}&#176;C    
//       `;
//      });
//    }

   // btnLock.addEventListener('click', clickButtonW);
   // function clickButtonW (e){
   //    e.preventDefault();
   //    widget.classList.toggle('block-hide__pos2');
   //    widget.classList.remove('block-hide__pos3'); 
   // }

   // btnDay.addEventListener('click', clickButtonD);
   // function clickButtonD (e){
   //    e.preventDefault();
   //    widget.classList.toggle('block-hide__pos3');
   // }