import { Item } from './item';
import { itemExample } from './itemExample';

function createCards(items: Item[]): void {
  const container = document.querySelector('#cards-container');
  
  if (!container) {
    console.error('Container nicht gefunden!');
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card', 'rounded-md', 'p-4' , 'mb-4' , 'shadow-lg'); // Grundklassen

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

    cards.forEach(card => {
      card.classList.remove('bg-red-900', 'text-orange-200' , 'bg-white', 'text-red-950');
      
      if (darkMode) {
        card.classList.add('bg-red-900', 'text-orange-200');
      } else {
        card.classList.add('bg-white', 'text-red-950');
      }
    });
  }

  updateCardColors(mediaQuery.matches);

  mediaQuery.addEventListener('change', event => {
    updateCardColors(event.matches);
  });
}

// Nutzung der Funktion
createCards(itemExample);
createCards(itemExample);
createCards(itemExample);
createCards(itemExample);
createCards(itemExample);
