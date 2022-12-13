import { Pokemon } from "../db/sequelize.js";

export default (app) => {
    app.get('/api/pokemons/:id', (req,res)=> {

        /**
         * methode findByPk permet de retrouver un donnée du tableau via son primary key
         * renvoi une promesse qui contient les infos du pokemon
         */
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                const message = `un ${pokemon.name} sauvage apparait !`
                res.json({message , data: pokemon})
            })
            .catch(error => console.log(error))
    })
}