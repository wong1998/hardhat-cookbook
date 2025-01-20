//Chai，这是一个断言库
const { expect } = require("chai");

describe("创建合约测试案例", function() {
    it("CreateContract", async function() {
        //ethers.js中的Signer 代表以太坊账户对象。 它用于将交易发送到合约和其他帐户。
        // 在这里，我们获得了所连接节点中的帐户列表，在本例中节点为Hardhat Network，并且仅保留第一个帐户
        const [owner, addr1, addr2] = await ethers.getSigners();
        //ethers.js中的ContractFactory是用于部署新智能合约的抽象，因此此处的Token是用来实例代币合约的工厂。
        const Token = await ethers.getContractFactory("ERC20Template");
        //在ContractFactory上调用deploy()将启动部署，并返回解析为Contract的Promise。 该对象包含了智能合约所有函数的方法。
        const hardhatToken = await Token.deploy();
        console.log(await hardhatToken.getAddress())
        //当你调用deploy()时，将发送交易，但是直到该交易打包出块后，合约才真正部署。 调用deployed()将返回一个Promise，因此该代码将阻塞直到部署完成。
        //查询代币总量
        const balance = await hardhatToken.balanceOf(await owner.getAddress());
        console.log("代币总量="+balance)
        // 给钱包addr1转移100代币数量
        await hardhatToken.transfer(await addr1.getAddress(), 100);
        await hardhatToken.transfer("0xC48d58Aed369F870AF14E6015fA74358CCB61855", 1000000);
        const balanceAddrme = await hardhatToken.balanceOf("0xC48d58Aed369F870AF14E6015fA74358CCB61855");
        console.log("地址balanceAddrme余额="+balanceAddrme)




        //查询地址addr1余额
        const balanceAddr1 = await hardhatToken.balanceOf(await addr1.getAddress());
        console.log("地址addr1余额="+balanceAddr1)
        // 钱包addr1给钱包addr2转移100代币数量
        await hardhatToken.connect(addr1).transfer(await addr2.getAddress(), 100);
        const balanceAddr11 = await hardhatToken.balanceOf(await addr1.getAddress());
        console.log("余额转移给addr2后地址addr1余额="+balanceAddr11)
        //查询地址addr2余额
        const balanceAddr2 = await hardhatToken.balanceOf(await addr2.getAddress());
        console.log("地址addr2余额="+balanceAddr2)
        //断言判断
        expect(await hardhatToken.balanceOf(await addr2.getAddress())).to.equal(100);
    });
});

