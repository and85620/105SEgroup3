//sample data for display
// Add discription of each thing??
var SampleWarehousedatas = {inpData:{
	machine:[
	{name:'M8Impact', number:2}
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
var SampleStoredatasBuy = {inpData:[
	{id:0,name:'麵粉', value:100},		//the price is random in a range per constant time
	{id:1,name:'細砂糖', value:120},
	{id:2,name:'雞蛋', value:50},
	{id:3,name:'牛奶', value:5000},
	{id:4,name:'牛奶', value:5000},
	{id:5,name:'牛奶', value:5000},
	{id:6,name:'牛奶', value:5000},
	{id:7,name:'牛奶', value:5000},
	{id:8,name:'牛奶', value:5000},
	{id:9,name:'牛奶', value:5000},
	{id:10,name:'牛奶', value:5000},
	{id:11,name:'牛奶', value:5000},
	{id:12,name:'牛奶', value:5000},
	{id:13,name:'牛奶', value:5000},
	{id:14,name:'牛奶', value:5000},
	{id:15,name:'牛奶', value:5000},
	{id:16,name:'牛奶', value:5000},
	{id:17,name:'牛奶', value:5000},
	{id:18,name:'牛奶', value:5000},
	{id:19,name:'牛奶', value:5000},
	{id:20,name:'牛奶', value:5000},
	{id:21,name:'牛奶', value:5000},
	{id:22,name:'牛奶', value:5000},
	{id:23,name:'牛奶', value:5000},
	{id:24,name:'牛奶', value:5000},
	{id:25,name:'水', value:500}
]};
var SampleStoredatasSell = {inpData:[
	{id:1,name:'白吐司', value: 360, number:3},
	{id:2,name:'營養口糧', value: 20, number:25}
]};
var SampleBomList = {bom:[
	{
		id:3,
		name:'巧克力蛋糕', 
		list:[
			{id:33,name:'可可粉', num:1},
			{id:0, name:'麵粉', num:2},
			{id:1, name:'細砂糖', num:3},
			{id:2, name:'雞蛋', num:5},
			{id:25,name:'水', num:1}
		],
		time:180
	},
	{
		id:4,
		name:'牛奶起司捲',
		list:[
			{id:3, name:'牛奶', num:1},
			{id:0, name:'麵粉', num:1},
			{id:1, name:'細砂糖', num:2},
			{id:2, name:'雞蛋', num:2},
			{id:30,name:'起司粉', num:1},
			{id:31,name:'鮮奶油', num:1}
		],
		time:222
}
]};

var SampleMachine = {inpData:[
	{id:1, Name:'M8Impact', status:0, produce:'', restime:0},
	{id:2, Name:'M8Impact', status:1, produce:'牛奶起司捲', restime:128},
	{id:3, Name:'M8Impact', status:0, produce:'', restime:0},
	{id:4, Name:'M8Impact', status:0, produce:'', restime:0},
	{id:5, Name:'M8Impact', status:1, produce:'巧克力蛋糕', restime:60},
	{id:6, Name:'M8Impact', status:1, produce:'牛奶起司捲', restime:110}
]};


var SamplePersondatas = {name:'TestPlay', id:1, Money:5000};//add more information??


// !! 重要重要 !!
// API 還需要能夠查詢目前能製作的產品 bom表


var money_paid_receive = 0;

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

function popmenuUP()
{
	$('.menuBody').html('');
	$('.mtContent').html('');
	$('.popMenuBox').fadeIn(250);
}

function ChgMoneyValue(price,TagName)
{
	$('.'+TagName).html(price.toString()+' <i class="fa fa-usd" aria-hidden="true"></i>');
}





function loadmenu()
{
	$('.menubtn').click(function(event) {popmenuUP();});

	$('.GroupInfo').click(function(event)
	{
		PageRender('GroupInfo', {}, $('.menuBody'));
		MenuTitle('小組資訊');
	});

	$('.Store').click(function(event){loadStore(0);});
	$('.Cookbook').click(function(event){loadCookbook();});
	$('.Warehouse').click(function(event){loadWarehouse();});
}

function loadmenubar()
{
	//ajax: load player's data
	PageRender('MenuBar', SamplePersondatas, $('.menubar'));
	loadmenu();
	//end ajax
}

function loadStore(stype)
{
	money_paid_receive = 0;
	//ajax: load player's data
	PageRender('Store', {}, $('.menuBody'));
	ChgMoneyValue(SamplePersondatas.Money, 'moneynumber');
	$('.Storebox').attr('stype',stype);
	$('.BuyIn').click(function(event) {loadStore(0);});
	$('.SellOut').click(function(event) {loadStore(1);});
	$('.StoreHD').removeClass('ActiveStore');
	if(stype == 0)	//0 : buy
	{
		$('.BuyIn').addClass('ActiveStore');
		$('.StoreCountMon').addClass('tRed');

		//ajax: load the product list
		PageRender('BuyIn', SampleStoredatasBuy, $('.InStore'));
		$('.STplus').click(function(event) {StoreCheckMoney(1,"Buying","StoreItem"+$(this).parent().parent().attr('idata'));});
		$('.STminus').click(function(event) {StoreCheckMoney(-1,"Buying","StoreItem"+$(this).parent().parent().attr('idata'));});
		$('.SCheckout').click(function(event) {StoreCheckout(0);});
		//end ajax
	}
	else	//1 : sell
	{
		$('.SellOut').addClass('ActiveStore');
		$('.StoreCountMon').addClass('tGreen');

		//ajax: load the product list
		PageRender('SellOut', SampleStoredatasSell, $('.InStore'));
		$('.STplus').click(function(event) {StoreCheckMoney(1,"Selling","StoreItem"+$(this).parent().parent().attr('idata'));});
		$('.STminus').click(function(event) {StoreCheckMoney(-1,"Selling","StoreItem"+$(this).parent().parent().attr('idata'));});
		$('.SCheckout').click(function(event) {StoreCheckout(1);});
		//end ajax
	}
	MenuTitle('店鋪');
	//end ajax
}

function loadCookbook()
{
	//ajax: load all of product's bom list
	PageRender('Cookbook', SampleBomList, $('.menuBody'));
	SearchBomlist();
	MenuTitle('食譜');
	//end ajax
}

function loadWarehouse()
{
	//ajax: load the player's Warehouse data
	PageRender('Warehouse', SampleWarehousedatas, $('.menuBody'));
	MenuTitle('倉庫');
	//end ajax
}

function loadmachine()
{
	//ajax: load machine data and set timer
	PageRender('Machine', SampleMachine, $('.factoryBox'));
	PageRender('loading', {}, $('.MstatusWorking'));
	$.each($('.MachineBox'), function(index, el) {
		if( parseInt($(this).find('.Mstatus').attr('idata')) == 0)
			$(el).click(function(event){MachineFindJob(parseInt($(this).attr('idata')));});
		else MachineTimer($(el));
	});
	//end ajax
}




function SearchBomlist()
{
	$('.BomTextSearch').bind("propertychange change click input paste",function(event){
		//search bom list
		//console.log($(this).val());
	});
}







$(document).ready(function() {
	loadmenubar();
	loadmachine();

	$('.closeMenu > i').click(function(event) {
		event.stopPropagation();
		$('.popMenuBox').fadeOut(250);
	});
});
