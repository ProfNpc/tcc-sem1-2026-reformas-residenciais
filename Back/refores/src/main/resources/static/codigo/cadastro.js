


var botao = document.getElementById("escolhaespe"); // Seleciona o botão

botao.addEventListener("click", function(event) {
     
  document.getElementById("btn-submit-avancar").style.display = "block";
  document.getElementById("btn-submit-cad").style.display = "none"; 

});


var botao = document.getElementById("escolhacliente"); // Seleciona o botão

botao.addEventListener("click", function(event) {
     
  document.getElementById("btn-submit-avancar").style.display = "none";
  document.getElementById("btn-submit-cad").style.display = "block"; 

});

 document.getElementById("btn-submit-avancar").addEventListener("click", function() {
         
     var nome = document.getElementById("nomeCad").value;    
    if (nome === ""){
      alert("digite o nome");                
    }else{               
      window.location.href = "cadastroservico.html?hideDiv=true";    
         }

  });

