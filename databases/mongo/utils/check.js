/**
 * For helping data transformations with databases
 * @module MongoUtils
 */

/**
 * Add this value to the array if it is not already in the array.
 * 
 * @param {Object[]} array - a list of ObjectIDs from MongoDB 
 * @param {string} value  - the target ObjectID that you are looking to add 
 * @returns {string[]}
 * @
 */
function pushIfNotPresent(array,value){
    if(Array.isArray(array)){
        let present = false;
        for(let i=0; i < array.length; i++){
            if(array[i] === value || String(array[i]) === value){
                present = true;
                break;
            }
        }

        if(!present){
            array.push(value)
        }

        return array;

    }
}

module.exports = {
    pushIfNotPresent
}