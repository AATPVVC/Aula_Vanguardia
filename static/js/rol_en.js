document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. EVENTOS DE BOOTSTRAP PARA EL MENU
  // ==========================================
  const dropdownElement = document.getElementById("miDropdownContainer");

  if (dropdownElement) {
    dropdownElement.addEventListener("show.bs.dropdown", () => {
      console.log("El menú desplegable se está abriendo...");
    });
  }

  // ==========================================
  // 2. RENDERIZADO Y LÓGICA DEL EQUIPO
  // ==========================================
  renderCards();
});

// Información detallada de cada integrante
let teamMembers = [
  { 
    name: "Cesar Arzola", 
    role: "Diseñadora UI/UX",
    desc: "Diseño visual de las interfaces del sitio web y optimización de la experiencia de usuario."
  },
  { 
    name: "Angel Alvarez", 
    role: "Desarrollador Frontend",
    desc: "Construcción interactiva del sitio, maquetación responsiva con HTML, CSS y JS."
  },
  { 
    name: "Gabriel Naranjo", 
    role: "Desarrolladora Backend",
    desc: "Administración de bases de datos y la lógica en el servidor para las funcionalidades."
  },
  { 
    name: "Angelo Pomasongo", 
    role: "Project Manager",
    desc: "Liderazgo, planificación de entregas y coordinación general del equipo del proyecto."
  },
  { 
    name: "Diego Velazquez", 
    role: "Especialista QA",
    desc: "Pruebas integrales de software, reporte de fallos y control de calidad de la plataforma."
  }
];

const teamCircle = document.getElementById("teamCircle");
const actionBtn = document.getElementById("actionBtn");

function obtenerRadio() {
  const width = window.innerWidth;
  if (width <= 480) {
    return 120; // Celulares
  } else if (width <= 768) {
    return 145; // Tablets
  } else {
    return 210; // Laptops / Pantallas Grandes (Mayor separación de tarjetas)
  }
}

function renderCards() {
  if (!teamCircle) return;

  // Limpiar el contenedor sin eliminar el botón rotador central
  teamCircle.innerHTML = "";

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

  const total = teamMembers.length;
  const radioActual = obtenerRadio();

  teamMembers.forEach((member, index) => {
    const angulo = (index / total) * (2 * Math.PI) - (Math.PI / 2);

    const x = Math.round(Math.cos(angulo) * radioActual);
    const y = Math.round(Math.sin(angulo) * radioActual);

    const card = document.createElement("div");
    card.classList.add("member-card");
    card.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

    card.innerHTML = `
      <div class="photo-container"></div>
      <div class="member-info">
        <p class="name">${member.name}</p>
        <p class="role">${member.role}</p>
      </div>
    `;

    // ACTIVACIÓN AL PASAR EL CURSOR (HOVER)
    card.addEventListener("mouseenter", () => {
      mostrarModal(member.name, member.role, member.desc);
    });

    // OCULTAR AL RETIRAR EL CURSOR
    card.addEventListener("mouseleave", () => {
      ocultarModal();
    });

    teamCircle.appendChild(card);
  });
}

function rotateTeam() {
  const firstMember = teamMembers.shift();
  teamMembers.push(firstMember);
  renderCards();
}

if (actionBtn) {
  actionBtn.addEventListener("click", rotateTeam);
}

// ==========================================
// 3. CONTROL DE LA VENTANA EMERGENTE (MODAL)
// ==========================================
function mostrarModal(nombre, rol, descripcion) {
  const modal = document.getElementById("modalInfo");
  if (!modal) return;

  document.getElementById("modalNombre").innerText = nombre;
  document.getElementById("modalRol").innerText = rol;
  document.getElementById("modalDescripcion").innerText = descripcion;

  modal.style.display = "flex";
}

function ocultarModal() {
  const modal = document.getElementById("modalInfo");
  if (modal) {
    modal.style.display = "none";
  }
}

// Redimensionamiento adaptativo en pantalla
window.addEventListener("resize", renderCards);

// Funciones para la barra de navegación
