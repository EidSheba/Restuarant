// Fetch pasta dishes from Forkify API
async function fetchPastaMenu() {
  const container = document.getElementById('pasta-container');
  
  try {
    const response = await fetch('https://forkify-api.herokuapp.com/api/search?q=pasta');
    const data = await response.json();
    
    if (data.recipes && data.recipes.length > 0) {
      displayPastaDishes(data.recipes);
    } else {
      container.innerHTML = `
        <div class="col-12 text-center">
          <p class="fs-4">No pasta dishes found. Please try again later.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error fetching pasta dishes:', error);
    container.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-danger">Failed to load menu. Please check your connection and try again.</p>
      </div>
    `;
  }
}

// Display pasta dishes in the container
function displayPastaDishes(dishes) {
  const container = document.getElementById('pasta-container');
  container.innerHTML = ''; // Clear loading spinner
  
  dishes.forEach(dish => {
    const dishCard = createPastaDishCard(dish);
    container.innerHTML += dishCard;
  });
}

// Generate a random price between min and max
function getRandomPrice(min, max) {
  const price = Math.random() * (max - min) + min;
  return price.toFixed(2);
}

// Get a random pasta type
function getPastaType() {
  const types = ['Spaghetti', 'Penne', 'Fusilli', 'Farfalle', 'Linguine', 'Rigatoni', 'Fettuccine'];
  return types[Math.floor(Math.random() * types.length)];
}

// Get a random sauce type
function getSauceType() {
  const sauces = [
    'Creamy Alfredo', 'Marinara', 'Pesto', 'Arrabbiata', 
    'Carbonara', 'Bolognese', 'Aglio e Olio', 'Pomodoro'
  ];
  return sauces[Math.floor(Math.random() * sauces.length)];
}

// Get a random cooking style
function getCookingStyle() {
  const styles = [
    'al dente', 'with fresh herbs', 'with garlic and olive oil',
    'with a touch of chili', 'with roasted vegetables', 'with parmesan cheese'
  ];
  return styles[Math.floor(Math.random() * styles.length)];
}

// Create HTML for a single pasta dish card
function createPastaDishCard(dish) {
  // Generate varied prices based on title length and random factor
  const basePrice = (dish.title.length % 5) + 12; // Base price between 12-16
  const randomFactor = 0.8 + Math.random() * 0.4; // Random factor between 0.8-1.2
  const price = (basePrice * randomFactor).toFixed(2);
  
  // Create a random rating between 3.5 and 5
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  
  // Get pasta details
  const pastaType = getPastaType();
  const sauceType = getSauceType();
  const cookingStyle = getCookingStyle();
  
  const descriptions = [
    `${pastaType} with ${sauceType.toLowerCase()} sauce, served ${cookingStyle}.`,
    `Homemade ${pastaType.toLowerCase()} in our signature ${sauceType.toLowerCase()} sauce, prepared ${cookingStyle}.`,
    `${sauceType} ${pastaType.toLowerCase()}, cooked to perfection ${cookingStyle}.`,
    `Traditional ${pastaType.toLowerCase()} with ${sauceType.toLowerCase()} sauce, served ${cookingStyle}.`
  ];
  
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  return `
    <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div class="pasta-card">
        <div class="pasta-img-container">
          <img src="${dish.image_url}" alt="${dish.title}" class="pasta-img">
          <span class="pasta-badge">${pastaType}</span>
        </div>
        <div class="pasta-content">
          <h3 class="pasta-title">${dish.title} <span class="pasta-type">${sauceType}</span></h3>
          <p class="pasta-description">${description}</p>
          <div class="pasta-meta">
            <span class="pasta-price">$${price}</span>
            <span class="pasta-rating" title="${rating} out of 5">
              <i class="fas fa-star"></i> ${rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Add Font Awesome for star icons
document.addEventListener('DOMContentLoaded', () => {
  // Add Font Awesome
  const fontAwesome = document.createElement('link');
  fontAwesome.rel = 'stylesheet';
  fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
  document.head.appendChild(fontAwesome);
  
  // Fetch and display pasta dishes
  fetchPastaMenu();
});
