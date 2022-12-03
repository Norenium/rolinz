// This js file operates on the detail.html page.
// It fetches all the token data and displays it to the user.



var maxSupply;
//StartContract();
// $("#btn-mint *").attr("disabled", "disabled").off('click');
var interval = setInterval(() => {
      console.log('check')
      if (isContractInit) {
            setTimeout(() => {
                  fetchAll();

            }, 500);
            clearInterval(interval);
      }
}, 1000);





function fetchAll() {



      myContract.maxSupply().then(function (res) {
            maxSupply = parseInt(res);
            writeAll(maxSupply)

      })
}

function writeAll(number) {
      for (let i = 1; i <= number; i++) {

            var path = "/assets/metadata/" + i + ".json"
            var metadata;
            var ell;
            $.getJSON(path, function (json) {
                  console.log(json); // this will show the info it in firebug console
                  metadata = json;
                  metadata.tierId = Math.random();
                  metadata.tier = 'Common';

                  ell = '<div class="asset-frame row" id="' + i + '"> <div class="col-sm-5"><div class="asset-img-2"><img class="asset-img-file" src="assets/img/ti/' + i + '.png" alt="NFT-number-' + i + '"  ></div></div> <div class="col-sm-7"> <div class="asset-detail"> <div class="asset-name">Warrior ' + metadata.name + '</div> <br> ' +
                        '<div class="col-sm-12"> Token tier: ' + metadata.tierId + ' | <span class="' + metadata.tier + '">' + metadata.tier + '</span> </div><br> <button class="btn-sec btn-sm" id="btn-sell" onclick="GoDetail(' + i + ')">See token details </button> </div> </div> </div>'
                  //assset-descr
                  //document.getElementById('assset-descr').innerHTML += metadata.description;
                  document.getElementById('dest').innerHTML += ell

            });
      }
}
