// alert('oi');
import {Listar, desenhaBox} from './contatos'
import favorito from '../img/favorito.png';
import nfavorito from '../img/nfavorito.png';
import { Menu } from './js';

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
}
getAll().then(() => {
    Listar(0,10);
})


export const deletarContato = async (id) => {
    try {
        const res = await fetch(`http://contacts-api.azurewebsites.net/api/contacts/${id}`,{
                method: 'DELETE',
                headers: new Headers()
            }
        )
        if (res.status == 200) {
            alert("Excluido");
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
            alert("Adicionado");
            window.location.reload(false);
        }
        throw await res.json()
    } catch (e) {
        const msg = Object.values(e)[0]
        if(msg){
            console.error('Erro ao criar novo contato :: '+msg)
            alert('Não foi possível salvar o contato');
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
            alert("Atualizado");
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
    console.log(contato);
    adicionarContato(contato);
}

export const Editar = (id) =>{
    const check = document.getElementById("ed-fav");
    let fav;
    if(check.checked){
        fav = true;
    }else{
        fav = false;
    }
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


    // const ar = document.getElementsByClassName('box');
    // for(i = 0; i<ar.length;i++){
    //     ar[i].addEventListener('click', function() {
    //         Edicao(this.id);
    //         Menu('editar');
    //     });
    // }
}

PesquisaContato('');

    const search = document.getElementById('busca');
    search.onkeyup = ({ target: { value }}) => {
        PesquisaContato(value);
    }   


