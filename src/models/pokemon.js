/**
 * model : objet javascript fournis par sequelize qui respresente une TABLE dans la db
 * 1 model sequelize = 1 table SQL
 */

export default (sequelize, DataTypes) => {
    /**
     * define: permet de declarer un nouveau model a sequelize, elle prend 3 param afin de crée un model (table): 
     * - le nom du model : sequelize va crée une table a partir de ce nom en le mettant au pluriel
     * - description du model : c'est a dire la definition de toute les colonnes dans la table pokemons en SQL
     * - option de parametrage globale(facultatif): permet de modifier les propriete  par defaut 'createdAt' (renomme en 'create' coté client)
     *  'updatedAt' passer a false pour desactiver la date de modif
     *  'timestamps' passer true modifie le comportement par defaut
     * 
     * dataTypes: permet de definir le type de chaque propriete du model 
     */
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,

        /** method get de sequelize recupere la valeur contenue dans la db qui correspond a 'types' et applique la fonction .split pour renvoyer un tableau
         * Base de donnée -> API rest
        */
        get(){
          return this.getDataValue('types').split(',')
        },

        /** method set de sequelize transforme les tab de types en une chaine de charactere 
         * API rest -> Base de donnée
         */
        set(types){
          return this.setDataValue('types', types.join())
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }