const {getAPIDogList} = require("./dogs");
const {Temperament} = require('../db');

async function getAPITemperaments() {
    const temperaments = new Set();
    const dogList = await getAPIDogList();
    dogList.forEach(dog => {
        if (dog.temperaments) {
            dog.temperaments.forEach(temperament => temperaments.add(temperament));
        }
    });
    return Array.from(temperaments);
}

function addTemperamentsToDB(temperaments) {
    const promiseArray = temperaments.map(temperament =>
        Temperament.findOrCreate({where: {name: temperament}}));
    return Promise.all(promiseArray);
}

async function getDBTemperaments() {
    return await Temperament.findAll();
}

async function getAllTemperaments(res) {
    const temperamentList = await getAPITemperaments();
    await addTemperamentsToDB(temperamentList);
    const DBTemperamentList = await getDBTemperaments();
    return res.json(DBTemperamentList);
}

module.exports={getAllTemperaments};