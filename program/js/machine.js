
function MachineFindJob(Mid)
{
	popmenuUP();
	$.ajax({
		url:"API/controller.php",
		type:"GET",
		data:{act:'cando'}
	}).done(function(BomCan){
		var PdaBomCanda = JSON.parse(BomCan);
		PageRender('Cookbook', PdaBomCanda, $('.menuBody'));
		SearchBomlist();
		$('.BomItem').click(function(event) {MachineSetJob($(this), Mid);});
		MenuTitle('製造產品');
	});
}

function MachineTimer(Mtag)
{
	setTimeout(
		function(){
			//ajax: check this machine's time
			var timess = parseInt(Mtag.children('.Mrestime').text());
			//if still have time, then set the text and timer
			if(timess>0)
			{
				Mtag.children('.Mrestime').text( (--timess).toString() );
				MachineTimer(Mtag);
			}
			//else if the time is up, api need to update product number
			else
			{
				MachineFinJob(Mtag);
			}
			//end ajax
		},
		1000
	);
}

function MachineSetJob(prodt,MID)
{
	var tartg = $('.MachineBox'+MID);
	tartg.unbind('click');
	$('.closeMenu > i').click();
	var PID = parseInt(prodt.attr('idata'));
	$.ajax({
		url:"API/controller.php",
		type:"GET",
		data:{act:'startproduce',pid:PID,tid:MID}
	}).done(function(sytt){
		tartg.find('.Mproduct').text(prodt.find('.BomProduct').text());
		tartg.find('.Mrestime').text(prodt.find('.BomPTime').text());
		PageRender('loading', {}, tartg.find('.Mstatus'));
		MachineTimer(tartg);
	});
}

function MachineFinJob(Mtag)
{
	var MID = parseInt(Mtag.attr('idata'));
	$.ajax({
		url:"API/controller.php",
		type:"GET",
		data:{act:'finishproduce',tid:MID}
	}).done(function(){
		Mtag.children('.Mstatus').attr('idata',0).html('READY');
		Mtag.children('.Mproduct').text('');
		Mtag.click(function(event){MachineFindJob(MID);});
	});
}

