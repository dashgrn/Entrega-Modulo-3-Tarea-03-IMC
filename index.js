const menSel = document.getElementById('menSel');
const womenSel = document.getElementById('womenSel');
const ageInput = document.getElementById('ageInput');
const weightInput = document.getElementById('weightInput');
const heightInput = document.getElementById('heightInput');
const calcBtn = document.getElementById('calcBtn');
const modalResults = document.getElementById('modalResults');
const modalStats = document.getElementById('modalStats');
const closeModal = document.getElementById('closeModal');
const closeModalBkg = document.getElementById('closeModalBkg');
const saveDataBtn = document.getElementById('saveDataBtn');
const statsBtn = document.getElementById('statsBtn');
const statsBtn2 = document.getElementById('statsBtn2');
const showIMC = document.getElementById('showIMC');
const imcTier = document.getElementById('imcTier');
const weightRange = document.getElementById('weightRange');
const ul = document.getElementById('ul');
const closeStatsModalBkg = document.getElementById('closeStatsModalBkg');
const closeStatsModal = document.getElementById('closeStatsModal');
const btnCloseModalStats = document.getElementById('btnCloseModalStats');
const ulContainer = document.getElementById('ulContainer');


let jsonArr = []
let isCalcDone = false
let imc = 0
let genderSelect = '';

// creating the funct for getting weight range based on heigh
function weightRangeFunct(height) {
    if (height > 120 && height <= 165) {
        return 'Peso ideal: 50-65 KG '
    } else if (height > 165 && height <= 175) {
        return 'Peso ideal: 65-70 KG'
    } else if (height > 175 && height <= 185) {
        return 'Peso ideal: 70-80 KG'
    } else if (height > 185 && height <= 200) {
        return 'Peso ideal: 80-95 KG'
    } else if (height > 200 && height <= 220) {
        return 'Peso ideal: 95-105 KG'
    }
}

//creating sample data for stats function
let sampleData = [
    {
        'Genero': 'mujer',
        'Edad': 18,
        'Peso': 60,
        'Estatura': 155,
        'IMC': 26.60
    },
    {
        'Genero': 'hombre',
        'Edad': 19,
        'Peso': 61,
        'Estatura': 150,
        'IMC': 27.10
    },
    {
        'Genero': 'hombre',
        'Edad': 25,
        'Peso': 61,
        'Estatura': 170,
        'IMC': 21.10
    },
    {
        'Genero': 'hombre',
        'Edad': 25,
        'Peso': 61,
        'Estatura': 180,
        'IMC': 18.82
    },
    {
        'Genero': 'mujer',
        'Edad': 18,
        'Peso': 60,
        'Estatura': 155,
        'IMC': 26.60
    },
    {
        'Genero': 'hombre',
        'Edad': 19,
        'Peso': 61,
        'Estatura': 150,
        'IMC': 27.10
    },
    {
        'Genero': 'hombre',
        'Edad': 25,
        'Peso': 61,
        'Estatura': 170,
        'IMC': 21.10
    },
]


//disable default form submit behavior
const form = document.querySelector('form');
form.addEventListener('submit', function (evt) {
    evt.preventDefault();
})

menSel.addEventListener('click', notifyClickMen);
womenSel.addEventListener('click', notifyClickWomen);

// creating genderSelect listeners for styling and required inputs
function notifyClickMen() {
    menSel.classList.add('has-background-success');
    womenSel.classList.remove('has-background-success');
    genderSelect = 'hombre'
}
function notifyClickWomen() {
    womenSel.classList.add('has-background-success');
    menSel.classList.remove('has-background-success');
    genderSelect = 'mujer'
}

calcBtn.addEventListener('click', function () {
    if (ageInput.value > 1 && weightInput.value > 1 && heightInput.value > 100) {
        if (genderSelect === 'hombre' || genderSelect == 'mujer') {
            imc = (parseInt(weightInput.value) / (Math.pow(parseFloat(heightInput.value / 100), 2))).toFixed(2)
            if (imc > 0 && imc <= 18.5) {
                showIMC.innerText = `Su IMC es ${imc}`
                imcTier.innerText = 'Está por debajo del peso'
                weightRange.innerText = weightRangeFunct(heightInput.value);
                showIMC.classList.add('has-text-danger');
            } else if (imc > 18.5 && imc <= 24.9) {
                showIMC.innerText = `Su IMC es ${imc}`
                imcTier.innerText = 'Está saludable'
                weightRange.innerText = weightRangeFunct(heightInput.value);
                showIMC.classList.add('has-text-success');
            } else if (imc > 25 && imc <= 29.9) {
                showIMC.innerText = `Su IMC es ${imc}`
                imcTier.innerText = 'Está  con sobrepeso'
                weightRange.innerText = weightRangeFunct(heightInput.value);
                showIMC.classList.add('has-text-warning');
            } else if (imc > 30 && imc <= 39.9) {
                showIMC.innerText = `Su IMC es ${imc}`
                imcTier.innerText = 'Condición de obesidad'
                weightRange.innerText = weightRangeFunct(heightInput.value);
                showIMC.classList.add('has-text-danger');
            } else if (imc > 40) {
                showIMC.innerText = `Su IMC es ${imc}`
                imcTier.innerText = 'Condición de obesidad extrema y de alto riesgo'
                weightRange.innerText = weightRangeFunct(heightInput.value);
                showIMC.classList.add('has-text-danger');
            }

            isCalcDone = true
            modalResults.classList.add('is-active');
        } else {
            alert('Debes seleccionar un genero');
        }

    } else {
        alert('Verifica los datos que ingresaste');
    }
});

// creating savedata funct
function saveUsrData() {
    if (jsonArr.length <= 15) {
        localStorage.setItem('jsonStat', JSON.stringify(jsonArr));
    } else {
        alert('Ya hay 15 registros almacenados');
    }
}

// listening for saveDataBtn
saveDataBtn.addEventListener('click', function () {
    if (localStorage.length == 0) {
        localStorage.setItem('jsonStat', JSON.stringify(sampleData));
    }
    let localStorageBuffer = localStorage.getItem('jsonStat');
    let bufferParsed = JSON.parse(localStorageBuffer);
    jsonArr = bufferParsed;
    jsonArr.push({
        'Genero': genderSelect,
        'Edad': ageInput.value,
        'Peso': weightInput.value,
        'Estatura': heightInput.value,
        'IMC': imc
    });
    saveUsrData();
    // disabling saveDataBtn after sending data to localstorage
    saveDataBtn.disabled = true
    // setting the json array empty again (avoiding data duplication)
    jsonArr = []
});

// listening for statsBtn
statsBtn.addEventListener('click', function () {
    if (localStorage.length == 0) {
        localStorage.setItem('jsonStat', JSON.stringify(sampleData));
    }
    let localStorageBuffer = localStorage.getItem('jsonStat');
    let bufferParsed = JSON.parse(localStorageBuffer);
    bufferParsed.forEach(function (reg) {
        let liCreator = document.createElement('li')
        liCreator.innerText = `Genero: ${reg.Genero} - Edad: ${reg.Edad} - Peso: ${reg.Peso} - Estatura: ${reg.Estatura} - IMC: ${reg.IMC}`
        ul.appendChild(liCreator)
    });
    modalResults.classList.remove('is-active');
    modalStats.classList.add('is-active');
});
statsBtn2.addEventListener('click', function () {
    if (localStorage.length == 0) {
        localStorage.setItem('jsonStat', JSON.stringify(sampleData));
    }
    let localStorageBuffer = localStorage.getItem('jsonStat');
    let bufferParsed = JSON.parse(localStorageBuffer);
    bufferParsed.forEach(function (reg) {
        let liCreator = document.createElement('li')
        liCreator.innerText = `Genero: ${reg.Genero} - Edad: ${reg.Edad} - Peso: ${reg.Peso} - Estatura: ${reg.Estatura} - IMC: ${reg.IMC}`
        ul.appendChild(liCreator)
    });
    modalResults.classList.remove('is-active');
    modalStats.classList.add('is-active');
});

// close stats modal
btnCloseModalStats.addEventListener('click', function () {
    modalStats.classList.remove('is-active');
    saveDataBtn.disabled = false
    // clear input fields and selections when closing modal
    menSel.classList.remove('has-background-success');
    womenSel.classList.remove('has-background-success');
    ageInput.value = ''
    weightInput.value = ''
    heightInput.value = ''
    genderSelect = ''
    showIMC.classList.remove('has-text-danger');
    showIMC.classList.remove('has-text-success');
    showIMC.classList.remove('has-text-warning');
    ul.innerHTML = '';
});
closeStatsModalBkg.addEventListener('click', function () {
    modalStats.classList.remove('is-active');
    saveDataBtn.disabled = false
    // clear input fields and selections when closing modal
    menSel.classList.remove('has-background-success');
    womenSel.classList.remove('has-background-success');
    ageInput.value = ''
    weightInput.value = ''
    heightInput.value = ''
    genderSelect = ''
    showIMC.classList.remove('has-text-danger');
    showIMC.classList.remove('has-text-success');
    showIMC.classList.remove('has-text-warning');
    ul.innerHTML = '';
});
closeStatsModal.addEventListener('click', function () {
    modalStats.classList.remove('is-active');
    saveDataBtn.disabled = false
    // clear input fields and selections when closing modal
    menSel.classList.remove('has-background-success');
    womenSel.classList.remove('has-background-success');
    ageInput.value = ''
    weightInput.value = ''
    heightInput.value = ''
    genderSelect = ''
    showIMC.classList.remove('has-text-danger');
    showIMC.classList.remove('has-text-success');
    showIMC.classList.remove('has-text-warning');
    ul.innerHTML = '';
});



// close modalResults listeners
closeModal.addEventListener('click', function () {
    if (isCalcDone === true) {
        modalResults.classList.remove('is-active');
        saveDataBtn.disabled = false

        // clear input fields and selections when closing modal
        menSel.classList.remove('has-background-success');
        womenSel.classList.remove('has-background-success');
        ageInput.value = ''
        weightInput.value = ''
        heightInput.value = ''
        genderSelect = ''
        showIMC.classList.remove('has-text-danger');
        showIMC.classList.remove('has-text-success');
        showIMC.classList.remove('has-text-warning');
    }
});
closeModalBkg.addEventListener('click', function () {
    if (isCalcDone === true) {
        modalResults.classList.remove('is-active');
        saveDataBtn.disabled = false

        // clear input fields and selections when closing modal
        menSel.classList.remove('has-background-success');
        womenSel.classList.remove('has-background-success');
        ageInput.value = ''
        weightInput.value = ''
        heightInput.value = ''
        genderSelect = ''
        showIMC.classList.remove('has-text-danger');
        showIMC.classList.remove('has-text-success');
        showIMC.classList.remove('has-text-warning');
    }
});