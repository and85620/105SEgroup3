
function MachineFindJob(Mid)
{
	popmenuUP();
	//ajax: pop menu to load the Can-do bom list
	PageRender('Cookbook', SampleBomList, $('.menuBody'));
	SearchBomlist();
	$('.BomItem').click(function(event) {MachineSetJob($(this), Mid);});
	MenuTitle('製造產品');
	//end ajax
}

function MachineTimer(Mtag)
{
	setTimeout(
		function(){
			//ajax: check this machine's time

//tmp tmp tmp tmp tmp
var timess = parseInt(Mtag.children('.Mrestime').text());
//tmp tmp tmp tmp tmp

			//if still have time, then set the text and timer
			if(timess>0)
			{
				Mtag.children('.Mrestime').text( (--timess).toString() );
				MachineTimer(Mtag);
			}
			//else if the time is up, api need to update product number
			else MachineFinJob(Mtag);
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

	//ajax: send job request
	tartg.find('.Mproduct').text(prodt.find('.BomProduct').text());
	tartg.find('.Mrestime').text(prodt.find('.BomPTime').text());
	PageRender('loading', {}, tartg.find('.Mstatus'));
	MachineTimer(tartg);
	//end ajax
}

function MachineFinJob(Mtag)
{
	Mtag.children('.Mstatus').attr('idata',0).html('READY');
	Mtag.children('.Mproduct').text('');
	Mtag.click(function(event){MachineFindJob(parseInt(Mtag.attr('idata')));});
}

