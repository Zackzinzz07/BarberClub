// BARBERCLUB - SISTEMA SÍRUS
//script.js

// Redirecionamento e seleção de planos
function selecionarPlano(nome, preco) {
    const plano = { nome, preco };
    localStorage.setItem('temp_plano', JSON.stringify(plano));
    window.location.href = 'cadastro.html';
}

// Lógica de Carregamento da página de Cadastro
if (window.location.pathname.includes('cadastro.html')) {
    const info = JSON.parse(localStorage.getItem('temp_plano'));
    if (info) {
        document.getElementById('plano-nome').innerText = info.nome.toUpperCase();
        document.getElementById('plano-preco').innerText = "R$ " + info.preco + ",00 /mês";
    } else {
        window.location.href = 'index.html';
    }
}

// Finalização com Persistência (Banco Local Simulado)
function finalizarCadastro() {
    const nome = document.getElementById('nomeCliente').value;
    const email = document.getElementById('emailCliente').value;
    const infoPlano = JSON.parse(localStorage.getItem('temp_plano'));

    if (!nome || !email) {
        alert("SÍRUS: Preencha todos os campos obrigatórios.");
        return;
    }

    const novoCliente = {
        id: "BC-" + Date.now(),
        nome,
        email,
        plano: infoPlano.nome,
        status: "Ativo",
        dataAssinatura: new Date().toLocaleDateString('pt-BR'),
        limiteUsos: infoPlano.nome === 'Legendary' ? 'Ilimitado' : 4,
        usosRestantes: infoPlano.nome === 'Legendary' ? 999 : 4
    };

    // Salvando no Banco de Dados Local
    let db = JSON.parse(localStorage.getItem('barberclub_db')) || [];
    db.push(novoCliente);
    localStorage.setItem('barberclub_db', JSON.stringify(db));

    localStorage.removeItem('temp_plano');
    alert(`CONTRATADO! ${nome}, sua assinatura ${infoPlano.nome} está ativa.`);
    window.location.href = 'index.html';
}