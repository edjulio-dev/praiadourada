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


// -------- GERAR PDF --------

async function gerarPDF(){

if(signaturePad.isEmpty()){
alert("Por favor, assine o checklist.");
return;
}

const element = document.getElementById("checklistForm");

const nome = document.querySelector("input[type='text']").value || "checklist";

const opt = {

margin:10,

filename:`checklist-flat-${nome}.pdf`,

image:{ type:'jpeg', quality:0.98 },

html2canvas:{
scale:2,
useCORS:true
},

jsPDF:{
unit:'mm',
format:'a4',
orientation:'portrait'
},

pagebreak:{
mode:['avoid-all','css','legacy']
}

};

const worker = html2pdf().set(opt).from(element);

const pdfBlob = await worker.outputPdf('blob');

const file = new File([pdfBlob], `checklist-flat-${nome}.pdf`, {type:'application/pdf'});

if(navigator.share && navigator.canShare({files:[file]})){

await navigator.share({
title:"Checklist",
text:"Checklist",
files:[file]
});

}else{

// fallback para desktop
const url = URL.createObjectURL(pdfBlob);
const link = document.createElement("a");
link.href = url;
link.download = `checklist-flat-${nome}.pdf`;
link.click();

}

}


// -------- WHATSAPP --------

function abrirWhatsapp(){

let telefone = document.getElementById("whatsapp").value;

if(telefone.length < 10){
alert("Digite um número de WhatsApp válido");
return;
}

if (!telefone.startsWith("55")) {
telefone = "55" + telefone;
}

const mensagem = "Olá! Segue o checklist do seu flat.";

const url = "https://wa.me/" + telefone + "?text=" + encodeURIComponent(mensagem);

window.open(url, "_blank");

}

