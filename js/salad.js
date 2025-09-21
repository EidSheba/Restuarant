// Fetch salad dishes from Forkify API
async function fetchSaladMenu() {
  const container = document.getElementById('salad-container');
  
  try {
    const response = await fetch('https://forkify-api.herokuapp.com/api/search?q=salad');
    const data = await response.json();
    
    if (data.recipes && data.recipes.length > 0) {
      displaySaladDishes(data.recipes);
    } else {
      container.innerHTML = `
        <div class="col-12 text-center">
          <p class="fs-4">No salad dishes found. Please try again later.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error fetching salad dishes:', error);
    container.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-danger">Failed to load menu. Please check your connection and try again.</p>
      </div>
    `;
  }
}

// Display salad dishes in the container
function displaySaladDishes(dishes) {
  const container = document.getElementById('salad-container');
  container.innerHTML = ''; // Clear loading spinner
  
  dishes.forEach(dish => {
    const dishCard = createSaladDishCard(dish);
    container.innerHTML += dishCard;
  });
}

// Generate a random price between min and max
function getRandomPrice(min, max) {
  const price = Math.random() * (max - min) + min;
  return price.toFixed(2);
}

// Get a random salad type
function getSaladType() {
  const types = ['Garden', 'Caesar', 'Greek', 'Cobb', 'Caprese', 'Waldorf', 'Nicoise', 'Chef'];
  return types[Math.floor(Math.random() * types.length)];
}

// Get random health labels
function getHealthLabels() {
  const allLabels = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'Keto',
    'High-Protein', 'Low-Calorie', 'Paleo', 'Whole30', 'Sugar-Conscious', 'Mediterranean'
  ];
  
  // Get 2-4 random unique labels
  const count = 2 + Math.floor(Math.random() * 3);
  const shuffled = [...allLabels].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Get random ingredients for the salad
function getSaladIngredients() {
  const bases = ['Mixed Greens', 'Romaine', 'Spinach', 'Arugula', 'Kale'];
  const proteins = ['Grilled Chicken', 'Shrimp', 'Salmon', 'Tofu', 'Chickpeas', 'Quinoa', 'Hard-Boiled Eggs'];
  const toppings = [
    'Cherry Tomatoes', 'Cucumber', 'Red Onion', 'Avocado', 'Feta Cheese', 'Walnuts',
    'Cranberries', 'Pumpkin Seeds', 'Sunflower Seeds', 'Carrots', 'Bell Peppers'
  ];
  const dressings = [
    'Balsamic Vinaigrette', 'Ranch', 'Caesar', 'Honey Mustard', 'Lemon Tahini',
    'Greek Dressing', 'Italian Dressing', 'Avocado Lime'
  ];
  
  const base = bases[Math.floor(Math.random() * bases.length)];
  const protein = Math.random() > 0.3 ? proteins[Math.floor(Math.random() * proteins.length)] : null;
  const numToppings = 3 + Math.floor(Math.random() * 4);
  const selectedToppings = [];
  
  // Ensure unique toppings
  const availableToppings = [...toppings];
  for (let i = 0; i < Math.min(numToppings, availableToppings.length); i++) {
    const randomIndex = Math.floor(Math.random() * availableToppings.length);
    selectedToppings.push(availableToppings.splice(randomIndex, 1)[0]);
  }
  
  const dressing = dressings[Math.floor(Math.random() * dressings.length)];
  
  return {
    base,
    protein,
    toppings: selectedToppings,
    dressing
  };
}

// Create HTML for a single salad dish card
function createSaladDishCard(dish) {
  // Generate varied prices based on title length and random factor
  const basePrice = (dish.title.length % 5) + 10; // Base price between 10-14
  const randomFactor = 0.8 + Math.random() * 0.4; // Random factor between 0.8-1.2
  const price = (basePrice * randomFactor).toFixed(2);
  
  // Create a random rating between 3.5 and 5
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  
  // Get salad details
  const saladType = getSaladType();
  const healthLabels = getHealthLabels();
  const { base, protein, toppings, dressing } = getSaladIngredients();
  
  // Create description
  let description = `Fresh ${base} salad`;
  if (protein) description += ` with ${protein.toLowerCase()}`;
  description += `, topped with ${toppings.join(', ').toLowerCase()}.`;
  description += ` Served with our house ${dressing.toLowerCase()}.`;
  
  // Create ingredients list
  const ingredientsList = [base, ...(protein ? [protein] : []), ...toppings, dressing];
  
  return `
    <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div class="salad-card">
        <div class="salad-img-container">
          <img src="${dish.image_url}" alt="${dish.title}" class="salad-img">
          <span class="salad-badge">${saladType}</span>
        </div>
        <div class="salad-content">
          <h3 class="salad-title">${dish.title} <span class="salad-type">${saladType}</span></h3>
          
          <div class="health-labels">
            ${healthLabels.map(label => `<span class="health-label">${label}</span>`).join('')}
          </div>
          
          <p class="salad-description">${description}</p>
          
          <div class="salad-ingredients">
            <strong>Includes:</strong> ${ingredientsList.join(', ').toLowerCase()}
          </div>
          
          <div class="salad-meta">
            <span class="salad-price">$${price}</span>
            <span class="salad-rating" title="${rating} out of 5">
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
  
  // Fetch and display salad dishes
  fetchSaladMenu();
});
