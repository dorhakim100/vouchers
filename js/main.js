

import { vouchers } from './vouchers.js';


function onInit(){
    const elBody = document.querySelector('body');

    vouchers.forEach(voucher => {
        const voucherHTML = _getVoucherHTML(voucher.fullName, voucher.serialNumber);
        elBody.innerHTML += voucherHTML;
    })
}


function _getVoucherHTML(name, serialNumber){
    return `<div class="voucher-container"> <div class="voucher">

    <!-- top -->
    <div class="top">
      <img
        class="logo"
        src="imgs/1.png"
        alt="לוגו קפה גן סיפור"
      />

      <div class="serial">
        מס' שובר<br />
        <strong>${serialNumber}</strong>
      </div>
    </div>

    
    <!-- center -->
    <div class="center">
      <h1 class="title">שובר לארוחה בשווי 200 ש״ח</h1>
      <p class="subtitle">מסעדת קפה גן סיפור · תקף בכל סניפי הרשת</p>
    </div>

    <!-- barcode -->
    <div class="barcode-wrapper">
      <img
        class="barcode"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoTzkJlyJOviYgWcwFw-uYIG_bLuPn89xSsA&s"
        alt="barcode"
      />
      <div class="barcode-number">${serialNumber}</div>
    </div>

    <!-- bottom -->
    <div class="bottom">

      <div class="name-block">
        <div class="label">עבור</div>
        <div class="name">${name}</div>
      </div>

      <div class="note">
        השובר אישי ואינו ניתן להעברה.<br />
        יש להציג בעת ההגעה למסעדה.
      </div>

    </div>

  </div></div>`
}