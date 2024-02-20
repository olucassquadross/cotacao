let taxaDeCambioBRL = 0; // Variável global para armazenar a taxa de câmbio

async function obterCotacaoDolar() {
    const apiKey = `6da7002e5ec9559336503bb8`;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if(dados.result === "success") {
            taxaDeCambioBRL = dados.conversion_rates.BRL;
        
        } 
    } catch (erro) {
        document.getElementById('cotacao').innerHTML = `Erro API`;
    }
}

// Função para converter valor em tempo real
function converterValor() {
    const valorEmReal = document.getElementById('valorReal').value;
    const valorEmDolar = (valorEmReal / taxaDeCambioBRL).toFixed(2);

    if (!isNaN(valorEmDolar) && valorEmReal > 0) {
        document.getElementById('resultado').innerText = `R$: ${valorEmReal}  --> $${valorEmDolar} USD`;
    } else {
        document.getElementById('resultado').innerText = `Digite um valor válido.`;
    }
}

document.getElementById('valorReal').addEventListener('input', converterValor);

obterCotacaoDolar();
