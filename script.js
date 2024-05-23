document.querySelector('.busca').addEventListener('submit', async (event)=>{ //a função será executada quando enviar o formulário
    
    event.preventDefault(); //cancelando o comportamento padrão, por que senão a página vai atualizar ao enviar o formulário

    let input = document.querySelector('#searchInput').value; //pegando o que foi digitado no input

    if(input !== '' ){ //se input estiver diferente de vazio
        
        clearInfo(); //limpar a tela antes de executar a função
    
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=30e93287ebd54e8ca1bed0130ee4518c&units=metric&lang=pt_br`; //url de onde será feita a requisição. 

        let results = await fetch(url); //async/await. ''Espere a requisição e espera o resultado para continuar''.
        let json = await results.json(); // ''pegando o resultado e transformando em json, eu espero...''


        if(json.cod === 200){ //200 é o código de quando a requisição foi bem sucedida
            showInfo({ //montando o objeto

                name: json.name, //nome da cidade
                country: json.sys.country, //país
                temp: json.main.temp, //temperatura
                tempIcon: json.weather[0].icon, //ícone da temperatura
                windSpeed: json.wind.speed, //velocidade do vento
                windDeg: json.wind.deg,  //grau do vento
            });
        } else {
            clearInfo(); //limpar a tela antes de executar a função
            showWarning('Cidade não foi encontrada.');
        }
    } else { //se ninguem digitar nada e der o buscar:
        clearInfo();
    }
});

function showInfo(json){ //mostrar as informações na tela.
    
    showWarning(''); //limpando o aviso

    document.querySelector('.resultado').style.display = 'block'; 
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`); //imagem não é innerhtml, é setAttribute, não esquecer.

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg-90}deg)`;

}

function clearInfo(){ //limpar a tela
    showWarning(''); //limpando o aviso
    document.querySelector('.resultado').style.display = 'none'; //escondendo as informações de novo
}

function showWarning(msg){ //mostrar aviso logo após o ''submit''
    document.querySelector('.aviso').innerHTML = msg;
};
