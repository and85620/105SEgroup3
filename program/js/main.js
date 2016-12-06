//sample data for display
var Warehousedatas = {inpData:{
	machine:[
	{name:'M8Impact', number:1}
	],
	material:[
	{name:'麵粉', number:1},
	{name:'雞蛋', number:3}
	],
	product:[
	{name:'白吐司', number:3},
	{name:'營養口糧', number:25}
	]
}
};

var Storedatas = {inpData:{
	buy:[
	{name:'麵粉', value:100},
	{name:'細砂糖', value:120},
	{name:'雞蛋', value:50},
	{name:'牛奶', value:5000},
	{name:'水', value:500}
	],
	sell:[
	{name:'白吐司', value: 360, number:3},
	{name:'營養口糧', value: 20, number:25}
	]
}
};

// more information ??
var Persondatas = {name:'TestPlay', id:1, Money:5000};





//ejs render
function PageRender(ejsname,edata,target)
{
	var ejsdata = new EJS({url:"ejs/"+ejsname+".ejs"}).render(edata);
	target.html(ejsdata);
}

function MenuTitle(Mname)
{
	$('.mtContent').html(Mname);
}

function loadmenu()
{
	$('.menubtn').click(function(event) {
		$('.menuBody').html('');
		$('.mtContent').html('');
		$('.popMenuBox').fadeIn(250);
	});

	$('.GroupInfo').click(function(event)
	{
		PageRender('GroupInfo', {}, $('.menuBody'));
		MenuTitle('小組資訊');
	});
	$('.Store').click(function(event)
	{
		//ajax: load the product list
		PageRender('Store', Storedatas, $('.menuBody'));
		MenuTitle('店鋪');
		//end ajax
	});
	$('.Warehouse').click(function(event)
	{
		//ajax: load the player's Warehouse data
		PageRender('Warehouse', Warehousedatas, $('.menuBody'));
		MenuTitle('倉庫');
		//end ajax
	});
}

function loadplayer()
{
	//ajax: load player's data
	PageRender('MenuBar', Persondatas, $('.menubar'));
	loadmenu();
	//end ajax
}

$(document).ready(function() {
	loadplayer();

	$('.closeMenu > i').click(function(event) {
		event.stopPropagation();
		$('.popMenuBox').fadeOut(250);
	});
});