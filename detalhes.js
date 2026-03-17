const urlParams = new URLSearchParams(window.location.search);
const idDoJogo = urlParams.get("id");

fetch("jogos.json")
    .then(res => res.json())
    .then(jogos => {
        const jogo = jogos.find(j => j.id == idDoJogo);

        if (!jogo) {
            document.body.innerHTML = "<h1>Jogo não encontrado!</h1>";
            return;
        }

        // 1. Preenche as informações textuais do jogo
        document.getElementById("titulo").textContent = jogo.nome;
        document.getElementById("imagem").src = jogo.imagem;
        document.getElementById("ano").textContent = "Ano: " + (jogo.ano || "N/A");
        document.getElementById("genero").textContent = "Gênero: " + (jogo.genero || "N/A");
        document.getElementById("plataforma").textContent = "Plataforma: " + (jogo.plataforma || "N/A");
        document.getElementById("descricao").textContent = jogo.descricao || "";

        const gameDiv = document.getElementById("game");

        // 2. Lógica do Emulador (Usando arquivos locais extraídos)
        if (jogo.jogavel && jogo.zip) {
            gameDiv.innerHTML = "";

            Dos(gameDiv, {
                wdosboxJs: "wdosbox.js",
                wdosboxWasm: "wdosbox.wasm",
                wdosboxData: "wdosbox.data"
            }).ready(function (fs, main) {
                console.log("SUCESSO: Emulador carregado localmente!");
                
              // No seu detalhes.js, dentro do .ready(...)
fs.extract(jogo.zip).then(function () {
    console.log("ZIP extraído com sucesso!");
    
    // Tentando rodar com uma lista de comandos para garantir a execução
    main(["-c", "CLS", "-c", jogo.executavel]);

}).catch(function (err) {
    console.error("Erro ao extrair o ZIP:", err);
});
            });
        } else {
            gameDiv.innerHTML = "<p style='color:white'>Este jogo não é jogável no navegador.</p>";
        }
    })
    .catch(err => {
        console.error("Erro ao carregar o JSON:", err);
    });