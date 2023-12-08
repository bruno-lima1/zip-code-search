const cep = document.getElementById("cep");
const button = document.querySelector("[data-button]");
const adress = document.querySelector("[data-adress]");
if (cep && button && adress) {
  button.addEventListener("click", handleClick);
  function handleClick(event) {
    event.preventDefault();
    showAdress(cep.value);
  }
  function showAdress(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => response.json())
      .then((data) => {
        const errorMessage =
          "CEP não encontrado, verifique e insira novamente.";
        const dataFormatted = `CEP: ${data.cep}\n Logradouro: ${data.logradouro}\n Bairro: ${data.bairro}\n Complemento: ${data.complemento}\n Localidade: ${data.localidade}\n UF: ${data.uf}\n DDD: ${data.ddd}\n`;
        if (data.erro) {
          adress.innerText = errorMessage;
        } else {
          adress.innerText = dataFormatted;
        }
      });
  }
  cep.addEventListener("input", removeNonNumbers);
  function removeNonNumbers() {
    cep.value = cep.value.replace(/\D/, "");
  }
}
