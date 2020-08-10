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