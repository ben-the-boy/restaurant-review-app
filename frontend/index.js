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
  let rest = new Restaurant(restaurant.name, restaurant.location, restaurant.price_range, restaurant.image_url, restaurant.reviews);
  let main = document.querySelector('main');
  let div = document.createElement('div');
  let p = document.createElement('p');
  let ul = document.createElement('ul');
  let input = document.createElement('input');
  let img = document.createElement('img');
  let button = document.createElement('button');
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Write a review");
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
  /*button.addEventListener('click', function() {
    let content = ;
    let rating = ;
    let restaurantID = ;
    let review = new Review();
    addReview(review);
  });*/
  div.appendChild(p);
  div.appendChild(img);
  ul.appendChild(input);
  addRatingSelector(ul);
  ul.appendChild(button);
  div.appendChild(ul);
  main.appendChild(div);
}

class Restaurant {
  constructor(name, location, priceRange, imageURL, reviews) {
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

}

function addRatingSelector(ul) {
  let values = ["",1,2,3,4,5];
  let select = document.createElement('select');
  select.name = "rating";
  select.id = "rating";
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
