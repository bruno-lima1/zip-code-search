export default function zipCodeSearch(input, search, message) {
  const cep = document.getElementById(input);
  const button = document.querySelector(search);
  const adress = document.querySelector(message);

  const removeNonNumbers = () => {
    return cep.value = cep.value.replace(/[^\d-]/gi, "")
  }
  const cepIsValid = (event) => {
    event.preventDefault();
    return /(\d{5})-?(\d{3})/gi.test(cep.value)
    ? showAdress(cep.value)
    : (adress.innerHTML = "CEP inválido, verifique e digite novamente") && cep.classList.add("error");
  }
  if (cep && button && adress) {
    cep.addEventListener("input", removeNonNumbers);
    button.addEventListener("click", cepIsValid);
  }
  const showAdress = async (cepValue) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json`);
      const data = await response.json();
      const dataFormatted = `CEP: ${data.cep}\n Logradouro: ${data.logradouro}\n Bairro: ${data.bairro}\n Complemento: ${data.complemento}\n Cidade: ${data.localidade}\n UF: ${data.uf}\n DDD: ${data.ddd}`;
      return data.erro
        ? (adress.innerHTML = "Esse CEP não existe, verifique e digite novamente") && cep.classList.add("error")
        : (adress.innerText = dataFormatted) && cep.classList.remove("error");
    } catch (erro) {
      console.log(erro);
    }
  }
}
