console.log('%c HI', 'color: firebrick')
const dogImg = () => document.querySelector("#dog-image-container");
const dogBreed = () => document.querySelector("#dog-breeds");
const dropDown = () => document.querySelector("#breed-dropdown");
let dogBreeds = [];


const fetchDogImg = () => {
  fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(images => images.message.forEach(image => displayImg(image)))
}

const displayImg = imageURL =>{
  const img = document.createElement('img');
  img.src = imageURL;
  img.style = "width:500px;height:600px;";
  dogImg().appendChild(img);
}

const fetchBreed = () => {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(breed => {
      dogBreeds = Object.keys(breed.message);
    dogBreeds.forEach(dogBreed => displayDogBreed(dogBreed))
    })
}

const displayDogBreed = (breed) =>{
  const list = document.createElement('li');
  list.textContent = breed;
  dogBreed().appendChild(list);
  list.addEventListener("click", colorChanger)
}


const colorChanger = (e) =>{
  e.target.style.color = "red";
}

const dogSelector = (e) => {
  breedsFirstLetter(e.target.value)
};

const breedsFirstLetter = (e) =>{
  let letterDog = dogBreeds.filter(breed => breed.startsWith(e));
  document.querySelectorAll("li").forEach(e => e.remove(e));
  letterDog.forEach(dog => displayDogBreed(dog));
}



document.addEventListener('DOMContentLoaded', event =>{
  fetchDogImg();
  fetchBreed();
  dropDown().addEventListener('change', dogSelector);
})

