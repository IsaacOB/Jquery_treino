var frase = $(".frase").text();
var numeroDePalavras = frase.split(" ").length;
var tamanhoDaFrase = $("#tamanhoDaFrase").text(numeroDePalavras);

var campoDigitacao = $(".campoDigitacao");

campoDigitacao.on("input", contaCaracteresEPalavras);


campoDigitacao.on("focus", comecaAReduzirContador);


function contaCaracteresEPalavras(){

    var conteudo = campoDigitacao.val();

    var quantidadePalavras = conteudo.split(/\S+/).length -1;
    $("#contadorPalavras").text(quantidadePalavras);

    var quantidadeCaracteres = conteudo.length;
    $("#contadorCaracteres").text(quantidadeCaracteres);

}

function comecaAReduzirContador(){

    var campoDigitacao = $(".campoDigitacao");

    var tempoRestante = $("#tempoDigitacao").text();
    var tempoID = setInterval(function(){

        tempoRestante--;
        $("#tempoDigitacao").text(tempoRestante);

        if(tempoRestante < 1){
            campoDigitacao.attr("disabled", true);
            clearInterval(tempoID);
        }

    }, 1000);
}