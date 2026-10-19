// Allgemeine Angaben zur Seite. Leere Felder werden einfach nicht angezeigt.
window.LERNPORTAL = {
  name: "Lernportal 10KU",
  beruf: "Kaufleute für Spedition und Logistikdienstleistung",
  klasse: "10KU",
  lernfelder: {},
};

// Wird in daten/lf01.js … daten/lf15.js aufgerufen.
function lernfeld(nr, daten) {
  window.LERNPORTAL.lernfelder[nr] = daten;
}
