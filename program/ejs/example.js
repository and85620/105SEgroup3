
		var rddata = {tmps:['rank','like'],sortclasss:['googrk','likes'],fbgoogles:fbgoogle};
		resultable = new EJS({url:"ejs/fbsrhresult.ejs"}).render(rddata);
		$('#FBsrhResultup').html(resultable);