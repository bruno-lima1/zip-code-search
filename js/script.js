const cep = document.getElementById("cep");
const button = document.querySelector("[data-button]");
const adress = document.querySelector("[data-adress]");
if (cep && button && adress) {
  button.addEventListener("click", cepIsValid);
  cep.addEventListener("input", removeNonNumbers);
  function cepIsValid(event) {
    event.preventDefault();
    return /^\d{8}$/.test(cep.value)
      ? showAdress(cep.value)
      : (adress.innerHTML = "CEP inválido, insira pelo menos 8 caracteres");
  }
  function removeNonNumbers() {
    return (cep.value = cep.value.replace(/\D/, ""));
  }
  async function showAdress(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    const data = await response.json();
    const dataFormatted = `CEP: ${data.cep}\n Logradouro: ${data.logradouro}\n Bairro: ${data.bairro}\n Complemento: ${data.complemento}\n Cidade: ${data.localidade}\n UF: ${data.uf}\n DDD: ${data.ddd}`;
    return data.erro
      ? (adress.innerHTML = "Esse CEP não existe, verifique e digite novamente")
      : (adress.innerText = dataFormatted);
  }
}
