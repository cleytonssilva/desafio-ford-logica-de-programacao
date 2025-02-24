telaInicial();
limparCadastro();
limparResultados();


let distanciaPercorrida;
let consumoMedio;
let qtdPostos=0;
let preco=0;
let totalPrecos=0;
let idaVolta=0;
let calcularConsumo=0;
listaPrecos=[];
let menorPreco;

function exibirTela(tag,texto){
    let campo = document.querySelector(tag)
    campo.innerHTML = texto
};

function telaInicial(){
    limparResultados();
    limparCadastro();
    exibirTela('h1','Desafio 1 - Consumo de Combustível');
    exibirTela('h2','Este programa calcula o consumo médio de combustível de um veículo');
    document.getElementById('container').style.display='none';
    document.getElementById('voltarTelaInicio').style.display='none';
    document.getElementById('consumo_medio').style.display='block';
        
};

function mostrarCadastro() {
    exibirTela('h2','Informe a distância percorrida em km e o combustível consumido em litros.')
    exibirTela('h1','');
    let cadastroForm = document.getElementById('cadastroForm');
    cadastroForm.style.display = 'block'
    document.getElementById('consumo_medio').style.display='none';
    document.getElementById('cadastroForm').style.display = 'block';
    document.getElementById('container').style.display='block';
    document.getElementById('voltarTelaInicio').style.display='none';
    limparCadastro();
    
};


function limparCadastro(){
    let inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value ='');
};

function limparResultados(){
    document.getElementById('resultadoConsumo').innerText = '';
    document.getElementById('resultado').innerText = '';
    document.getElementById('gastoDiario').innerText = '';
    document.getElementById('menorPreco'),innerText = '';
};

function cadastro(distanciaPercorrida, consumoMedio){
    distanciaPercorrida = document.getElementById('distancia').value;
    consumoMedio = document.getElementById('combustivel').value;
    distanciaPercorrida = parseFloat(distanciaPercorrida);
    consumoMedio = parseFloat(consumoMedio);
    if (isNaN(distanciaPercorrida) || isNaN(consumoMedio) || consumoMedio === 0) {
        alert('Por favor, insira valores válidos para distância e combustível.');
        return;
    }
    exibirTela('h2','Agora informe em quantos postos pesquisou os preços.');
    calcularConsumo = distanciaPercorrida / consumoMedio;
    
    let cadastroForm = document.getElementById('cadastroForm');
    cadastroForm.style.display = ''
    document.getElementById('voltarTelaInicio').style.display='none';
    document.getElementById('cadastroPostos').style.display='block';
    document.getElementById('cadastroPreco').style.display='none';
    document.getElementById('consumo_medio').style.display='none';
    limparCadastro();
        
};




function listaPostos(){
    qtdPostos = parseInt(document.getElementById('qtdPostos').value);
    if (isNaN(qtdPostos) || qtdPostos <= 0) {
        alert('Por favor, insira valores válidos para a quantidade de postos.');
        return;
    }
    exibirTela('h2','Agora informe os preços nos postos que pesquisou.');
    document.getElementById('cadastroPreco').style.display='block';
    document.getElementById('continuar').style.display='none';
    document.getElementById('qtdPostos1').style.display='none';
    document.getElementById('qtdPostos').style.display='none';
   
    const cadastroPrecoDiv = document.getElementById('cadastroPreco');
    cadastroPrecoDiv.innerHTML= `
        <img src="./assets/icons8-gas-station-48.png" alt="posto">
        <label for="postos">Digite o valor encontrado (em R$) nos Postos:<br><br></label>
    
    `;
    

    for (let i = 0; i < qtdPostos; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.id = `precoPosto${i}`;
        input.name = `precoPosto${i}`;
        input.required = true
        input.placeholder = `Preço do posto ${i+1}`;
        cadastroPrecoDiv.appendChild(input);
        cadastroPrecoDiv.appendChild(document.createElement('br'));
        cadastroPrecoDiv.appendChild(document.createElement('br'));
        
    };
    
    const calcularButton = document.createElement('button');
    calcularButton.type = 'button';
    calcularButton.id = 'calcularMediaPostos';
    calcularButton.onclick = calcularMediaPostos;
    calcularButton.innerHTML = 'Calcular'
    cadastroPrecoDiv.appendChild(calcularButton);
    limparCadastro();
    
};


function calcularMediaPostos(){
    totalPrecos = parseFloat(totalPrecos);
    calcularConsumo = parseFloat(calcularConsumo);
    for (let i = 0; i < qtdPostos; i++) {
        const preco = parseFloat(document.getElementById(`precoPosto${i}`).value);
        listaPrecos.push(preco);
        menorPreco = listaPrecos[0];
        for (let j = 0; j < listaPrecos.length; j++) {
            if (listaPrecos[j] < menorPreco) {
                menorPreco = listaPrecos[j];
            }
        };
                         
        console.log(listaPrecos);
        totalPrecos += preco;
        
    };
    
    if (isNaN(totalPrecos) || totalPrecos <= 0) {
        alert('Por favor, insira valores válidos para o  preço.');
        return;
    };
    
    let calcularMediaPostos = totalPrecos / qtdPostos;
    document.getElementById('resultado').innerHTML = "O valor médio do litro de combustível será de R$ " + calcularMediaPostos.toFixed(2) + ".";
    calcularMediaPostos = parseFloat(calcularMediaPostos);
    idaVolta = 2 * (menorPreco * calcularConsumo );
    
    exibirTela('h2','Agora, seguem os resultados.');
    document.getElementById('resultadoConsumo').innerText = `O seu consumo de combustível será de ${calcularConsumo.toFixed(2)} litros`;
    document.getElementById('gastoDiario').innerHTML = "O valor do gasto diário(ida e volta) é de R$ " + idaVolta.toFixed(2) + ".";
    document.getElementById('menorPreco').innerHTML = "O menor preço encontrado foi R$ " + menorPreco.toFixed(2) + ".";
    
    document.getElementById('cadastroPostos').style.display='none';
    document.getElementById('cadastroPreco').style.display='none';
    document.getElementById('consumo_medio').style.display='none';
    document.getElementById('voltarTelaInicio').style.display='block';
    limparCadastro();
};
