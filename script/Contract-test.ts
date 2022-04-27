import path from "path"
import Web3 from "web3"
import BigNumber from "bignumber.js"
import { Command } from "commander"
import HDWalletProvider from "@truffle/hdwallet-provider"
/********************************************************************************命令行参数************************************************************************************/
const program = new Command();
program
    .usage('<command> [options]')
    .option("-D, --ContractFileDir <string>", "文件路径", "./Config/")
    .option("-F, --ContractFileName <string>", "文件名", "DAREToken.json")
    .option("-S, --ServerIp <string>", "请求IP地址{ 43.154.239.90 | 43.154.154.22 }", "43.154.239.90")
    .option("-G, --gasLimit <number>", "gasLimit", "8000000")
    .option('-K, --PublicKey <string>', '输入公钥地址', "0xC50A949A6136F25a7640252C4f32101dd05A9589")
    .option('-P, --PrivateKey <string>', '输入地址私钥', "6feb9cb62ac9ae4c5b17367135c61a8a457db4a36e2c9a9732a2b8ea299e6810")
    .option('-R, --RPCRequest <string>', 'RPC地址', "http://43.154.239.90:8545");
program.parse();
//获取参数
const cliParam = program.opts();
console.log(cliParam)
/*********************************************************************************命令行参数***********************************************************************************/

/**********************************************************************************配置****************************************************************************************/
const ContractDir = path.resolve(__dirname, cliParam.ContractFileDir);
console.log(ContractDir)
const provider = new HDWalletProvider(
    [cliParam.PrivateKey],
    cliParam.RPCRequest
);
const web3Provider = new Web3(provider);
/**********************************************************************************配置****************************************************************************************/

//调用合约
const getCallMethods = async () => {
    const fileName = path.resolve(ContractDir, cliParam.ContractFileName);
    try {
        const {
            abi,
            networks: {
                1337: {
                    address,
                }
            }
        } = await import(fileName);
        const Instance = new web3Provider.eth.Contract(abi, address);
        const decimals = await Instance.methods.decimals().call();
        const amount = new BigNumber(await Instance.methods.balanceOf(cliParam.PublicKey).call()).dividedBy(new BigNumber(Math.pow(10, decimals))).toFixed();
        console.log("余额", amount);
    } catch (err) {
        console.log(err)
        return false;
    } finally {
        console.log(`调用合约${fileName}`);
    }
}

const getSendMethods = async () => {
    const fileName = path.resolve(ContractDir, cliParam.ContractFileName);
    try {
        const {
            abi,
            networks: {
                1337: {
                    address,
                }
            }
        } = await import(fileName);
        const Instance = new web3Provider.eth.Contract(abi, address);
        const res = await Instance.methods.mint(cliParam.PublicKey, (new BigNumber(10000 * Math.pow(10, 18))).toFixed()).send({
            from: cliParam.PublicKey,
            gas: cliParam.gasLimit,
        });
        console.log("交易记录：")
        console.log(res);
    } catch (err) {
        console.log(err)
        return false;
    } finally {
        console.log(`调用合约${fileName}`);
    }
}


(async () => {
    console.log("输入参数:");
    console.log(cliParam);
    console.log("=======================================================================================================================")
    console.log("调用call方法:")
    await getCallMethods();
    console.log("=======================================================================================================================")
    console.log("调用send方法:")
    //await getSendMethods();
    console.log("=======================================================================================================================")
    process.exit(0);
})()