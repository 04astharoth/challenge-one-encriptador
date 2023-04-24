const llavesDecifradas = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

const llavesCifradas = {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufat: "u",
};

function cifrarMensaje(cadena) {
  const letraEncriptada = cadena.replace(/[aeiou]/g, (letra) => {
    return llavesDecifradas[letra] || letra;
  });
  return letraEncriptada;
}

function decifrarMensaje(cadena) {
  for (let subCadena in llavesCifradas) {
    const expresionRegular = new RegExp(subCadena, "g");
    cadena = cadena.replace(expresionRegular, llavesCifradas[subCadena]);
  }
  return cadena;
}

const txt_area_field = document.querySelector("#txt__area");
const lbl_hint = document.querySelector(".lbl__hint");
const btn_cifrar = document.querySelector("#btn_cifrar");
const btn_decifrar = document.querySelector("#btn_decifrar");
const lbl_result = document.querySelector("#result");
const btn_copy = document.querySelector("#btn_copy");
const content_notfound = document.querySelector(`.content__notfound`);
const content_found = document.querySelector(`.content__found`);
let comprobacion;

function validar(cadena) {
  const contieneAcentos = cadena
    .toLowerCase()
    .normalize("NFD")
    .match(/[\u0300-\u036f]/g, "");
  const contieneSpChroMys = cadena.match(/[^a-zA-Z ]/g, "");

  if (contieneAcentos) {
    lbl_hint.innerHTML = `la cadena contiene acentos.`;
    console.log(contieneAcentos);
    return false;
  }
  if (contieneSpChroMys) {
    lbl_hint.innerHTML = `la cadena contiene caracteres especiales`;
    console.log(contieneSpChroMys);
    return false;
  }
  if (txt_area_field.value == "") {
    lbl_hint.innerHTML = `Solo letras minúsculas, sin acentos y sin caracteres especiales.`;
    return false;
  }
  lbl_hint.innerHTML = `la cadena cumple los requisitos para ser cifrable/decifrable.`;
  return true;
}

txt_area_field.addEventListener("input", function () {
  comprobacion = validar(txt_area_field.value);
});

btn_cifrar.addEventListener("click", function () {
  if (comprobacion) {
    let mensajeCifrado = cifrarMensaje(txt_area_field.value);
    txt_area_field.value = "";
    lbl_result.innerHTML = mensajeCifrado;
    content_notfound.classList.add("hidden");
    content_found.classList.remove("hidden");
  }
});

btn_decifrar.addEventListener("click", function () {
  if (comprobacion) {
    let mensajeDecifrado = decifrarMensaje(txt_area_field.value);
    txt_area_field.value = "";
    lbl_result.innerHTML = mensajeDecifrado;
    content_notfound.classList.add("hidden");
    content_found.classList.remove("hidden");
  }
});

const toast = document.getElementById("toast");
btn_copy.addEventListener("click", function (event) {
  event.preventDefault(); // previene cualquier acción del evento no deseada
  const text = lbl_result.innerText;
  lbl_result.innerText = "";
  txt_area_field.value = "";
  content_found.classList.add("hidden");
  content_notfound.classList.remove("hidden");
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // console.log('Texto copiado en el portapapeles');
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2000); // oculta el toast después de 2 segundos
    })
    .catch((error) => {
      console.error("Error al copiar el texto: ", error);
    });
});
