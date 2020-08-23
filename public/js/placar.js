$("#btPlacar").click(mostraPlacar);
$("#btSync").click(sincronizarPlacar);

var urlPlacar = "http://localhost:3000/placar";

function insereNovoValorNaTabela(){

    var corpoTabela = $(".placar").find("tbody");
    var numPalavras = $("#contadorPalavras").text();
    var usuario = "Eu :3";

    var linha = novaLinhaNoPlacar(usuario, numPalavras);
    linha.find(".botaoRemover").click(removeUsuarioDaTabela);

    corpoTabela.prepend(linha);                

    $(".placar").slideDown(500);
    scrollPlacar();
}


function scrollPlacar() { 

    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate(
        {
            scrollTop: posicaoPlacar
        }, 1000);

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

        var linha = $(this).parent().parent()
        linha.fadeOut(1500);
        setTimeout(function() { 
        linha.remove();
    }, 1000);
}

function mostraPlacar(){

    console.log("Botão clicado");
    $(".placar").stop().slideToggle(1000);

    console.log("fim placar");
}

function sincronizarPlacar(){

    let placar = [];
    let linhas = $("tbody > tr");

    linhas.each(function () { 
         
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();

        let pontosUsuario = {
            usuario : usuario,
            pontos : palavras
        }

        placar.push(pontosUsuario);
    });

    let dadosASeremSalvoNoPlacar = {
        placar : placar
    };

    $.post(urlPlacar, dadosASeremSalvoNoPlacar, function(){
        console.log("Placar salvo no server");
    })
}

function atualizaPlacar(){

    $.get(urlPlacar, function(data){

        console.log("Busca feita");
        console.log(data)
    });
}
