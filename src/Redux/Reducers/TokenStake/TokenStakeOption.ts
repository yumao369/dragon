import * as types from "Constants/ActionTypes"

type ActionType = {
    type: string,
    data: StakePlanType[],
}

const initState:StakePlanType = {
    id: 0,
    state: 0,
    duration: 0,
    durationTitle: "", 
    multiplierDecimals: 0,
    multiplier: 0,
    multiplierScale: 0,
}

export const TokenStakeOption = (preState = [initState],action:ActionType)=>{
    try{
        const {
            type,
            data,
        } = action;
        switch( type ){
            case types.INIT_TOKEN_STATE_OPTION:
                return [...data];
            default:
                return preState;
        }
    }catch(err){
        console.log(err)
    }finally{
        console.log( "TokenStakeOptionStore" )
    }
}