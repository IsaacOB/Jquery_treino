var frase = $(".frase").text();
var numeroDePalavras = frase.split(" ").length;
var tamanhoDaFrase = $("#tamanhoDaFrase").text(numeroDePalavras);

var campoDigitacao = $(".campoDigitacao");

campoDigitacao.on("input", function(){

    var conteudo = campoDigitacao.val();

    var quantidadePalavras = conteudo.split(/\S+/).length -1;
    $("#contadorPalavras").text(quantidadePalavras);

    var quantidadeCaracteres = conteudo.length;
    $("#contadorCaracteres").text(quantidadeCaracteres);

});