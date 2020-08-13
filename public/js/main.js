var tempoInicial = $("#tempoDigitacao").text();
var campoDigitacao = $(".campoDigitacao");
var frase = $(".frase").text();

$(document).ready(function(){
    tamanhoFrase();
    contaCaracteresEPalavras();
    comecaAReduzirContador();
    correcaoComUsoDasBordas();
    btReiniciarJogo();
})

function tamanhoFrase(){
    var frase = $(".frase").text();
    var numeroDePalavras = frase.split(" ").length;
    $("#tamanhoDaFrase").text(numeroDePalavras);

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
                clearInterval(tempoID);
                finalizaESalvaDadosDoJogo();
            }

        }, 1000);
    });
}

function correcaoComUsoDasBordas(){

        campoDigitacao.on("input", function(){
        var conteudoDigitado = campoDigitacao.val();
        var comparador = frase.substr(0, conteudoDigitado.length);

        if(conteudoDigitado == comparador){
            campoDigitacao.addClass("campoDigitacaoCorreto");
            campoDigitacao.removeClass("campoDigitacaoErrado");
        }else{
            campoDigitacao.addClass("campoDigitacaoErrado");
            campoDigitacao.removeClass("campoDigitacaoCorreto");
        }
    })
}

$("#btReiniciar").click(btReiniciarJogo);

function btReiniciarJogo(){

    var campoDigitacao = $(".campoDigitacao");
    campoDigitacao.attr("disabled", false);
    campoDigitacao.val("");
    
    $("#contadorPalavras").text("0");
    $("#contadorCaracteres").text("0");

    $("#tempoDigitacao").text(tempoInicial);

    campoDigitacao.removeClass("campoDigitacaoDesabilitado");
    campoDigitacao.removeClass("campoDigitacaoErrado");
    campoDigitacao.removeClass("campoDigitacaoCorreto");

}

function insereNovoValorNaTabela(){

    var corpoTabela = $(".placar").find("tbody");
    var numPalavras = $("#contadorPalavras").text();
    var usuario = "Eu :3";

    var linha = novaLinhaNoPlacar(usuario, numPalavras);
    linha.find(".botaoRemover").click(removeUsuarioDaTabela);

    corpoTabela.prepend(linha);                
}

function novaLinhaNoPlacar(usuario, numPalavras){

    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaNumeroDePalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>")
    var link = $("<a>").addClass("botaoRemover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario).append(colunaNumeroDePalavras).append(colunaRemover);

    return linha;

}

function removeUsuarioDaTabela(){
        event.preventDefault();
        $(this).parent().parent().remove();
}

function finalizaESalvaDadosDoJogo(){

    campoDigitacao.attr("disabled", true);
    campoDigitacao.addClass("campoDigitacaoDesabilitado");
    insereNovoValorNaTabela();

}