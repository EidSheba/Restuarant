// Fetch chicken dishes from Forkify API
async function fetchChickenMenu() {
  const container = document.getElementById('chicken-container');
  
  try {
    const response = await fetch('https://forkify-api.herokuapp.com/api/search?q=chicken');
    const data = await response.json();
    
    if (data.recipes && data.recipes.length > 0) {
      displayChickenDishes(data.recipes);
    } else {
      container.innerHTML = `
        <div class="col-12 text-center">
          <p class="fs-4">No chicken dishes found. Please try again later.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error fetching chicken dishes:', error);
    container.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-danger">Failed to load menu. Please check your connection and try again.</p>
      </div>
    `;
  }
}

// Display chicken dishes in the container
function displayChickenDishes(dishes) {
  const container = document.getElementById('chicken-container');
  container.innerHTML = ''; // Clear loading spinner
  
  dishes.forEach(dish => {
    const dishCard = createChickenDishCard(dish);
    container.innerHTML += dishCard;
  });
}

// Generate a random price between min and max
function getRandomPrice(min, max) {
  const price = Math.random() * (max - min) + min;
  return price.toFixed(2);
}

// Get a random dish type
function getDishType() {
  const types = ['Grilled', 'Fried', 'Baked', 'Roasted', 'BBQ', 'Crispy', 'Spicy'];
  return types[Math.floor(Math.random() * types.length)];
}

// Get a random cooking style
function getCookingStyle() {
  const styles = [
    'with herbs and spices',
    'with special sauce',
    'marinated in secret recipe',
    'with garlic butter',
    'with lemon pepper',
    'in rich gravy',
    'with creamy sauce'
  ];
  return styles[Math.floor(Math.random() * styles.length)];
}

// Create HTML for a single chicken dish card
function createChickenDishCard(dish) {
  // Generate varied prices based on title length and random factor
  const basePrice = (dish.title.length % 5) + 10; // Base price between 10-14
  const randomFactor = 0.8 + Math.random() * 0.4; // Random factor between 0.8-1.2
  const price = (basePrice * randomFactor).toFixed(2);
  
  // Create a random rating between 3.5 and 5
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  
  // Create star icons based on rating
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  
  // Determine dish type and description
  const dishType = getDishType();
  const cookingStyle = getCookingStyle();
  
  const descriptions = [
    `${dishType} chicken ${cookingStyle}, served with fresh vegetables and your choice of side.`,
    `Juicy ${dishType.toLowerCase()} chicken ${cookingStyle}, perfectly seasoned and cooked to perfection.`,
    `Our signature ${dishType.toLowerCase()} chicken ${cookingStyle}, a customer favorite.`,
    `Tender ${dishType.toLowerCase()} chicken ${cookingStyle}, prepared with the finest ingredients.`
  ];
  
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  return `
    <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div class="chicken-card">
        <div class="chicken-img-container">
          <img src="${dish.image_url}" alt="${dish.title}" class="chicken-img">
          <span class="chicken-badge">${dishType}</span>
        </div>
        <div class="chicken-content">
          <h3 class="chicken-title">${dish.title} <span class="chicken-type">${dishType}</span></h3>
          <p class="chicken-description">${description}</p>
          <div class="chicken-meta">
            <span class="chicken-price">$${price}</span>
            <span class="chicken-rating" title="${rating} out of 5">
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
  
  // Fetch and display chicken dishes
  fetchChickenMenu();
});
