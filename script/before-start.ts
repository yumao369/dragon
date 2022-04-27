import fs from "fs"
import path from "path"
import {Command} from "commander"
import HDWalletProvider from "@truffle/hdwallet-provider"
import Web3 from "web3"
/********************************************************************************命令行参数************************************************************************************/
const program = new Command();
program
    .usage('<command> [options]')
    .option("-D, --ContractFileDir <string>","文件路径","../../contracts")
    .option("-E, --ContractENV <string>","编译环境","dragonaire_local")
    .option("-N, --newDir <string>","写入目录","../src/Common/Contract/abis/")
    .option("-J, --JsonConfigDir <string>","配置目录","../src/Common/JsonConfig")
    .option("-S, --ServerIp <string>","请求IP地址{ 43.154.239.90 | 43.154.154.22 }","43.154.239.90")
    .option("-C, --chainID <string>","链ID","1337")
    .option("-M, --chainName <string>","链名称","本地测试链")
    .option("-G, --gasLimit <number>","gasLimit","8000000")
    .option('-K, --PublicKey <string>', '输入公钥地址',"0xC50A949A6136F25a7640252C4f32101dd05A9589")
    .option('-P, --PrivateKey <string>', '输入地址私钥',"6feb9cb62ac9ae4c5b17367135c61a8a457db4a36e2c9a9732a2b8ea299e6810")
    .option('-W, --providersWss <string>', 'ProviderWss',"ws://43.154.239.90:8546")
    .option('-R, --RPCRequest <string>', 'RPC地址',"http://43.154.239.90:8545");
program.parse();
//获取参数
const cliParam = program.opts();
/*********************************************************************************命令行参数***********************************************************************************/
type GetFileType = {
    oldFile: string,
    fileName: string,
    newFile: string,
}
type PlanType = {
    id?: number,
    state: number,
    duration: number,
    durationTitle?: string, 
    multiplierDecimals: number,
    multiplier: number,
    multiplierScale?: number,
}
/*********************************************************************************配置参数***********************************************************************************/
const provider = new HDWalletProvider(
    [cliParam.PrivateKey],
    cliParam.RPCRequest
);
const web3Provider = new Web3( provider );
/*********************************************************************************配置参数***********************************************************************************/

//拷贝ABI文件
const copyFile = async()=>{
    try{
        //递归获取文件
        const getFiles = async(currentPath:string,currentFiles:GetFileType[])=>{
            const files = fs.readdirSync(currentPath);
            for( const item of files ){
                const levelFiles = path.resolve(currentPath,item);
                const stat = fs.lstatSync(levelFiles);
                if( stat.isFile() ){
                    const oldFile = levelFiles;
                    const fileName = item;
                    const newFile = path.resolve(__dirname,`${cliParam.newDir}/${item}`);
                    currentFiles.push({
                        oldFile,
                        fileName,
                        newFile,
                    })
                }
                if( stat.isDirectory() ) getFiles(levelFiles,currentFiles)
            }
        }
        let fileArr:GetFileType[] = [];
        getFiles(path.resolve(__dirname,`${cliParam.ContractFileDir}/${cliParam.ContractENV}`),fileArr);
        for( const fileObj of fileArr){
            const fileData = await import(fileObj.oldFile);
            //写入文件
            fs.writeFileSync(fileObj.newFile,JSON.stringify(fileData));
            console.log( `复制${fileObj.oldFile}到${fileObj.newFile}成功！` )
        }
    }catch(err){
        console.log( err )
    }finally{
        console.log("call copyFile")
    }
}

//写入配置文件
const configChain = async()=>{
    //创建目录
    fs.mkdir( path.resolve(__dirname,`${cliParam.JsonConfigDir}`),(err)=>{
        if(err) return;
        console.log("创建目录成功");
    });
    const newPath = path.resolve(__dirname,`${cliParam.JsonConfigDir}/Chain.json`)
    try{
        const saveData = {
           contractDir: path.resolve(__dirname,`${cliParam.newDir}`),
           JsonConfigDir: path.resolve(__dirname,`${cliParam.JsonConfigDir}`),
           chainENV: `${cliParam.ContractENV}`,
           chainId: cliParam.chainID,
           chainName: cliParam.chainName,
           ServerIP: cliParam.ServerIp,
           gasLimit: cliParam.gasLimit,
           providersWss: cliParam.providersWss,
           RPCRequest: cliParam.RPCRequest,
        }
        fs.writeFileSync(newPath,JSON.stringify(saveData));
        console.log(`配置${newPath}文件成功！`);
    }catch(err){
        console.log(err)
    }finally{
        console.log("call configChain");
    }
}

//配置stake选项
const configStakeOption = async()=>{
    //创建目录
    fs.mkdir( path.resolve(__dirname,`${cliParam.JsonConfigDir}`),(err)=>{
        if(err) return;
        console.log("创建目录成功");
    });
    const newPath = path.resolve(__dirname,`${cliParam.JsonConfigDir}/PlanList.json`)
    try{
        const {
            abi,
            networks: {
                1337:{
                    address
                }
            }
        } = await import(path.resolve(__dirname,`${cliParam.ContractFileDir}/${cliParam.ContractENV}/TokenStake.json`));
        const Instance = new web3Provider.eth.Contract(abi,address);
        const stakingPlansCount = await Instance.methods.stakingPlansCount().call();
        let index = 0;
        let storeData:PlanType[] = [];
        while( index < stakingPlansCount ){
            const plan = <PlanType>await Instance.methods.stakingPlans(index).call();
            const {
                state,
                duration,
                multiplierDecimals,
                multiplier,
            } = plan;
            const current:PlanType = {
                id: index,
                state,
                duration: (duration / (3600*24)),
                durationTitle: duration / (3600*24) ? `${(duration / (3600*24))} Days` : `ACTIVE`,
                multiplierDecimals,
                multiplier,
                multiplierScale: multiplier / Math.pow(10,multiplierDecimals)
            }
            storeData.push( current )
            ++index;
        }
        //写入文件
        fs.writeFileSync(newPath,JSON.stringify(storeData));
        console.log(`配置${newPath}文件成功！`);
    }catch(err){
        console.log( err )
    }finally{
        console.log("call configStakeOption");
    }
}

(async()=>{
    //拷贝文件
    await copyFile();

    //配置链文件
    await configChain();

    //配置stake选项
    await configStakeOption();

    setTimeout( ()=>{
        process.exit(0);
    },1000 )
})()