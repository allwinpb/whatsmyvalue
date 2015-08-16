$(function(){
	$('.button-row').css('min-height',$(window).height()/5.1);
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
	// setInterval(moveMap, 10);

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

	var sectionRates = {};
	var countryRates = {};
	var sectionMultiplier = {};
	var selectedCountry = "Singapore";

	function assignMultiplier(id, count){
		console.log(id, count);
		count = parseInt(count);
		id = id.substr(id.length - 1);
		var keyword = "";
		if(id == '1'){
			sectionMultiplier["cooking"] = count;
		}else if(id == '2'){
			sectionMultiplier["cleaning"] = count;
		}else if(id == '3'){
			sectionMultiplier["shopping"] = count;
		}else if(id == '4'){
			sectionMultiplier["babysitting"] = count;
		}else if(id == '5'){
			sectionMultiplier["laundry"] = count;
		}else if(id == '6'){
			sectionMultiplier["teaching"] = count;
		}else if(id == '7'){
			sectionMultiplier["elderly care"] = count;
		}else if(id == '8'){
			sectionMultiplier["accounting"] = count;
		}
		calculate();
		$('.salary-box').css('transform', 'scale(2.0)');
		setTimeout(function(){
			var css = $('.salary-box').css('transform');
			// console.log(css);
			if(css === 'matrix(2, 0, 0, 2, 0, 0)')
				$('.salary-box').css('transform', 'scale(1.0)');
		},500);
	}


	increment = function(idx){
		var element = $(idx);
		count = parseInt(element.text())+1;
		// if(count>=9){
		// 	element.text(8);
		// }else{
		element.text(count);
		// }
		assignMultiplier(element.attr('id'), element.text());
	};

	decrement = function(idx){
		var element = $(idx);
		count = parseInt(element.text())-1;
		if(count < 0){
			element.text(0);
		}else{
			element.text(count);
		}
		assignMultiplier(element.attr('id'), element.text());
	}

	//Read the separate section rates
	$.ajax({
		url: '/section-rates.csv',
		success: function(rawCsv){
			var csv = rawCsv.split('\n');
			for(var i=0; i < csv.length - 1; i++){
				sectionRates[csv[i].split(',')[0]] = parseFloat(csv[i].split(',')[1]);
				sectionMultiplier[csv[i].split(',')[0]] = 0;
			}
			console.log(sectionRates);
		}
	});
	countryRates['Singapore'] = 7.11;
	$.ajax({
		url: '/country-rates.csv',
		success: function(rawCsv){
			var csv = rawCsv.split('\n');
			for(var i=0; i < csv.length - 1; i++){
				countryRates[csv[i].split(',')[0]] = parseFloat(csv[i].split(',')[1]);
			}
			// console.log(countryRates);
			var countryList = Object.keys(countryRates);
			for(var i=0; i<countryList.length; i++){
				$('#country-list').append('<li>' + countryList[i] + '</li>');
			}
		}
	});

	function calculate(){
		var finalValue = 0;
		for(i in sectionMultiplier){
			finalValue += sectionMultiplier[i]*sectionRates[i]*countryRates[selectedCountry]/countryRates["Singapore"];
		}
		finalValue *= 4.28;
		$('.salary').text('$ ' + finalValue.toFixed(2));
		return finalValue;
	}
	// setInterval(calculate, 5000);
	$('#country-list-modal').on('click','li', function(){
		var country = $(this).text().trim();
		$('.location-holder').text(country);
		selectedCountry = country;
		$('#country-list-modal .modal-footer button').trigger('click');
		calculate();
	})
	$('.location-holder').on('click', function(){
		$('#country-list-modal').modal();
	});

	//Donate functionality
	$('#donate-modal .btn.btn-primary').on('click', function(){
		var val = $('#inputAmount').val();
		alert("Thank you for your donation!");
		$.ajax({
			url: '/donate',
			data: {
				creditCardNumber: $('#creditCard').val(),
				creditCardExpiry: $('#creditExpiry').val(),
				creditCardCvv: $('#cvvNumber').val(),
				donationAmount: $('#inputAmount').val()
			},
			success: function(result){
				console.log(result);
			},
			error: function(result){
				console.log(result);
			}
		})
	})

	$('.donate-box').on('click', function(){
		$('#donate-modal').modal();
	})
})
