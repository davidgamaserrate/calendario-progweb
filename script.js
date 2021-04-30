let nav = 0;
let selecionado = null;
let eventos = localStorage.getItem('eventos') ? JSON.parse(localStorage.getItem('eventos')) : [];

const calendario = document.getElementById('calendario');
const novoEvento = document.getElementById('novoEvento');
const deletarEventoModal = document.getElementById('deletarEvento');
const backDrop = document.getElementById('modalBackDrop');
const tituloEvento = document.getElementById('tituloEvento');
const dias = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

function abrirModal(date){
    selecionado = date

    const eventosPorDia = eventos.find(e => e.date === selecionado);
    
    if(eventosPorDia){
        document.getElementById('textoEvento').innerText = eventosPorDia.title;
        deletarEventoModal.style.display= 'block';

    }else{
        novoEvento.style.display = 'block'
    }
    backDrop.style.display = 'block';
}

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
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });


    const diasPreenchidos = dias.indexOf(dataString.split(', ')[0]);

    document.getElementById('mesDisplay').innerText =
        `${dt.toLocaleDateString('pt-br', { month: 'long' })} ${ano}`;

    calendario.innerHTML = '';

    for (let i = 1; i <= diasPreenchidos + diasNoMes; i++) {
        const quadroDia = document.createElement('div');
        quadroDia.classList .add('dia');

        const diaString = `${mes + 1}/${i - diasPreenchidos}/${ano}`;

        if (i > diasPreenchidos) {
            quadroDia.innerText = i - diasPreenchidos;

            const eventosPorDia = eventos.find(e => e.date === diaString);

            if(eventosPorDia){
                const eventoDiv = document.createElement('div');
                eventoDiv.classList.add('eventos');
                eventoDiv.innerText = eventosPorDia.title;
                quadroDia.appendChild(eventoDiv);
            }


            quadroDia.addEventListener('click', () => abrirModal(diaString));
            }    else {
                quadroDia.classList.add('padding');
             }

        calendario.appendChild(quadroDia);

    }

}



function fecharModal(){
novoEvento.style.display = 'none';
deletarEventoModal.style.display = 'none';
backDrop.style.display = 'none';
tituloEvento.value = '';
selecionado = null;
load();
}

function salvarEvento(){

    if(tituloEvento.value){
        tituloEvento.classList.remove('erro');
        eventos.push({
        date: selecionado,
        title: tituloEvento.value,
        });


        localStorage.setItem('eventos', JSON.stringify(eventos));
        
        fecharModal();
        
    } else {
        tituloEvento.classList.add('erro');
        
 }
    
}

function deletarEvento(){
    eventos = eventos.filter(e => e.date !== selecionado);
    localStorage.setItem('eventos', JSON.stringify(eventos));
    fecharModal();
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

    document.getElementById('salvar').addEventListener('click', salvarEvento);
    
    document.getElementById('cancelar').addEventListener('click', fecharModal);

    document.getElementById('deletar').addEventListener('click', deletarEvento);
    
    document.getElementById('fechar').addEventListener('click', fecharModal);
}
initButtons();
load();