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
	$.ajax({
		url:"API/controller.php",
		type:"GET",
		data:{act:'playerdata'}
	}).done(function(Pdata){
		var Pdatas = JSON.parse(Pdata);
		PageRender('MenuBar', Pdatas, $('.menubar'));
		loadmenu();
	});
}

function loadStore(stype)
{
	money_paid_receive = 0;
	$.ajax({
		url:"API/controller.php",
		type:"GET",
		data:{act:'playerdata'}
	}).done(function(Pdata){
		var Pdatas = JSON.parse(Pdata);
		PageRender('Store', {}, $('.menuBody'));
		ChgMoneyValue(Pdatas.Money, 'moneynumber');
		$('.Storebox').attr('stype',stype);
		$('.BuyIn').click(function(event) {loadStore(0);});
		$('.SellOut').click(function(event) {loadStore(1);});
		$('.StoreHD').removeClass('ActiveStore');
		if(stype == 0)	//0 : buy
		{
			$('.BuyIn').addClass('ActiveStore');
			$('.StoreCountMon').addClass('tRed');
			SetBuyNumber("buylist", 0);
		}
		else	//1 : sell
		{
			$('.SellOut').addClass('ActiveStore');
			$('.StoreCountMon').addClass('tGreen');
			SetBuyNumber("selling", 1);
		}
		MenuTitle('店鋪');
	});
}

function loadCookbook()
{
	$.ajax({
		url:"API/controller.php",
		type:"GET",
		data:{act:'bomlist'}
	}).done(function(BBList){
		var BBList = JSON.parse(BBList);
		PageRender('Cookbook', BBList, $('.menuBody'));
		SearchBomlist();
		MenuTitle('食譜');
	});
}

function loadWarehouse()
{
	$.ajax({
		url:"API/controller.php",
		type:"GET",
		data:{act:'warehouse'}
	}).done(function(WHDD){
		var WaHuData = JSON.parse(WHDD);
		PageRender('Warehouse', WaHuData, $('.menuBody'));
		MenuTitle('倉庫');
	});
}

function loadmachine()
{
	$.ajax({
		url:"API/controller.php",
		type:"GET",
		data:{act:'machinestate'}
	}).done(function(SMach){
		var SMachine = JSON.parse(SMach);
		PageRender('Machine', SMachine, $('.factoryBox'));
		PageRender('loading', {}, $('.MstatusWorking'));
		$.each($('.MachineBox'), function(index, el) {
			if( parseInt($(this).find('.Mstatus').attr('idata')) == 0)
				$(el).click(function(event){MachineFindJob(parseInt($(this).attr('idata')));});
			else MachineTimer($(el));
		});

		$(".MachineBuy").click(function(event){BuyAMachines();});
	});
}

function BuyAMachines()
{
	$.ajax({
		url:"API/controller.php",
		type:"GET",
		data:{act:'buy'}
	}).done(function(SMach){
		loadmenubar();
		loadmachine();
	});
}



function SearchBomlist()
{
	$('.BomTextSearch').bind("propertychange change input paste",function(event){
		//search bom list
		//$(this).val()
		if($(this).val() == '')$('.BomItem').show();
		else
		{
			/*
			$.ajax({
				url:"API/controller.php",
				type:"GET",
				data:{act:'??????'}	//key word $(this).val()
			}).done(function(SrchID){
				var SrchIDs = JSON.parse(SrchID);
				$('.BomItem').hide();
				for(var i=0;i<SrchIDs.length;i++)
					$('.BomItem'+SrchIDs[i]).show();
			});
			*/
		}
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
