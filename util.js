export default class Observable{
    constructor (object, callback){
        this.object = object;
        this.callback = callback;
    }

    set(object){
        this.object = object;
        this.callback();
    }

    get get(){
        return this.callback();
    }
}