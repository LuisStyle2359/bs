// Allgemeine Angaben zur Seite. Leere Felder werden einfach nicht angezeigt.
window.LERNPORTAL = {
  name: "Lernportal 10KU",
  beruf: "Kaufleute für Spedition und Logistikdienstleistung",
  klasse: "10KU",
  lernfelder: {},
  tests: {},
};

// Wird in daten/lf01.js … daten/lf15.js aufgerufen.
function lernfeld(nr, daten) {
  window.LERNPORTAL.lernfelder[nr] = daten;
}

// Für Tests, die oben auf der Startseite stehen (daten/test-*.js).
// Die id steht in der Adresse (#test-<id>) und besteht nur aus Kleinbuchstaben und Ziffern.
function test(id, daten) {
  window.LERNPORTAL.tests[id] = daten;
}
