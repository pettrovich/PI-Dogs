const {Dog} = require('../db');
const {getTemperamentIdByName} = require('./getTemperaments'); 

async function postDog (name,height,weight,lifespan,temperaments,res) {
    if (!name || !height || !weight)
        return res.status(404).send('Falta enviar datos obligatorios');
    const dog = Dog.build({name,height,weight,lifespan});
    await dog.save();
    const promiseArray = temperaments.map(temperament => getTemperamentIdByName(temperament)
                                                            .then(id => dog.addTemperament(id)));
    await Promise.all(promiseArray);
    return res.status(201).json(dog);
}

module.exports={postDog};