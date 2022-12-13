import { DataTypes, Sequelize } from 'sequelize';
import PokemonModel from '../models/pokemon.js'
import pokemons from '../db/mock-pokemon.js'

/**
 * Sequelize: ORM qui permet d'interagir avec une base de donnée directement en JS, cad qu'il s'ocp de faire la traduction des instructions en JS vers du SQL pour la BD
 * instance sequilize qui permet la connection a la base de donnée 
 */
export const sequelize = new Sequelize(
    
    /**le nom de la db qu'on veut crée */
    'pokedexxx',

    /** id permettant l'acces a la db par defaute = root */
    'root',

    /**mdp permettant l'acces a la db par defaut '' */
    '',

    /** objet de configuration 
     * element obligatoire:
     * host: ou se trouve la db sur le pc
     * dialect: nom du driver utiliser permettant a sequelize de d'interagir avec la db
     */
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

/** instanciation du model pokemon => creation de la table pokemons associé au model pokemon */
export const Pokemon = PokemonModel(sequelize , DataTypes)


export const initDb = () =>{

    /** synchronisation davec la base de donée => maj de la db */
return sequelize.sync({force: true})
    .then(_ => {
       pokemons.forEach(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            })
        })
        console.log('db "pokedexxx" initialisée')
    })


}