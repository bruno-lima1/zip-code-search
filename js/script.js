const cep = document.getElementById("cep");
const button = document.querySelector("[data-button]");
const adress = document.querySelector("[data-adress]");
if (cep && button && adress) {
  const errorMessage = "CEP não encontrado, verifique e digite novamente";
  const errorMessage2 = "CEP inválido, insira pelo menos 8 dígitos";
  cep.addEventListener("input", removeNonNumbers);
  button.addEventListener("click", CEPIsValid);
  function removeNonNumbers() {
    cep.value = cep.value.replace(/\D/, "");
  }
  function CEPIsValid(event) {
    event.preventDefault();
    return /^\d{8}$/.test(cep.value)
      ? showAdress(cep.value)
      : (adress.innerText = errorMessage2);
  }
  function showAdress(value) {
    fetch(`https://viacep.com.br/ws/${value}/json`)
    .then(response => response.json())
    .then((data) => {
      const dataFormatted = `CEP: ${data.cep}\n Logradouro: ${data.logradouro}\n Bairro: ${data.bairro}\n Complemento: ${data.complemento}\n Localidade: ${data.localidade}\n UF: ${data.uf}\n DDD: ${data.ddd}\n`
      return data.erro ? adress.innerText = errorMessage : adress.innerText = dataFormatted;
    })
  }
}
