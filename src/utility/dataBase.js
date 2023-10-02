import {cloneDeep} from 'lodash'

/**
 * This class is a singleton that contains all the data of the application.
 * @class
 */
export default class DataBase {
    static _instance = null

    /**
     * Returns A singleton instance of the class.
     * @constructor
     * @return {null}
     */
    static getInstance() {
        if (DataBase._instance == null) {
            DataBase._instance = new DataBase()
        }
        return DataBase._instance
    }

    /**
     * Destroys the singleton instance.
     */
    static destroy() {
        DataBase._instance = null
    }

    /**
     * Constructor of the class.
     * @constructor
     */
    constructor() {
        if (!DataBase._instance) {
            this.entities = {
            }
        } else {
            throw new Error("Error: Instantiation failed: Use DataBase.getInstance() instead of new.")
        }
    }

    /**
     * Add an entity to the database
     * @param entity_name {string} the name of the entity
     * @param entity_data {Array<Object>} the data of the entity (by default empty)
     */
    setEntity(entity_name, entity_data = []) {
        if(!entity_data instanceof Array) {
            throw new Error("Error: entity_data must be an array")
        }

        if(!entity_data.every(e => e instanceof Object)) {
            throw new Error("Error: entity_data must be an array of objects")
        }

        this.entities[entity_name] = cloneDeep(entity_data)
    }

    /**
     * Get the data of an entity
     * @param entityName {string} the name of the entity
     * @return {Array<Object>} the data of the entity
     */
    getEntity(entityName) {
        if (this.entities.hasOwnProperty(entityName)) {
            return cloneDeep(this.entities[entityName])
        } else {
            this.setEntity(entityName)
        }
    }

    /**
     * Add data to an entity
     * @param entityName {string} the name of the entity
     * @param entityObject {Object} the data to add
     */
    addEntityObject(entityName, entityObject) {
        if (!this.entities.hasOwnProperty(entityName)) {
            this.setEntity(entityName)
        }
        this.entities[entityName].push(cloneDeep(entityObject))
    }
    /**
     * Delete data to an entity
     * @param entityName {string} the name of the entity
     * @param entityObject {Object} the data to delete
     */
    deleteEntityObject(entityName, entityObject) {
        if (!this.entities.hasOwnProperty(entityName)) {
            this.setEntity(entityName)
        }
        this.entities[entityName] = this.entities[entityName].filter(e => e.id !== entityObject.id)
    }
    /**
     * Update data to an entity
     * @param entityName {string} the name of the entity
     * @param entityObject {Object} the data to update
     */
    updateEntityObject(entityName, entityObject) {
        if (!this.entities.hasOwnProperty(entityName)) {
            this.setEntity(entityName)
        }
        //replace data in the entity from entityObject in this.entities[entityName]
        this.entities[entityName] = this.entities[entityName].map(e => e.id === entityObject.id ? entityObject : e)
    }
}
