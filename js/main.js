


 const vouchers = [
  { serialNumber: "24062574", fullName: "אורי קסטיאל" },
  { serialNumber: "51822977", fullName: "מירב כץ" },
  { serialNumber: "55892925", fullName: "גאורגי מקוקישווילי" },
  { serialNumber: "36262045", fullName: "הילה דפני" },
  { serialNumber: "91267367", fullName: "אלי הרוש" },
  { serialNumber: "85424300", fullName: "כרמל פוליאק" },
  { serialNumber: "83991842", fullName: "לולי אמירי" },
  { serialNumber: "50906442", fullName: "אדווה ברעם" },
  { serialNumber: "71023356", fullName: "אלה-יה איסמלון" },
  { serialNumber: "11174006", fullName: "גליה אור ליאוז" },
  { serialNumber: "51744146", fullName: "מירב דפני" },
  { serialNumber: "34994370", fullName: "משה זיסקינד" },
  { serialNumber: "94574914", fullName: "נעמי רמון" },
  { serialNumber: "74276854", fullName: "סמדר דינור" },
  { serialNumber: "87921190", fullName: "תמי אריאלי" }
];

function onInit(){
    const elBody = document.querySelector('body');

    vouchers.forEach(voucher => {
        const voucherHTML = _getVoucherHTML(voucher.fullName, voucher.serialNumber);
        elBody.innerHTML += voucherHTML;
    })
}


function _getVoucherHTML(name, serialNumber){
    return `  <div class="voucher-container"> <div class="voucher">

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
      <strong class="title coffee">קפה גן סיפור</strong>
      <p class="subtitle">תקף בכל סניפי הרשת</p>
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