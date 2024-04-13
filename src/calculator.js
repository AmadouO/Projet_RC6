function getDistance() {
    let distance = parseInt(document.getElementById('estimate_km').value);
    return distance;
}

function getType() {
    let type;
    let radios = document.getElementsByName('estimate[type]');
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            type = radios[i].value;
            break;
        }
    }
    
    return type;
}

function getCarSize() {
    let carSize = document.querySelector('input[name="car"]:checked').value;
    return carSize;
}

function getSubscriptionType() {
    let subscriptionType;
    let radios = document.getElementsByName('subscription');
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            subscriptionType = radios[i].value;
            break;
        }
    }
    
    return subscriptionType;
}

/************Fonction pour calculer la durée de location en heures**********************************/
function getRentalDurationInHours() {
    let startDate = new Date(document.getElementById('start-date').value);
    let endDate = new Date(document.getElementById('end-date').value);

    let timeDifference = endDate.getTime() - startDate.getTime();

    // Convertir la différence en heures
    let rentalDurationInHours = timeDifference / (1000 * 60 * 60);

    // Retourner la durée de location en heures
    return rentalDurationInHours;
}
/*************************** fonction tarif pour citiz en utilisant heure*tarif ***********************************/
function calculatePriceWithSubscription(carSize, rentalDurationInHours) {
    let pricePerHour;
    switch (carSize) {
        case '1':
            pricePerHour = 2.5;
            break;
        case '2':
            pricePerHour = 3;
            break;
        case '3':
            pricePerHour = 3.5;
            break;
        case '4':
            pricePerHour = 4; 
            break;
        default:
            pricePerHour = 0;
            break;
    }
    
    let totalPrice = pricePerHour * rentalDurationInHours;
    return totalPrice;
}

function calculatePriceWithoutSubscription(carSize, rentalDurationInHours) {
    let pricePerHour;
    switch (carSize) {
        case '1':
            pricePerHour = 5;
            break;
        case '2':
            pricePerHour = 5.5;
            break;
        case '3':
            pricePerHour = 6;
            break;
        case '4':
            pricePerHour = 6.5; 
            break;
        default:
            pricePerHour = 0;
            break;
    }
    
    let totalPrice = pricePerHour * rentalDurationInHours;
    return totalPrice;
}

function calculatePrice(carSize, rentalDurationInHours) {
    let subscriptionType = getSubscriptionType();
    if (subscriptionType === 'avec_abonnement') {
        return calculatePriceWithSubscription(carSize, rentalDurationInHours);
    } else if (subscriptionType === 'sans_abonnement') {
        return calculatePriceWithoutSubscription(carSize, rentalDurationInHours);
    }
}

function displayPrice(totalPrice) {
    let outputElement = document.getElementById('estimate_price');
    outputElement.value = totalPrice.toFixed(2);
}
function displayPrice2(totalPrice) {
    let outputElement = document.getElementById('estimate_price2');
    outputElement.value = totalPrice.toFixed(2);
}

function calculateAndDisplayPrice() {
    let carSize = getCarSize();
    let rentalDurationInHours = getRentalDurationInHours();
    let price = calculatePrice(carSize, rentalDurationInHours);
    let distance = getDistance()
    displayPrice(price);
}


/******************************************************************************/
function calculatePriceLeoAndGo2(carSize, rentalDurationInHours) {
    let totalPrice = 0;

    // Utiliser un switch pour déterminer la taille de la voiture et calculer le prix en conséquence
    switch (carSize) {
        case '1':
        case '2':
        case '3':
        case '4':
            // Calculer le prix en fonction de la durée de location
            if (rentalDurationInHours <= 1) {
                totalPrice = 13;
            } else if (rentalDurationInHours <= 2) {
                totalPrice = 22;
            } else if (rentalDurationInHours <= 3) {
                totalPrice = 27;
            } else if (rentalDurationInHours <= 6) {
                totalPrice = 42;
            } else if (rentalDurationInHours <= 24) {
                totalPrice = 65;
            } else if (rentalDurationInHours <= 48) {
                totalPrice = 119;
            } else {
                // Calculer les jours et les heures restants
                let days = Math.floor(rentalDurationInHours / 24);
                let hours = rentalDurationInHours % 24;
                
                // Calculer le prix pour chaque jour
                totalPrice += days * 65;
                
                // Calculer le prix pour les heures restantes
                if (hours <= 1) {
                    totalPrice += 13;
                } else if (hours <= 2) {
                    totalPrice += 22;
                } else if (hours <= 3) {
                    totalPrice += 27;
                } else if (hours <= 6) {
                    totalPrice += 42;
                }
            }
            break;
        default:
            totalPrice = 0; // Si la taille de la voiture n'est pas valide le prix est de 0
            break;
    }

    return totalPrice;
}


// Fonction pour créer et ajouter un bouton au DOM
function createCalculateButton() {
    let button = document.createElement('button');
    button.classList.add('btn_affiche_prix_citz');
    button.textContent = 'Afficher le prix';

    button.addEventListener('click', function(event) {
        event.preventDefault();
        let price = calculatePrice(getCarSize(), getRentalDurationInHours());
        displayPrice(price);
    });
    // Ajouter le bouton au DOM
    let container = document.getElementById('overlay-simulator-result');
    const div_cont_Acitiz = container.querySelector('.div_p_out_btn_citiz');
    div_cont_Acitiz.appendChild(button);
}
// Appel de la fonction pour créer et ajouter le bouton au chargement de la page
window.addEventListener('load', createCalculateButton);

/**********************************************boutton leo&Go ************************** ***/ 
// Fonction pour créer et ajouter un bouton au DOM
function createCalculateButton2() {
    let button = document.createElement('button');
    button.classList.add('btn_affiche_prix_leoGo');
    button.textContent = 'Afficher le prix';

    button.addEventListener('click', function(event) {
        event.preventDefault();
        
        let price = calculatePriceLeoAndGo2(getCarSize(), getRentalDurationInHours());
        displayPrice2(price);
    });

    let container2 = document.getElementById('overlay-simulator-result2');

    const div_cont = container2.querySelector('.div_p_output_btn');
    div_cont.appendChild(button);

}

// Appel de la fonction pour créer et ajouter le bouton au chargement de la page
window.addEventListener('load', createCalculateButton2);


// Créez une fonction pour afficher le graphique
function afficherGraphique() {
    let citizPrice = calculatePrice(getCarSize(), getRentalDurationInHours());
    let leoGoPrice = calculatePriceLeoAndGo2(getCarSize(), getRentalDurationInHours());
    let rentalDurationInHours = getRentalDurationInHours();
    let distance = getDistance();

    const table = document.getElementById('tarifsTable');
    while(table.rows.length > 1){
        table.deleteRow(1);
    }
    let row = tarifsTable.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.textContent = 'Citiz';
    cell2.textContent = rentalDurationInHours.toFixed(2);
    cell3.textContent = distance;
    cell4.textContent = citizPrice.toFixed(2) + ' €';
    
    row = tarifsTable.insertRow(2);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    cell1.textContent = 'Leo&Go';
    cell2.textContent = rentalDurationInHours.toFixed(2);
    cell3.textContent = distance;
    cell4.textContent = leoGoPrice.toFixed(2) + ' €';

    // Contexte du graphique
    let ctx = document.getElementById('priceComparisonChart').getContext('2d');

    // Creer le graphique
    let priceComparisonChart = new Chart(ctx, {
        type: 'doughnut', 
        data: {
            labels: ['Citiz', 'Leo&Go'], // Étiquettes des barres
            datasets: [{
                label: 'Prix de location de voiture', // Légende du graphique
                data: [citizPrice, leoGoPrice], 
                backgroundColor: [ 
                'rgba(238, 130, 238, 0.2)', 
                'rgba(30, 144, 255, 0.2)' 
            ],
            borderColor: [ 
                'rgba(238, 130, 238, 1)',
                'rgba(30, 144, 255, 1)' 
            ],
                borderWidth: 1 
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true 
                    }
                }]
            }
        }
    });

    let recommendationParagraph = document.getElementById('recommendationParagraph');
    

    // Recommander le prix le plus bas
    let lowestPrice = Math.min(citizPrice, leoGoPrice);
    if (lowestPrice === citizPrice) {
        recommendationParagraph.textContent = 'Nous vous recommandons de choisir Citiz pour le prix le plus bas.';
    } else {
        recommendationParagraph.textContent = 'Nous vous recommandons de choisir Leo&Go pour le prix le plus bas.';
    }
}

// Recuperez le bouton "Afficher"
let refreshButton = document.getElementById('refreshButton');

refreshButton.addEventListener('click', function(event) {
    event.preventDefault();
    afficherGraphique();
});


// Selectionnez le bouton de réinitialisation
let resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', function() {
    // Obtenez le contexte du graphique
    let ctx = document.getElementById('priceComparisonChart').getContext('2d');

    // Effacez le graphique actuel
    if (window.priceComparisonChart !== undefined) {
        window.priceComparisonChart.destroy();
    }

    // Recréez le graphique avec les données par défaut ou vides
    window.priceComparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Effacez également le paragraphe de recommandation
    let recommendationParagraph = document.getElementById('recommendationParagraph');
    recommendationParagraph.textContent = '';
});