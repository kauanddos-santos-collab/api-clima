// ============================================
// 1. CONFIGURAÇÃO DA API
// ============================================

const API_KEY = "0984799b112e62d84cb9fb1a03f11718";

const API_URL =
    "https://api.openweathermap.org/data/2.5/weather";


// ============================================
// 2. ELEMENTOS DA PÁGINA
// ============================================

const botaoBuscar = document.getElementById("buscar");
const campoCidade = document.getElementById("cidade");
const resultado = document.getElementById("resultado");


// ============================================
// 3. LIGA O BOTÃO À FUNÇÃO
// ============================================

botaoBuscar.addEventListener("click", buscarClima);


// Permite pesquisar pressionando Enter

campoCidade.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {
        buscarClima();
    }

});


// ============================================
// 4. FUNÇÃO PRINCIPAL
// ============================================

function buscarClima() {

    const cidade = campoCidade.value.trim();


    // Verifica se o usuário digitou alguma coisa

    if (cidade === "") {

        resultado.innerHTML = `
            <p>Digite o nome de uma cidade.</p>
        `;

        return;
    }


    // Mensagem enquanto consulta a API

    resultado.innerHTML = `
        <p>Consultando o clima...</p>
    `;


    // ============================================
    // 5. MONTA A URL DA API
    // ============================================

    const url =
        `${API_URL}?q=${encodeURIComponent(cidade)}`
        + `&appid=${API_KEY}`
        + `&units=metric`
        + `&lang=pt_br`;


    console.log("Consultando:", url);


    // ============================================
    // 6. FAZ A CONSULTA
    // ============================================

    fetch(url)

        .then(resposta => {

            if (!resposta.ok) {

                throw new Error(
                    "Cidade não encontrada ou erro na API."
                );

            }

            return resposta.json();

        })


        // ============================================
        // 7. RECEBE OS DADOS
        // ============================================

        .then(dados => {

            console.log("JSON recebido:", dados);


            // Temperatura

            const temperatura =
                dados.main.temp;


            // Umidade

            const umidade =
                dados.main.humidity;


            // Vento em km/h

            const vento =
                (dados.wind.speed * 3.6).toFixed(1);


            // Descrição do clima

            const descricao =
                dados.weather[0].description;


            // ============================================
            // 8. MOSTRA O RESULTADO
            // ============================================

            resultado.innerHTML = `

                <div class="card-clima">

                    <h2>${dados.name}</h2>

                    <p>
                         Temperatura:
                        <strong>
                            ${temperatura.toFixed(1)} °C
                        </strong>
                    </p>

                    <p>
                         Umidade:
                        <strong>
                            ${umidade}%
                        </strong>
                    </p>

                    <p>
                         Vento:
                        <strong>
                            ${vento} km/h
                        </strong>
                    </p>

                    <p>
                        ☁️ Condição:
                        <strong>
                            ${descricao}
                        </strong>
                    </p>

                </div>

            `;

        })


        // ============================================
        // 9. TRATA ERROS
        // ============================================

        .catch(erro => {

            console.error(erro);

            resultado.innerHTML = `

                <p>
                     Não foi possível consultar
                    o clima dessa cidade.
                </p>

            `;

        });

}