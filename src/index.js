const axios = require('axios');

// A helper method to pick one value from a list
const getRandomValue = (values) => {
  console.log('Start random value function');
  console.log(`Values check: ${values[0]}`);
  const index = Math.floor(Math.random() * values.length);
  console.log(`Random value return: ${values[index]}`);
  return values[index];
};

const extractToList = (dictionary) =>{
  let breedList = [];
  for (const [breed, subBreeds] of Object.entries(dictionary)){
    if(subBreeds == []){
      breedList.push(breed);
    }else {
      for (let subBreed of subBreeds){
        breedList.push(`${breed}/${subBreed}`);
      }
    }
  }
  return breedList;
};


// Helper method to retrieve a list of breeds
// https://dog.ceo/dog-api/documentation/
// returns a Promise to an array of breed names

const getBreeds = () => {
  return axios
    .get('https://dog.ceo/api/breeds/list/all')
    .then((response)=> {
      return extractToList(response.data.message);
    })
    .catch((error)=>{
      console.log('get breed error');
    });
};

// Helper method to retrieve a random image for a
// specified breed
// https://dog.ceo/dog-api/documentation/breed
// RANDOM IMAGE FROM A BREED COLLECTION
// returns a Promise to a url (string)

const getRandomImageForBreed = (breed) => {
  return axios
    .get(`https://dog.ceo/api/breed/${breed}/images`)
    .then((response)=>{
      const imageList = response.data.message;
      console.log(`randomly selected url: ${getRandomValue(imageList)}`);
      return getRandomValue(imageList);
    })
    .catch((error) => console.log('get random image error'));
};
// use our other helpers to make a function that returns
// a random image from a random breed
// returns a Promise to a url (string)

const getRandomDogImage = () => {
  return getBreeds()
    .then((breeds)=> {
      return breeds;
    })
    .then((breeds) =>{
      console.log(`Starting second then: ${breeds[0]}`);
      const randomBreed = getRandomValue(breeds);
      console.log(`Retuned to second then: ${randomBreed}`);
      return getRandomImageForBreed(randomBreed);
    });
};

// This is the call we would like to make work
// This function should return a Promise to a url (string)
getRandomDogImage()
  .then(url => {
    console.log(url);
  });
