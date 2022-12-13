import { Pokemon } from "../db/sequelize.js";

export default (app) => {
    app.post('/api/pokemons', (req,res)=> {

        /**
         * methode create() permet d'ajouter un nvx pokemon a la table  a partir du model associé
         * renvoi une promesse qui contient les infos du pokemon
         */
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `le pokemon ${pokemon.name} à été ajouté au pokedexxx`
                res.json({message, data: pokemon})
            })
            .catch(error => console.log(error))
    })
}