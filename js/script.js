"use strict";

// Função principal para calcular a gorjeta
const calculateTip = (billAmount, serviceQuality, callback) => {
  const amount = parseFloat(billAmount.replace("R$", "").replace(/\s/g, "").replace(",", "."));
  const quality = parseFloat(serviceQuality);

  if (isNaN(amount) || amount <= 0) {
    return callback("Por favor, insira um valor válido para a conta.");
  }

  if (isNaN(quality) || quality <= 0) {
    return callback("Selecione uma qualidade de serviço válida.");
  }

  console.log("amount: " + amount + " quality: " + quality);
  const tip = amount * quality; // Calcula a gorjeta corretamente

  callback(null, tip.toFixed(2));
};

// Seleciona os botões de emoji
const emojiButtons = document.querySelectorAll(".emoji-buttons button");

emojiButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const serviceQuality = button.getAttribute("data-quality");
    const billAmount = document.getElementById("billAmount").value;

    calculateTip(billAmount, serviceQuality, (error, tip) => {
      const resultElement = document.getElementById("gorjeta__point_result");

      if (error) {
        resultElement.textContent = error;
        resultElement.style.color = "red";
      } else {
        resultElement.innerHTML = "Gorjeta sugerida: <span style='color: #4CAF50;'>R$ " + tip + "</span>";
      }
    });
  });
});

// ----------

// Criar máscara para valores em reais, a máscara deve ser aplicada dinamicamente
function currency_mask(input) {
  // Remove todos os caracteres que não são números
  let value = input.value.replace(/\D/g, "");

  // Formata no padrão de reais (sem dividir por 100)
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100); // Dividimos por 100 aqui para a formatação correta

  // Define o valor formatado no campo
  input.value = formattedValue;

  // Exibe o botão de limpar se o campo tiver valor
  toggleClearButton(input);
}

function toggleClearButton(input) {
  const clearButton = input.nextElementSibling.nextElementSibling; // Encontra o botão ao lado do input
  if (input.value) {
    clearButton.style.display = "block"; // Exibe o botão se o campo não estiver vazio
  } else {
    clearButton.style.display = "none"; // Esconde o botão se o campo estiver vazio
  }
}

// Função para limpar o campo
function clearInput() {
  const billAmountInput = document.getElementById("billAmount");
  const resultElement = document.getElementById("gorjeta__point_result");

  billAmountInput.value = "";  // Limpa o campo
  billAmountInput.focus();     // Foca no campo novamente
  resultElement.textContent = `Gorjeta sugerida: R$ 0,00`;

  toggleClearButton(billAmountInput); // Esconde o botão de limpar
}

const billAmountInput = document.getElementById("billAmount");

// Adiciona o evento de input para aplicar a máscara
billAmountInput.addEventListener("input", () => {
  currency_mask(billAmountInput);
});
