var tempoInicial = $("#tempoDigitacao").text();
var campoDigitacao = $(".campoDigitacao");

$(document).ready(function(){
    tamanhoFrase();
    contaCaracteresEPalavras();
    comecaAReduzirContador();
    btReiniciarJogo();
})

function tamanhoFrase(){
    var frase = $(".frase").text();
    var numeroDePalavras = frase.split(" ").length;
    var tamanhoDaFrase = $("#tamanhoDaFrase").text(numeroDePalavras);

}

function contaCaracteresEPalavras(){
    campoDigitacao.on("input", function(){
    var conteudo = campoDigitacao.val();

    var quantidadePalavras = conteudo.split(/\S+/).length -1;
    $("#contadorPalavras").text(quantidadePalavras);

    var quantidadeCaracteres = conteudo.length;
    $("#contadorCaracteres").text(quantidadeCaracteres);
    });
}

function comecaAReduzirContador(){
    campoDigitacao.one("focus", function(){
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
    });
}

$("#btReiniciar").click(btReiniciarJogo);

function btReiniciarJogo(){

    var campoDigitacao = $(".campoDigitacao");
    campoDigitacao.attr("disabled", false);
    campoDigitacao.val("");
    
    $("#contadorPalavras").text("0");
    $("#contadorCaracteres").text("0");

    $("#tempoDigitacao").text(tempoInicial);

    comecaAReduzirContador();

}