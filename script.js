const INPUT = {
    inputWeight: 'inputWeight',
    inputHeight: 'inputHeight'
}


window.addEventListener('load', () => {
    focusInForm();
    const btnReset = document.getElementById('btnReset');
    const form = document.querySelector('form');

    form.addEventListener('submit', calcutaIMC);
    btnReset.addEventListener('click', resetInputs);
});

function calcutaIMC(event) {
    event.preventDefault();

    const inputWeight = replaceCommaByDot(document.getElementById(INPUT.inputWeight).value);
    const inputHeight = replaceCommaByDot(document.getElementById(INPUT.inputHeight).value);

    const imcValue = (inputWeight / (inputHeight * inputHeight)).toFixed(1);
    const message = filterMessageByImc(imcValue);

    createAlertMessage(message, imcValue);
};

function replaceCommaByDot(value) {
    return value.replace(',', '.');
}

function replaceDotByComma(value) {
    return value.replace('.', ',');
}

function focusInForm() {
    document.getElementById(INPUT.inputWeight).focus();
}

function createAlertMessage(message, imcValue) {
    const showResult = document.getElementById('showResult');

    paragraph = document.createElement('p');
    paragraph.textContent = message;
    paragraph.innerHTML += '<p><a class="btn btn-success p-2 ml-0 mt-3" href="https://www.unimedfortaleza.com.br/blog/cuidar-de-voce/como-calcular-imc" target="_blank">Mais informações <i class="fas fa-external-link-alt"></i></a></p>';
    paragraph.classList.add('lead', 'alert', 'alert-info', 'mt-4');

    h2 = document.createElement('h2');
    h2.textContent = `Seu IMC é: ${replaceDotByComma(imcValue)}`;
    h2.classList.add('text-center');

    showResult.textContent = '';
    showResult.appendChild(h2);
    showResult.appendChild(paragraph);
}

function resetInputs() {
    document.getElementById(INPUT.inputWeight).value = '';
    document.getElementById(INPUT.inputHeight).value = '';
}

function filterMessageByImc(imcValue) {
    const imc = parseFloat(imcValue);
    let message = '';

    if (imc <= 18.5)
        message = 'IMC menor do que 18,5. Peso abaixo do normal. Neste caso, é necessária a busca por um especialista, para verificar a existência de algum problema de saúde causador do índice abaixo do normal, ou analisar se sua saúde não está sendo afetada.';
    else if (imc <= 24.9)
        message = 'IMC entre 18,5 e 24,9. São pesos considerados normais pela OMS. No entanto, mesmo nesta faixa de peso, deve-se ter atenção e cuidado com possíveis problemas metabólicos, principalmente se houver acúmulo de gordura na região interna do abdômen.';
    else if (imc <= 29.9)
        message = 'Índice de 25 a 29,9. Peso em pré-obesidade ou acima do peso, representando um risco maior para a saúde. Nesta causa, é imprescindível uma consulta com um especialista, pois pode estar relacionado à pressão alta, colesterol alto ou diabetes, podendo apontar até para o hipotireoidismo. Este é o seu índice? Se sim, é tempo de consultar um profissional, realizar exames e pensar em uma reeducação alimentar e exercícios físicos.';
    else if (imc <= 34.9)
        message = 'IMC entre 30 e 34,9. Este índice indica obesidade grau um. Este peso aumenta riscos para várias doenças, como diabetes, hipertensão arterial, o infarto do miocárdio e diversos tipos de câncer. A obesidade já é considerada uma comorbidade e necessita de tratamento profissional. O indicado é consultar um especialista e receber acompanhamento adequado.';
    else if (imc <= 34.9)
        message = 'Índice de 35 a 39,9. Indica obesidade grau dois. Este peso já representa risco elevado para as doenças supracitadas. Como em todos os casos, mas neste impreterivelmente, deve-se buscar um profissional especializado e receber as orientações e medidas adequadas para obter uma saúde equilibrada.';
    else
        message = 'IMC a partir de 40. Indica obesidade grau três ou mórbida. O peso neste grau apresenta problemas extremamente graves e necessita de tratamento profissional com o máximo de recursos disponíveis, incluindo até cirurgia.';

    return message;
}