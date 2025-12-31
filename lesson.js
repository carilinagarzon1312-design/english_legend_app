document.addEventListener("DOMContentLoaded", function () {

  console.log("LESSON JS CARGADO");

  // Obtener número de lección guardado
  const lessonNumber = Number(localStorage.getItem("currentLesson"));

  // Validación
  if (!lessonNumber) {
    document.body.innerHTML = "<h2>No se seleccionó ninguna lección</h2>";
    return;
  }

  // Buscar la lección correcta
  const lesson = lessonsA1Minus.find(l => l.lesson === lessonNumber);

  if (!lesson) {
    document.body.innerHTML = "<h2>Lección no encontrada</h2>";
    return;
  }

  // Mostrar título
  const title = document.getElementById("lesson-title");
  title.innerText = `Lección ${lesson.lesson}: ${lesson.title}`;

  // Contenedor de palabras
  const container = document.getElementById("words");

  lesson.words.forEach(word => {
    const div = document.createElement("div");
    div.className = "word-card";

    div.innerHTML = `
      <strong>${word.en}</strong> = ${word.es}
      <br>
      <small>Nivel real: ${word.level}</small>
    `;

    container.appendChild(div);
  });

});
// Agrega esto al final de js/lessons-a1minus.js
if (lessonsA1Minus[0]) {
    lessonsA1Minus[0].examen = [
        { q: "¿Cómo se dice 'Nosotros'?", o: ["They", "We", "You"], r: "We" },
        { q: "Significado de 'They':", o: ["Ellos", "Nosotros", "Tú"], r: "Ellos" },
        { q: "¿Qué nivel es la palabra 'Identity'?", o: ["A1", "B1", "B2"], r: "B2" },
        { q: "¿Cómo se dice 'Conciencia'?", o: ["Existence", "Identity", "Consciousness"], r: "Consciousness" },
        { q: "Traducción de 'Individual':", o: ["Persona", "Individuo", "Humano"], r: "Individuo" },
        { q: "¿Cómo se dice 'Yo'?", o: ["I", "Me", "My"], r: "I" },
        { q: "Significado de 'Human':", o: ["Persona", "Humano", "Hombre"], r: "Humano" },
        { q: "¿Qué palabra es nivel C1?", o: ["Existence", "Consciousness", "Individual"], r: "Existence" },
        { q: "¿Cómo se dice 'Persona'?", o: ["Person", "People", "Human"], r: "Person" },
        { q: "Traducción de 'You':", o: ["Tú", "Él", "Nosotros"], r: "Tú" }
    ];
    lessonsA1Minus[0].tips = "Asocia palabras difíciles como 'Consciousness' con música; el ritmo ayuda a memorizar sílabas largas.";
    lessonsA1Minus[0].memoria = "Para 'We' (Nosotros), piensa en 'Nosotros somos los campeones' (WE are the champions).";
}