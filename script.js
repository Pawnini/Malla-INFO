fetch('./ramos.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("malla-container");

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
        col.appendChild(bubble);
      });

      container.appendChild(col);
    });
  })
  .catch(error => {
    console.error("Error cargando los datos:", error);
  });
