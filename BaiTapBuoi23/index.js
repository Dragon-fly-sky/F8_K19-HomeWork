// DATA
const invoiceData = {
    meta: {
        invoiceNo: "WM-20260521-0001",
        saleDate: "2026/05/21",
        currency: "VND",
        paymentMethod: "Cash"
    },

    seller: {
        name: "WinMark 2 ba trung",
        address: "2 Ba trung - HN",
        phone: "012345678",
        representative: "Đại diện WinMark"
    },

    customer: {
        name: "Nguyen Van A",
        age: 20,
        address: "Ha Dong Ha noi"
    },

    items: [
        {
            no: 1,
            name: "Ao Thun",
            size: "XL",
            quantity: 1,
            price: 200000
        },
        {
            no: 2,
            name: "Ao Thun",
            size: "XL",
            quantity: 1,
            price: 200000
        }
    ],

    promotion: {
        description: "Khuyen mai 50% chi KH than thiet",
        discountPercent: 50
    }
};

// FORMAT MONEY

function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + " đ";
}

// CALCULATE SUBTOTAL

function calculateSubtotal(items) {
    return items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
}

// CREATE ITEM ROWS

function renderItemRows(items) {
    return items.map((item) => {
        return `
      <tr>
        <td>${item.no}</td>
        <td class="product-name">${item.name}</td>
        <td>${item.size}</td>
        <td>${item.quantity}</td>
        <td>${formatCurrency(item.price)}</td>
        <td class="total-price">${formatCurrency(item.price * item.quantity)}</td>
      </tr>
    `;
    }).join("");
}

// RENDER INVOICE

function renderInvoice(data) {
    const app = document.querySelector("#app");
    // subtotal
    const subtotal = calculateSubtotal(data.items);
    // discount money
    const discountAmount = subtotal * data.promotion.discountPercent / 100;
    // final total
    const finalTotal = subtotal - discountAmount;
    const invoiceHTML = `
    <div class="invoice">

      <!-- HEADER -->
      <header class="invoice-header">

        <div class="brand">
          <div class="logo">WM</div>
          <div>
            <h1>${data.seller.name}</h1>
            <p>Cung cấp sản phẩm thời trang cao cấp & thiết kế độc quyền.</p>
          </div>
        </div>

        <div class="invoice-meta">
          <div class="badge">HÓA ĐƠN BÁN LẺ</div>
          <p><strong>Mã số:</strong>${data.meta.invoiceNo}</p>
          <p>Ngày bán:<strong>${data.meta.saleDate}</strong></p>
          <p>Thanh toán:<strong>${data.meta.paymentMethod}</strong></p>
        </div>

      </header>

      <!-- INFO -->
      <section class="info-section">
        <!-- SELLER -->
        <div class="info-box">
          <h3>Đơn vị bán hàng (Seller)</h3>
          <h2>${data.seller.name}</h2>
          <p>📍 ${data.seller.address}</p>
          <p>📞 ${data.seller.phone}</p>
          <p>👤 ${data.seller.representative}</p>
        </div>

        <!-- CUSTOMER -->
        <div class="info-box">
          <h3>Khách hàng (Buyer)</h3>
          <h2>${data.customer.name}</h2>
          <p>Tuổi: ${data.customer.age}</p>
          <p>📍 ${data.customer.address}</p>
        </div>

      </section>

      <!-- TABLE -->
      <table class="invoice-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Size</th>
            <th>SL</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>${renderItemRows(data.items)}</tbody>
      </table>

      <!-- BOTTOM -->
      <section class="bottom-section">
        <!-- PROMOTION -->
        <div class="promotion">
          <div class="promotion-title">Khuyến mãi / Trợ giá</div>
          <div class="promotion-description">${data.promotion.description}</div>
        </div>

        <!-- SUMMARY -->
        <div class="summary">
          <div class="summary-row">
            <span>Cộng tiền hàng:</span>
            <strong>${formatCurrency(subtotal)}</strong>
          </div>

          <div class="summary-row discount">
            <span>Khấu trừ giảm giá:</span>
            <strong>-${formatCurrency(discountAmount)}</strong>
          </div>

          <div class="summary-total">
            <span>Tổng thanh toán:</span>
            <span class="total-money">${formatCurrency(finalTotal)}</span>
          </div>

        </div>

      </section>

    </div>
  `;
    app.innerHTML = invoiceHTML;
}
// INIT
renderInvoice(invoiceData);