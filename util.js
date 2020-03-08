export class Observable{
    constructor (object, callback){
        this.object = object;
        this.callback = callback;
        this.callback();
    }

    set(object){
        this.object = object;
        this.callback();
    }

    get value (){
        return this.object;
    }
}

export const userPrefTemp = {
    size: 4,
    // Hexidecimal in string
    colour: "black"
}

const USER_PREFS = "USER_PREFS";

export function getUserPrefs(){
    return JSON.parse(localStorage.getItem(USER_PREFS)) || userPrefTemp;
}

export function setUserPrefs(userPrefs){
    localStorage.setItem(USER_PREFS, JSON.parse(userPrefs));
}