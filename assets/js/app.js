$(function(){
	$('.button-row').css('min-height',$(window).height()/5);
	if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition(function(position) {
			$.getJSON('http://ws.geonames.org/countryCode', {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
				type: 'JSON'
			}, function(result) {
				// alert(result.countryName);
				if(result.countryName !== undefined){
					$('.location-holder').text(result.countryName);
				}
			});
		});

	//Move the map on the location button
	var velocity = 5; angle = -30*3.14/180;
	var moveMap = function(){
		var xy = $('.location-holder').css('background-position');
		var x = parseInt(xy.split(' ')[0].split('px')[0]);
		var y = parseInt(xy.split(' ')[1].split('px')[0]);
		var dx = x + velocity*Math.cos(angle) + 'px';
		var dy = y + velocity*Math.sin(angle) + 'px';
		$('.location-holder').css('background-position',dx + ' ' + dy);
		// velocity = velocity + Math.random()*2 - 1;
		// angle = angle + (Math.random()*10 - 5)*3.14/180;
	}
	setInterval(moveMap, 10);
})
