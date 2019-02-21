// alert('oi');
import {Listar, desenhaBox, ListarFavoritos} from './contatos'
import favorito from '../img/favorito.png';
import nfavorito from '../img/nfavorito.png';
import { Menu, trocaClasse } from './js';
import { Edicao } from './functions.js';

export let Contatos = [];
export const Favoritos = [];
const filter = '';

export const getAll = async () => {
    const res = await fetch('http://contacts-api.azurewebsites.net/api/contacts/')
    const data = await res.json();

    Contatos=data; 

    let j=0;
    for(let i = 0 ; i<Contatos.length; i++){
        if(Contatos[i].isFavorite){
            Favoritos[j] = Contatos[i];
            j++;      
        }
    }
    localStorage.setItem('Favoritos',Favoritos);
    
}
getAll().then(() => {
    const carregando = document.getElementsByClassName('carregando')[0];
    carregando.style.display = 'none';
    const flag = localStorage.getItem('flag');

    if(flag == 'true'){
        const fav = document.getElementById('li-fav');
        trocaClasse(fav,'li','li-ativada');
        ListarFavoritos(0,10);
    }else{
        const ctt = document.getElementById('li-ctt');
        trocaClasse(ctt,'li','li-ativada');
        Listar(0,10); 
    }
})


export const deletarContato = async (id) => {
    try {
        const res = await fetch(`http://contacts-api.azurewebsites.net/api/contacts/${id}`,{
                method: 'DELETE',
                headers: new Headers()
            }
        )
        if (res.status == 200) {
            modalAviso("Excluido");
            window.location.reload(false);
        }
        getAll();
    }catch(e){
        console.error('Erro: ', e)
        const msg = Object.values(e)[0]
        if (msg) {
            alert(msg)
            console.error('Erro: ', msg)
        }
    }
}

export const adicionarContato = async (contato) => {
    try {
        const res = await fetch(`http://contacts-api.azurewebsites.net/api/contacts`,{
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: contato
            }
        )
        if (res.status == 201) { 
            modalAviso("Adicionado");
            window.location.reload(false);
        }
        throw await res.json()
    } catch (e) {
        const msg = Object.values(e)[0]
        if(msg){
            console.error('Erro ao criar novo contato :: '+msg)
            alert('Não foi possível salvar o contato \n Verifique as informações e tente novamente.');
        }
    }
}

export const atualizarContato = async (contato,id) => {
    try {
        const res = await fetch(`http://contacts-api.azurewebsites.net/api/contacts/${id}`,{
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: contato
            }
        )
        if (res.status == 200) { 
            modalAviso("Atualizado");
            window.location.reload(false);
        }
        throw await res.json()
    } catch (e) {
        const msg = Object.values(e)[0]
        if(msg){
            console.error('Erro ao editar contato :: '+msg)
            alert('Não foi possível editar o contato');
        }
    }
}



export const Adicionar = () => {
    const check = document.getElementById("in-fav");
    let fav;
    if(check.checked){
        fav = true;
    }else{
        fav = false;
    }
    
    if(!IsEmail(document.getElementById("in-email").value)){
        modalAviso("Email inválido");
    }else if(document.getElementById("in-fname").value.length < 3){
        modalAviso("Preencha o campo de Nome. (Min 3 letras)");
    }else if(document.getElementById("in-lname").value.length < 3){
        modalAviso("Preencha o campo de Sobrenome. (Min 3 letras)");
    }else if(!getRadioValue('gender')){
        modalAviso("Selecione o sexo!");
    }else if(document.getElementById("in-company").value.length < 3){
        modalAviso("Preencha o campo de Empresa. (Min 3 letras)");
    }else{
        const contato = JSON.stringify({
            firstName   : document.getElementById("in-fname").value,
            lastName    : document.getElementById("in-lname").value,
            email       : document.getElementById("in-email").value,
            gender      : getRadioValue('gender'),
            isFavorite  : fav,
            company     : document.getElementById("in-company").value,
            avatar      : document.getElementById("in-avatar").value,
            address     : document.getElementById("in-address").value,
            phone       : document.getElementById("in-phone").value,
            comments    : document.getElementById("in-comments").value
        });
        adicionarContato(contato);
    }
}

const modalAviso = (conteudo) =>{
    const modal = document.getElementsByClassName('modalAvisos')[0]; 
    const aviso = document.getElementById('conteudoAviso');

    aviso.innerHTML = conteudo;

    modal.style.display = 'block';
    document.getElementsByClassName('closeAviso')[0].onclick = function() {
        modal.style.display = "none";
    }
    document.getElementById('btnAviso').onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

const IsEmail = (email) =>{
    const er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if(typeof(email) == "string"){
        if(er.test(email)){
             return true; 
        }
    }else if(typeof(email) == "object"){
        if(er.test(email.value)){
            return true; 				
        }	
    }else{
        return false;
	}
}

export const Editar = (id) =>{
    const check = document.getElementById("ed-fav");
    let fav;
    if(check.checked){
        fav = true;
    }else{
        fav = false;
    }
    if(!IsEmail(document.getElementById("ed-email").value)){
        modalAviso("Email inválido");
    }else if(document.getElementById("ed-fname").value.length < 3){
        modalAviso("Preencha o campo de Nome. (Min 3 letras)");
    }else if(document.getElementById("ed-lname").value.length < 3){
        modalAviso("Preencha o campo de Sobrenome. (Min 3 letras)");
    }else if(!getRadioValue('ed-gender')){
        modalAviso("Selecione o sexo!");
    }else if(document.getElementById("ed-company").value.length < 3){
        modalAviso("Preencha o campo de Empresa. (Min 3 letras)");
    }else{
        const contato = JSON.stringify({
            firstName   : document.getElementById("ed-fname").value,
            lastName    : document.getElementById("ed-lname").value,
            email       : document.getElementById("ed-email").value,
            gender      : getRadioValue('ed-gender'),
            isFavorite  : fav,
            company     : document.getElementById("ed-company").value,
            avatar      : document.getElementById("avatarr").value,
            address     : document.getElementById("ed-address").value,
            phone       : document.getElementById("ed-phone").value,
            comments    : document.getElementById("ed-comments").value
        });
    
        atualizarContato(contato,id);
    }
}

const getRadioValue = (radio) => {
    const elements = document.getElementsByName(radio);
    for (let i = 0, l = elements.length; i < l; i++){
        if (elements[i].checked){
            return elements[i].value;
        }
    }
}


export const PesquisaContato = (texto) => {
    const Reg = new RegExp(/^([a-zA-Zà-úÀ-Ú0-9]|'|\s)+$/);
    texto  = texto.toLowerCase();
    let ResPesquisa = [];

    if(texto == '' || Reg.test(texto)){
        ResPesquisa = Contatos.filter(c => {const NomeCompleto = `${c.firstName} ${c.lastName}`.toLowerCase()
            if(NomeCompleto.includes(texto)){
                return c;
            }
        })
    }

    const boxes = document.getElementById('boxes');
    const btn = document.getElementsByClassName('btn-mais')[0];
    btn.style.display = 'none';

    boxes.innerHTML = '';
    let i=0;

    // console.log(ResPesquisa);
    
    // for(i=0;i<qtd;i++){
    for(const contact of ResPesquisa){
        boxes.innerHTML += desenhaBox(contact);
        i++;
        if(i==9){
            break;
        }
    }
    const boxx = document.getElementsByClassName('box');
    for(i = 0; i<boxx.length;i++){
        boxx[i].addEventListener('click', function() {
            Edicao(Contatos,this.id);
            Menu('editar');
        });
    }
}

PesquisaContato('');

    const search = document.getElementById('busca');
    search.onkeyup = ({ target: { value }}) => {
        PesquisaContato(value);
    }   


