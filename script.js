const canvas = document.getElementById("signaturePad");

const signaturePad = new SignaturePad(canvas,{
backgroundColor:"rgba(255,255,255,1)"
});

function resizeCanvas(){

const ratio = Math.max(window.devicePixelRatio || 1,1);

canvas.width = canvas.offsetWidth * ratio;
canvas.height = canvas.offsetHeight * ratio;

canvas.getContext("2d").scale(ratio,ratio);

signaturePad.clear();
}

window.addEventListener("resize",resizeCanvas);
resizeCanvas();

function clearSignature(){
signaturePad.clear();
}

function allowOnlyNumbers(input){

input.addEventListener("input",function(){
this.value = this.value.replace(/\D/g,'');
});

}

allowOnlyNumbers(document.getElementById("cpf"));
allowOnlyNumbers(document.getElementById("whatsapp"));

document.getElementById("checklistForm").addEventListener("submit",function(e){

e.preventDefault();

if(signaturePad.isEmpty()){
alert("Por favor, assine o checklist.");
return;
}

alert("Checklist enviado com sucesso!");

});
