import * as types from "Constants/ActionTypes"
import {Dispatch} from "redux"
import Web3 from "web3"
import ChinaJson from "Common/JsonConfig/Chain.json"
import TokenStakeJson from "Common/Contract/abis/TokenStake.json"
import BigNumber from "bignumber.js"
import { ChainId } from "types/GlobalTypes"

interface ChainJsonType{
    contractDir: string,
    JsonConfigDir: string,
    chainENV: string,
    chainId: number,
    chainName: string,
    ServerIP: string,
    gasLimit: number,
    providersWss: string,
    RPCRequest: string,
}

//TokenStakeList
export const InitTokenStakeList = (param={})=>{
    return async(dispatch:Dispatch)=>{
        try{
            const ChainConfig = ChinaJson as unknown as ChainJsonType;
            const {
                abi,
                networks:{
                    [ChainConfig.chainId as unknown as ChainId]:{
                        address,
                    }
                }
            } = TokenStakeJson;
            const { ethereum: provider  } = window;
            if (typeof provider === 'undefined') {
                throw new Error("Please install MetaMask to use DAPP");
            }
            await provider.enable();
            const web3MetaMask = new Web3(provider);
            const accounts = await web3MetaMask.eth.requestAccounts();
            const web3Provider = new Web3(  new Web3.providers.WebsocketProvider(ChainConfig.providersWss)  )
            //检查链ID
            const contractChinaId:number = await web3Provider.eth.getChainId();
            if( contractChinaId != ChainConfig.chainId ){
                throw new Error(`Please use the ${ChainConfig.chainName} to login the DAPP`)
            }
            //获取事件
            const {number} = await web3Provider.eth.getBlock("latest");
            const Instance = new web3Provider.eth.Contract(abi as any,address);
            //获取对象
            const allEvent = await Instance.getPastEvents("allEvents",{
                fromBlock:0,
                toBlock:number,
            });
            //获取需要的事件
            const useEvent = ["Staked","Unstaked"];
            type allDataType = {
                event: string,
                blockNumber: number,
                id: number,
                weight: number
            }
            const allData = allEvent.reduce<allDataType[]>( (prev,cur)=>{
                const index = useEvent.findIndex( row => row.toLocaleUpperCase() == cur.event.toLocaleUpperCase() );
                if( index > -1 ){
                    const {
                        event,
                        blockNumber,
                        returnValues:{
                            id,
                        }
                    } = cur;
                    //添加权重
                    const current = event.toLocaleUpperCase() == "Staked".toLocaleUpperCase() ? {
                        event,
                        blockNumber,
                        id,
                        weight: 1,
                    }:{
                        event,
                        blockNumber,
                        id,
                        weight: -1,
                    }
                    return [current, ...prev]
                }
                return prev;
            },[] )
            //计算权重
            const allWeightData = allData.reduce<allDataType[]>( (prev,cur)=>{
                const index = prev.findIndex( (row)=> row.id ==cur.id );
                if( index <= -1 ){
                    prev.push( cur );
                }else{
                    prev[index].weight += cur.weight;
                }
                return prev;
            },[] )
            //筛选权重大于0的订单
            const useWeightData = allWeightData.filter( (row)=>row.weight > 0)
            const useWeightIds = useWeightData.reduce<number[]>( (prev,cur)=>{
                return [cur.id,...prev];
            },[] )
            const currentData = allEvent.reduce<any[]>( (prev,cur)=>{
                const {
                    returnValues: {
                        id,
                    }
                } = cur;
                const index = useWeightIds.findIndex( row  => row as unknown as number == id as unknown as number );
                if( index > -1 ){
                    prev.push( cur );
                }
                return prev;
            },[] )
            //筛选当前账户
            const currentParam = currentData.reduce( (prev,cur)=>{
                const isExists = cur.returnValues.account.toLocaleUpperCase() == accounts[0].toLocaleUpperCase() ? true : false;
                if( isExists ){
                    const {
                        blockNumber,
                        returnValues: {
                            account,
                            amount,
                            duration,
                            id,
                        }
                    } = cur;
                    prev = [{
                        blockNumber,
                        amount:(new BigNumber(amount)).dividedBy(new BigNumber( Math.pow(10,18) )).toFixed() as unknown as number,
                        duration: new BigNumber(duration).dividedBy( new BigNumber(3600*24) ).toFixed() as unknown as number,
                        id,
                    }, ...prev ]
                }
                return prev;
            },[] )
            //获取投票权
            for( const index in currentParam ){
                currentParam[index]["eva"] = new BigNumber(await Instance.methods.votePowerOf(currentParam[index]["id"]).call()).dividedBy(new BigNumber(Math.pow(10,18))).toFixed();
            }
            //console.log( currentParam )
            dispatch({
                type: types.INIT_TOKEN_STAKE_LIST,
                data: currentParam,
            })
            return true;
        }catch(err){
            console.log(err)
            return false;
        }finally{
            console.log( "InitTokenStakeListAction" )
        }
    }
}


interface ParamType{
    amount: number,
    planIndex: number,
}
export const toStake = (param:ParamType)=>{
    return async(dispatch:Dispatch)=>{
        try{
            const ChainConfig = ChinaJson as any as ChainJsonType;
            const {
                abi,
                networks:{
                    [ChainConfig.chainId as unknown as ChainId]:{
                        address,
                    }
                }
            } = TokenStakeJson;
            const { ethereum: provider  } = window;
            if (typeof provider === 'undefined') {
                throw new Error("Please install MetaMask to use DAPP");
            }
            await provider.enable();
            //获取钱包账号
            const web3Provider = new Web3(provider);
            const accounts = await web3Provider.eth.requestAccounts();
            const contractChinaId:number = await web3Provider.eth.getChainId();
            if( contractChinaId != ChainConfig.chainId ){
                throw new Error(`Please use the ${ChainConfig.chainName} to login the DAPP`)
            }
            //创建实例
            const Instance = new web3Provider.eth.Contract(abi as any[],address);
            //获取token
            const TokenAddress = await Instance.methods.token().call();
            window.mui.toast("Token stake, please be patient");
            const amount = new BigNumber(param.amount).multipliedBy(new BigNumber(Math.pow(10,18))).toFixed()
            //授权账户
            await web3Provider.eth.sendTransaction({
                from:accounts[0],
                gas: ChainConfig.gasLimit,
                to: TokenAddress,
                data:web3Provider.eth.abi.encodeFunctionCall({"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","constant":false},[address,amount]),
            })
            //Token State
            await Instance.methods.stake( amount,param.planIndex).send({
                from: accounts[0],
                gasLimit: ChainConfig.gasLimit,
            })
            window.mui.toast("Token stake is successful");
            return true;
        }catch(err){
            console.log(err);
            return false;
        }finally{
            console.log( "toStakeAction" )
        }
    }
}

interface UnStakeParamType{
    id: number,
}
export const unStake = (param:UnStakeParamType)=>{
    return async(dispatch:Dispatch)=>{
        try{
            const ChainConfig = ChinaJson as any as ChainJsonType;
            const {
                abi,
                networks:{
                    [ChainConfig.chainId as unknown as ChainId]:{
                        address,
                    }
                }
            } = TokenStakeJson;
            const { ethereum: provider  } = window;
            if (typeof provider === 'undefined') {
                throw new Error("Please install MetaMask to use DAPP");
            }
            await provider.enable();
            //获取钱包账号
            const web3Provider = new Web3(provider);
            const accounts = await web3Provider.eth.requestAccounts();
            const contractChinaId:number = await web3Provider.eth.getChainId();
            if( contractChinaId != ChainConfig.chainId ){
                throw new Error(`Please use the ${ChainConfig.chainName} to login the DAPP`)
            }
            //创建实例
            const Instance = new web3Provider.eth.Contract(abi as any[],address);
            //获取token
            const TokenAddress = await Instance.methods.token().call();
            window.mui.toast("Token unstake, please be patient");
            //Token State
            await Instance.methods.unstake( param.id).send({
                from: accounts[0],
                gasLimit: ChainConfig.gasLimit,
            })
            window.mui.toast("Token unstake is successful");
            return true;
        }catch(err){
            console.log(err);
            return false;
        }finally{
            console.log( "unStakeAction" )
        }
    }
}
