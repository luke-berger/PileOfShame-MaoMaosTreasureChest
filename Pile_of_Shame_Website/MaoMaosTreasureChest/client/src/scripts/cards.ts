import { Item } from './item';

// Definition des Typs für die Filter-Funktion
type filterFn = (inputArray: Item[], categoryArray: string[]) => Item[];

// Implementierung der Funktion
const filterByCategory: filterFn = (inputArray, categoryArray) => {
  // Rückgabe der Items, deren Kategorien mindestens eine Übereinstimmung haben
  if (categoryArray.length === 0) return inputArray; // Keine Filterkategorie, alle Items anzeigen

  return inputArray.filter((item) =>
    item.categories.some((category) => categoryArray.includes(category))
  );
};

// Asynchrone Funktion fetchGet
export async function fetchGet(): Promise<Item[]> {
  const url = 'https://intersys.imis.uni-luebeck.de/api/pile-of-shame';

  try {
    // Mit der Fetch-API einen GET-Request an den Server senden
    const response = await fetch(url, {
      method: 'GET', // HTTP-Methode GET
    });

    // Überprüfen, ob die Antwort erfolgreich war
    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    // Parsen der JSON-Antwort
    const data: Item[] = await response.json();

    // Rückgabe der TypeScript-Objekte
    return data;
  } catch (error) {
    // Fehler abfangen und in der Konsole ausgeben
    console.error('Fehler beim Abrufen der Daten:', error);
    throw error; // Fehler erneut werfen, um den Aufrufer zu informieren
  }
}

// Initialisierung der ausgewählten Kategorien
let selectedCategories: string[] = [];

// Funktion zum Erstellen der Karten
function createCards(items: Item[]): void {
  const container = document.querySelector('#cards-container');

  if (!container) {
    console.error('Container nicht gefunden!');
    return;
  }

  // Container leeren
  container.innerHTML = '';

  // Neue Karten erstellen
  items.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card', 'rounded-md', 'p-4', 'mb-4', 'shadow-lg'); // Grundklassen

    const title = document.createElement('h2');
    title.classList.add('text-2xl', 'font-bold', 'mb-2');
    title.textContent = item.name;
    card.appendChild(title);

    const img = document.createElement('img');
    img.src = item.image || 'https://via.placeholder.com/150';
    img.alt = `Bild von ${item.name}`;
    img.classList.add('w-full', 'h-40', 'object-cover', 'rounded', 'mb-4');
    card.appendChild(img);

    const description = document.createElement('p');
    description.classList.add('mb-2');
    description.innerHTML = `<span class="font-bold">Beschreibung:</span> ${item.description}`;
    card.appendChild(description);

    const date = document.createElement('p');
    date.classList.add('mb-2');
    date.innerHTML = `<span class="font-bold">Kaufdatum:</span> ${item.date}`;
    card.appendChild(date);

    const price = document.createElement('p');
    price.classList.add('mb-2');
    price.innerHTML = `<span class="font-bold">Preis:</span> ${item.price} €`;
    card.appendChild(price);

    const categories = document.createElement('p');
    categories.classList.add('mb-4');
    categories.innerHTML = `<span class="font-bold">Kategorien:</span> ${item.categories.join(', ')}`;
    card.appendChild(categories);

    const button = document.createElement('button');
    button.classList.add('bg-red-500', 'text-white', 'py-2', 'px-4', 'rounded', 'hover:bg-red-700');
    button.textContent = 'Mehr erfahren';
    card.appendChild(button);

    container.appendChild(card);
  });

  // Dynamische Farbanpassung
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function updateCardColors(darkMode: boolean) {
    const cards = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;

    cards.forEach((card) => {
      card.classList.remove('bg-red-900', 'text-orange-200', 'bg-white', 'text-red-950');

      if (darkMode) {
        card.classList.add('bg-red-900', 'text-orange-200');
      } else {
        card.classList.add('bg-white', 'text-red-950');
      }
    });
  }

  updateCardColors(mediaQuery.matches);

  mediaQuery.addEventListener('change', (event) => {
    updateCardColors(event.matches);
  });
}

// Event-Listener nach DOM-Laden hinzufügen
document.addEventListener('DOMContentLoaded', async () => {
  // Daten abrufen
  const items = await fetchGet();

  // Alle Checkbox-Elemente finden
  const categoryCheckboxes = document.querySelectorAll('input[name^="input"]');

  // Initial alle Karten anzeigen
  createCards(items);

  // Event-Listener für jede Checkbox hinzufügen
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;

      if (target.checked) {
        // Hinzufügen, wenn die Checkbox ausgewählt wurde
        if (!selectedCategories.includes(target.value)) {
          selectedCategories.push(target.value);
        }
      } else {
        // Entfernen, wenn die Checkbox abgewählt wurde
        selectedCategories = selectedCategories.filter((category) => category !== target.value);
      }

      // Gefilterte Karten erstellen
      console.log("Cat-Array: ", selectedCategories)
      const filteredItems = filterByCategory(items, selectedCategories);
      createCards(filteredItems); // Aktualisierung der Karten
    });
  });
});