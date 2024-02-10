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

function calculatePrice(carSize, distance) {
    var pricePerKm;
    switch (carSize) {
        case '1':
            pricePerKm = 1.5;
            break;
        case '2':
            pricePerKm = 2.5;
            break;
        case '3':
            pricePerKm = 3.5;
            break;
        case '4':
            pricePerKm = 4.5; 
            break;
        default:
            pricePerKm = 0;
            break;
    }
    
    var totalPrice = pricePerKm * distance;
    return totalPrice;
}



function displayPrice(totalPrice) {
    var outputElement = document.getElementById('estimate_price');
    outputElement.value = totalPrice;
}
function calculateAndDisplayPrice() {
    var carSize = getCarSize();
    var distance = getDistance();
    var price = calculatePrice(carSize, distance);
    displayPrice(price);
}

/*** test 
 * 
*/

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
        var price = calculatePrice(getCarSize(), getDistance());
        
        // Afficher le prix directement dans le document
        displayPrice(price);
    });

    // Ajouter le bouton au DOM
    var container = document.getElementById('overlay-simulator-result');
    container.appendChild(button);
}

// Fonction pour afficher le prix directement dans le document
function displayPrice(price) {
    // Créer un élément de paragraphe pour afficher le prix
    var priceParagraph = document.createElement('p');
    priceParagraph.textContent = 'Le prix est : ' + price.toFixed(2) + ' euros';

    // Récupérer le conteneur où ajouter le paragraphe
    var container = document.getElementById('overlay-simulator-result');

    // Ajouter le paragraphe au conteneur
    container.appendChild(priceParagraph);
}

// Appel de la fonction pour créer et ajouter le bouton au chargement de la page
window.addEventListener('load', createCalculateButton);

