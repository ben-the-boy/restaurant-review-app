document.addEventListener("DOMContentLoaded", function() {
  loadRestaurants();
  document.getElementById('add-restaurant').addEventListener('click', function() {
    let name = document.getElementById('new-restaurant-name').value;
    let location = document.getElementById('new-restaurant-location').value;
    let priceRange = document.getElementById('new-restaurant-price').value;
    let imageURL = document.getElementById('new-restaurant-image').value;
    addRestaurant(restaurant);
  })
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
  let rest = new Restaurant(restaurant.id, restaurant.name, restaurant.location, restaurant.price_range, restaurant.image_url, restaurant.reviews);
  let main = document.querySelector('main');
  let div = document.createElement('div');
  let p = document.createElement('p');
  let ul = document.createElement('ul');
  let reviewDiv = document.createElement('div');
  let input = document.createElement('input');
  let img = document.createElement('img');
  let button = document.createElement('button');
  reviewDiv.setAttribute("restaurant-data", `${rest.id}`)
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Write a review");
  input.id = `input-${rest.id}`;
  ul.setAttribute("restaurant-id", `${rest.id}`);
  ul.id = `reviews-${rest.id}`;
  rest.reviews.forEach(review => {
    let li = document.createElement('li');
    li.innerText = `${review.content}
    ${review.rating}/5`;
    ul.appendChild(li);
  })
  p.innerText = `${rest.name} - ${rest.location}
  Price Point: ${rest.priceRange}`;
  img.setAttribute("src", rest.imageURL)
  button.innerText = "Add Review";
  button.setAttribute("restaurant-id", `${rest.id}`);
  button.addEventListener('click', function() {
    let content = document.getElementById(`input-${rest.id}`).value;
    let rating = document.getElementById(`rating-${rest.id}`).value;
    let restaurantID = parseInt(button.getAttribute('restaurant-id'));
    let review = new Review(content, rating, restaurantID);
    addReview(review);
  });
  div.appendChild(p);
  div.appendChild(img);
  reviewDiv.appendChild(input);
  addRatingSelector(reviewDiv);
  reviewDiv.appendChild(button);
  reviewDiv.appendChild(ul);
  div.appendChild(reviewDiv);
  main.appendChild(div);
}

class Restaurant {
  constructor(id, name, location, priceRange, imageURL, reviews) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.priceRange = priceRange;
    this.imageURL = imageURL;
    this.reviews = reviews;
  }
}

class Review {
  constructor(content, rating, restaurantID) {
    this.content = content;
    this.rating = rating;
    this.restaurantID = restaurantID;
  }
}

function addReview(review) {
  return fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "content": review.content,
        "rating": review.rating,
        "restaurant_id": review.restaurantID
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      let ul = document.getElementById(`reviews-${object.restaurant_id}`);
      let li = document.createElement('li');
      li.innerText = `${review.content}
      ${review.rating}/5`;
      ul.appendChild(li);
      document.getElementById(`input-${object.restaurant_id}`).value = "";
      document.getElementById(`rating-${object.restaurant_id}`).value = "";
    })
    .catch(function(error) {
      console.log(error);
    })
}

function addRatingSelector(ul) {
  let values = ["",1,2,3,4,5];
  let select = document.createElement('select');
  select.name = "rating"
  let restID = parseInt(ul.getAttribute('restaurant-data'));
  select.id = `rating-${restID}`;
  values.forEach(value => {
    let option = document.createElement('option');
    option.value = value;
    option.text = value;
    select.appendChild(option);
  })
  let label = document.createElement('label');
  label.innerHTML = "<br>Rating: ";
  label.htmlFor = "rating";
  ul.appendChild(label);
  ul.appendChild(select);
}

function addRestaurant() {
  return fetch("http://localhost:3000/restaurants", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": restaurant.name,
        "location": restaurant.location,
        "price_range": restaurant.priceRange,
        "image_url": restaurant.imageURL
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
    .catch(function(error) {
      console.log(error);
    })
}
}
