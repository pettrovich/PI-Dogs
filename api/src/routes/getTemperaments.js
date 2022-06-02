const {Router} = require('express');
const {getAllTemperaments} = require("../controllers/getTemperaments");
const router = Router();

router.get('/', async (req,res) => {
    return await getAllTemperaments(res);
});

module.exports = router;