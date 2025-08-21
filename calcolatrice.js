let display = document.getElementById('numeri');
let buttons = document.querySelectorAll('.t');
let simbolo = document.getElementById('simbolo');
let numero_atomico = document.getElementById('numero_atomico');
let massa_atomica = document.getElementById('massa_atomica');


buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-value');
      handleInput(value);
    });
});


let currentInput = '';
let operator = '';
let previousInput = '';





function aggiornaValore(val) {
    document.getElementById("valore").textContent = val;
    
}




function handleInput(value) {
    //funzioni per asin, acos, atan
    async function cambiaClasse(value) {
        let main = document.getElementById("main");
        main.className = "ndd";
    }

    async function cambiaClasse2(){
        let main = document.getElementById("main");
        main.className = "nd";
    }
    let slider = document.getElementById("slider");
    let valore_slider = slider.value;

    if (!isNaN(value)) { // Se è un numero
      currentInput += value;
      display.value = currentInput;
      
    } else if (value === 'punto'){
        currentInput = currentInput + '.';
        display.value = currentInput;
    } else if (value === 'π'){
        currentInput = Math.PI
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
    } else if(value === 'e'){
        currentInput = Math.E;
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
    } else if (value == 'x'){
        function fattoriale(currentInput) {
            if (currentInput < 0) return "Il fattoriale non è definito per numeri negativi.";
            let risultato = 1;
            for (let i = 1; i <= currentInput; i++) {
                risultato *= i;
            }
            display.value = risultato;
        }
        fattoriale(currentInput)
    } else if (value == 'transform'){
        currentInput = currentInput * -1;
        display.value  = currentInput;
    }
    else if (value === 'C') { // Cancella tutto
      currentInput = '';
      operator = '';
      previousInput = '';
      display.value = '';

    } else if (value === '**2'){
        currentInput = currentInput ** 2
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
        previousInput = '';
        operator = '';
        

    } else if (value === '**3'){
        currentInput = currentInput ** 3
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
        previousInput = '';
        operator = '';
    
    } else if (value === '/100'){
        currentInput = currentInput /100
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
        previousInput = '';
        operator = '';
        

    } else if (value === 'tastonf'){
        cambiaClasse();

    } else if (value === 'tastonf2'){
       cambiaClasse2();
           
    } else if (value === 'cos'){
        let angoloRadianti = currentInput * (Math.PI / 180);
        let seno = Math.sin(angoloRadianti);
        currentInput = Math.sqrt(1 - seno ** 2);
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
        previousInput = '';
        operator = '';

    }else if (value === 'sin'){
        currentInput = currentInput * (Math.PI / 180);
        currentInput = Math.sin(currentInput);
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
        previousInput = '';
        operator = '';
    } else if (value === 'tan'){
        if (currentInput === '90'){
            currentInput = 'non è un numero';
            if(currentInput%1 !== 0){
                currentInput = currentInput.toFixed(valore_slider)
            }
            display.value = currentInput;
        }else{
            currentInput = currentInput * (Math.PI / 180);
            currentInput = Math.tan(currentInput);
            if(currentInput%1 !== 0){
                currentInput = currentInput.toFixed(valore_slider)
            }
            display.value = currentInput;
            previousInput = '';
            operator = '';
        }

    }else if (value === 'asin'){ 
        currentInput = Math.asin(currentInput);
        currentInput = currentInput * (180 / Math.PI);
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
        previousInput = '';
        operator = '';
    } else if (value === 'acos'){
        currentInput = Math.acos(currentInput);
        currentInput = currentInput * (180 / Math.PI);
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
    } else if (value === 'atan'){
        currentInput = currentInput * (18 / Math.PI);
        currentInput === Math.atan(currentInput);
        
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
    }
    else if(value === 'rad'){
        currentInput = Math.sqrt(currentInput);
        if(currentInput%1 !== 0){
            currentInput = currentInput.toFixed(valore_slider)
        }
        display.value = currentInput;
        previousInput = '';
        operator = '';


    }
    else if (value === '=') { // Calcola il risultato
        
        if (previousInput && operator && currentInput) {
            if(operator === '**n'){
                currentInput = previousInput**currentInput;
                display.value = currentInput;
                previousInput = '';
                operator = '';
            }
            if(operator === 'nrad'){
                currentInput = previousInput** (1/currentInput);
                display.value = currentInput;
                previousInput = '';
                operator = '';
            
            }
            currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
            if (currentInput == 'Infinity'){
                currentInput = 'impossibile';
            }
            if(currentInput%1 !== 0){
                currentInput = currentInput.toFixed(valore_slider)
            }
            display.value = currentInput;
            previousInput = '';
            operator = '';
        }    
    } else { // Gestisci gli operatori

        if (currentInput) {
            previousInput = currentInput;
            currentInput = '';
            operator = value;
        }
    
    }

}


//tavola periodica
let tav_main = document.getElementById("main_tavola");
const button_tav_close = document.getElementById("tav_close");
const button_tav_open = document.getElementById("tav_open");
let nomeCompleto = document.getElementById('elemento_completo');




let tavolaPeriodica = [
    // Periodo 1
    [{nome: "H", numeroAtomico: 1, massaAtomica: 1.008}, null, null, null, null, null, null, null, null, null, null, {nome: "He", numeroAtomico: 2, massaAtomica: 4.0026}],
    // Periodo 2
    [{nome: "Li", numeroAtomico: 3, massaAtomica: 6.94}, {nome: "Be", numeroAtomico: 4, massaAtomica: 9.0122}, null, null, null, null, null, {nome: "B", numeroAtomico: 5, massaAtomica: 10.81}, {nome: "C", numeroAtomico: 6, massaAtomica: 12.011}, {nome: "N", numeroAtomico: 7, massaAtomica: 14.007}, {nome: "O", numeroAtomico: 8, massaAtomica: 15.999}, {nome: "F", numeroAtomico: 9, massaAtomica: 18.998}, {nome: "Ne", numeroAtomico: 10, massaAtomica: 20.180}],
    // Periodo 3
    [{nome: "Na", numeroAtomico: 11, massaAtomica: 22.990}, {nome: "Mg", numeroAtomico: 12, massaAtomica: 24.305}, null, null, null, null, null, {nome: "Al", numeroAtomico: 13, massaAtomica: 26.982}, {nome: "Si", numeroAtomico: 14, massaAtomica: 28.085}, {nome: "P", numeroAtomico: 15, massaAtomica: 30.974}, {nome: "S", numeroAtomico: 16, massaAtomica: 32.06}, {nome: "Cl", numeroAtomico: 17, massaAtomica: 35.45}, {nome: "Ar", numeroAtomico: 18, massaAtomica: 39.948}],
    // Periodo 4
    [{nome: "K", numeroAtomico: 19, massaAtomica: 39.098}, {nome: "Ca", numeroAtomico: 20, massaAtomica: 40.078}, {nome: "Sc", numeroAtomico: 21, massaAtomica: 44.956}, {nome: "Ti", numeroAtomico: 22, massaAtomica: 47.867}, {nome: "V", numeroAtomico: 23, massaAtomica: 50.942}, {nome: "Cr", numeroAtomico: 24, massaAtomica: 52.037}, {nome: "Mn", numeroAtomico: 25, massaAtomica: 54.938}, {nome: "Fe", numeroAtomico: 26, massaAtomica: 55.845}, {nome: "Co", numeroAtomico: 27, massaAtomica: 58.933}, {nome: "Ni", numeroAtomico: 28, massaAtomica: 58.693}, {nome: "Cu", numeroAtomico: 29, massaAtomica: 63.546}, {nome: "Zn", numeroAtomico: 30, massaAtomica: 65.38}, {nome: "Ga", numeroAtomico: 31, massaAtomica: 69.723}, {nome: "Ge", numeroAtomico: 32, massaAtomica: 72.63}, {nome: "As", numeroAtomico: 33, massaAtomica: 74.922}, {nome: "Se", numeroAtomico: 34, massaAtomica: 78.971}, {nome: "Br", numeroAtomico: 35, massaAtomica: 79.904}, {nome: "Kr", numeroAtomico: 36, massaAtomica: 83.798}],
    // Periodo 5
    [{nome: "Rb", numeroAtomico: 37, massaAtomica: 85.468}, {nome: "Sr", numeroAtomico: 38, massaAtomica: 87.62}, {nome: "Y", numeroAtomico: 39, massaAtomica: 88.906}, {nome: "Zr", numeroAtomico: 40, massaAtomica: 91.224}, {nome: "Nb", numeroAtomico: 41, massaAtomica: 92.906}, {nome: "Mo", numeroAtomico: 42, massaAtomica: 95.95}, {nome: "Tc", numeroAtomico: 43, massaAtomica: 98}, {nome: "Ru", numeroAtomico: 44, massaAtomica: 101.07}, {nome: "Rh", numeroAtomico: 45, massaAtomica: 102.91}, {nome: "Pd", numeroAtomico: 46, massaAtomica: 106.42}, {nome: "Ag", numeroAtomico: 47, massaAtomica: 107.87}, {nome: "Cd", numeroAtomico: 48, massaAtomica: 112.41}, {nome: "In", numeroAtomico: 49, massaAtomica: 114.82}, {nome: "Sn", numeroAtomico: 50, massaAtomica: 118.71}, {nome: "Sb", numeroAtomico: 51, massaAtomica: 121.76}, {nome: "Te", numeroAtomico: 52, massaAtomica: 127.60}, {nome: "I", numeroAtomico: 53, massaAtomica: 126.90}, {nome: "Xe", numeroAtomico: 54, massaAtomica: 131.29}],
    // Periodo 6
    [{nome: "Cs", numeroAtomico: 55, massaAtomica: 132.91}, {nome: "Ba", numeroAtomico: 56, massaAtomica: 137.33}, {nome: "La", numeroAtomico: 57, massaAtomica: 138.91}, {nome: "Hf", numeroAtomico: 72, massaAtomica: 178.49}, {nome: "Ta", numeroAtomico: 73, massaAtomica: 180.95}, {nome: "W", numeroAtomico: 74, massaAtomica: 183.84}, {nome: "Re", numeroAtomico: 75, massaAtomica: 186.21}, {nome: "Os", numeroAtomico: 76, massaAtomica: 190.23}, {nome: "Ir", numeroAtomico: 77, massaAtomica: 192.22}, {nome: "Pt", numeroAtomico: 78, massaAtomica: 195.08}, {nome: "Au", numeroAtomico: 79, massaAtomica: 196.97}, {nome: "Hg", numeroAtomico: 80, massaAtomica: 200.59}, {nome: "Tl", numeroAtomico: 81, massaAtomica: 204.38}, {nome: "Pb", numeroAtomico: 82, massaAtomica: 207.2}, {nome: "Bi", numeroAtomico: 83, massaAtomica: 208.98}, {nome: "Po", numeroAtomico: 84, massaAtomica: 209}, {nome: "At", numeroAtomico: 85, massaAtomica: 210}, {nome: "Rn", numeroAtomico: 86, massaAtomica: 222}],
    // Periodo 7
    [{nome: "Fr", numeroAtomico: 87, massaAtomica: 223}, {nome: "Ra", numeroAtomico: 88, massaAtomica: 226}, {nome: "Ac", numeroAtomico: 89, massaAtomica: 227}, {nome: "Rf", numeroAtomico: 104, massaAtomica: 261}, {nome: "Db", numeroAtomico: 105, massaAtomica: 262}, {nome: "Sg", numeroAtomico: 106, massaAtomica: 266}, {nome: "Bh", numeroAtomico: 107, massaAtomica: 270}, {nome: "Hs", numeroAtomico: 108, massaAtomica: 277}, {nome: "Mt", numeroAtomico: 109, massaAtomica: 276}, {nome: "Ds", numeroAtomico: 110, massaAtomica: 281}, {nome: "Rg", numeroAtomico: 111, massaAtomica: 280}, {nome: "Cn", numeroAtomico: 112, massaAtomica: 285}, {nome: "Nh", numeroAtomico: 113, massaAtomica: 284}, {nome: "Fl", numeroAtomico: 114, massaAtomica: 289}, {nome: "Mc", numeroAtomico: 115, massaAtomica: 288}, {nome: "Lv", numeroAtomico: 116, massaAtomica: 293}, {nome: "Ts", numeroAtomico: 117, massaAtomica: 294}, {nome: "Og", numeroAtomico: 118, massaAtomica: 294}],
    // Serie dei Lantanidi
    [{nome: "Ce", numeroAtomico: 58, massaAtomica: 140.12}, {nome: "Pr", numeroAtomico: 59, massaAtomica: 140.91}, {nome: "Nd", numeroAtomico: 60, massaAtomica: 144.24}, {nome: "Pm", numeroAtomico: 61, massaAtomica: 145}, {nome: "Sm", numeroAtomico: 62, massaAtomica: 150.36}, {nome: "Eu", numeroAtomico: 63, massaAtomica: 152.00}, {nome: "Gd", numeroAtomico: 64, massaAtomica: 157.25}, {nome: "Tb", numeroAtomico: 65, massaAtomica: 158.93}, {nome: "Dy", numeroAtomico: 66, massaAtomica: 162.50}, {nome: "Ho", numeroAtomico: 67, massaAtomica: 164.93}, {nome: "Er", numeroAtomico: 68, massaAtomica: 167.26}, {nome: "Tm", numeroAtomico: 69, massaAtomica: 168.93}, {nome: "Yb", numeroAtomico: 70, massaAtomica: 173.04}, {nome: "Lu", numeroAtomico: 71, massaAtomica: 175.00}],
    // Serie degli Attinidi
    [{nome: "Th", numeroAtomico: 90, massaAtomica: 232.04}, {nome: "Pa", numeroAtomico: 91, massaAtomica: 231.04}, {nome: "U", numeroAtomico: 92, massaAtomica: 238.03}, {nome: "Np", numeroAtomico: 93, massaAtomica: 237}, {nome: "Pu", numeroAtomico: 94, massaAtomica: 244}, {nome: "Am", numeroAtomico: 95, massaAtomica: 243}, {nome: "Cm", numeroAtomico: 96, massaAtomica: 247}, {nome: "Bk", numeroAtomico: 97, massaAtomica: 247}, {nome: "Cf", numeroAtomico: 98, massaAtomica: 251}, {nome: "Es", numeroAtomico: 99, massaAtomica: 252}, {nome: "Fm", numeroAtomico: 100, massaAtomica: 257}, {nome: "Md", numeroAtomico: 101, massaAtomica: 258}, {nome: "No", numeroAtomico: 102, massaAtomica: 259}, {nome: "Lr", numeroAtomico: 103, massaAtomica: 262}]
];

// Mappa dei nomi completi agli simboli degli elementi
const mappaNomiCompleti = {
    "idrogeno": "H",
    "elio": "He",
    "litio": "Li",
    "berillio": "Be",
    "boro": "B",
    "carbonio": "C",
    "azoto": "N",
    "ossigeno": "O",
    "fluoro": "F",
    "neon": "Ne",
    "sodio": "Na",
    "magnesio": "Mg",
    "alluminio": "Al",
    "silicio": "Si",
    "fosforo": "P",
    "zolfo": "S",
    "cloro": "Cl",
    "argon": "Ar",
    "potassio": "K",
    "calcio": "Ca",
    "scandio": "Sc",
    "titanio": "Ti",
    "vanadio": "V",
    "cromo": "Cr",
    "manganese": "Mn",
    "ferro": "Fe",
    "cobalto": "Co",
    "nichel": "Ni",
    "rame": "Cu",
    "zinco": "Zn",
    "gallio": "Ga",
    "germanio": "Ge",
    "arsenico": "As",
    "selenio": "Se",
    "bromo": "Br",
    "krypton": "Kr",
    "rubidio": "Rb",
    "stronzio": "Sr",
    "ittrio": "Y",
    "zirconio": "Zr",
    "niobio": "Nb",
    "molibdeno": "Mo",
    "tecnezio": "Tc",
    "rutenio": "Ru",
    "rodio": "Rh",
    "palladio": "Pd",
    "argento": "Ag",
    "cadmio": "Cd",
    "indio": "In",
    "stagno": "Sn",
    "antimonio": "Sb",
    "tellurio": "Te",
    "iodio": "I",
    "xenon": "Xe",
    "cesio": "Cs",
    "bario": "Ba",
    "lantanio": "La",
    "hafnio": "Hf",
    "tantalio": "Ta",
    "wolframio": "W",
    "renio": "Re",
    "osmium": "Os",
    "iridio": "Ir",
    "platino": "Pt",
    "oro": "Au",
    "mercurio": "Hg",
    "talio": "Tl",
    "piombo": "Pb",
    "bismuto": "Bi",
    "polonio": "Po",
    "astato": "At",
    "radon": "Rn",
    "francio": "Fr",
    "radio": "Ra",
    "actinio": "Ac",
    "rutherfordio": "Rf",
    "dubrizio": "Db",
    "seaborgio": "Sg",
    "bohrium": "Bh",
    "hassio": "Hs",
    "meitnerio": "Mt",
    "darmstadtio": "Ds",
    "roentgenio": "Rg",
    "copernicio": "Cn",
    "nihonio": "Nh",
    "flerovio": "Fl",
    "moscovio": "Mc",
    "livermorio": "Lv",
    "tennessinio": "Ts",
    "oganessio": "Og",
    "cerio": "Ce",
    "praseodimio": "Pr",
    "neodimio": "Nd",
    "promezio": "Pm",
    "samario": "Sm",
    "europio": "Eu",
    "gadolinio": "Gd",
    "terbio": "Tb",
    "disprosio": "Dy",
    "olmolibdeno": "Ho",
    "erbium": "Er",
    "tulio": "Tm",
    "ytterbio": "Yb",
    "lutetio": "Lu",
    "torio": "Th",
    "protattio": "Pa",
    "uranio": "U",
    "neptunio": "Np",
    "plutonio": "Pu",
    "americio": "Am",
    "curio": "Cm",
    "berkelio": "Bk",
    "californio": "Cf",
    "einsteinium": "Es",
    "fermio": "Fm",
    "mendelevio": "Md",
    "nobelio": "No",
    "lawrencio": "Lr"
};




document.getElementById('serch_button').addEventListener('click', function() {
    // Ottieni il nome dell'elemento dal campo di input
    let nomeElemento = document.getElementById('elemento_completo').value.toLowerCase();

    // Cerca il simbolo dell'elemento nella mappa
    let simboloElemento = mappaNomiCompleti[nomeElemento];

    // Se l'elemento esiste nella mappa
    if (simboloElemento) {
        // Trova l'elemento nella tavola periodica
        let elementoTrovato = trovaElementoPerSimbolo(simboloElemento);

        // Mostra i dettagli dell'elemento
        document.getElementById('simbolo').value = elementoTrovato.nome;
        document.getElementById('numero_atomico').value = elementoTrovato.numeroAtomico;
        document.getElementById('massa_atomica').value = elementoTrovato.massaAtomica;
        document.getElementById('messaggio').textContent = `Elemento trovato: ${nomeElemento.charAt(0).toUpperCase() + nomeElemento.slice(1)}`;
    } else {
        // Se l'elemento non è stato trovato
        document.getElementById('messaggio').textContent = "Elemento non trovato";
    }
});

// Funzione per trovare l'elemento nella tavola periodica in base al simbolo
function trovaElementoPerSimbolo(simbolo) {
    for (let periodo of tavolaPeriodica) {
        for (let elemento of periodo) {
            if (elemento && elemento.nome === simbolo) {
                return elemento;
            }
        }
    }
    return null;
}


newFunction();

function newFunction() {
    button_tav_close.addEventListener('click', function () {
        tav_main.className = "main_info_contenitore_close";
        nomeElemento.value = ' ';
        nome.value = ' ';
        numero_atomico.value = ' ';
        massa_atomica.value = ' ';
    });
    button_tav_open.addEventListener('click', function () {
        tav_main.className = "main_info_contenitore_open";

    });
}
