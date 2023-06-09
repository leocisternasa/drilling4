async function* getPersonajes(desde, hasta) {
  let contador = desde;
  while (contador <= hasta) {
    const result = await fetch(`https://swapi.dev/api/people/${contador}/`);
    const data = await result.json();
    yield data;
    contador++;
  }
}
const personajesImportantes = getPersonajes(1, 5);
const personajesSecundarios = getPersonajes(6, 11);
const personajesTerciarios = getPersonajes(12, 17);

const mostrarResultado = document.getElementById("mostrarResultado");
mostrarResultado.addEventListener("mouseover", () => {
  showPersonajes(personajesImportantes, "principales");
});

const mostrarSecundarios = document.getElementById("mostrarSecundarios");
mostrarSecundarios.addEventListener("mouseover", () => {
  showPersonajes(personajesSecundarios, "secundarios");
});

const mostrarTerciarios = document.getElementById("mostrarTerciarios");

mostrarTerciarios.addEventListener("mouseover", () => {
  showPersonajes(personajesTerciarios, "terciarios");
});

async function showPersonajes(generarPersonajes, identificador) {
  const data = await generarPersonajes.next();

  let divResultado = "";
  switch (identificador) {
    case "principales":
      divResultado = document.getElementById("resultado");

      break;
    case "secundarios":
      divResultado = document.getElementById("resultadoSecundarios");
      break;

    case "terciarios":
      divResultado = document.getElementById("resultadoTerciarios");
      break;
  }

  var cardDiv = document.createElement("div");
  cardDiv.className = "card shadow-lg p-3 mb-5 bg-body rounded me-4";

  var dFlexDiv = document.createElement("div");
  dFlexDiv.className = "d-flex";

  var mtDiv = document.createElement("div");
  mtDiv.className = "mt-1";

  var msDiv = document.createElement("div");
  msDiv.className = "ms-3";

  var heading = document.createElement("h4");
  heading.textContent = data.value.name;

  var paragraph = document.createElement("p");
  paragraph.textContent = `Estatura: ${data.value.height} cms. Peso: ${data.value.mass} Kg`;

  msDiv.appendChild(heading);
  msDiv.appendChild(paragraph);

  dFlexDiv.appendChild(mtDiv);
  dFlexDiv.appendChild(msDiv);

  cardDiv.appendChild(dFlexDiv);

  divResultado.appendChild(cardDiv);
}
