document.addEventListener("DOMContentLoaded", function() {
  loadRestaurants();
})

function loadRestaurants() {
  return fetch("http://localhost:3000/restaurants")
  .then(function(response) {
    return response.json();
  })
  .then(function(obj) {
    obj.forEach(restaurant => createDiv(restaurant))
  })
}

function createDiv(restaurant) {
  let rest = new Restaurant(restaurant.name, restaurant.location, restaurant.price_range, restaurant.reviews);
  let main = document.querySelector('main');
  let div = document.createElement('div');
  let p = document.createElement('p');
  let ul = document.createElement('ul');
  let input = document.createElement('input');
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Add a review");
  rest.reviews.forEach(review => {
    let li = document.createElement('li');
    li.innerText = review.content;
    ul.appendChild(li);
  })
  p.innerText = rest.name;
  div.appendChild(p);
  ul.appendChild(input);
  div.appendChild(ul);
  main.appendChild(div);
}

class Restaurant {
  constructor(name, location, priceRange, reviews) {
    this.name = name;
    this.location = location;
    this.priceRange = priceRange;
    this.reviews = reviews
  }
}
