document.addEventListener('DOMContentLoaded', () => {
    // Button und Input-Elemente finden
    const button = document.getElementById('AddButton');
    const inpElem1 = document.getElementById('input1') as HTMLInputElement;
    const inpElem2 = document.getElementById('input2') as HTMLInputElement;
    const inpElem3 = document.getElementById('input3') as HTMLInputElement;
    const inpElem4 = document.getElementById('input4') as HTMLInputElement;
    const fileInput = document.getElementById('inputImg') as HTMLInputElement;
    const success = document.getElementById('success');
    const fail = document.getElementById('fail');
  
    // Überprüfen, ob der Button existiert
    if (!button) {
      console.error('Button nicht gefunden!');
      return;
    }
  
    // Click-EventListener hinzufügen
    button.addEventListener('click', () => {
      // Werte der Eingabefelder trimmen und prüfen
      const iptValue1 = inpElem1.value.trim();
      const iptValue2 = inpElem2.value.trim();
      const iptValue3 = inpElem3.value.trim();
      const iptValue4 = inpElem4.value.trim();
      const files = fileInput.files;
  
      // Eingabeprüfungen für jedes Feld
      if (!iptValue1) {
        inpElem1.classList.add('border-4', 'border-red-600');
        fail?.classList.remove('hidden')
      } else {
        inpElem1.classList.remove('border-4', 'border-red-600');
      }
  
      if (!iptValue2) {
        inpElem2.classList.add('border-4', 'border-red-600');
        fail?.classList.remove('hidden')
      } else {
        inpElem2.classList.remove('border-4', 'border-red-600');
      }
  
      if (!iptValue3) {
        inpElem3.classList.add('border-4', 'border-red-600');
        fail?.classList.remove('hidden')
      } else {
        inpElem3.classList.remove('border-4', 'border-red-600');
      }
  
      if (!iptValue4) {
        inpElem4.classList.add('border-4', 'border-red-600');
        fail?.classList.remove('hidden')
      } else {
        inpElem4.classList.remove('border-4', 'border-red-600');
      }

      if (!files || files.length === 0) {
            // Kein Datei-Upload
            fileInput.classList.add('border-4', 'border-red-600');
            fail?.classList.remove('hidden')
      } else {
            // Datei-Upload vorhanden
            fileInput.classList.remove('border-4', 'border-red-600');
      }

      if(iptValue1 && iptValue2 && iptValue3 && iptValue4 && (!files || files.length === 1)) {
        success?.classList.remove('hidden');
        fail?.classList.add('hidden');
      } else {
        success?.classList.add('hidden');
      }

    });
  });