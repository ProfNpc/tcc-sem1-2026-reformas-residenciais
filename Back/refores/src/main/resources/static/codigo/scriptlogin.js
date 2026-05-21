 tipoAtual = 'cliente';
function switchTab(type) {

    tipoAtual = type;


        const body = document.getElementById('body-context');
        const tabs = document.querySelectorAll('.tab');
        const title = document.getElementById('title');
        const subtitle = document.getElementById('subtitle');
        const btnText = document.getElementById('btn-text');
        const footerInvite = document.getElementById('footer-invite');
 
        tabs.forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
 
        if(type === 'cliente') {
            body.className = 'theme-cliente';
            title.innerText = 'Olá, Contratante!';
            subtitle.innerText = 'Acompanhe a evolução da sua obra em tempo real.';
            btnText.innerText = 'ACESSAR MINHA OBRA';
            footerInvite.innerHTML = 'Quer reformar? <a href="#">Peça um orçamento</a>';
             document.getElementById("topocliente").style.display = "block";
              document.getElementById("topoclientep").style.display = "block";
             document.getElementById("topoprofissional").style.display = "none";
        } else {
            body.className = 'theme-pro';
            title.innerText = 'Painel do Profissional';
            subtitle.innerText = 'Gerencie seus clientes e orçamentos.';
            btnText.innerText = 'ENTRAR NO PAINEL';
            footerInvite.innerHTML = 'Ainda não é parceiro? <a href="cadastro.html">Cadastre - se</a>';            
             document.getElementById("topocliente").style.display = "none";
             document.getElementById("topoclientep").style.display = "none";
             document.getElementById("topoprofissional").style.display = "block";

          

        }
    }

    const botao = document.getElementById("btn-text");

botao.addEventListener("click", function() {

   

    if(tipoAtual === 'cliente') {
       
        
        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;
       /* alert("usuario " + usuario + "\nsenha"+senha)*/

       if (usuario === "reformas" || senha ==="residenciais"){

             window.location.href = "index.html?hideDiv=true";

            alert("Ola cliente,\n Bem vido")
       }else{

            alert("Dados incorretos");

       }

    } else {
       
         const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;


               if (usuario === "reformas" || senha ==="residenciais"){

                window.location.href = "index.html?hideDiv=true";

            alert("Ola Profissional,\n Bem vido")
			
       }else{

            alert("Dados incorretos");

       }
       
    }

});


document.addEventListener("DOMContentLoaded", function() {

    const botao1 = document.getElementById("btn-redefinir");

    if (botao1) {
        botao1.addEventListener("click", function() {
            alert("teste");
        });
    }

});