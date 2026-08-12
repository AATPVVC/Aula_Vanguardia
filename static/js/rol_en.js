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
  // 2. RENDEREIZADO Y LOGICA DEL EQUIPO
  // ==========================================
  renderCards();
});

// Arreglo con la información detallada de cada miembro
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

const teamCircle = document.getElementById("teamCircle") || document.getElementById("teamGrid");
const actionBtn = document.getElementById("btnChange") || document.getElementById("actionBtn");

function obtenerRadio() {
  const width = window.innerWidth;
  if (width <= 480) {
    return 100;
  } else if (width <= 768) {
    return 130;
  } else {
    return 180;
  }
}

function renderCards() {
  if (!teamCircle) return;

  // Mantener únicamente el botón giratorio central
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

    // Evento para desplegar información en la ventana modal al hacer clic en el círculo/tarjeta
    card.addEventListener("click", () => {
      mostrarModal(member.name, member.role, member.desc);
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
// 3. FUNCIONES DE LA VENTANA EMERGENTE (MODAL)
// ==========================================
function mostrarModal(nombre, rol, descripcion) {
  const modal = document.getElementById("modalInfo");
  if (!modal) return;

  document.getElementById("modalNombre").innerText = nombre;
  document.getElementById("modalRol").innerText = rol;
  document.getElementById("modalDescripcion").innerText = descripcion;

  modal.style.display = "flex";
}

const closeModalBtn = document.getElementById("closeModal");
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    document.getElementById("modalInfo").style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("modalInfo");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Redimensionar responsivamente
window.addEventListener("resize", renderCards);

// Funciones de navegación
function inicio() { console.log("Navegando a Inicio..."); }
function soluciones() { console.log("Navegando a Soluciones..."); }
function Problematica() { console.log("Navegando a Problemas..."); }
function video() { console.log("Navegando a Video..."); }
function cambioIngles() { window.location.href = 'en.html'; }
function cambioEspanol() { window.location.href = 'roles_es.html'; }