var tempoInicial = $("#tempoDigitacao").text();
var campoDigitacao = $(".campoDigitacao");
var frase = $(".frase").text();
$("#btReiniciar").click(btReiniciarJogo);

$(document).ready(function(){
    tamanhoFrase();
    contaCaracteresEPalavras();
    comecaAReduzirContador();
    correcaoComUsoDasBordas();
    btReiniciarJogo();
    atualizaPlacar();
})

function tamanhoFrase(){
    let frase = $(".frase").text();
    let numeroDePalavras = frase.split(" ").length;
    $("#tamanhoDaFrase").text(numeroDePalavras);

}

function atualizaTemporizador(tempo) {

    tempoInicial = tempo;
    $("#tempoDigitacao").text(tempo);
    
}

function contaCaracteresEPalavras(){
    campoDigitacao.on("input", function(){
    let conteudo = campoDigitacao.val();

    let quantidadePalavras = conteudo.split(/\S+/).length -1;
    $("#contadorPalavras").text(quantidadePalavras);

    let quantidadeCaracteres = conteudo.length;
    $("#contadorCaracteres").text(quantidadeCaracteres);
    });
}

function comecaAReduzirContador(){
    campoDigitacao.one("focus", function(){

    let tempoRestante = $("#tempoDigitacao").text();
        let tempoID = setInterval(function(){

            tempoRestante--;
            $("#tempoDigitacao").text(tempoRestante);

            if(tempoRestante < 1){
                clearInterval(tempoID);
                finalizaESalvaDadosDoJogo();
            }

        }, 1000);
    });
}

function correcaoComUsoDasBordas(){

        campoDigitacao.on("input", function(){
        let frase = $(".frase").text();
        let conteudoDigitado = campoDigitacao.val();
        let comparador = frase.substr(0, conteudoDigitado.length);

        if(conteudoDigitado == comparador){
            campoDigitacao.addClass("campoDigitacaoCorreto");
            campoDigitacao.removeClass("campoDigitacaoErrado");
        }else{
            campoDigitacao.addClass("campoDigitacaoErrado");
            campoDigitacao.removeClass("campoDigitacaoCorreto");
        }
    })
}

function btReiniciarJogo(){

    let campoDigitacao = $(".campoDigitacao");
    campoDigitacao.attr("disabled", false);
    campoDigitacao.val("");
    
    $("#contadorPalavras").text("0");
    $("#contadorCaracteres").text("0");

    $("#tempoDigitacao").text(tempoInicial);

    campoDigitacao.removeClass("campoDigitacaoDesabilitado");
    campoDigitacao.removeClass("campoDigitacaoErrado");
    campoDigitacao.removeClass("campoDigitacaoCorreto");

}

function finalizaESalvaDadosDoJogo(){

    campoDigitacao.attr("disabled", true);
    campoDigitacao.addClass("campoDigitacaoDesabilitado");
    insereNovoValorNaTabela();

}