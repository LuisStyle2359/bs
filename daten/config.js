// Allgemeine Angaben zur Seite. Leere Felder werden einfach nicht angezeigt.
window.LERNPORTAL = {
  name: "Lernportal Berufsschule",
  beruf: "", // z. B. "Industriemechaniker/-in"
  klasse: "", // z. B. "IM 24b"
  lernfelder: {},
};

// Wird in daten/lf01.js … daten/lf15.js aufgerufen.
function lernfeld(nr, daten) {
  window.LERNPORTAL.lernfelder[nr] = daten;
}
