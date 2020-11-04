const Web3 = require("web3");
require("dotenv").config();
const Tx = require("ethereumjs-tx").Transaction;

let web3 = new Web3("http://127.0.0.1:7545");

let contractabi = require("../build/contracts/MyToken.json");

let private_key2 = Buffer.from(process.env.private_key2);

let private_key0 = Buffer.from(process.env.private_key0, "hex");

let accounts = async () => {
  let accounts_list = await web3.eth.getAccounts();
  // console.log(accounts_list);

  const contract = new web3.eth.Contract(
    contractabi.abi,
    "0x41361CEEF9a16a12220c9e5d88F3287ad83f22D9",
    {
      from: `${accounts_list[2]}`,
    }
  );

  let send = accounts_list[0].toString();
  let receive = accounts_list[2].toString();

  web3.eth.getTransactionCount(send, (error, count) => {
    const txObject = {
      from: send,
      nonce: web3.utils.toHex(count),
      to: "0x41361CEEF9a16a12220c9e5d88F3287ad83f22D9",
      gasPrice: web3.utils.toHex(3 * 1e9),
      gasLimit: web3.utils.toHex(3000000),
      value: "0x0",
      data: contract.methods.transfer(receive, 100000).encodeABI(),
      chainId: "none",
    };

    let tx = new Tx(txObject);
    tx.sign(private_key0);
    let serializedtx = tx.serialize();

    let sentransaction = async () => {
      // let receipt = await web3.eth.sendSignedTransaction(
      //   "0x" + serializedtx.toString("hex")
      // );
      // console.log(
      //   `Receipt info: \n${JSON.stringify(
      //     receipt,
      //     null,
      //     "\t"
      //   )}\n------------------------`
      // );

      let balanceOf = await contract.methods
        .balanceOf(`${accounts_list[2]}`)
        .call();
      console.log(accounts_list[2] + ` :` + balanceOf);
    };

    sentransaction();
  });
};
accounts();

// let contractcalls = async () => {
//   let name = await contract.methods.name().call();
//   console.log(name);

//   let totalSupply = await contract.methods.totalSupply().call();
//   console.log(totalSupply);

//   //   let approval = await contract.methods
//   //     .approve(`${accounts[1]}`, "100000")
//   //     .send({
//   //       from: `${accounts[0]}`,
//   //     });
//   //   console.log(approval);
//   // let transferFrom = await contract.methods
//   //   .transferFrom(`${accounts[0]}`, `${accounts[2]}`, "100000")
//   //   .send({
//   //     from: `${accounts[1]}`,
//   //   });

//   //   let transfer = await contract.methods
//   //     .transfer(`${accounts[3]}`, "1000")
//   //     .send({
//   //       from: `${accounts[2]}`,
//   //     });

//   //   console.log(transfer);
// };

// contractcalls();
