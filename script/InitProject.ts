import axios from "axios"
import fs from "fs"
import path from "path"
type FileNameType = "ChainLinkRandomGenerator" | "DAEToken" | "DragonaireNFTMarketplace" | "PriceConsumerV3" | "TokensVesting" | "ChainLinkRandomGeneratorV2" | "DAREToken" | "ExchangeAgent" | "RandomTest" | "ContractCaller" | "DragonaireNFTCore" | "ItemFactory" | "RewardsController" | "DAEExchangeAgent" | "DragonaireNFTManager" | "MysteryBoxIssuer" | "StakingRewards" | "NFTLocker";
const fileNames: FileNameType[] = [
    "ChainLinkRandomGenerator",
    "DAEToken",
    "DragonaireNFTMarketplace",
    "PriceConsumerV3",
    "TokensVesting",
    "ChainLinkRandomGeneratorV2",
    "DAREToken",
    "ExchangeAgent",
    "RandomTest",
    "ContractCaller",
    "DragonaireNFTCore",
    "ItemFactory",
    "RewardsController",
    "DAEExchangeAgent",
    "DragonaireNFTManager",
    "MysteryBoxIssuer",
    "StakingRewards",
    "NFTLocker"
];

const ServerConfigDir = path.resolve(__dirname, "./Config/");
const ClientConfigDir = path.resolve(__dirname, "../src/Common/Contract/abis/");

const onFetchContract = async (contractName: FileNameType) => {
    try {
        const res = await axios.get(`http://43.154.239.90/file/${contractName}.json`);
        const { status, data } = res;
        if (status === 200) {
            const fileName1 = path.resolve(ServerConfigDir, `${contractName}.json`);
            const fileName2 = path.resolve(ClientConfigDir, `${contractName}.json`)
            // 注意文件描述符fd
            fs.writeFile(fileName1, JSON.stringify(data), function (err) {
                if (err) {
                    // 出错
                    console.log(err.message)
                    return
                }
                console.log(`写入${fileName1}成功`)
            })
            // 注意文件描述符fd
            fs.writeFile(fileName2, JSON.stringify(data), function (err) {
                if (err) {
                    // 出错
                    console.log(err.message)
                    return
                }
                console.log(`写入${fileName2}成功`)
            })
            return true;
        }
        throw new Error(`请求${contractName}.json失败`);
    } catch (err) {
        console.log(err)
        return false;
    } finally {
        console.log(`初始化${contractName}`)
    }
}


(async () => {
    //清空目录
    fs.rmdir(ServerConfigDir, function (err) {
        if (err) return;
        console.log('删除目录成功');
    })
    fs.rmdir(ClientConfigDir, function (err) {
        if (err) return;
        console.log('删除目录成功');
    })
    //创建目录
    fs.mkdir(ServerConfigDir, function (err) {
        if (err) return;
        console.log('创建目录成功');
    })
    fs.mkdir(ClientConfigDir, function (err) {
        if (err) return;
        console.log('创建目录成功');
    })
    for (const item of fileNames) {
        await onFetchContract(item);
    }
})()




