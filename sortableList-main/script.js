
let ul = document.createElement('ul');
  ul.classList.add('list');
  document.body.append(ul);

  let letter = ['A','B','C','D','E'];
	

	letter.sort(function (a, b) {
  return Math.random() - 0.5;
	});


  letter.forEach(function(li, i){

  li = document.createElement('li');
  li.textContent = letter[i];
  li.classList.add('item-list');
  li.setAttribute('draggable', true);

  ul.append(li);
  });

  let itemList = document.querySelectorAll('.item-list');

  for(let item of itemList){

  item.addEventListener('dragstart',function(e){
  e.target.classList.add('current');
  });

  item.addEventListener('dragend',function(e){
    e.target.classList.remove('drag');
  });

  item.addEventListener('dragover',function(e){
  e.preventDefault();
	
	let itemList = document.querySelectorAll('.item-list');
	             
  let list = document.querySelector('.list');
  let current = document.querySelector('.current');

  let prev = e.target;
	let curIndex = null;
	let prevIndex = null;

  for(let i = 0; i < itemList.length; i++){
		let item = itemList[i];

      if(current === item){
				curIndex = i;
				// console.log(curIndex)
			}
			if(prev === item){
				prevIndex = i;
				// console.log(prevIndex)
			}
  };

	if (curIndex < prevIndex){
		e.target.after(current);	
	}else{
		e.target.before(current);
	}

  });

	item.addEventListener('dragenter', function(e){
		e.target.classList.add('drag');
	});

	item.addEventListener('dragleave', function(e){
		e.target.classList.remove('drag');
		
	});

  item.addEventListener('drop',function(e){
	

  let current = document.querySelector('.current');
 
	e.target.classList.remove('drag');

	current.classList.remove('current');


	let items = document.querySelectorAll('.item-list');
	let itemArr = [];
	for (let i = 0; i < items.length; i++){
		itemArr+=[items[i].textContent];
	}
	

	for(let item of items){
			if(itemArr.includes('ABCD')){
			item.classList.add('end');
	}else{
		item.classList.remove('end');
	}

	};



   });

  };



// Необходимо средствами JavaScript создать список с сортируемыми
// элементами (цвета радуги, буквы алфавита, цифры и т.п.), стилизовать,
// чтобы вышло примерно как на Рис1. В дата-атрибуты элементов списка
// записать значение, которое будет определять правильный порядок этих
// элементов. В скрипте в переменной массива задать правильный порядок
// элементов, с которым будет сравниваться сортируемый пользователем
// список после каждого его (пользователя) действия. Необходимо
// реализовать функционал перетаскивания и замены между собой элементов
// списка (результат см. в файле dragable-list.mp4), после каждого события drop
// необходимо запускать проверку на валидность списка (на правильность
// сортировки) и, если порядок верен, то подсветить элементы зеленым
// цветом (см. Рис2) или же другим способом обозначить верность сортировки.