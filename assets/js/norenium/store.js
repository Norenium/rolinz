
var interval = setInterval(() => {
      if (isContractInit) {
            setTimeout(() => {
                  getStore();

            }, 500);
            clearInterval(interval);
      }
}, 1000);





function getStore() {
      myContract.getSellRecords().then(function (res) {
            console.info(res)
            document.getElementById('loading').style.display = 'none';
            res.forEach(s => {
                  var can = '';
                  var id = parseInt(s[1]._hex)

                  if (s.Owner == walletAddress) {
                        can = '&nbsp;&nbsp;&nbsp;&nbsp;     <button class="btn-sec"  onclick="cancelSell(' + id + ')" >Cancel sell </button >'
                  }
                  var pr = (Number(parseInt(s[2]._hex))) / 10 ** 18
                  document.getElementById('records').innerHTML += '<div class="sell-asset store-data row">  <div class="col-sm-4 col-xs-12"> <div class="asset-img"> <img class="asset-img-file" src="assets/img/ti/' + id + '.png" alt="nft" ></div></div>' +
                        '<div class="col-sm-7 col-xs-12" ><h2>Warrior #' + id + ' </h2> <p><b>Current owner:</b> ' + s.Owner + '</p> <p>Sell ticket id: ' + parseInt(s[0]._hex) + ' </p>  <p> Price:  ' + pr + ' BNB</p><p>TokenId: ' + parseInt(s[1]._hex) + '</p><p> Offer expires in: ' + convertUnixToTime(parseInt(s[3]._hex)) + '</p>' +
                        '<div class="d-flex"> <button class="btn-main" id="btn-buy-' + id + '" onclick="Buy(' + parseInt(s[0]._hex) + ',' + pr + ')" >Buy it for ' + pr + ' BNB </button>&nbsp;&nbsp;&nbsp;&nbsp;     <button class="btn-sec" id="btn-detail-' + id + '" onclick="GoDetail(' + id + ')" >Token details </button > ' + can + '</div></div></div>'
            });

            JSON.stringify(res, null, 3)
      })
}



function cancelSell(id) {
      myContract.cancelSell(id).then(function (res) {
            console.log('After cancel send');
            console.info(res)
      })
}




function convertUnixToTime(input) {
      //let unix_timestamp = 1549312452
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(input * 1000);

      console.log('date: ' + date)

      // Days remained
      var days = date.getDay();

      // Hours part from the timestamp
      var hours = date.getHours();

      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();

      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime = days + ' days and ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      console.log(formattedTime);
      return formattedTime;
}