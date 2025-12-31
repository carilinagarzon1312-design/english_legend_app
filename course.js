document.addEventListener("DOMContentLoaded", function () {
  console.log("COURSE JS CARGADO");

  const list = document.getElementById("lesson-list");

  if (!list) {
    console.error("NO SE ENCONTRÓ lesson-list");
    return;
  }

  lessonsA1Minus.forEach(lesson => {
    const div = document.createElement("div");
    div.className = "lesson-card";

    div.innerHTML = `
      <h3>Lección ${lesson.lesson}</h3>
      <p>${lesson.title}</p>
    `;

    div.onclick = () => {
      localStorage.setItem("currentLesson", lesson.lesson);
      window.location.href = "lesson.html";
    };

    list.appendChild(div);
  });
});
