const level = localStorage.getItem("currentLevel");
const lesson = lessons[level];

document.getElementById("title").innerText = lesson.title;
document.getElementById("content").innerHTML = lesson.content;

function startExercise() {
  const answer = prompt("¿Cómo se dice 'Hola' en inglés?");
  if (answer.toLowerCase() === "hello") {
    alert("✅ Correcto");
  } else {
    alert("❌ Incorrecto, era HELLO");
  }
}
