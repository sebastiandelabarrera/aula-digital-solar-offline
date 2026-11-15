
/* =====================================
   AULA DIGITAL SOLAR OFFLINE
   FUNCIONALIDAD DE INICIO DE SESIÓN
===================================== */

// Obtener elementos del formulario
const formularioLogin = document.getElementById("formularioLogin");
const campoUsuario = document.getElementById("usuario");
const campoContrasena = document.getElementById("contrasena");
const mensajeLogin = document.getElementById("mensajeLogin");
const botonMostrar = document.getElementById("mostrarContrasena");

// Mostrar u ocultar contraseña
botonMostrar.addEventListener("click", function () {

    if (campoContrasena.type === "password") {
        campoContrasena.type = "text";
        botonMostrar.textContent = "Ocultar";
    } else {
        campoContrasena.type = "password";
        botonMostrar.textContent = "Mostrar";
    }

});

// Validar inicio de sesión
formularioLogin.addEventListener("submit", function (evento) {

    // Evitar que la página se recargue
    evento.preventDefault();

    // Obtener los datos ingresados
    const usuarioIngresado = campoUsuario.value.trim().toLowerCase();
    const contrasenaIngresada = campoContrasena.value;

    // Buscar el usuario
    const usuarioEncontrado = usuariosDemo.find(function (usuario) {
        return usuario.usuario === usuarioIngresado;
    });

    // Comprobar si el usuario existe
    if (!usuarioEncontrado) {
        mensajeLogin.textContent = "El usuario ingresado no existe.";
        return;
    }

    // Comprobar si la cuenta está activa
    if (!usuarioEncontrado.activo) {
        mensajeLogin.textContent = "Esta cuenta se encuentra desactivada.";
        return;
    }

    // Comprobar la contraseña
    if (usuarioEncontrado.contrasena !== contrasenaIngresada) {
        mensajeLogin.textContent = "La contraseña es incorrecta.";
        return;
    }

    // Ingreso correcto
    mensajeLogin.style.color = "#247548";
    mensajeLogin.textContent = "Inicio de sesión exitoso. Bienvenido.";

    // Guardar usuario de demostración en el navegador
    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify({
            usuario: usuarioEncontrado.usuario,
            nombre: usuarioEncontrado.nombre,
            rol: usuarioEncontrado.rol,
            grado: usuarioEncontrado.grado || null
        })
    );

       
    // Redirigir según el rol del usuario
    if (usuarioEncontrado.rol === "estudiante") {
        mensajeLogin.textContent = "Acceso correcto. Cargando aula...";

        setTimeout(function () {
            mostrarPantallaEstudiante();
        }, 500);

    } else if (usuarioEncontrado.rol === "docente") {
        mensajeLogin.textContent = "Acceso correcto. Cargando panel docente...";

        setTimeout(function () {
            mostrarPanelDocente();
        }, 500);

    } else if (usuarioEncontrado.rol === "admin") {
        mensajeLogin.textContent = "Acceso correcto. Cargando panel administrador...";

        setTimeout(function () {
            mostrarPanelAdministrador();
        }, 500);
    }


});

/* =====================================
   PANTALLA PRINCIPAL DEL ESTUDIANTE
   W2 - AULA DIGITAL SOLAR OFFLINE
===================================== */

function mostrarPantallaEstudiante() {

    // Recuperar los datos del usuario activo
    const usuarioActivo = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );

    // Reemplazar el contenido de la página
    document.querySelector("main").innerHTML = `

        <section class="panel-estudiante">

            <div class="barra-estudiante">
                <div>
                    <h2>¡Bienvenido, ${usuarioActivo.nombre}!</h2>
                    <p>Estudiante | Grado ${usuarioActivo.grado}</p>
                </div>

                <span class="etiqueta-local">
                    ● Modo local activo
                </span>
            </div>

            <div class="informacion-sincronizacion">
                <strong>Última sincronización:</strong>
                <span>Contenido disponible sin conexión</span>
            </div>

            <h3>Mis asignaturas</h3>

            <div class="contenedor-asignaturas">

                <button class="tarjeta-asignatura">
                    <span>📘</span>
                    <strong>Matemáticas</strong>
                </button>

                <button class="tarjeta-asignatura">
                    <span>📗</span>
                    <strong>Lenguaje</strong>
                </button>

                <button class="tarjeta-asignatura">
                    <span>🌎</span>
                    <strong>Ciencias Sociales</strong>
                </button>

                <button class="tarjeta-asignatura">
                    <span>🔬</span>
                    <strong>Ciencias Naturales</strong>
                </button>

            </div>

            <div class="seccion-contenidos">
                <h3>Mis contenidos educativos</h3>

                <p>
                    Consulta los recursos disponibles para continuar
                    aprendiendo desde la red local.
                </p>

                <div class="tarjeta-contenido">
                    <div>
                        <strong>Material de estudio</strong>
                        <p>Documentos y recursos de aprendizaje.</p>
                    </div>
                    <span>📄</span>
                </div>

                <div class="tarjeta-contenido">
                    <div>
                        <strong>Material imprimible</strong>
                        <p>Guías y actividades para descargar.</p>
                    </div>
                    <span>🖨️</span>
                </div>
            </div>

        </section>

        <nav class="navegacion-inferior">
            <button onclick="mostrarPantallaEstudiante()">Inicio</button>
            <button onclick="mostrarPantallaEstudiante()">Asignaturas</button>
            <button onclick="mostrarPantallaContenidos()">Contenidos</button>
            <button onclick="mostrarPantallaEstudiante()">Mi perfil</button>
        </nav>

    `;
}


/* =====================================
   CONSULTA DE CONTENIDOS EDUCATIVOS
   W3 - AULA DIGITAL SOLAR OFFLINE
===================================== */

function mostrarPantallaContenidos() {

    const contenidosDemo = [
        {
            titulo: "Introducción a las fracciones",
            asignatura: "Matemáticas",
            grado: "Séptimo",
            tipo: "PDF",
            docente: "Docente de Matemáticas",
            fecha: "10/11/2026",
            imprimible: true
        },
        {
            titulo: "Comprensión de textos narrativos",
            asignatura: "Lenguaje",
            grado: "Séptimo",
            tipo: "PDF",
            docente: "Docente de Lenguaje",
            fecha: "08/11/2026",
            imprimible: true
        },
        {
            titulo: "Regiones naturales de Colombia",
            asignatura: "Ciencias Sociales",
            grado: "Séptimo",
            tipo: "Video",
            docente: "Docente de Sociales",
            fecha: "05/11/2026",
            imprimible: false
        },
        {
            titulo: "Los seres vivos y sus características",
            asignatura: "Ciencias Naturales",
            grado: "Séptimo",
            tipo: "PDF",
            docente: "Docente de Naturales",
            fecha: "03/11/2026",
            imprimible: true
        },
        {
            titulo: "Operaciones con números enteros",
            asignatura: "Matemáticas",
            grado: "Octavo",
            tipo: "PDF",
            docente: "Docente de Matemáticas",
            fecha: "02/11/2026",
            imprimible: true
        }
    ];

    document.querySelector("main").innerHTML = `

        <section class="panel-contenidos">

            <div class="encabezado-contenidos">
                <div>
                    <h2>Contenidos educativos</h2>
                    <p>Explora los materiales disponibles en el aula digital.</p>
                </div>

                <span class="etiqueta-local">● Modo local activo</span>
            </div>

            <div class="filtros-contenidos">

                <div class="campo-filtro">
                    <label for="filtroGrado">Grado</label>
                    <select id="filtroGrado">
                        <option value="">Todos los grados</option>
                        <option value="Séptimo">Séptimo</option>
                        <option value="Octavo">Octavo</option>
                    </select>
                </div>

                <div class="campo-filtro">
                    <label for="filtroAsignatura">Asignatura</label>
                    <select id="filtroAsignatura">
                        <option value="">Todas las asignaturas</option>
                        <option value="Matemáticas">Matemáticas</option>
                        <option value="Lenguaje">Lenguaje</option>
                        <option value="Ciencias Sociales">Ciencias Sociales</option>
                        <option value="Ciencias Naturales">Ciencias Naturales</option>
                    </select>
                </div>

                <div class="campo-filtro">
                    <label for="buscarContenido">Buscar por título</label>
                    <input
                        type="text"
                        id="buscarContenido"
                        placeholder="Escribe el nombre del contenido..."
                    >
                </div>

            </div>

            <div class="titulo-resultados">
                <h3>Materiales disponibles</h3>
                <span id="cantidadResultados"></span>
            </div>

            <div id="listaContenidos" class="lista-contenidos"></div>

            <button
                class="boton-volver"
                onclick="mostrarPantallaEstudiante()"
            >
                ← Volver al inicio
            </button>

        </section>

        <nav class="navegacion-inferior">
            <button onclick="mostrarPantallaEstudiante()">Inicio</button>
            <button onclick="mostrarPantallaEstudiante()">Asignaturas</button>
            <button onclick="mostrarPantallaContenidos()">Contenidos</button>
            <button onclick="mostrarPantallaEstudiante()">Mi perfil</button>
        </nav>

    `;

    // Mostrar los contenidos según los filtros
    function filtrarContenidos() {

        const grado = document.getElementById("filtroGrado").value;
        const asignatura = document.getElementById("filtroAsignatura").value;
        const busqueda = document.getElementById("buscarContenido").value.toLowerCase();

        const resultados = contenidosDemo.filter(function (contenido) {

            return (
                (!grado || contenido.grado === grado) &&
                (!asignatura || contenido.asignatura === asignatura) &&
                contenido.titulo.toLowerCase().includes(busqueda)
            );

        });

        const lista = document.getElementById("listaContenidos");
        const cantidad = document.getElementById("cantidadResultados");

        cantidad.textContent = resultados.length + " resultados";

        if (resultados.length === 0) {
            lista.innerHTML = `
                <div class="mensaje-sin-resultados">
                    No se encontraron contenidos con los filtros seleccionados.
                </div>
            `;
            return;
        }

        lista.innerHTML = resultados.map(function (contenido, indice) {

            return `
                <article class="tarjeta-recurso">

                    <div class="icono-recurso">
                        ${contenido.tipo === "PDF" ? "📄" : "🎬"}
                    </div>

                    <div class="informacion-recurso">
                        <h4>${contenido.titulo}</h4>
                        <p>${contenido.asignatura} · Grado ${contenido.grado}</p>
                        <p>Publicado por: ${contenido.docente}</p>
                        <p>Fecha: ${contenido.fecha}</p>
                        <div class="etiquetas-recurso">
                            <span>${contenido.tipo}</span>
                            ${contenido.imprimible ? "<span>Imprimible</span>" : ""}
                        </div>
                    </div>

                    <button
                        class="boton-consultar"
                        onclick="mostrarDetalleContenido(${indice})"
                    >
                        Ver contenido
                    </button>

                </article>
            `;

        }).join("");

    }

    // Conectar los filtros
    document.getElementById("filtroGrado").addEventListener("change", filtrarContenidos);
    document.getElementById("filtroAsignatura").addEventListener("change", filtrarContenidos);
    document.getElementById("buscarContenido").addEventListener("input", filtrarContenidos);

    // Mostrar todos los contenidos inicialmente
    filtrarContenidos();

    // Guardar los contenidos para consultar sus detalles
    window.contenidosActuales = contenidosDemo;
}


/* =====================================
   VISUALIZACIÓN DE CONTENIDOS
   W4 - AULA DIGITAL SOLAR OFFLINE
===================================== */

function mostrarDetalleContenido(indice) {

    const contenido = window.contenidosActuales[indice];

    if (!contenido) {
        alert("No se encontró el contenido seleccionado.");
        return;
    }

    document.querySelector("main").innerHTML = `

        <section class="panel-detalle">

            <button
                class="boton-volver"
                onclick="mostrarPantallaContenidos()"
            >
                ← Volver a contenidos
            </button>

            <div class="encabezado-detalle">
                <span class="etiqueta-local">● Disponible en modo local</span>

                <h2>${contenido.titulo}</h2>

                <p>
                    ${contenido.asignatura} · Grado ${contenido.grado}
                </p>
            </div>

            <div class="visor-contenido">

                ${
                    contenido.tipo === "PDF"
                    ? `
                        <div class="vista-documento">
                            <span>📄</span>
                            <h3>Documento educativo</h3>
                            <p>${contenido.titulo}</p>
                            <p>Vista de demostración del material PDF.</p>
                            <div class="lineas-documento">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    `
                    : `
                        <div class="vista-video">
                            <span>▶</span>
                            <h3>Recurso audiovisual</h3>
                            <p>Vista de demostración del contenido en video.</p>
                        </div>
                    `
                }

            </div>

            <div class="descripcion-contenido">

                <h3>Información del recurso</h3>

                <p>
                    <strong>Asignatura:</strong> ${contenido.asignatura}
                </p>

                <p>
                    <strong>Grado:</strong> ${contenido.grado}
                </p>

                <p>
                    <strong>Docente:</strong> ${contenido.docente}
                </p>

                <p>
                    <strong>Fecha de publicación:</strong> ${contenido.fecha}
                </p>

                <p>
                    <strong>Formato:</strong> ${contenido.tipo}
                </p>

                <p>
                    <strong>Disponibilidad:</strong>
                    Recurso almacenado en el entorno local de demostración.
                </p>

            </div>

            ${
                contenido.imprimible
                ? `
                    <div class="zona-descarga">
                        <p>Este recurso está identificado como material imprimible.</p>

                        <button
                            class="boton-descargar"
                            onclick="descargarMaterialDemo(${indice})"
                        >
                            Descargar material de demostración
                        </button>
                    </div>
                `
                : `
                    <div class="zona-descarga">
                        <p>Este recurso no está marcado como imprimible.</p>
                    </div>
                `
            }

        </section>

    `;
}


/* =====================================
   DESCARGA DE MATERIAL DE DEMOSTRACIÓN
===================================== */

function descargarMaterialDemo(indice) {

    const contenido = window.contenidosActuales[indice];

    if (!contenido || !contenido.imprimible) {
        alert("Este recurso no está disponible para impresión.");
        return;
    }

    const texto = `
AULA DIGITAL SOLAR OFFLINE

${contenido.titulo}

Asignatura: ${contenido.asignatura}
Grado: ${contenido.grado}
Docente: ${contenido.docente}
Fecha: ${contenido.fecha}

Material educativo de demostración.
Este archivo es una representación del recurso
para las pruebas del prototipo.
    `;

    const archivo = new Blob(
        [texto],
        { type: "text/plain;charset=utf-8" }
    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(archivo);
    enlace.download = contenido.titulo.replace(/ /g, "_") + ".txt";

    enlace.click();

    URL.revokeObjectURL(enlace.href);
}


/* =====================================
   W5 - PANEL DEL DOCENTE
===================================== */


/* =====================================
   W5 - PANEL DEL DOCENTE
===================================== */

function mostrarPanelDocente() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    document.querySelector("main").innerHTML = `
        <section class="panel-docente">

            <aside class="menu-docente">
                <h2>Aula Digital</h2>
                <p>Panel del docente</p>

                <nav>
                    <button onclick="mostrarPanelDocente()">Mis contenidos</button>
                    <button onclick="mostrarFormularioContenido()">Subir contenido</button>
                    <button onclick="cerrarSesion()">Cerrar sesión</button>
                </nav>
            </aside>

            <div class="contenido-docente">
                <header class="encabezado-docente">
                    <div>
                        <h1>Mis contenidos educativos</h1>
                        <p>Bienvenido, ${usuarioActivo.nombre}</p>
                    </div>
                    <span class="etiqueta-local">● Modo local activo</span>
                </header>

                <section class="resumen-docente">
                    <h3>Gestión de recursos educativos</h3>
                    <p>Administra los materiales disponibles para los estudiantes de la institución.</p>
                </section>

                <div id="zona-contenidos-docente"></div>
            </div>

        </section>
    `;

    mostrarListaContenidosDocente();
}


/* =====================================
   DATOS DE CONTENIDOS DEL DOCENTE
===================================== */

const contenidosDocente = [
    {
        titulo: "Introducción a las fracciones",
        asignatura: "Matemáticas",
        grado: "Séptimo",
        imprimible: true,
        archivo: "fracciones.pdf",
        descripcion: "Material introductorio sobre fracciones."
    },
    {
        titulo: "Comprensión de textos narrativos",
        asignatura: "Lenguaje",
        grado: "Séptimo",
        imprimible: true,
        archivo: "textos_narrativos.pdf",
        descripcion: "Guía de lectura y comprensión."
    },
    {
        titulo: "Regiones naturales de Colombia",
        asignatura: "Ciencias Sociales",
        grado: "Séptimo",
        imprimible: false,
        archivo: "regiones_colombia.mp4",
        descripcion: "Recurso audiovisual sobre las regiones."
    },
    {
        titulo: "Los seres vivos y sus características",
        asignatura: "Ciencias Naturales",
        grado: "Séptimo",
        imprimible: true,
        archivo: "seres_vivos.pdf",
        descripcion: "Material de estudio sobre los seres vivos."
    }
];


/* =====================================
   LISTA DE CONTENIDOS DEL DOCENTE
===================================== */

function mostrarListaContenidosDocente() {
    const zona = document.getElementById("zona-contenidos-docente");

    zona.innerHTML = `
        <div class="tabla-contenidos-docente">
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Asignatura</th>
                        <th>Grado</th>
                        <th>Imprimible</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    ${contenidosDocente.map((contenido, indice) => `
                        <tr>
                            <td>${contenido.titulo}</td>
                            <td>${contenido.asignatura}</td>
                            <td>${contenido.grado}</td>
                            <td>${contenido.imprimible ? "Sí" : "No"}</td>
                            <td>
                                <button onclick="editarContenidoDocente(${indice})">
                                    Editar
                                </button>

                                <button onclick="eliminarContenidoDocente(${indice})">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}



/* =====================================
   FORMULARIO PARA SUBIR CONTENIDOS
===================================== */

function mostrarFormularioContenido() {
    const zona = document.getElementById("zona-contenidos-docente");

    zona.innerHTML = `
        <section class="formulario-docente">

            <h2>Registrar nuevo contenido</h2>
            <p>Completa la información del recurso educativo.</p>

            <form id="formularioContenido">

                <label for="tituloContenido">Título del contenido *</label>
                <input
                    type="text"
                    id="tituloContenido"
                    placeholder="Ej. Introducción a las fracciones"
                    required
                >

                <label for="asignaturaContenido">Asignatura *</label>
                <select id="asignaturaContenido" required>
                    <option value="">Selecciona una asignatura</option>
                    <option>Matemáticas</option>
                    <option>Lenguaje</option>
                    <option>Ciencias Sociales</option>
                    <option>Ciencias Naturales</option>
                </select>

                <label for="gradoContenido">Grado *</label>
                <select id="gradoContenido" required>
                    <option value="">Selecciona un grado</option>
                    <option>Sexto</option>
                    <option>Séptimo</option>
                    <option>Octavo</option>
                    <option>Noveno</option>
                    <option>Décimo</option>
                    <option>Undécimo</option>
                </select>

                <label for="archivoContenido">Seleccionar archivo</label>
                <input
                    type="file"
                    id="archivoContenido"
                    accept=".pdf,.mp4"
                >

                <label for="descripcionContenido">Descripción</label>
                <textarea
                    id="descripcionContenido"
                    rows="4"
                    placeholder="Describe brevemente el recurso educativo"
                ></textarea>

                <label class="opcion-imprimible">
                    <input type="checkbox" id="imprimibleContenido">
                    Material disponible para impresión
                </label>

                <div class="acciones-formulario-docente">
                    <button type="submit">Guardar contenido</button>
                    <button type="button" onclick="mostrarListaContenidosDocente()">
                        Cancelar
                    </button>
                </div>

            </form>
        </section>
    `;

    document.getElementById("formularioContenido").addEventListener("submit", guardarContenidoDocente);
}


/* =====================================
   GUARDAR NUEVO CONTENIDO
===================================== */

function guardarContenidoDocente(evento) {
    evento.preventDefault();

    const titulo = document.getElementById("tituloContenido").value.trim();
    const asignatura = document.getElementById("asignaturaContenido").value;
    const grado = document.getElementById("gradoContenido").value;
    const archivo = document.getElementById("archivoContenido").files[0];
    const descripcion = document.getElementById("descripcionContenido").value.trim();
    const imprimible = document.getElementById("imprimibleContenido").checked;

    if (!titulo || !asignatura || !grado) {
        alert("Completa los campos obligatorios.");
        return;
    }

    contenidosDocente.push({
        titulo: titulo,
        asignatura: asignatura,
        grado: grado,
        imprimible: imprimible,
        archivo: archivo ? archivo.name : "Sin archivo seleccionado",
        descripcion: descripcion
    });

    alert("El contenido se registró correctamente.");

    mostrarListaContenidosDocente();
}



/* =====================================
   EDITAR CONTENIDO DEL DOCENTE
===================================== */

function editarContenidoDocente(indice) {
    const contenido = contenidosDocente[indice];

    const zona = document.getElementById("zona-contenidos-docente");

    zona.innerHTML = `
        <section class="formulario-docente">

            <h2>Editar contenido educativo</h2>
            <p>Modifica la información del recurso seleccionado.</p>

            <form id="formularioEditarContenido">

                <label for="editarTitulo">Título del contenido *</label>
                <input
                    type="text"
                    id="editarTitulo"
                    value="${contenido.titulo}"
                    required
                >

                <label for="editarAsignatura">Asignatura *</label>
                <select id="editarAsignatura" required>
                    <option value="Matemáticas" ${contenido.asignatura === "Matemáticas" ? "selected" : ""}>Matemáticas</option>
                    <option value="Lenguaje" ${contenido.asignatura === "Lenguaje" ? "selected" : ""}>Lenguaje</option>
                    <option value="Ciencias Sociales" ${contenido.asignatura === "Ciencias Sociales" ? "selected" : ""}>Ciencias Sociales</option>
                    <option value="Ciencias Naturales" ${contenido.asignatura === "Ciencias Naturales" ? "selected" : ""}>Ciencias Naturales</option>
                </select>

                <label for="editarGrado">Grado *</label>
                <select id="editarGrado" required>
                    <option value="Sexto" ${contenido.grado === "Sexto" ? "selected" : ""}>Sexto</option>
                    <option value="Séptimo" ${contenido.grado === "Séptimo" ? "selected" : ""}>Séptimo</option>
                    <option value="Octavo" ${contenido.grado === "Octavo" ? "selected" : ""}>Octavo</option>
                    <option value="Noveno" ${contenido.grado === "Noveno" ? "selected" : ""}>Noveno</option>
                    <option value="Décimo" ${contenido.grado === "Décimo" ? "selected" : ""}>Décimo</option>
                    <option value="Undécimo" ${contenido.grado === "Undécimo" ? "selected" : ""}>Undécimo</option>
                </select>

                <label for="editarDescripcion">Descripción</label>
                <textarea id="editarDescripcion" rows="4">${contenido.descripcion}</textarea>

                <label class="opcion-imprimible">
                    <input type="checkbox" id="editarImprimible" ${contenido.imprimible ? "checked" : ""}>
                    Material disponible para impresión
                </label>

                <div class="acciones-formulario-docente">
                    <button type="submit">Guardar cambios</button>
                    <button type="button" onclick="mostrarListaContenidosDocente()">
                        Cancelar
                    </button>
                </div>

            </form>
        </section>
    `;

    document.getElementById("formularioEditarContenido").addEventListener("submit", function(evento) {
        evento.preventDefault();

        contenido.titulo = document.getElementById("editarTitulo").value.trim();
        contenido.asignatura = document.getElementById("editarAsignatura").value;
        contenido.grado = document.getElementById("editarGrado").value;
        contenido.descripcion = document.getElementById("editarDescripcion").value.trim();
        contenido.imprimible = document.getElementById("editarImprimible").checked;

        alert("El contenido se actualizó correctamente.");

        mostrarListaContenidosDocente();
    });
}



/* =====================================
   ELIMINAR CONTENIDO DEL DOCENTE
===================================== */

function eliminarContenidoDocente(indice) {
    const contenido = contenidosDocente[indice];

    const confirmar = confirm(
        `¿Estás seguro de eliminar el contenido "${contenido.titulo}"?`
    );

    if (confirmar) {
        contenidosDocente.splice(indice, 1);

        alert("El contenido se eliminó correctamente.");

        mostrarListaContenidosDocente();
    }
}



/* =====================================
   CERRAR SESIÓN
===================================== */

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");

    location.reload();
}



/* =====================================
   W6 - PANEL DEL ADMINISTRADOR
===================================== */

function mostrarPanelAdministrador() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    document.querySelector("main").innerHTML = `
        <section class="panel-administrador">

            <aside class="menu-administrador">
                <h2>Aula Digital</h2>
                <p>Panel administrativo</p>

                <nav>
                    <button onclick="mostrarEstadoSistema()">Estado del sistema</button>
                    <button onclick="mostrarUsuarios()">Usuarios</button>
                    <button onclick="mostrarSincronizacion()">Sincronización</button>
                    <button onclick="cerrarSesion()">Cerrar sesión</button>
                </nav>
            </aside>

            <div class="contenido-administrador">
                <header class="encabezado-administrador">
                    <div>
                        <h1>Administración del sistema</h1>
                        <p>Bienvenido, ${usuarioActivo.nombre}</p>
                    </div>

                    <span class="etiqueta-local">● Modo local activo</span>
                </header>

                <div id="zona-administrador"></div>
            </div>

        </section>
    `;

    mostrarEstadoSistema();
}


/* =====================================
   W6 - ESTADO DEL SISTEMA
===================================== */

function mostrarEstadoSistema() {
    const zona = document.getElementById("zona-administrador");

    zona.innerHTML = `
        <section class="estado-sistema">

            <div class="titulo-seccion-admin">
                <h2>Estado del sistema</h2>
                <button onclick="mostrarEstadoSistema()">
                    Actualizar información
                </button>
            </div>

            <p class="descripcion-admin">
                Consulta el estado general de la infraestructura local
                del Aula Digital Solar Offline.
            </p>

            <div class="tarjetas-estado">

                <article class="tarjeta-estado">
                    <h3>Servidor local</h3>
                    <p class="estado-operativo">● Operativo</p>
                    <span>Servicio disponible en la red local</span>
                </article>

                <article class="tarjeta-estado">
                    <h3>Almacenamiento</h3>
                    <p class="valor-estado">64 %</p>
                    <span>Capacidad utilizada (dato simulado)</span>
                </article>

                <article class="tarjeta-estado">
                    <h3>Usuarios registrados</h3>
                    <p class="valor-estado">${usuariosDemo.length}</p>
                    <span>Cuentas de demostración</span>
                </article>

                <article class="tarjeta-estado">
                    <h3>Última sincronización</h3>
                    <p class="valor-estado">10/11/2026</p>
                    <span>Fecha de referencia simulada</span>
                </article>

            </div>

            <div class="nota-sistema">
                <strong>Información de demostración:</strong>
                Los indicadores representan valores simulados para
                las pruebas del prototipo. No corresponden a mediciones
                de un servidor físico.
            </div>

        </section>
    `;
}


/* =====================================
   W6 - GESTIÓN DE USUARIOS
===================================== */

function mostrarUsuarios() {
    const zona = document.getElementById("zona-administrador");

    zona.innerHTML = `
        <section class="gestion-usuarios">

            <h2>Usuarios del sistema</h2>

            <p class="descripcion-admin">
                Consulta las cuentas registradas y su estado de acceso.
            </p>

            <div class="tabla-usuarios-admin">
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${usuariosDemo.map((usuario, indice) => `
                            <tr>
                                <td>${usuario.usuario}</td>
                                <td>${usuario.nombre}</td>
                                <td>${usuario.rol}</td>
                                <td>
                                    ${usuario.activo ? "Activo" : "Inactivo"}
                                </td>
                                <td>
                                    <button
                                        onclick="cambiarEstadoUsuario(${indice})">
                                        ${usuario.activo ? "Desactivar" : "Activar"}
                                    </button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>

            <div class="nota-sistema">
                Los cambios de estado son simulados y se conservan
                únicamente durante la sesión actual del navegador.
            </div>

        </section>
    `;
}


/* =====================================
   ACTIVAR O DESACTIVAR USUARIOS
===================================== */

function cambiarEstadoUsuario(indice) {
    const usuario = usuariosDemo[indice];

    const accion = usuario.activo ? "desactivar" : "activar";

    const confirmar = confirm(
        `¿Deseas ${accion} la cuenta de ${usuario.nombre}?`
    );

    if (confirmar) {
        usuario.activo = !usuario.activo;

        alert(
            `La cuenta de ${usuario.nombre} ahora está ${
                usuario.activo ? "activa" : "inactiva"
            }.`
        );

        mostrarUsuarios();
    }
}


/* =====================================
   W6 - SINCRONIZACIÓN
===================================== */

let conexionInternetDisponible = false;

function mostrarSincronizacion() {
    const zona = document.getElementById("zona-administrador");

    zona.innerHTML = `
        <section class="panel-sincronizacion">

            <h2>Sincronización de contenidos</h2>

            <p class="descripcion-admin">
                Administra la sincronización de recursos educativos
                entre el servidor local y una conexión externa.
            </p>

            <div class="tarjeta-sincronizacion">

                <h3>Estado de conexión</h3>

                <p class="${conexionInternetDisponible ? "estado-operativo" : "estado-desconectado"}">
                    ${conexionInternetDisponible
                        ? "● Conexión a internet disponible"
                        : "● Sin conexión a internet"}
                </p>

                <button onclick="simularConexionInternet()">
                    ${conexionInternetDisponible
                        ? "Simular pérdida de conexión"
                        : "Simular conexión a internet"}
                </button>

            </div>

            <div class="tarjeta-sincronizacion">

                <h3>Proceso de sincronización</h3>

                <p>
                    ${conexionInternetDisponible
                        ? "La conexión está disponible. Puedes iniciar una sincronización de demostración."
                        : "La sincronización está deshabilitada porque no hay conexión a internet."}
                </p>

                <button
                    onclick="ejecutarSincronizacion()"
                    ${conexionInternetDisponible ? "" : "disabled"}>
                    Iniciar sincronización
                </button>

                <div id="resultado-sincronizacion"></div>

            </div>

            <div class="nota-sistema">
                El modo sin conexión permite consultar los recursos
                almacenados localmente. Esta prueba representa el
                comportamiento esperado de la sincronización.
            </div>

        </section>
    `;
}


/* =====================================
   SIMULAR CONEXIÓN A INTERNET
===================================== */

function simularConexionInternet() {
    conexionInternetDisponible = !conexionInternetDisponible;

    mostrarSincronizacion();
}


/* =====================================
   EJECUTAR SINCRONIZACIÓN DE DEMOSTRACIÓN
===================================== */

function ejecutarSincronizacion() {
    if (!conexionInternetDisponible) {
        alert("No es posible sincronizar sin conexión a internet.");
        return;
    }

    const resultado = document.getElementById("resultado-sincronizacion");

    resultado.innerHTML = `
        <div class="resultado-sincronizacion">
            <h3>Sincronización completada</h3>
            <p>Recursos educativos revisados: 5</p>
            <p>Recursos actualizados: 2</p>
            <p>Recursos sin cambios: 3</p>
            <p>Estado: Proceso de demostración exitoso.</p>
        </div>
    `;
}
