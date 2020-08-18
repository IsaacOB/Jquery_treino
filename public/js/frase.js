$("#btTrocaFrase").click(trocaFrase);

function trocaFrase(){

    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", 
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

        var frase = $(".frase");
        var numeroAleatorio = Math.floor(Math.random() * data.length);

        frase.text(data[numeroAleatorio].texto);
        tamanhoFrase();
        atualizaTemporizador(data[numeroAleatorio].tempo);
}