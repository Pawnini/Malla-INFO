fetch('./ramos.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("malla-container");

    // Leer ramos aprobados guardados
    const aprobados = JSON.parse(localStorage.getItem("ramosAprobados") || "[]");

    // Agrupar ramos por semestre
    const semestres = {};
    data.forEach(ramo => {
      const sem = ramo.semestre;
      if (!semestres[sem]) {
        semestres[sem] = [];
      }
      semestres[sem].push(ramo.nombre);
    });

    // Crear columnas de semestres
    Object.keys(semestres).sort((a, b) => a - b).forEach(semestre => {
      const col = document.createElement("div");
      col.className = "semestre";

      const title = document.createElement("h2");
      title.textContent = `Semestre ${semestre}`;
      col.appendChild(title);

      semestres[semestre].forEach(ramo => {
        const bubble = document.createElement("div");
        bubble.className = "ramo";
        bubble.textContent = ramo;

        // Restaurar si estaba aprobado
        if (aprobados.includes(ramo)) {
          bubble.classList.add("aprobado");
        }

        // Click para aprobar o desaprobar
        bubble.addEventListener("click", () => {
          bubble.classList.toggle("aprobado");

          let actuales = JSON.parse(localStorage.getItem("ramosAprobados") || "[]");

          if (bubble.classList.contains("aprobado")) {
            if (!actuales.includes(ramo)) actuales.push(ramo);
          } else {
            actuales = actuales.filter(r => r !== ramo);
          }

          localStorage.setItem("ramosAprobados", JSON.stringify(actuales));
        });

        col.appendChild(bubble);
      });

      container.appendChild(col);
    });
  })
  .catch(error => {
    console.error("Error cargando los datos:", error);
  });
