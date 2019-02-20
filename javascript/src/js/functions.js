import {deletarContato} from './api'

export const abrirModal = (Contatos,id) => {
    const modal = document.getElementById('modal');
    let contato;
    for(let i=0; i<Contatos.length;i++){
        if(id == Contatos[i].id){
            contato = Contatos[i];
        }
    }
    modal.style.display = "block";
    modal.innerHTML = `<div class="modal-content">
                    <span class="close">&times;</span>
                    <h1>Deseja Realmente Excluir <b>${contato.firstName}</b>?</h1>
                    <button class="btn-modal" id="modal-sim">Sim</button>
                    <button class="btn-modal" id="modal-nao">Não</button>
                    </div>`;

    document.getElementsByClassName('close')[0].onclick = function() {
        modal.style.display = "none";
    }
    document.getElementById('modal-nao').onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    document.getElementById('modal-sim').onclick = function() {
        modal.style.display = "none";
        deletarContato(id);
    }
}

export const Edicao = (Contatos,id) => {
    const editar = document.getElementById('editar');
   
    for(let i=0; i<Contatos.length;i++){
        if(id== Contatos[i].id){
            editar.style.display = 'block';
            editar.innerHTML = `<form class="form-editar" method="POST" action="editar.html">
                <img class="img-avatar" src="${Contatos[i].info.avatar}" alt="Avatar">
                <input class="inputs" type="text" name="fname" id="ed-fname" maxlength="20" placeholder="Primeiro Nome" value="${Contatos[i].firstName}" required>
                <input class="inputs" type="text" name="lname" id="ed-lname" maxlength="30" placeholder="Sobrenome" value="${Contatos[i].lastName}" required>
                <input class="inputs" type="text" id="avatarr" value="${Contatos[i].info.avatar}" placeholder="URL da imagem">
                <input class="inputs" type="email" name="email" id="ed-email" placeholder="Email: exemplo@exemplo.com" value="${Contatos[i].email}">`;
            if(Contatos[i].gender == 'f'){
                editar.innerHTML += `<input class="inpcheck" type="radio" name="ed-gender" id="ed-gender" value="f" checked required>Female
                <input class="inpcheck" type="radio" name="ed-gender" id="ed-gender" value="m">Male`;
            }else{
                editar.innerHTML += `<input class="inpcheck" type="radio" name="ed-gender" id="ed-gender" value="f" required>Female
                <input class="inpcheck" type="radio" name="ed-gender" id="ed-gender" value="m" checked>Male`;
            }
            editar.innerHTML += `<input class="inputs" type="text" name="company" id="ed-company" placeholder="Empresa" value="${Contatos[i].info.company}" required>
                <input class="inputs" type="text" name="address" id="ed-address" placeholder="Endereço..." value="${Contatos[i].info.address}">
                <input class="inputs" type="text" name="phone" id="ed-phone" maxlength="11" placeholder="Telefone" value="${Contatos[i].info.phone}" required>
                <textarea class="inputs" name="comments" id="ed-comments" cols="30" rows="5" placeholder="Comentarios...">${Contatos[i].info.comments}</textarea>
                <label id="lblfavorito" for="fav">Favorito:</label>`;
            if(Contatos[i].isFavorite){
                editar.innerHTML += `<input class="inpcheck" type="checkbox" name="fav" id="ed-fav" value="true" checked><br>`;
            }else{
                editar.innerHTML += `<input class="inpcheck" type="checkbox" name="fav" id="ed-fav" value="true"><br>`;
            }
            editar.innerHTML += `<input class="btn-editar" id="${Contatos[i].id}" type="button" value="Salvar">
                <input class="btn-editar" id="btn-excluir" type="reset" value="Excluir">
            </form> `;
        }
    }
    document.getElementById('btn-excluir').onclick = function(){
        // deletarContato(id);
        abrirModal(Contatos,id);
    };
}