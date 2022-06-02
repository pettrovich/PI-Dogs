const {Router} = require('express');
const {postDog} = require("../controllers/postDog");
const router = Router();

router.post('/', async (req,res) => {
    const {name,height,weight,lifespan,temperaments} = req.body;
    return await postDog(name,height,weight,lifespan,temperaments,res);
});

module.exports = router;