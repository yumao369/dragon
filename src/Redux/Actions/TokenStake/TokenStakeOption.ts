import * as types from "Constants/ActionTypes"
import PlanListJson from "Common/JsonConfig/PlanList.json"
import { Dispatch } from 'redux';

//INIT_TOKEN_STATE_OPTION
export const InitTokenStateOption = (param = {})=>{
    return async(dispatch:Dispatch)=>{
        try{ 
            const storeData = (PlanListJson  as unknown[]) as StakePlanType[];
            dispatch({
                type: types.INIT_TOKEN_STATE_OPTION,
                data: storeData,
            })
            return true;
        }catch(err){
            console.log(err);
            return false;
        }finally{
            console.log( "InitTokenStateOptionAction" )
        }
    }
}