const cep = document.getElementById("cep");
const button = document.querySelector("[data-button]");
const adress = document.querySelector("[data-adress]");
if (cep && button && adress) {
  cep.addEventListener("input", removeNonNumbers);
  button.addEventListener("click", CEPIsValid);
  function removeNonNumbers() {
    return (cep.value = cep.value.replace(/\D/, ""));
  }
  function CEPIsValid(event) {
    event.preventDefault();
    return /^\d{8}$/.test(cep.value)
      ? showAdress(cep.value)
      : (adress.innerText = "CEP inválido, insira pelo menos 8 dígitos");
  }
  async function showAdress(value) {
    const response = await fetch(`https://viacep.com.br/ws/${value}/json`);
    const data = await response.json();
    const dataFormatted = `CEP: ${data.cep}\n Logradouro: ${data.logradouro}\n Bairro: ${data.bairro}\n Complemento: ${data.complemento}\n Cidade: ${data.localidade}\n UF: ${data.uf}\n DDD: ${data.ddd}\n`;
    return data.erro
      ? (adress.innerText = "Esse CEP não existe, verifique e digite novamente")
      : (adress.innerText = dataFormatted);
  }
}
