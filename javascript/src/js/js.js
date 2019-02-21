import {ListarFavoritos} from './contatos'
import {Listar} from './contatos';
import {Adicionar} from './api';
import {Editar} from './api';
import {Contatos} from './api';
import {Favoritos} from './api';

let menuOpen = false;
// alert('oi');

console.log(Favoritos);
console.log(Contatos);

document.getElementById('img-header1').onclick = function(){
    abreMenu();
}
const abreMenu = () => {
    const header = document.getElementsByClassName('header')[0];

    // Se tiver Aberto ele fecha, se tiver fechado ele abre
    if(menuOpen){
        header.style.display = "none";
        menuOpen = false;
    }else{
        header.style.display = "block";
        menuOpen = true;
    }
    //clicar fora fecha
    window.onclick = function(event) {
        if (event.target == header) {
            header.style.display = "none";
        }
    }
}

document.getElementById('li-ins').onclick = function(){
    Menu('inserir');
}
document.getElementById('li-ctt').onclick = function(){
    Menu('contatos');
}
document.getElementById('li-fav').onclick = function(){
    Menu('favoritos');
}
export const Menu = ($sessao) => {
    const ins = document.getElementsByClassName('inserir')[0];
    const ctt = document.getElementsByClassName('contatos')[0];
    const edi = document.getElementsByClassName('editar')[0];
    const pes = document.getElementById('form-pesquisa');
    const h1inse = document.getElementById('h1-inserir');
    const h1edit = document.getElementById('h1-editar');
    const boxes = document.getElementsByClassName('boxes')[0];
    const lifav = document.getElementById('li-fav');
    const liins = document.getElementById('li-ins');
    const lictt = document.getElementById('li-ctt');

    h1inse.style.display = "none";
    h1edit.style.display = "none";
    ins.style.display = "none";
    ctt.style.display = "none";
    edi.style.display = "none";
    pes.style.display = "none";
    boxes.style.display = 'none';

    if(lifav.className == 'li-ativada'){
        trocaClasse(lifav,'li-ativada','li');
    }
    if(liins.className == 'li-ativada'){
        trocaClasse(liins,'li-ativada','li');
    }
    if(lictt.className == 'li-ativada'){
        trocaClasse(lictt,'li-ativada','li');
    }

    localStorage.setItem('flag', false);

    
    if($sessao == 'inserir'){
        ins.style.display = 'block';
        h1inse.style.display = 'block';
        document.getElementsByClassName('btn-inserir')[0].onclick = function(){
            Adicionar();
        };
        trocaClasse(liins,'li','li-ativada');
    }
    else if($sessao == 'editar'){
        edi.style.display = 'block';
        h1edit.style.display = 'block';
        const btn = document.getElementsByClassName('btn-editar')[0];
        btn.addEventListener('click', function() {
            Editar(this.id);
        });
    }
    else if($sessao == 'favoritos'){
        ctt.style.display = "block";
        boxes.style.display = 'flex';
        pes.style.display = 'block';
        ListarFavoritos(0,10);
        trocaClasse(lifav,'li','li-ativada');
        localStorage.setItem('flag', true);
    }
    else{
        ctt.style.display = "block";
        boxes.style.display = "flex";
        pes.style.display = 'block';
        Listar(0,10);
        trocaClasse(lictt,'li','li-ativada');
        localStorage.setItem('flag', false);
        console.log('flag:'+ localStorage.getItem('flag'));
    }
}

export const trocaClasse = (elemento, antiga, nova) => {
    elemento.classList.remove(antiga);
    elemento.classList.add(nova);
}

// MODAL SOBRE
const modalS = document.getElementById('modalSobre');

document.getElementById('li-sobre').onclick = function() {
    modalS.style.display = "block";
}
document.getElementsByClassName('closeSobre')[0].onclick = function() {
    modalS.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modalS) {
        modalS.style.display = "none";
    }
}


window.onresize = function () {
    const menu = document.getElementsByClassName('header')[0];
    if (window.innerWidth > 700) { 
        menu.style.display = "block";
    }else{
        menu.style.display = "none";
    }
}