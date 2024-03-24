/**
 * MASLAK calculatorPage JS
 */
function getDistance() {
    var distance = parseInt(document.getElementById('estimate_km').value);
    return distance;
}

function getType() {
    var type;
    var radios = document.getElementsByName('estimate[type]');
    
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            type = radios[i].value;
            break;
        }
    }
    
    return type;
}

function getCarSize() {
    var carSize = document.querySelector('input[name="car"]:checked').value;
    return carSize;
}

function getSubscriptionType() {
    var subscriptionType;
    var radios = document.getElementsByName('subscription');
    
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            subscriptionType = radios[i].value;
            break;
        }
    }
    
    return subscriptionType;
}

/************Fonction pour calculer la durée de location en heures**********************************/
function getRentalDurationInHours() {
    // Récupérer les valeurs de date et d'heure de début et de fin
    var startDate = new Date(document.getElementById('start-date').value);
    var endDate = new Date(document.getElementById('end-date').value);

    // Calculer la différence entre les dates en millisecondes
    var timeDifference = endDate.getTime() - startDate.getTime();

    // Convertir la différence en heures
    var rentalDurationInHours = timeDifference / (1000 * 60 * 60);

    // Retourner la durée de location en heures
    return rentalDurationInHours;
}
/*************************** fonction tarif pour citiz en utilisant heure*tarif ***********************************/
function calculatePriceWithSubscription(carSize, rentalDurationInHours) {
    var pricePerHour;
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
    
    var totalPrice = pricePerHour * rentalDurationInHours;
    return totalPrice;
}

function calculatePriceWithoutSubscription(carSize, rentalDurationInHours) {
    var pricePerHour;
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
    
    var totalPrice = pricePerHour * rentalDurationInHours;
    return totalPrice;
}

function calculatePrice(carSize, rentalDurationInHours) {
    var subscriptionType = getSubscriptionType();
    if (subscriptionType === 'avec_abonnement') {
        return calculatePriceWithSubscription(carSize, rentalDurationInHours);
    } else if (subscriptionType === 'sans_abonnement') {
        return calculatePriceWithoutSubscription(carSize, rentalDurationInHours);
    }
}

function displayPrice(totalPrice) {
    var outputElement = document.getElementById('estimate_price');
    outputElement.value = totalPrice.toFixed(2);
}
function displayPrice2(totalPrice) {
    var outputElement = document.getElementById('estimate_price2');
    outputElement.value = totalPrice.toFixed(2);
}

function calculateAndDisplayPrice() {
    var carSize = getCarSize();
    var rentalDurationInHours = getRentalDurationInHours();
    var price = calculatePrice(carSize, rentalDurationInHours);
    var distance = getDistance()
    displayPrice(price);
}


/**
 * Maslak CalculatorPage JS citiz  FIN
 */

/**Maslak Calculator page pour Leo&Go */

function calculatePriceLeoAndGo(carSize, rentalDurationInHours) {
    var totalPrice;

    // Utiliser un switch pour déterminer la taille de la voiture et calculer le prix en conséquence
    switch (carSize) {
        case '1':
        case '2':
        case '3':
            switch (rentalDurationInHours) {
                case 0.01667: // 1 minute
                    totalPrice = 0.32;
                    break;
                case 0.5: // 30 minutes
                    totalPrice = 7.5;
                    break;
                case 1:
                    totalPrice = 13;
                    break;
                case 3:
                    totalPrice = 27;
                    break;
                case 6:
                    totalPrice = 42;
                    break;
                case 9:
                    totalPrice = 53;
                    break;
                case 24:
                    totalPrice = 65;
                    break;
                case 48:
                    totalPrice = 119;
                    break;
                default:
                    totalPrice = 0;
                    break;
            }
            break;
        case '4':
            switch (rentalDurationInHours) {
                case 0.01667: // 1 minute
                    totalPrice = 0.39;
                    break;
                case 3:
                    totalPrice = 39;
                    break;
                case 6:
                    totalPrice = 59;
                    break;
                case 24:
                    totalPrice = 79;
                    break;
                case 48:
                    totalPrice = 149;
                    break;
                case 72:
                    totalPrice = 209;
                    break;
                default:
                    totalPrice = 0;
                    break;
            }
            break;
        default:
            totalPrice = 0; // Si la taille de la voiture n'est pas valide, le prix est de 0
            break;
    }

    return totalPrice;
}
function calculateAndDisplayPriceLeoGO() {
    var carSize = getCarSize();
    var rentalDurationInHours = getRentalDurationInHours();
    var price;

    // Vérifier si la voiture est de taille 'S', 'M' ou 'L'
        price = calculatePriceLeoAndGo(carSize, rentalDurationInHours);

    // Afficher le prix calculé
    displayPrice(price);
}




// Fonction pour créer et ajouter un bouton au DOM
function createCalculateButton() {
    // Créer un élément bouton
    var button = document.createElement('button');
    button.textContent = 'Afficher le prix';

    // Ajouter un écouteur d'événements au bouton pour calculer le prix et l'afficher
    button.addEventListener('click', function(event) {
        // Empêcher le rechargement de la page
        event.preventDefault();
        // Calculer le prix
        var price = calculatePrice(getCarSize(), getRentalDurationInHours());
        // Afficher le prix directement dans le document
        displayPrice(price);
    });
    // Ajouter le bouton au DOM
    var container = document.getElementById('overlay-simulator-result');
    container.appendChild(button);
}
// Appel de la fonction pour créer et ajouter le bouton au chargement de la page
window.addEventListener('load', createCalculateButton);

/**********************************************boutton leo&Go ************************** ***/ 
// Fonction pour créer et ajouter un bouton au DOM
function createCalculateButton2() {
    // Créer un élément bouton
    var button = document.createElement('button');
    button.textContent = 'Afficher le prix';

    // Ajouter un écouteur d'événements au bouton pour calculer le prix et l'afficher
    button.addEventListener('click', function(event) {
        // Empêcher le rechargement de la page
        event.preventDefault();
        
        // Calculer le prix
        var price = calculateAndDisplayPriceLeoGO(getCarSize(), getRentalDurationInHours());
        
        
        // Afficher le prix directement dans le document
        displayPrice(price);
       
    });

    // Ajouter le bouton au DOM
    var container2 = document.getElementById('overlay-simulator-result2');
    container2.appendChild(button);
}

// Appel de la fonction pour créer et ajouter le bouton au chargement de la page
window.addEventListener('load', createCalculateButton2);
