// Sample property data
const properties = [
    {
        id: 1,
        title: "CÓ SỔ ĐỎ HỒNG",
        location: "TP HCM, Vietnam",
        price: 1000000000,
        bedrooms: 4,
        bathrooms: 3,
        type: "house",
        image: "1000013320.jpg",
        description: "CÓ ĐẦY ĐỦ PHÁP LÝ, CÓ SỔ ĐỎ HỒNG, CÓ GIẤY TỜ PHÁP LÝ RÕ RÀNG, CÓ THỂ VAY NGÂN HÀNG",
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

// User authentication system
const currentUser = {
    id: null,
    username: null,
    email: null
};

// State for favorites and analytics
let favorites = new Set();
let propertiesViewed = 0;

// DOM elements
const propertyList = document.getElementById('propertyList');
const searchForm = document.getElementById('searchForm');
const propertiesViewedSpan = document.getElementById('propertiesViewed');
const favoritesSavedSpan = document.getElementById('favoritesSaved');

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    // Check for authenticated user
    checkAuthStatus();
    
    // Load featured properties on home page
    if (document.getElementById('featuredProperties')) {
        loadFeaturedProperties();
    }
    
    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const filtered = filterProperties();
            renderProperties(filtered);
        });
    }
    
    // Handle newsletter subscription
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn đã đăng ký nhận tin!');
            newsletterForm.reset();
        });
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, this would send to server
            alert('Đăng nhập thành công!');
            window.location.href = 'account.html';
        });
    }
    
    // Handle register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, this would send to server
            alert('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.');
            window.location.href = 'login.html';
        });
    }
    
    // Handle mortgage calculator
    const mortgageForm = document.getElementById('mortgageForm');
    if (mortgageForm) {
        document.getElementById('calculateBtn').addEventListener('click', calculateMortgage);
    }
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn đã liên hệ, ' + contactForm.name.value + '! Chúng tôi sẽ liên hệ lại sớm.');
            contactForm.reset();
        });
    }
});

// Load featured properties on home page
function loadFeaturedProperties() {
    const featuredContainer = document.getElementById('featuredProperties');
    if (!featuredContainer) return;
    
    // Display 3 random featured properties
    const randomProperties = properties.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    randomProperties.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        
        const img = document.createElement('img');
        img.src = property.image;
        img.alt = property.title;
        img.className = 'property-image';
        propertyCard.appendChild(img);
        
        const details = document.createElement('div');
        details.className = 'property-details';
        
        const title = document.createElement('h3');
        title.className = 'property-title';
        title.textContent = property.title;
        details.appendChild(title);
        
        const location = document.createElement('p');
        location.className = 'property-location';
        location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location}`;
        details.appendChild(location);
        
        const price = document.createElement('p');
        price.className = 'property-price';
        price.textContent = `Giá: ${property.price.toLocaleString('vi-VN')} VND`;
        details.appendChild(price);
        
        propertyCard.appendChild(details);
        propertyCard.addEventListener('click', () => {
            showPropertyDetails(property);
        });
        
        featuredContainer.appendChild(propertyCard);
    });
}

// Filter properties based on form inputs
function filterProperties() {
    const location = document.getElementById('location').value.toLowerCase();
    const type = document.getElementById('type').value;
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
    const bedrooms = parseInt(document.getElementById('bedrooms').value) || 0;
    
    return properties.filter(property => {
        const matchesLocation = property.location.toLowerCase().includes(location);
        const matchesType = type ? property.type === type : true;
        const matchesMinPrice = property.price >= minPrice;
        const matchesMaxPrice = property.price <= maxPrice;
        const matchesBedrooms = property.bedrooms >= bedrooms;
        
        return matchesLocation && matchesType && matchesMinPrice && matchesMaxPrice && matchesBedrooms;
    });
}

// Render properties based on filter
function renderProperties(filteredProperties) {
    const propertyList = document.getElementById('propertyList');
    if (!propertyList) return;
    
    propertyList.innerHTML = '';
    if (filteredProperties.length === 0) {
        propertyList.innerHTML = '<p>Không tìm thấy bất động sản nào phù hợp.</p>';
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
        location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location}`;
        details.appendChild(location);
        
        const price = document.createElement('p');
        price.className = 'property-price';
        price.textContent = `Giá: ${property.price.toLocaleString('vi-VN')} VND`;
        details.appendChild(price);
        
        const info = document.createElement('div');
        info.className = 'property-info';
        info.innerHTML = `${property.bedrooms} phòng ngủ | ${property.bathrooms} phòng tắm | ${property.type}`;
        details.appendChild(info);
        
        card.appendChild(details);
        card.addEventListener('click', () => {
            showPropertyDetails(property);
        });
        
        propertyList.appendChild(card);
    });
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
    modalContent.appendChild(closeBtn);
    
    const title = document.createElement('h2');
    title.textContent = property.title;
    modalContent.appendChild(title);
    
    const img = document.createElement('img');
    img.src = property.image;
    img.alt = property.title;
    img.className = 'property-detail-main-image';
    modalContent.appendChild(img);
    
    const description = document.createElement('p');
    description.className = 'property-detail-description';
    description.textContent = property.description;
    modalContent.appendChild(description);
    
    const price = document.createElement('p');
    price.className = 'property-detail-price';
    price.textContent = `Giá: ${property.price.toLocaleString('vi-VN')} VND`;
    modalContent.appendChild(price);
    
    const features = document.createElement('div');
    features.className = 'property-detail-features';
    
    const feature1 = document.createElement('div');
    feature1.className = 'feature-item';
    feature1.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location}`;
    features.appendChild(feature1);
    
    const feature2 = document.createElement('div');
    feature2.className = 'feature-item';
    feature2.innerHTML = `<i class="fas fa-bed"></i> ${property.bedrooms} phòng ngủ`;
    features.appendChild(feature2);
    
    const feature3 = document.createElement('div');
    feature3.className = 'feature-item';
    feature3.innerHTML = `<i class="fas fa-bath"></i> ${property.bathrooms} phòng tắm`;
    features.appendChild(feature3);
    
    const feature4 = document.createElement('div');
    feature4.className = 'feature-item';
    feature4.innerHTML = `<i class="fas fa-ruler-combined"></i> ${property.type}`;
    features.appendChild(feature4);
    
    modalContent.appendChild(features);
    
    const actions = document.createElement('div');
    actions.className = 'property-detail-actions';
    
    const contactBtn = document.createElement('button');
    contactBtn.className = 'btn-primary';
    contactBtn.textContent = 'Liên hệ';
    contactBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        window.location.href = 'contact.html';
    });
    actions.appendChild(contactBtn);
    
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'btn-secondary';
    favoriteBtn.textContent = 'Thêm vào yêu thích';
    favoriteBtn.addEventListener('click', () => {
        addToFavorites(property);
    });
    actions.appendChild(favoriteBtn);
    
    modalContent.appendChild(actions);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Add property to favorites
function addToFavorites(property) {
    if (!currentUser.id) {
        alert('Vui lòng đăng nhập để thêm vào yêu thích');
        return;
    }
    
    favorites.add(property.id);
    alert('Đã thêm vào mục yêu thích');
    updateAnalytics();
}

// Update analytics display
function updateAnalytics() {
    if (propertiesViewedSpan) {
        propertiesViewedSpan.textContent = propertiesViewed;
    }
    
    if (favoritesSavedSpan) {
        favoritesSavedSpan.textContent = favorites.size;
    }
}

// Handle user authentication
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        currentUser.id = user.id;
        currentUser.username = user.username;
        currentUser.email = user.email;
        
        // Update account link
        const accountLink = document.getElementById('account-link');
        if (accountLink) {
            accountLink.textContent = `Xin chào, ${user.username}`;
            accountLink.href = 'account.html';
        }
    }
}

// User registration
function registerUser(userData) {
    // In a real app, this would send to server
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return true;
}

// User login
function loginUser(email, password) {
    // In a real app, this would validate against server
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.email === email) {
        currentUser.id = user.id;
        currentUser.username = user.username;
        currentUser.email = user.email;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    return false;
}

// User logout
function logoutUser() {
    currentUser.id = null;
    currentUser.username = null;
    currentUser.email = null;
    localStorage.removeItem('currentUser');
    
    // Update account link
    const accountLink = document.getElementById('account-link');
    if (accountLink) {
        accountLink.textContent = 'TÀI KHOẢN';
        accountLink.href = 'account.html';
    }
}

// Mortgage calculator functionality
function calculateMortgage() {
    const propertyPrice = parseFloat(document.getElementById('propertyPrice').value);
    const downPaymentPercent = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);
    
    if (isNaN(propertyPrice) || isNaN(downPaymentPercent) || isNaN(interestRate) || isNaN(loanTerm)) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }
    
    const downPayment = propertyPrice * (downPaymentPercent / 100);
    const loanAmount = propertyPrice - downPayment;
    const monthlyInterest = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = loanAmount * (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) / 
                          (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    
    const resultDiv = document.getElementById('mortgageResult');
    resultDiv.innerHTML = `
        <div class="mortgage-result">
            <h4>KẾT QUẢ TÍNH TOÁN</h4>
            <p><strong>Tiền vay:</strong> ${loanAmount.toLocaleString('vi-VN')} VND</p>
            <p><strong>Trả hàng tháng:</strong> ${monthlyPayment.toLocaleString('vi-VN', {maximumFractionDigits: 0})} VND</p>
            <p><strong>Tổng tiền trả:</strong> ${totalPayment.toLocaleString('vi-VN')} VND</p>
            <p><strong>Tổng tiền lãi:</strong> ${totalInterest.toLocaleString('vi-VN')} VND</p>
        </div>
    `;
}

// Handle property favorites
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('favorite-btn')) {
        e.preventDefault();
        const propertyId = e.target.dataset.propertyId;
        toggleFavorite(propertyId);
    }
});

// Toggle favorite status
function toggleFavorite(propertyId) {
    if (!currentUser.id) {
        alert('Vui lòng đăng nhập để thêm vào yêu thích');
        return;
    }
    
    const btn = event.target;
    if (favorites.has(propertyId)) {
        favorites.delete(propertyId);
        btn.classList.remove('favorited');
    } else {
        favorites.add(propertyId);
        btn.classList.add('favorited');
    }
    updateAnalytics();
}

// Handle modal closing
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.remove();
    }
});
