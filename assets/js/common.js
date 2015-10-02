/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var intervalFechamento;
function abrirCarregando(v_texto){
    document.getElementById('carregando').style.display = 'block';
    document.getElementById('carregando_centro').style.display = 'block';
    document.getElementById('carregando_item').innerHTML = v_texto ? v_texto : 'Carregando';

    intervalFechamento = setTimeout(fecharCarregando, 15000);
}

function abrirCarregandoFundo(v_texto){
    document.getElementById('carregando').style.display = 'block';

    intervalFechamento = setTimeout(fecharCarregando, 15000);
}

function fecharCarregando(){
	document.getElementById('carregando').style.display = 'none';
    document.getElementById('carregando_centro').style.display = 'none';

    clearInterval(intervalFechamento);
}

function novaVersaoDisponivel(){
	$('body').append('<div class="novaVersao">Existe uma nova versão disponível, é necessário atualizar o aplicativo para prosseguir.<button class="btnAtualizarAPP" type="button">Atualizar</button></div>');	
}

function direcionarAtualizacaoApp(){
	window.open('https://play.google.com/store/apps/details?id=com.bsoft.BtracMobile&hl=pt-BR');	
}