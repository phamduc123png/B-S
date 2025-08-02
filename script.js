// Sample property data
const properties = [
    {
        id: 1,
        title: "CÓ SỔ ĐỎ HỒNG",
        location: "TP HCM City, Vietnam",
        price: 1000000000,
        bedrooms: 4,
        type: "house",
        bathrooms: 3,
        image: "1000013320.jpg",
        description: "CÓ ĐẦY ĐỦ PHẤP LÝ, CÓ SỔ ĐỎ HỒNG, CÓ GIẤY TỜ PHÁP LÝ RÕ RÀNG, CÓ THỂ VAY NGÂN HÀNG",
        region: "West"
    },
    {
        id: 2,
        title: "Downtown Apartment",
        location: "New York, NY",
        price: 850000,
        bedrooms: 2,
        bathrooms: 2,
        type: "apartment",
        image: "1000013322.jpg",
        description: "Conveniently located apartment in the heart of the city.",
        region: "East"
    },
    {
        id: 3,
        title: "Cozy Condo",
        location: "Miami, FL",
        price: 600000,
        bedrooms: 3,
        bathrooms: 2,
        type: "condo",
        image: "1000013327.jpg",
        description: "A cozy condo with ocean views.",
        region: "South"
    },
    {
        id: 4,
        title: "Suburban Townhouse",
        location: "Austin, TX",
        price: 450000,
        bedrooms: 3,
        bathrooms: 2,
        type: "townhouse",
        image: "1000013328.jpg",
        description: "Spacious townhouse in a quiet suburb.",
        region: "Central"
    }
];

// State for favorites and analytics
let favorites = new Set();
let propertiesViewed = 0;

// DOM elements
const propertyList = document.getElementById('propertyList');
const searchForm = document.getElementById('searchForm');
const propertiesViewedSpan = document.getElementById('propertiesViewed');
const favoritesSavedSpan = document.getElementById('favoritesSaved');

// Render properties based on filter
function renderProperties(filteredProperties) {
    propertyList.innerHTML = '';
    if (filteredProperties.length === 0) {
        propertyList.innerHTML = '<p>No properties found matching your criteria.</p>';
        return;
    }
    filteredProperties.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card';

        const img = document.createElement('img');
        img.src = property.image;
        img.alt = property.title;
        img.className = 'property-image';
        card.appendChild(img);

        const details = document.createElement('div');
        details.className = 'property-details';

        const title = document.createElement('h3');
        title.className = 'property-title';
        title.textContent = property.title;
        details.appendChild(title);

        const location = document.createElement('p');
        location.className = 'property-location';
        location.textContent = property.location;
        details.appendChild(location);

        const price = document.createElement('p');
        price.className = 'property-price';
        price.textContent = `$${property.price.toLocaleString()}`;
        details.appendChild(price);

        const info = document.createElement('div');
        info.className = 'property-info';
        info.textContent = `${property.bedrooms} bd | ${property.bathrooms} ba | ${property.type}`;
        details.appendChild(info);

        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = favorites.has(property.id) ? '★' : '☆';
        if (favorites.has(property.id)) {
            favoriteBtn.classList.add('favorited');
        }
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(property.id, favoriteBtn);
        });
        details.appendChild(favoriteBtn);

        card.appendChild(details);

        card.addEventListener('click', () => {
            showPropertyDetails(property);
        });

        propertyList.appendChild(card);
    });
}

// Toggle favorite status
function toggleFavorite(propertyId, button) {
    if (favorites.has(propertyId)) {
        favorites.delete(propertyId);
        button.classList.remove('favorited');
        button.innerHTML = '☆';
    } else {
        favorites.add(propertyId);
        button.classList.add('favorited');
        button.innerHTML = '★';
    }
    updateAnalytics();
}

// Show property details in modal
function showPropertyDetails(property) {
    propertiesViewed++;
    updateAnalytics();

    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Property details elements
    const title = document.createElement('h2');
    title.textContent = property.title;
    title.style.marginTop = '0';

    const img = document.createElement('img');
    img.src = property.image;
    img.alt = property.title;
    img.style.width = '100%';
    img.style.borderRadius = '8px';
    img.style.marginBottom = '15px';

    const description = document.createElement('p');
    description.textContent = property.description;
    description.style.marginBottom = '15px';

    // Create a container for property details
    const detailsContainer = document.createElement('div');
    detailsContainer.style.marginBottom = '15px';

    const price = document.createElement('p');
    price.innerHTML = `<strong>Price:</strong> $${property.price.toLocaleString()}`;
    price.style.margin = '5px 0';

    const location = document.createElement('p');
    location.innerHTML = `<strong>Location:</strong> ${property.location}`;
    location.style.margin = '5px 0';

    const bedrooms = document.createElement('p');
    bedrooms.innerHTML = `<strong>Bedrooms:</strong> ${property.bedrooms}`;
    bedrooms.style.margin = '5px 0';

    const bathrooms = document.createElement('p');
    bathrooms.innerHTML = `<strong>Bathrooms:</strong> ${property.bathrooms}`;
    bathrooms.style.margin = '5px 0';

    const type = document.createElement('p');
    type.innerHTML = `<strong>Property Type:</strong> ${property.type.charAt(0).toUpperCase() + property.type.slice(1)}`;
    type.style.margin = '5px 0';

    // Financial calculation example: mortgage estimate
    const mortgage = calculateMortgage(property.price, 20, 3.5, 30);
    const mortgageP = document.createElement('p');
    mortgageP.innerHTML = `<strong>Estimated Monthly Mortgage:</strong> $${mortgage.toFixed(2)}`;
    mortgageP.style.margin = '5px 0';
    mortgageP.style.fontWeight = 'bold';

    // Assemble the modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(img);
    modalContent.appendChild(description);
    
    // Add details to container
    detailsContainer.appendChild(price);
    detailsContainer.appendChild(location);
    detailsContainer.appendChild(bedrooms);
    detailsContainer.appendChild(bathrooms);
    detailsContainer.appendChild(type);
    detailsContainer.appendChild(mortgageP);
    
    modalContent.appendChild(detailsContainer);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Calculate mortgage payment
function calculateMortgage(price, downPaymentPercent, interestRate, loanTermYears) {
    const principal = price * (1 - downPaymentPercent / 100);
    const monthlyInterest = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;
    const numerator = monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterest, numberOfPayments) - 1;
    return principal * (numerator / denominator);
}

// Update analytics display
function updateAnalytics() {
    propertiesViewedSpan.textContent = propertiesViewed;
    favoritesSavedSpan.textContent = favorites.size;
}

// Filter properties based on form inputs
function filterProperties() {
    const location = document.getElementById('location').value.toLowerCase();
    const type = document.getElementById('type').value;
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
    const bedrooms = parseInt(document.getElementById('bedrooms').value) || 0;
    const bathrooms = parseInt(document.getElementById('bathrooms').value) || 0;

    return properties.filter(property => {
        const matchesLocation = property.location.toLowerCase().includes(location);
        const matchesType = type ? property.type === type : true;
        const matchesMinPrice = property.price >= minPrice;
        const matchesMaxPrice = property.price <= maxPrice;
        const matchesBedrooms = property.bedrooms >= bedrooms;
        const matchesBathrooms = property.bathrooms >= bathrooms;
        return matchesLocation && matchesType && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesBathrooms;
    });
}

// Handle search form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const filtered = filterProperties();
    renderProperties(filtered);
});

// Handle contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for contacting us, ' + contactForm.name.value + '! We will get back to you shortly.');
    contactForm.reset();
});

// Initial render
renderProperties(properties);
updateAnalytics();

// Modal styles and behavior
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.remove();
    }
});
