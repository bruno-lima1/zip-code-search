const cep = document.querySelector("[data-cep]");
const button = document.querySelector("[data-button]");
const adress = document.querySelector("[data-adress]");
if (cep && button && adress) {
  ["touchstart", "click"].forEach((userEvent) => {
    button.addEventListener(userEvent, showAdress);
  });
  function showAdress(event) {
    event.preventDefault();
    const cepValue = cep.value;
    activeAdress(cepValue);
  }
  function activeAdress(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => response.text())
      .then((body) => {
        adress.innerText = body;
        console.log(body);
      });
  }
}
