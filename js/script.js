const cep = document.querySelector("[data-cep]");
const button = document.querySelector("[data-button]");
const adress = document.querySelector("[data-adress]");
if (cep && button && adress) {
  button.addEventListener("click", showAdress);

  function showAdress(event) {
    event.preventDefault();
    activeAdress(cep.value);
  }
  function activeAdress(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => response.text())
      .then((body) => {
        adress.innerText = body;
        console.log(body);
      });
  }
  cep.addEventListener("input", removeNumbers);
  function removeNumbers() {
    cep.value = cep.value.replace(/\D/, "");
  }
}
