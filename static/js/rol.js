document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. EVENTOS DE BOOTSTRAP PARA EL MENU
  // ==========================================
  const dropdownElement = document.getElementById("miDropdownContainer");

  if (dropdownElement) {
    // Se ejecuta al momento de hacer clic para abrir
    dropdownElement.addEventListener("show.bs.dropdown", () => {
      console.log("El menú desplegable se está abriendo...");
    });

    // Se ejecuta cuando la animación de apertura finaliza
    dropdownElement.addEventListener("shown.bs.dropdown", () => {
      console.log("El menú desplegable está totalmente abierto.");
    });

    // Se ejecuta al hacer clic para cerrar
    dropdownElement.addEventListener("hide.bs.dropdown", () => {
      console.log("El menú desplegable se está cerrando...");
    });

    // Se ejecuta cuando termina de cerrarse
    dropdownElement.addEventListener("hidden.bs.dropdown", () => {
      console.log("El menú desplegable está cerrado.");
    });
  }

});




// Arreglo con la información de los miembros
let teamMembers = [
  { name: "Cesar Arzola", role: "Diseñadora UI/UX" },
  { name: "Angel Alvarez", role: "Desarrollador Frontend" },
  { name: "Gabriel Naranjo", role: "Desarrolladora Backend" },
  { name: "Angelo Pomasongo", role: "Project Manager" },
  { name: "Diego Velazquez", role: "Especialista QA" }
];

const teamCircle = document.getElementById("teamCircle") || document.getElementById("teamGrid");
const actionBtn = document.getElementById("btnChange") || document.getElementById("actionBtn");

// Calcula dinámicamente el radio según la pantalla
function obtenerRadio() {
  const width = window.innerWidth;
  if (width <= 480) {
    return 92;  // Celulares pequeños (evita que se corte en los bordes)
  } else if (width <= 768) {
    return 120; // Tablets y pantallas intermedias
  } else {
    return 180; // Pantallas grandes (PC/Laptops)
  }
}

function renderCards() {
  if (!teamCircle) return;
  teamCircle.innerHTML = ""; 

  // Crear botón giratorio central si no existe
  if (!document.getElementById("rotateBtn")) {
    const btnCenter = document.createElement("button");
    btnCenter.className = "rotate-btn";
    btnCenter.id = "rotateBtn";
    btnCenter.setAttribute("aria-label", "Rotar personas");
    btnCenter.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M23 4v6h-6"></path>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
      </svg>
    `;
    btnCenter.addEventListener("click", rotateTeam);
    teamCircle.appendChild(btnCenter);
  }

  const total = teamMembers.length;
  const radioActual = obtenerRadio();

  teamMembers.forEach((member, index) => {
    const angulo = (index / total) * (2 * Math.PI) - (Math.PI / 2);

    const x = Math.round(Math.cos(angulo) * radioActual);
    const y = Math.round(Math.sin(angulo) * radioActual);

    const card = document.createElement("div");
    card.classList.add("member-card");
    
    // Centrado matemático usando translate
    card.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

    card.innerHTML = `
      <div class="photo-container"></div>
      <div class="member-info">
        <p class="name">${member.name}</p>
        <p class="role">${member.role}</p>
      </div>
    `;

    teamCircle.appendChild(card);
  });
}

// Rotación de posiciones
function rotateTeam() {
  const firstMember = teamMembers.shift();
  teamMembers.push(firstMember);
  renderCards();
}

if (actionBtn) {
  actionBtn.addEventListener("click", rotateTeam);
}

// Recalcula al cambiar tamaño de pantalla
window.addEventListener("resize", renderCards);
document.addEventListener("DOMContentLoaded", renderCards);

function cambioIngles() {
  window.location.href = 'en.html';
}