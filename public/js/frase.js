$("#btTrocaFrase").click(trocaFrase);
$("#btFrasePorId").click(buscaFraseId);

var urlServer = "http://localhost:3000/frases";


function trocaFrase(){

    $("#spinner").toggle();

    $.get(urlServer, 
    trocaParaUmaNovaFrase)
    .fail(function(){
        $("#erro").show();
        setTimeout(function() {
            $("#erro").toggle();
        },1500);
    })
    .always(function(){
        $("#spinner").toggle();
    }); 

}

function trocaParaUmaNovaFrase(data) {

        let frase = $(".frase");
        let numeroAleatorio = Math.floor(Math.random() * data.length);

        frase.text(data[numeroAleatorio].texto);
        tamanhoFrase();
        atualizaTemporizador(data[numeroAleatorio].tempo);
}

function buscaFraseId(){

    $("#spinner").toggle();
    let idFrase = $("#fraseId").val();
    let dados = {
        id : idFrase
    };

    $.get(urlServer, dados, trocaFraseSelecionada)
    .fail(function(){
            $("#erro").show();
            setTimeout(function() {
                $("#erro").toggle();
            },1500);
        })
        .always(function(){
            $("#spinner").toggle();
        }); 
}

function trocaFraseSelecionada(data){

    let frase = $(".frase");
    frase.text(data.texto);
    tamanhoFrase();
    atualizaTemporizador(data.tempo);

}