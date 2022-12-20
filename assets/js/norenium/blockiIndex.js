function minte(id) {
      var tier;
      myContract.getTokenTier(id).then(function (res) {
            tier = ethers.utils.formatEther(res._hex);
            //myContract.getMintPrice

            const options = { value: ethers.utils.parseEther("1.0") }

            console.log(options);
            myContract.testMint(walletAddress, id, options).then(function (res2) {
                  console.info(res2);

            });
      })
}
var tierPrice;

function getPrice(id) {
      myContract.getTokenTier(id).then(function (res) {
            tier = parseInt(res._hex);
            console.log('token-tier-' + id);
            document.getElementById('token-tier-' + id).innerHTML = tier;
            //myContract.getMintPrice
            var tiername;//token-tier-name
            switch (tier) {
                  case 1:
                        tiername = 'Legendary';
                        break;
                  case 2:
                        tiername = 'Epic';
                        break;
                  case 3:
                        tiername = 'Rare';
                        break;
                  case 4:
                        tiername = 'Common';
                        break;

                  default:
                        tiername = 'unknown'
                        break;
            }
            document.getElementById('token-tier-name-' + id).innerHTML = tiername;

            myContract.getMintPrices().then(function (res2) {
                  console.info(parseInt(res2[0]._hex));
                  tierPrice = Number(parseInt(res2[0]._hex) / 1000);

                  document.getElementById('mint-price-' + id).innerHTML = tierPrice;

            })

      })
}



function getTokenOwner(id) {
      myContract.ownerOf(id).then(function (ow) { return ow })
}



