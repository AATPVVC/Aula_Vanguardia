//español
function cambioIngles() {
  alert("Traducido al inglés \n(Translated to English)");
}
function Problematica() {
  alert("Cargando la problematica...")
}
function soluciones() {
  alert("Cargando las soluciones...")
}
function cambioIngles() {
  alert("Translating to English...");
}
function inicio() {
  alert("Viajando al inicio...")
}
function video() {
    alert("Cargando el video...")
}
//Ingles
function cambioEspanol() {
  alert("Cambiado a español \n(Switched to Spanish)");
}
function ProblematicaEn() {
  alert("Loading the problem statement...")
}
function solucionesEn() {
  alert("Loading the solutions...")
}
function home() {
  alert("Traveling at the Beginning")
}
function videoEn() {
    alert("Loading the video...")
}
// 1. Datos de los miembros (Asegúrate de tener estas imágenes en images/)
let teamMembers = [
  { name: "Cesar ", role: "Lider", img: "images/", color: "#007bff" },     // Azul
  { name: "Angel ", role: "Frontend", img: "images/", color: "#28a745" }, // Verde
  { name: "Diego ", role: "Backend", img: "images/", color: "#dc3545" },    // Rojo
  { name: "Angelo ", role: "Project Manager", img: "images/", color: "#ffc107" }, // Amarillo
  { name: "Gabriel ", role: "QA", img: "images/", color: "#fd7e14" }       // Naranja
];

const teamCircle = document.getElementById("teamCircle");
const actionBtn = document.getElementById("actionBtn");
const rotateBtn = document.getElementById("rotateBtn");

// 2. Parámetros del círculo (Radio y offsets)
const TOTAL_MEMBERS = teamMembers.length;
const CIRCLE_RADIUS = 220; // Radio del círculo en píxeles
const INITIAL_ANGLE = -90; // Ángulo inicial (en grados) para el primer miembro (arriba)

// 3. Función para renderizar las tarjetas y posicionarlas circularmente
function renderTeam() {
  // Guardar una referencia al botón central para no borrarlo
  const centralBtn = rotateBtn.cloneNode(true);
  teamCircle.innerHTML = ""; // Limpiar
  teamCircle.appendChild(centralBtn); // Volver a añadir el botón central

  teamMembers.forEach((member, index) => {
    // Calcular el ángulo para este miembro
    const angle = (INITIAL_ANGLE + (index * 360) / TOTAL_MEMBERS) * (Math.PI / 180);

    // Calcular la posición X e Y relativa al centro
    const x = Math.cos(angle) * CIRCLE_RADIUS;
    const y = Math.sin(angle) * CIRCLE_RADIUS;

    // Crear la tarjeta (member-card)
    const card = document.createElement("div");
    card.classList.add("member-card");

    // Posicionar la tarjeta (JS se encarga del posicionamiento circular)
    card.style.transform = `translate(${x}px, ${y}px)`;

    card.innerHTML = `
      <div class="photo-container" style="border: 4px solid ${member.color};">
        <img src="${member.img}" alt="${member.name}">
      </div>
      <div class="member-info">
        <p class="name">${member.name}</p>
        <p class="role">${member.role}</p>
      </div>
    `;

    teamCircle.appendChild(card);
  });
}

// 4. Función para rotar la lista (y re-renderizar)
function rotateTeam() {
  // Sacar el primer miembro y ponerlo al final (Rotación Clockwise)
  const firstMember = teamMembers.shift();
  teamMembers.push(firstMember);

  // Volver a renderizar
  renderTeam();
}

// 5. Eventos de los botones
actionBtn.addEventListener("click", rotateTeam);
// El botón central también rotará si se hace clic
rotateBtn.addEventListener("click", rotateTeam);

// 6. Carga inicial
renderTeam();