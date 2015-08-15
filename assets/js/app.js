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

	// show and hide plus minus
	$(document).ready(function(){
		$("#button_field_1").hover(function(){
			$("#edit_uttons_1").show();
		},function(){
			$("#edit_uttons_1").hide();
		});

		$("#button_field_2").hover(function(){
			$("#edit_uttons_2").show();
		},function(){
			$("#edit_uttons_2").hide();
		});

		$("#button_field_3").hover(function(){
			$("#edit_uttons_3").show();
		},function(){
			$("#edit_uttons_3").hide();
		});

		$("#button_field_4").hover(function(){
			$("#edit_uttons_4").show();
		},function(){
			$("#edit_uttons_4").hide();
		});

		$("#button_field_5").hover(function(){
			$("#edit_uttons_5").show();
		},function(){
			$("#edit_uttons_5").hide();
		});

		$("#button_field_6").hover(function(){
			$("#edit_uttons_6").show();
		},function(){
			$("#edit_uttons_6").hide();
		});

		$("#button_field_7").hover(function(){
			$("#edit_uttons_7").show();
		},function(){
			$("#edit_uttons_7").hide();
		});

		$("#button_field_8").hover(function(){
			$("#edit_uttons_8").show();
		},function(){
			$("#edit_uttons_8").hide();
		});

	});

	// value increment/ decrement
	// $(document).ready(function(){
	// 	$("#plus_1").click(function(){
	// 		var cooking = document.getElementById("badge1");
	// 		cooking.val()+= 1;
	// 	})
	// });

	increment = function(idx){
		var element = $(idx);	
		count = parseInt(element.text())+1;
		if(count>=9){
			element.text(8);
		}else{
			element.text(count);
		}
		
	};

	decrement = function(idx){
		var element = $(idx);
		count = parseInt(element.text())-1;
		if(count < 0){
			element.text(0);
		}else{
			element.text(count);
		}
		
	}
})
