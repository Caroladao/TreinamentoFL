var inputIsOpen = false, menuOpen = false;

function abreMenu(){
    var menu = document.getElementById('nav-menu');
    var btn = document.getElementById('img-header1');
    console.log("btn: " +btn);
    console.log("btn: " +menu);

    // Se tiver Aberto ele fecha, se tiver fechado ele abre
    if(menuOpen){
        menu.style.display = "none";
        menuOpen = false;
    }else{
        menu.style.display = "block";
        menuOpen = true;
    }
    //clicar fora fecha
    window.onclick = function(event) {
        if (event.target == menu) {
            menu.style.display = "none";
        }
    }
}
function abreBox(){
    // pega as info
    var ctt = document.getElementById('exibir-ctt');

    // Pega o box que abre as info
    var box = document.getElementById("boxx");

    // Pega o btn ou imagem que fecha as info
    var sair = document.getElementById("img-sair");

    // Quando clicar, abre as informações
    box.onclick = function() {
        ctt.style.display = "block";
    }

    // Quando clicar para fechar, ele fecha
    sair.onclick = function() {
        ctt.style.display = "none";
    }

    // Se clicar fora ele fecha as info
    window.onclick = function(event) {
        if (event.target == box) {
            ctt.style.display = "none";
        }
    }
}
function inputFoto(){
    // pega  input
    var inp = document.getElementById('avatarr');
    var btn = document.getElementById('btn-foto');
    console.log(inputIsOpen);
    // Quando clicar, abre as informações
    if(inputIsOpen){
        inp.style.display = "none";
        inputIsOpen = false;
    }else{
        inp.style.display = "block";
        btn.style.margin = "4% 0 1% 1%";
        inputIsOpen = true;
    }
}

function Menu($section){

    var ins = document.getElementsByClassName('inserir')[0];
    var ctt = document.getElementsByClassName('contatos')[0];
    var edi = document.getElementsByClassName('editar')[0];
    var pes = document.getElementById('form-pesquisa');
    var h1inse = document.getElementById('h1-inserir');
    var h1edit = document.getElementById('h1-editar');
    var exicont = document.getElementsByClassName('exibircontato')[0];

    h1inse.style.display = "none";
    h1edit.style.display = "none";
    ins.style.display = "none";
    ctt.style.display = "none";
    edi.style.display = "none";
    pes.style.display = "none";
    exicont.style.display = "none";
    
    if($section == 'inserir'){
        ins.style.display = 'flex';
        h1inse.style.display = 'block';
    }
    else if($section == 'editar'){
        edi.style.display = 'flex';
        h1edit.style.display = 'block';
    }
    else{
        ctt.style.display = 'flex';
        pes.style.display = 'block';
    }

}
