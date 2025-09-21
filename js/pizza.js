// Fetch pizza data from Forkify API
async function fetchPizzaMenu() {
  const container = document.getElementById('pizza-container');
  
  try {
    const response = await fetch('https://forkify-api.herokuapp.com/api/search?q=pizza');
    const data = await response.json();
    
    if (data.recipes && data.recipes.length > 0) {
      displayPizzas(data.recipes);
    } else {
      container.innerHTML = `
        <div class="col-12 text-center">
          <p class="fs-4">No pizzas found. Please try again later.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error fetching pizza data:', error);
    container.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-danger">Failed to load menu. Please check your connection and try again.</p>
      </div>
    `;
  }
}

// Display pizzas in the container
function displayPizzas(pizzas) {
  const container = document.getElementById('pizza-container');
  container.innerHTML = ''; // Clear loading spinner
  
  pizzas.forEach(pizza => {
    const pizzaCard = createPizzaCard(pizza);
    container.innerHTML += pizzaCard;
  });
}

// Generate a random price between min and max
function getRandomPrice(min, max) {
  const price = Math.random() * (max - min) + min;
  return price.toFixed(2);
}

// Create HTML for a single pizza card
function createPizzaCard(pizza) {
  // Generate varied prices based on pizza title length and random factor
  const basePrice = (pizza.title.length % 5) + 8; // Base price between 8-12
  const randomFactor = 0.8 + Math.random() * 0.4; // Random factor between 0.8-1.2
  const price = (basePrice * randomFactor).toFixed(2);
  
  // Create a random rating between 3.5 and 5
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  
  // Create star icons based on rating
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  
  // Determine pizza size based on price
  let size = 'Medium';
  if (price < 9) size = 'Personal';
  if (price > 13) size = 'Family';
  
  // Generate description based on pizza name
  const descriptions = [
    `Hand-tossed ${size.toLowerCase()} pizza with our signature sauce and premium toppings.`,
    `Freshly baked ${size.toLowerCase()} pizza with a perfect blend of cheeses and fresh ingredients.`,
    `Our famous ${size.toLowerCase()} pizza, made with love and the finest ingredients.`,
    `${size} sized pizza with a crispy crust and generous toppings.`
  ];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  return `
    <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div class="pizza-card">
        <div class="pizza-img-container">
          <img src="${pizza.image_url}" alt="${pizza.title}" class="pizza-img">
          <span class="pizza-badge">Popular</span>
        </div>
        <div class="pizza-content">
          <h3 class="pizza-title">${pizza.title} <span class="pizza-size">${size}</span></h3>
          <p class="pizza-description">${description}</p>
          <div class="pizza-meta">
            <span class="pizza-price">$${price}</span>
            <span class="pizza-rating" title="${rating} out of 5">
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
  
  // Fetch and display pizzas
  fetchPizzaMenu();
});
