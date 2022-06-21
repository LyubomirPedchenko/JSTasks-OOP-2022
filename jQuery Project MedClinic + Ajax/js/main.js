let meetList = {};
const url = 'https://62b2155fc7e53744afc7514e.mockapi.io/data';

function init() {
	$.getJSON("https://62b2155fc7e53744afc7514e.mockapi.io/data", blocksOut);
}

function blocksOut(data) {
	var out = '';
	for(var key in data) {
		out += '<div class="card">';
		out += '<img style="width:20vw; height:55vh" src="img/111'+data[key].id+'.jpg">'
		out += '<p class="name">'+data[key].name+'</p>';
		out += '<p class="job">Посада: '+data[key].job+'</p>';
		out += '<p class="number">Робочий номер: '+data[key].phone+'</p>';
		out += '<button class="button" data-id="'+data[key].name+'">ЗАПИСАТИСЯ</button>';
		out += '</div>';
	}
	$('.blocks-out').html(out);
	
	$('.button').on('click', addToList);	
}

function addToList() {
	var id = $(this).attr('data-id');
	var chk = "";
	// console.log(id);
	if (meetList[id]==undefined) {
		meetList[id] = 1;
	} else {
		// alert('Такий запис вже існує!');
		let result = confirm('Такий запис вже існує!');
		chk = "act"
	}
	showList(chk);
	saveMeetList();
}

function saveMeetList() {
	localStorage.setItem('meets', JSON.stringify(meetList));
}

function showList(chk) {
	if (chk!=="act") {
		var y = Math.floor(Math.random() * (2026 - 2022) + 2022);
		var m = Math.floor(Math.random() * (13 - 1) + 1);
		var d = Math.floor(Math.random() * (31 - 1) + 1);
		var date = new Date(y, m, d);
		var out = "";
		for(var key in meetList) {
			out += key + ' ----- ' + 'ЗАПИСАНО НА '+ date + '<br>';
		}
	} 

	$('.list').html(out);
	console.log(chk);
}

function loadMeetList() {
	if(localStorage.getItem('meets')) {
		meetList = JSON.parse(localStorage.getItem('meets'));
		showList();
	}
}

function deleting() {
	var out = '<button class="button_del">ВИДАЛИТИ УСІ ЗАПИСИ</button>';
	$('.delete').html(out);
	localStorage.clear()
	$('.delete').on('click', ()=>location.reload());
}

$(document).ready(() => {
	init();
	loadMeetList();
	deleting();


});
