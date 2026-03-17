const listaJogos = document.getElementById('games-list');

fetch('jogos.json')
  .then(res => res.json())
  .then(jogos => {
    jogos.forEach(jogo => {
      const card = document.createElement('div');
      card.className = 'card-jogo';
      card.innerHTML = `
        <img src="${jogo.imagem}" alt="${jogo.nome}">
        <h3>${jogo.nome} (${jogo.ano})</h3>
        <p><strong>Gênero:</strong> ${jogo.genero}</p>
        <p><strong>Plataforma:</strong> ${jogo.plataforma}</p>
        <p><strong>Desenvolvedor:</strong> ${jogo.desenvolvedor}</p>
        ${jogo.jogavel ? `<a href="${jogo.link}" target="_blank" class="btn-jogar">Jogar</a>` : '<p>Não jogável</p>'}
      `;
      listaJogos.appendChild(card);
    });
  })
  .catch(err => console.error('Erro JSON:', err));