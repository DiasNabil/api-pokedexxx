import { Pokemon} from "../db/sequelize.js";

export default (app)=>{
    app.put('/api/pokemons/:id' , (req,res)=>{

        const id = req.params.id
        /**
         * permet d'appliquer des modif a un pokemon en base de donnée 
         * elle retourne une reponse mais la reponse ne contien pas les donnée du pokemon en question
         */
        Pokemon.update(req.body, {
            where: {id : id}
        })
            .then(_ => {
                /** on recup le pokemon grace a l'id pour l'afficher coté client */
                Pokemon.findByPk(id)
                    .then(pokemon => {
                        const message = `le pokemon ${pokemon.name} a été maj`
                        res.json({message, data: pokemon})
                    })
            })
    })
}