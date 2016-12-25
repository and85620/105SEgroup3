function SetBuyNumber(ajaxD, StoreType)
{
	var EJSStr = (StoreType?'SellOut':'BuyIn');
	var TGClass = (StoreType?'Selling':'Buying');
	$.ajax({
		url:"API/controller.php",
		type:"GET",
		data:{act:ajaxD}
	}).done(function(STBData){
		var SStoredata = JSON.parse(STBData);
		PageRender(EJSStr, SStoredata, $('.InStore'));
		$('.STplus').click(function(event) {StoreCheckMoney(1,TGClass,"StoreItem"+$(this).parent().parent().attr('idata'));});
		$('.STminus').click(function(event) {StoreCheckMoney(-1,TGClass,"StoreItem"+$(this).parent().parent().attr('idata'));});
		$('.SCheckout').click(function(event) {StoreCheckout(StoreType);});
	});
}
function StoreCheckMoney(val,STtype,CTagName)
{
	var numofitem = parseInt($('.'+CTagName).find(".STnum").text());
	if((numofitem > 0 || val > 0) && StoreSizeChk(val,STtype,CTagName,numofitem))
	{
		numofitem+=val;
		ChgMoneyValue(money_paid_receive,'StoreCountMon');
	}
	$('.'+CTagName).find(".STnum").text(numofitem.toString());
}

function StoreSizeChk(val,STtype,CTagName,itemnumber)
{
	var ThePrice = parseInt($('.'+CTagName).find(".StoreItemValue").text());
	if(STtype == "Buying")	//if STtype is Buy, check the price sum	
	{
		var nowMoney = parseInt($($('.moneynumber')[0]).text());
		if( money_paid_receive+ThePrice*val > nowMoney)return false;
	}
	else //if STtype is Sell,check the number of the object
	{
		var TheNums = parseInt($('.'+CTagName).find(".StoreItemNum").text());
		if(itemnumber+val > TheNums)return false;
	}
	money_paid_receive += ThePrice*val;
	return true;
}

function StoreCheckout(ctype)	//ctype=0,buy ; ctype=1,sell
{
	var storecar = [];
	$.each($('.StoreItem'), function(index, el) {
		var elNum = parseInt($(el).find('.STnum').text());
		if(elNum > 0)
			storecar.push({ id: parseInt($(el).attr('idata')), number: elNum});
	});
	$.ajax({
		url:"API/controller.php",
		type:"POST",
		data:{act:'checkout',type:ctype, list:JSON.stringify(storecar)}
	}).done(function(dd){
		loadStore(parseInt($('.Storebox').attr('stype')));
		loadmachine();
	});
}
