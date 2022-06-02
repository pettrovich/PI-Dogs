const {Dog} = require('../db');

async function postDog (name,height,weight,lifespan,temperaments,res) {
    if (!name || !height || !weight)
        return res.status(404).send('Falta enviar datos obligatorios');
    const dog = Dog.build({name,height,weight,lifespan});
    await dog.save();
    const promiseArray = temperaments.map(temperament => dog.addTemperament(temperament));
    await Promise.all(promiseArray);
    return res.status(201).json(dog);
}

module.exports={postDog};