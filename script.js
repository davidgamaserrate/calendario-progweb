let nav = 0;
let selecionado = null;
let eventos = localStorage.getItem('eventos') ? JSON.parse(localStorage.getItem('eventos')) : [];

const calendario = document.getElementById('calendario');
const dias = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];


function load() {
    const dt = new Date();


    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }


    const dia = dt.getDate();
    const mes = dt.getMonth();
    const ano = dt.getFullYear();

    const primeiroDiaDoMes = new Date(ano, mes, 1);
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    const dataString = primeiroDiaDoMes.toLocaleDateString('pt-br', {
        weekday: 'long',
        yar: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });


    const diasPreenchidos = dias.indexOf(dataString.split(', ')[0]);

    document.getElementById('mesDisplay').innerText =
        `${dt.toLocaleDateString('pt-br', { month: 'long' })} ${ano}`;

    calendario.innerHTML = '';

    for (let i = 1; i <= diasPreenchidos + diasNoMes; i++) {
        const quadroDia = document.createElement('div');
        quadroDia.classList.add('dia');


        if (i > diasPreenchidos) {
            quadroDia.innerText = i - diasPreenchidos;
            quadroDia.addEventListener('click', () => console.log('click'));
        } else {
            quadroDia.classList.add('padding');
        }

        calendario.appendChild(quadroDia);

    }

}

function initButtons() {
    document.getElementById('proximo').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('voltar').addEventListener('click', () => {
        nav--;
        load();
    });
}
initButtons();
load();