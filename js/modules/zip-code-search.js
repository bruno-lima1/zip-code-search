export default function zipCodeSearch(input, search, message) {
  const cep = document.getElementById(input);
  const button = document.querySelector(search);
  const adress = document.querySelector(message);

  const clear = () => {
    return cep.value.replace(/\D/gi, "")
  }
  const build = () => {
    return cep.value.replace(/(\d{5})(\d{3})/gi, "$1-$2")
  }
  const removeNonNumbers = () => {
    return cep.value = cep.value.replace(/[^\d-]/gi, "")
  }  
  const returnCEP = (event) => {
    event.preventDefault();
    return validation()
      ? (cep.value = build(clear(cep.value)), cep.classList.remove("error"), showAdress())
      : (cep.classList.add("error"), adress.innerHTML = "CEP inválido, verifique e digite novamente");
  }
  const validation = () => {
    const matchCEP = cep.value.match(/\d{5}-?\d{3}/gi)
    return matchCEP && matchCEP[0] === cep.value
  }
  if (cep && button && adress) {
    cep.addEventListener("input", removeNonNumbers);
    cep.addEventListener("change", returnCEP);
    button.addEventListener("click", returnCEP);
  }
  const showAdress = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json`);
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
