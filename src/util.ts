import { deepStrictEqual } from "assert";

export const equals = (a, b): boolean => {
    try{
        deepStrictEqual(a, b);
        return true;
    }catch (e){
        return false;
    }
};