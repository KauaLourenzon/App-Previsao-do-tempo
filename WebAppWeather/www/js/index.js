/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    getWeatherData();

    // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');

    //Evento periódico para buscar dados do tempo
    setInterval(getWeatherData, 10000)
}


function getWeatherData() {
    const listaCidade = document.getElementById('listarCidade');
    const cidade = listaCidade.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=408e5881223006eaa95437627d97b520`)
        .then(response => response.json())
        .then((data) => {
            console.log('Recebi um dado - > ' + JSON.stringify(data));
            const divLong = document.getElementById('longitude');
            divLong.innerHTML = data.coord.lon;
            const divLat = document.getElementById('latitude');
            divLat.innerHTML = data.coord.lat;
            const divCity = document.getElementById('cidade');
            divCity.innerHTML = data.name;
            const divDescricao = document.getElementById('descricao');
            divDescricao.innerHTML = data.weather[0].description;
            const divDescricaoGeral = document.getElementById('descricaoGeral');
            divDescricaoGeral.innerHTML = data.weather[0].main;

            const converteTMP = (data.main.temp - 273.15).toFixed(1);
            const divTemp = document.getElementById('Temp');
            divTemp.innerHTML = converteTMP + "°C";

            const converteMIN = (data.main.temp_min - 273.15).toFixed(0);
            const divtempMin = document.getElementById('TempMin');
            divtempMin.innerHTML = converteMIN + "°C";

            const converteMAX = (data.main.temp_max - 273.15).toFixed(0);
            const divTempMax = document.getElementById('TempMax');
            divTempMax.innerHTML = converteMAX + "°C";

            const divVento = document.getElementById('Vento');
            divVento.innerHTML = data.wind.speed + " KM/H";
            const divUmidade = document.getElementById('Umidade');
            divUmidade.innerHTML = data.main.humidity + "%";

            const fundoImagem = document.getElementById('fdimagem');

            const description = data.weather[0].description;
            if (description == "overcast clouds") {
                fundoImagem.style.backgroundImage = "url('https://imagens.ne10.uol.com.br/img/imagens/2020/01/22/ff12b3d2e4_design-sem-nome-9.jpg')";
            }
            if (description == "mist") {
                fundoImagem.style.backgroundImage = "url('http://s.glbimg.com/jo/g1/f/original/2010/12/19/zona-sul1.jpg')";
            }
            if (description == "light rain") {
                fundoImagem.style.backgroundImage = "url('https://imagens.climatempo.com.br/climapress/galeria/2022/01/750x553_e44708fa8ff67e2df50ca35810d50ee8.jpg')";
            }
            if (description == "broken clouds") {
                fundoImagem.style.backgroundImage = "url('https://s1.static.brasilescola.uol.com.br/be/2022/03/vista-nuvens-ceu.jpg')";
            }
            if (description == "clear sky" || description == "few clouds") {
                fundoImagem.style.backgroundImage = "url('https://static6.depositphotos.com/1011549/559/i/450/depositphotos_5590404-stock-photo-clouds.jpg')";
            }
            if (description == "moderate rain") {
                fundoImagem.style.backgroundImage = "url('https://www.aconteceempetropolis.com.br/wp-content/uploads/2016/10/chuva.jpg')";
            }
            if (description == "scattered clouds") {
                fundoImagem.style.backgroundImage = "url('https://s1.static.brasilescola.uol.com.br/be/2022/03/vista-nuvens-ceu.jpg')";
            }
            if (description == "haze") {
                fundoImagem.style.backgroundImage = "url('https://www.tejon.com.br/storage/photos/1/NEVOEIRO.jpg')";
            }
            if (description != "overcast clouds" && description != "mist" && description != "light rain" && description != "broken clouds"
                && description != "clear sky" && description != "moderate rain" && description != "scattered clouds" && description != "haze"
                && description != "few clouds") {
                fundoImagem.style.backgroundImage = "url('https://img.olhardigital.com.br/wp-content/uploads/2022/10/previsao-do-tempo-meteorologia.jpg')";
            }

        })
        .catch((error) => {
            console.log(error)
        })

}
