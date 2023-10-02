import DataBase    from '../../utility/dataBase'
import {cloneDeep} from 'lodash'

/**
 * Base class for all entities.
 * @class EntityModel
 */
export default class EntityModel {

    /**
     * @constructor
     * @param entityName {string} The name of the entity.
     */
    constructor(entityName) {
        this.entityName = entityName
    }

    /**
     * Get all
     * @return {Array<Object>}
     */
    static findAll(callBack= () => true) {
        return DataBase
            .getInstance()
            .getEntity(this.ENTITY_TYPE)
            .filter(callBack)
            .map(object => new this(object))
    }

    /**
     * Save entity.
     */
    save() {
        return DataBase
            .getInstance()
            .addEntityObject(this.entityName, this.toJson())
    }
    /**
     * Delete entity.
     */
    delete() {
        return DataBase
            .getInstance()
            .deleteEntityObject(this.entityName, this.toJson())
    }
    /*
    * Update entity in db only the fields that are not null
    * @param data {Object} the data to update
     */
    update(data) {
        // return DataBase
        //     .getInstance()
        //     .updateEntityObject(this.entityName, data)
        const entityToUpdate = DataBase
            .getInstance()
    }

    /**
     * Export entity to json.
     */
    toJson() {
        let object = {}

        Object.keys(this).forEach(key => {
            if (key !== 'entityName') {
                object[key] = cloneDeep(this[key])
            }
        })

        return object
    }
}
