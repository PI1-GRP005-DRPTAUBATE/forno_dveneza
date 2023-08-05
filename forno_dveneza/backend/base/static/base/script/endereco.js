let input_cep = document.getElementById('id_cep')
let cep
input_cep.addEventListener("change", () => {
    cep = input_cep.value
    if(cep.length === 9) {
        buscaDadosAPI(cep.replace('-', ''))
    }
})

function autoCompletar(respostaAPI) {
    const { logradouro, bairro, localidade } = respostaAPI
    let input_endereco = document.getElementById('id_endereco')
    let input_bairro = document.getElementById('id_bairro')
    let input_cidade = document.getElementById('id_cidade')

    input_endereco.setAttribute('value', logradouro)
    input_bairro.setAttribute('value', bairro)
    input_cidade.setAttribute('value', localidade)
}
async function buscaDadosAPI(cep) {
    const URL = 'https://viacep.com.br/ws/'
    const RESPONSE_TYPE = 'json'
    let result = await fetch(`${URL}${cep}/${RESPONSE_TYPE}/`)
        .then((response) => response.json())
        .catch((e) => e.json())
    autoCompletar(result)
}