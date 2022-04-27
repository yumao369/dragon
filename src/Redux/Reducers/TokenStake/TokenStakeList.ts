import * as types from "Constants/ActionTypes"

type ActionType = {
    type : string,
    data: any[],
}

const initState = {

}

export const TokenStakeList = (preState = [initState],action:ActionType)=>{
    try{
        const {
            type,
            data,
        } = action
        switch( type ){
            case types.INIT_TOKEN_STAKE_LIST:
                return [...data];

            default:
                return preState;
        }
    }catch(err){
        console.log( err )
    }finally{
        console.log( "TokenStakeListStore" )
    }
}