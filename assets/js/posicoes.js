// JavaScript Document
function getLocations(){
	i=0;

	$( ".veiculo_coordenadas" ).each(function(  ) {
		if($( this ).attr('localizacao') == '0'){

			i++;
			if(i > countLocations){
				countLocations++;
				
				displayLocation($( this ).attr('lat'), $( this ).attr('long'), $( this ).val());
				
				return false;
			}
		}		
	});	
}


function waitNextLocation(v_time){
	setTimeout(getLocations, v_time);
}


function enviarAddresses(){
	alert('enviar2');
	if( $('#frmAddresses').html() != '' ){
		with(document.frmAddresses){						
			$('#frmAddresses').append('<input type="hidden" name="EXECUCAO" value="13">');
			
			params = $('#frmAddresses').serialize();
			
			params['EXECUCAO'] = 6;
			params['LOGIN'] = localStorage.getItem('BTRAC_LOGIN');
			params['SENHA'] = localStorage.getItem('BTRAC_SENHA');
			params['VERSION'] = _CURRENT_VERSION;

			
			alert( JSON.stringify(params) );
			
			/*$.post( _HOST+"/admin/veiculos/control.php"
				  , { EXECUCAO:6
					, LOGIN:localStorage.getItem('BTRAC_LOGIN')
					, SENHA:localStorage.getItem('BTRAC_SENHA')
					, VERSION: _CURRENT_VERSION
					}
				   , function(r) {});
			target = 'exec';
			method = 'post';
			action = '../veiculos/control.php';
			submit();*/
		}
	}
	$('#frmAddresses').html('');
}

Adresses = Array();
var withKey = false;

function displayLocation(latitude,longitude, posicao_id){
	r = '';
	
	if(withKey)
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+_GMAPS_ADDRESS_KEY;
	else
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude;
	
	$.ajax({
	  url: url,
	  dataType: 'json',
	  async: true,
	  success: function(data) {
			
				if(data.status == 'OK' ){
					var address = data.results[0].address_components;
					
					for (var j=0; j<address.length; j++){
						if (address[j].types[0]=='locality'){
							var cidade = address[j].long_name;
							break;
						}
					}
					if(!cidade){
						for (var j=0; j<address.length; j++){
							if (address[j].types[0]=='administrative_area_level_2'){
								var cidade = address[j].long_name;
								break;
							}
						}
					}
					
					$('#lbModelo'+posicao_id).html(data.results[0].formatted_address);
					$('#lbCidade'+posicao_id).html(cidade);

					$('#frmAddresses').append('<input type="hidden" name="POSICAO_ID[]" value="'+posicao_id+'"><input type="hidden" name="ADDRESS[]" value="'+data.results[0].formatted_address+'" ><input type="hidden" name="CITY[]" value="'+cidade+'" >');

					totalEnderecosConcluidos++;
					if($( ".veiculo_coordenadas" ).size() == totalEnderecosConcluidos){
						enviarAddresses();
					}else{
						waitNextLocation(200);
					}
					
				}else{
					enviarAddresses();
					if(data.status == 'OVER_QUERY_LIMIT'){
						countLocations--;
						withKey = true;	
					}
					waitNextLocation(200);
				}
			
			
	  },
	  error: function(){
		enviarAddresses();
		countLocations--;
		withKey = true;	
		
		waitNextLocation(200);
	  }
	  
	});

};