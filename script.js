const canvas = document.getElementById("signaturePad");

const signaturePad = new SignaturePad(canvas, {
  backgroundColor: "rgba(255,255,255,1)"
});

function resizeCanvas(){

const data = signaturePad.toData();

const ratio = Math.max(window.devicePixelRatio || 1,1);

canvas.width = canvas.offsetWidth * ratio;
canvas.height = canvas.offsetHeight * ratio;

canvas.getContext("2d").scale(ratio,ratio);

signaturePad.clear();
signaturePad.fromData(data);

}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function clearSignature() {
  signaturePad.clear();
}

function allowOnlyNumbers(input) {
  input.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '');
  });
}

allowOnlyNumbers(document.getElementById("cpf"));
allowOnlyNumbers(document.getElementById("whatsapp"));


// -------- WHATSAPP --------

function abrirWhatsapp() {

  let telefone = document.getElementById("whatsapp").value;

  if (telefone.length < 10) {
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

