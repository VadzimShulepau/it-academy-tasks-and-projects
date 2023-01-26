const SuperModalPlugin = (function(){
	
	function ModalController (){
		let modalContainer = null;
		let modalModel = null;
		let clickLink = null;
		let close = null;

		this.init = function(link, container, model){
			modalContainer = container;
			modalModel = model;
			clickLink = link;
			
			// clickLink.addEventListener('click', this.openModal);
		this.openModal();
			close = modalContainer.querySelector('.close');
			close.addEventListener('click', this.closeModal)
		}
		
		this.openModal = function(){

			modalModel.openModal(clickLink);
		}

		this.closeModal = function(e){
			e.preventDefault();
			modalModel.closeModal();
		}

	};

	function ModalModel (){
		let modalView = null;

		this.init = function(view){
			modalView = view;
		}

		this.openModal = function(link){
			
			let title = link.dataset.supermodalTitle;
			let content = link.dataset.supermodalContent;

			if(title && content){

				this.createContent(title, content);
			}
			modalView.openModal();
		}

		this.createContent = function(title, content){
			modalView.createContent(title, content);
		}

		this.closeModal = function(){
			modalView.closeModal();
		};
	};

	function ModalView (){
		let modalContainer = null;

		this.init = function(container){
			modalContainer = container;
		}

		this.openModal = function(){
			modalContainer.classList.remove('modal-hide');	
		}

		this.createContent = function(title, content){
			modalContainer.querySelector('.title').innerHTML = title;
			modalContainer.querySelector('.text').innerHTML = content;
		}

		this.closeModal = function(){
			modalContainer.classList.add('modal-hide');
		}

	};

	let createModal = function(link){

		let modalWrapper = document.querySelector('.modal-wrapper');
		let modal = document.createElement('div');
		modal.classList.add('modal');
		modal.id = link.dataset.supermodal;
		modalWrapper.append(modal);

		let title = document.createElement('p');
		title.classList.add('title');
		modal.append(title);

		let content = document.createElement('p');
		content.classList.add('text');
		modal.append(content);

		let close = document.createElement('div');
		close.classList.add('close');
		modal.append(close);

	}


	let initModal = function (link, container){
		
		const modal = new ModalModel();
		const modalView = new ModalView();
		const modalController = new ModalController();

			modal.init(modalView);
			modalView.init(container);
			modalController.init(link, container, modal);
	};

	let connectModal = function (e){
		e.preventDefault();
		if(e.target.closest('[data-supermodal]')){
			if(document.body.querySelector(`#${e.target.dataset.supermodal}`)){
				initModal(e.target, document.body.querySelector(`#${e.target.dataset.supermodal}`));
			}else{
				createModal(e.target);
				initModal(e.target, document.body.querySelector(`#${e.target.dataset.supermodal}`));
}
		}
	};
	
	document.body.addEventListener('click', connectModal);

})();