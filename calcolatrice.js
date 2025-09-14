// ====== Selettori base ======
const display = document.getElementById('numeri');
const buttons = document.querySelectorAll('.t');
const slider = document.getElementById('slider');
const valoreSpan = document.getElementById('valore');

// Tavola periodica
const tavMain = document.getElementById('main_tavola');
const btnTavClose = document.getElementById('tav_close');
const btnTavOpen  = document.getElementById('tav_open');
const inputNomeCompleto = document.getElementById('elemento_completo');
const inputSimbolo = document.getElementById('simbolo');
const inputNumeroAtomico = document.getElementById('numero_atomico');
const inputMassaAtomica  = document.getElementById('massa_atomica');
const msg = document.getElementById('messaggio');

// Trig “2nd”
const mainTrig = document.getElementById('main'); // contiene .nd / .ndd

// ====== Stato calcolatrice ======
let currentInput = '';   // stringa di input in digitazione
let previousInput = '';  // stringa/numero precedente
let operator = '';       // operatore corrente (+, -, *, /, **n, nrad, ecc.)

// ====== Utilità ======
const getPrecision = () => Number(slider?.value ?? 2);
const fmt = (num) => {
  if (!isFinite(num)) return 'impossibile';
  const p = getPrecision();
  // evita .00 per interi
  return Number.isInteger(num) ? String(num) : Number(num.toFixed(p)).toString();
};
const toNumber = (x) => (x === '' || x === null || x === undefined) ? NaN : Number(x);
const deg2rad = (deg) => (deg * Math.PI) / 180;
const rad2deg = (rad) => (rad * 180) / Math.PI;
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

// fattoriale solo per interi >=0 e ragionevoli
const fattoriale = (n) => {
  if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n)) return NaN;
  if (n > 170) return Infinity; // limite double
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};

// aggiorna display in sicurezza
const setDisplay = (val) => { display.value = String(val); };

// slider decimali
function aggiornaValore(v) {
  valoreSpan.textContent = v;
  // se c'è un numero a display, ri-formatta secondo i nuovi decimali
  const n = Number(display.value.replace(',', '.'));
  if (!isNaN(n)) setDisplay(fmt(n));
}
if (slider) {
  slider.addEventListener('input', (e) => aggiornaValore(e.target.value));
  aggiornaValore(slider.value);
}

// ====== Gestione input dai pulsanti ======
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleInput(value);
  });
});

// (opzionale) Tastiera fisica
document.addEventListener('keydown', (e) => {
  const k = e.key;
  if (/\d/.test(k)) return handleInput(k);
  if (k === '.') return handleInput('punto');
  if (k === 'Enter' || k === '=') return handleInput('=');
  if (k === 'Escape') return handleInput('C');
  if (['+', '-', '*', '/'].includes(k)) return handleInput(k);
});

// ====== Funzioni per la UI trig “2nd” ======
function cambiaClasse()  { mainTrig.className = 'ndd'; }
function cambiaClasse2() { mainTrig.className = 'nd';  }

// ====== Core della calcolatrice ======
function handleInput(value) {
  const p = getPrecision();

  // Numeri
  if (!isNaN(value)) {
    currentInput += value;
    return setDisplay(currentInput);
  }

  // Punto decimale
  if (value === 'punto') {
    if (!currentInput.includes('.')) {
      currentInput = currentInput === '' ? '0.' : currentInput + '.';
      setDisplay(currentInput);
    }
    return;
  }

  // Costanti
  if (value === 'π') {
    const v = fmt(Math.PI);
    currentInput = v;
    return setDisplay(v);
  }
  if (value === 'e') {
    const v = fmt(Math.E);
    currentInput = v;
    return setDisplay(v);
  }

  // +/- (change sign)
  if (value === 'transform') {
    const n = toNumber(currentInput);
    if (!isNaN(n)) {
      currentInput = fmt(-n);
      setDisplay(currentInput);
    }
    return;
  }

  // Clear All
  if (value === 'C') {
    currentInput = '';
    previousInput = '';
    operator = '';
    return setDisplay('');
  }

  // Unarie “istantanee”
  if (value === '**2' || value === '**3' || value === '/100' || value === 'rad' || value === 'x') {
    const n = toNumber(currentInput);
    if (isNaN(n)) return;
    let res;
    if (value === '**2') res = n ** 2;
    else if (value === '**3') res = n ** 3;
    else if (value === '/100') res = n / 100;
    else if (value === 'rad') res = Math.sqrt(n);
    else if (value === 'x') res = fattoriale(n); // fattoriale
    currentInput = fmt(res);
    previousInput = '';
    operator = '';
    return setDisplay(currentInput);
  }

  // Trig “pagine”
  if (value === 'tastonf')  return cambiaClasse();
  if (value === 'tastonf2') return cambiaClasse2();

  // Trig sin/cos/tan (input in gradi)
  if (value === 'sin' || value === 'cos' || value === 'tan') {
    const n = toNumber(currentInput);
    if (isNaN(n)) return;
    let res;
    if (value === 'sin') res = Math.sin(deg2rad(n));
    else if (value === 'cos') res = Math.cos(deg2rad(n));
    else {
      // tan: gestisci 90 + k*180 → infinito
      const mod = ((n % 180) + 180) % 180; // in [0,180)
      if (Math.abs(mod - 90) < 1e-9) res = Infinity;
      else res = Math.tan(deg2rad(n));
    }
    currentInput = fmt(res);
    previousInput = '';
    operator = '';
    return setDisplay(currentInput);
  }

  // Trig inverse (output in gradi)
  if (value === 'asin' || value === 'acos' || value === 'atan') {
    const n = toNumber(currentInput);
    if (isNaN(n)) return;
    let res;
    if (value === 'asin')   res = rad2deg(Math.asin(clamp(n, -1, 1)));
    else if (value === 'acos') res = rad2deg(Math.acos(clamp(n, -1, 1)));
    else /* atan */         res = rad2deg(Math.atan(n));
    currentInput = fmt(res);
    previousInput = '';
    operator = '';
    return setDisplay(currentInput);
  }

  // Potenza n-esima e radice n-esima (binari: richiedono previousInput)
  if (value === '**n' || value === 'nrad') {
    if (currentInput !== '') {
      previousInput = currentInput;
      currentInput = '';
      operator = value;
      return;
    }
  }

  // Uguaglianza: esegui l’operazione binaria se presente
  if (value === '=') {
    const a = toNumber(previousInput);
    const b = toNumber(currentInput);
    if (isNaN(a) || isNaN(b)) return;

    let res;
    if (operator === '**n') {
      res = a ** b;
    } else if (operator === 'nrad') {
      // radice b-esima di a
      if (b === 0) res = NaN;
      else res = a ** (1 / b);
    } else {
      // Operazioni standard senza eval
      switch (operator) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '*': res = a * b; break;
        case '/': res = (b === 0) ? Infinity : a / b; break;
        default:  res = b; // nessun operatore: mostra b
      }
    }

    currentInput = fmt(res);
    previousInput = '';
    operator = '';
    return setDisplay(currentInput);
  }

  // Operatori binari standard: + - * /
  if (['+', '-', '*', '/'].includes(value)) {
    // se c'è già un’operazione pronta (a op b) e l’utente mette un altro operatore,
    // esegui prima quella (chain calculation)
    if (previousInput !== '' && operator && currentInput !== '') {
      handleInput('=');
      previousInput = currentInput;
      currentInput = '';
      operator = value;
      return;
    }
    if (currentInput !== '') {
      previousInput = currentInput;
      currentInput = '';
      operator = value;
    } else {
      // permette di cambiare operatore se l’utente ne preme un altro
      operator = value;
    }
    return;
  }

  // Non riconosciuto: ignora
}

// ====== Tavola periodica ======
document.getElementById('serch_button').addEventListener('click', function () {
  const nome = (inputNomeCompleto.value || '').toLowerCase().trim();
  const simboloElemento = mappaNomiCompleti[nome];
  if (!simboloElemento) {
    msg.textContent = 'Elemento non trovato';
    inputSimbolo.value = '';
    inputNumeroAtomico.value = '';
    inputMassaAtomica.value = '';
    return;
  }
  const el = trovaElementoPerSimbolo(simboloElemento);
  if (!el) {
    msg.textContent = 'Elemento non trovato';
    inputSimbolo.value = '';
    inputNumeroAtomico.value = '';
    inputMassaAtomica.value = '';
    return;
  }
  inputSimbolo.value = el.nome;
  inputNumeroAtomico.value = el.numeroAtomico;
  inputMassaAtomica.value = el.massaAtomica;
  msg.textContent = `Elemento trovato: ${nome.charAt(0).toUpperCase() + nome.slice(1)}`;
});

function trovaElementoPerSimbolo(simbolo) {
  for (const periodo of tavolaPeriodica) {
    for (const elemento of periodo) {
      if (elemento && elemento.nome === simbolo) return elemento;
    }
  }
  return null;
}

// Apri/chiudi pannello tavola
btnTavClose.addEventListener('click', () => {
  tavMain.className = 'main_info_contenitore_close';
  inputNomeCompleto.value = '';
  inputSimbolo.value = '';
  inputNumeroAtomico.value = '';
  inputMassaAtomica.value = '';
  msg.textContent = '_____________';
});
btnTavOpen.addEventListener('click', () => {
  tavMain.className = 'main_info_contenitore_open';
});
