 import {Pokemon} from '../db/sequelize.js';


 export default (app)=> {
    app.get('/api/pokemons', (req,res) => {
        /**
         * method findAll fournis par le model pokemon: retourne un promesse qui contient la liste de tout les pokemon stocker dans la db
         * renvoi une promesse qui contient les infos du pokemon
         */
        Pokemon.findAll()
            .then(pokemons => {
                const message = 'Pokedexxx : '
                res.json({message, data: pokemons})
            })
            .catch(error => console.log(error))
    })
 }