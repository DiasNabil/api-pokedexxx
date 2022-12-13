import { Pokemon } from "../db/sequelize.js";

export default (app)=> {
    app.delete('/api/pokemons/:id', (req,res)=> {

    Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            let deletedPokemon = pokemon

            /**
             * method sequelize destroy() permet la suppression d'un element de la table pokemons 
             * renvoi une premosse mais elle ne contient pas les information du pokemon concerné
             */
            Pokemon.destroy({
                where: {id : pokemon.id}
            })
                .then(_ => {
                    const message = `le pokemon ${deletedPokemon.name} a été supprimé`
                    res.json({message, data: deletedPokemon})
                })
        })  
    })
}