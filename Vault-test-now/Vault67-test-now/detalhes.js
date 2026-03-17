const params=new
URLSearchParams(window.location.search)
const id = params.get("id");

fetch("jogos.json")
.then(res=>res.json())
.then(jogos=>{
    const jogo = jogo.find(j=>j.id==id);
    if (jogo) {
document.getElementByld("titulo").textContent
=
jogo.nome + "("+jogo.ano+")";

document.getElementById("imagem").src= jogo.imagem;

document.getElementById("descricao").textcontent=
jogo.descricao

    }

});









        