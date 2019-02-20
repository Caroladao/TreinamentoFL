import favorito from '../img/favorito.png';
import nfavorito from '../img/nfavorito.png';
import {Menu} from './js.js';
import {Edicao} from './functions.js';
import {Contatos} from './api';
import {Favoritos} from './api';
import ninguem from '../img/avatar.png';


export const Listar = (ini,qtd) => {
    const boxes = document.getElementById('boxes');
    if(ini == 0){
        boxes.innerHTML = "";
    }
    const btn = document.getElementsByClassName('btn-mais')[0];
    if(Contatos.length < 10){
        btn.style.display = "none";
    }else{
        btn.style.display = "block";
    }

    for(let i = ini ; i<qtd-1; i++){
        boxes.innerHTML += desenhaBox(Contatos[i]);        
    }

    Paginacao('contatos',qtd,qtd+10);

    const ar = document.getElementsByClassName('box');
    for(let j = 0; j<ar.length;j++){
        ar[j].addEventListener('click', function() {
            Edicao(Contatos,this.id);
            Menu('editar');
        });
    }
}

export const ListarFavoritos = (ini,qtd) => {
    const boxes = document.getElementById('boxes');
    if(ini == 0){
        boxes.innerHTML = "";
    }

    const btn = document.getElementsByClassName('btn-mais')[0];
    if(Favoritos.length < 10){
        btn.style.display = "none";
    }else{
        btn.style.display = "block";
    }
    for(let i = ini ; i<qtd-1; i++){
        boxes.innerHTML += desenhaBox(Favoritos[i]);     
    }

    console.log(qtd)
    
    Paginacao('favoritos',qtd,qtd+10);

    const ar = document.getElementsByClassName('box');
    for(let j = 0; j<ar.length;j++){
        ar[j].addEventListener('click', function() {
            Edicao(Favoritos,this.id);
            Menu('editar');
        });
    }
}

export const desenhaBox = (contact) => {
    let img;
    let avat;
    if(contact.isFavorite){
        img = favorito;
    }else{
        img = nfavorito;
    }
    return `<div class='box' id='${contact.id}'>
            <img class='img-avatar' src='${contact.info.avatar}'  onerror="this.src='${ninguem}'"  alt='Avatar'>
            <img class='img-favorito' id="${contact.id}" src='${img}' alt='Favorito'>
            <h3>${contact.firstName} ${contact.lastName}</h3>
            <p>${contact.email}<br>${contact.info.phone}</p></div>`;
}


const Paginacao = (tipo,inicio,qtd) => {
    const btn = document.getElementsByClassName('btn-mais')[0];
    if(tipo == "contatos"){
        if(Contatos.length > qtd){
            btn.onclick = function(){
                Listar(inicio,qtd);
            }
        }else{
            btn.onclick = function(){
                Listar(inicio,Contatos.length);
            }
            btn.style.display = 'none';
        }
    }
    if(tipo == "favoritos"){
        if(Favoritos.length > qtd){
            btn.onclick = function(){
                ListarFavoritos(inicio,qtd);
            }
        }else{
            btn.onclick = function(){
                ListarFavoritos(inicio,Favoritos.length);
            }
            btn.style.display = 'none';
        }
    }
    
}