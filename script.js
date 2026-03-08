const canvas = document.getElementById("signaturePad");
const ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("mousedown", () => {
drawing = true;
});

canvas.addEventListener("mouseup", () => {
drawing = false;
ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(event){

if(!drawing) return;

ctx.lineWidth = 2;
ctx.lineCap = "round";
ctx.strokeStyle = "#000";

const rect = canvas.getBoundingClientRect();

ctx.lineTo(
event.clientX - rect.left,
event.clientY - rect.top
);

ctx.stroke();
ctx.beginPath();

ctx.moveTo(
event.clientX - rect.left,
event.clientY - rect.top
);

}

function clearSignature(){
ctx.clearRect(0,0,canvas.width,canvas.height);
}

document.getElementById("checklistForm").addEventListener("submit",function(e){

e.preventDefault();

alert("Checklist enviado com sucesso!");

});