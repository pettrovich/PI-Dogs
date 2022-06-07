const axios = require("axios");
const {Dog,Temperament} = require('../db');
const URL = 'https://api.thedogapi.com/v1/breeds';
const {API_KEY} = process.env;

function getURL(name) {
    // if (name) return `${URL}/search?q=${name}&api_key=${API_KEY}`;
    return `${URL}?api_key=${API_KEY}`;
}

async function getAPIDogList(breedName) {
    const apiResponse = await axios.get(getURL(breedName));
    const apiData = apiResponse.data.map(breed => {
        const {id,name,temperament} = breed;
        const image = breed.image.url;
        const weight = breed.weight.metric + " kg";
        const height = breed.height.metric + " cm";
        const lifespan = breed.life_span;
        const temperaments = temperament ? temperament.split(", ") : [];
        const fromAPI = true;
        return {id,
            name,
            image,
            weight,
            height,
            lifespan,
            fromAPI,
            temperaments}
    });
    return apiData;
}

async function getDBDogList(breedName,breedId) {
    let dogList = [];
    const template = {};
    const attributes = ['id','name','weight','height','lifespan','fromAPI'];
    if (breedName) template.name = breedName;
    if (breedId) template.name = breedId;
    dogList = await Dog.findAll({
        where: template,
        attributes,
        include: {
            model: Temperament,
            attributes: ['name']
        }
    });
    return dogList;
}

async function getAllDogs(res) {
    const dogList1 = await getAPIDogList();
    const dogList2 = await getDBDogList();
    dogList2.forEach(dog => {
        dog.temperaments = dog.Temperaments.map(t => t.name);
        dog.weight = dog.weight + " kg";
        dog.height = dog.height + " cm";
    });
    const dogList = dogList1.concat(dogList2).map(breed => {
        const {id,name,image,temperaments,weight,fromAPI} = breed;
        return {id,name,image,temperaments,weight,fromAPI};
    });
    return  res.json(dogList);
}

async function getDogsByName(name,res) {
    let dogList1 = await getAPIDogList(name);
    dogList1 = dogList1.filter(breed => breed.name.toLowerCase().includes(name.toLowerCase()));
    const dogList2 = await getDBDogList(name);
    const dogList = dogList1.concat(dogList2).map(breed => {
        const {id,name,image,temperaments,weight} = breed;
        return {id,name,image,temperaments,weight};
    });
    if (dogList.length > 0) return res.json(dogList);
    return res.status(404).send("No se encontraron perros con el nombre buscado.")
}

async function getDogsById(id,res) {
    let dogList1 = await getAPIDogList();
    dogList1 = dogList1.filter(dog => dog.id == id);
    const dogList2 = await getDBDogList(null,id);
    const dogList = dogList1.concat(dogList2).map(breed => {
        const {name,image,temperaments,weight,height,lifespan} = breed;
        return {id,name,image,temperaments,weight,height,lifespan};
    });
    if (dogList.length > 0) return res.json(dogList);
    return res.status(404).send("No se encontraron perros con el id buscado.")
}

module.exports={getAllDogs,getDogsByName,getDogsById,getAPIDogList};