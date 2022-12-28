
// Mint prices  - Legendary - epic - rare - common   ---  in BNB
var prs = new Array()

// Minted tokens Array
var ma = new Array()

var intervalBI = setInterval(() => {
      console.log('check')
      if (isContractInit) {
            setTimeout(() => {
                  getPriceCookie();

            }, 500);
            clearInterval(intervalBI);
      }
}, 1000);



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





function getPriceCookie() {
      var cookie = $.cookie("mintPrices");
      if (cookie == undefined) {

            myContract.getMintPrices().then(function (res) {
                  prs[0] = Number(parseInt(res[0]._hex)) / 10 ** 18;
                  prs[1] = Number(parseInt(res[1]._hex)) / 10 ** 18;
                  prs[2] = Number(parseInt(res[2]._hex)) / 10 ** 18;
                  prs[3] = Number(parseInt(res[3]._hex)) / 10 ** 18;
                  var expDate = new Date();
                  expDate.setTime(expDate.getTime() + (1 * 60 * 1000));
                  $.cookie("mintPrices", JSON.stringify(prs), { path: '/', expires: expDate })
                  afterPrice()
            })
      } else {
            prs = JSON.parse(cookie);
            console.log('prs:  ' + prs)
            afterPrice()
      }
}

function afterPrice() {


      // var int2 = setInterval(() => {
      //       if (frn != 0) {
      //             window.alert('frn:   ' + frn)
      //             clearInterval(int2);
      //       }
      // }, 1000);

      myContract.getAllMinted().then(function (res) {
            ma = res;
            console.log(ma)
            setCollItems()

      })


}


function setCollItems() {

      document.getElementById('coll-load').style.display = 'none';

      for (let j = 0; j < 21; j++) {
            var arr = [1, 9, 5, 19, 2, 10, 15, 20, 6, 11, 16, 3, 12, 17, 7, 21, 13, 4, 18, 8, 14]
            var tr1 = [19, 20, 21];
            var tr2 = [15, 16, 17, 18];
            var tr3 = [9, 10, 11, 12, 13, 14];
            var tr4 = [1, 2, 3, 4, 5, 6, 7, 8];



            var i = arr[j];
            var tr = getTier(i);
            var trprices = [1, 0.5, 0.1, 0.05]
            var mintPrice = trprices[tr - 1]


            var dis = '';
            if (ma[i]) {
                  dis = 'disabled'
                  mintPrice = '--'
            }



            //console.log('i: ' + i + '   trprice: ' + mintPrice)
            var collItem =
                  `<div class="swiper-slide carousel-item2  col-lg-25">
                                          <div class="item-img-frm d-flex  justify-content-center">
                                                <img class="item-img"
                                                      src="assets/img/Warrior-Collection/assets/${i}.png"
                                                      alt="loading">
                                          </div>
                                          <div class="item-detail">
                                                <div class="d-flex justify-content-between">
                                                      <div class="item-title">
                                                            #${i}
                                                      </div>
                                                      <div class="coll-item-price"> <span id="item-0-price">
                                                                  ${mintPrice}</span> BNB</div>
                                                </div>
                                                <div class="d-flex justify-content-between">
                                                      <div class="item-title">

                                                      </div>
                                                      <div class="coll-item-price-note"> Latest Price</div>
                                                </div>
                                                <br>
                                                <div class="item-des">
                                                      The BOREN. A competent warrior who is skilled to kill in silence. Also capable of commanding a battalion.
                                                </div>
                                                <br>

                                                <div class="item-action d-flex justify-content-between">
                                                      <div class="item-avatar-frm d-flex justify-content-between">
                                                            <a href="https://opensea.io" target="_blank"
                                                                  title="Check NFT on the Opensea">
                                                                  <img src="assets/img/OS.svg" alt="user avatar"
                                                                        class="item-avatar"></a>

                                                            <p class="item-username">
                                                            </p>
                                                      </div>
                                                      <div class="d-flex justify-content-end">
                                                            <button onclick="GoDetail(${i})" target="_blank"
                                                                  class="btn-sec  btn-sm">Details</button>
                                                            &nbsp;&nbsp;
                                                            <button class="btn-main btn-sm" ${dis} >Mint</button>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>`


            document.getElementById('car-frame').innerHTML += collItem

            //console.log('COLL ITEM added number: ' + i)

      }
      //tsc
      document.getElementById('tsc').innerHTML += swiper



      var swiper = new Swiper('.swiper-container', {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20,
            centeredSlides: true,
            speed: 2200,
            loop: true,
            autoplay: {
                  delay: 2500,
                  disableOnInteraction: false,
            },
            pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
            },
            navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
            },
      });
}

function getTier(i) {
      var trb = [8, 14, 18]
      if (i <= trb[0]) {
            return 4
      }
      if (i <= trb[1]) {
            return 3
      }
      if (i <= trb[2]) {
            return 2
      }
      return 1
}

