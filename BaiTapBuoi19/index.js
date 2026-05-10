/*
Bạn đang xây dựng chức năng thống kê doanh thu theo sản phẩm cho một hệ thống bán hàng.
Dữ liệu được tách thành:
Danh sách products
Danh sách orders
Mỗi order có thể chứa nhiều sản phẩm.
Dữ liệu có dạng như sau:
const products = [
  { id: 1, name: 'iPhone', price: 2000 },
  { id: 2, name: 'Samsung', price: 1500 },
  { id: 3, name: 'Xiaomi', price: 1000 },
  { id: 4, name: 'Oppo', price: 1200 }
]
const orders = [
  {
    id: 1,
    items: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 }
    ]
  },
  {
    id: 2,
    items: [
      { productId: 1, quantity: 1 },
      { productId: 3, quantity: 3 }
    ]
  },
  {
    id: 3,
    items: [
      { productId: 2, quantity: 2 },
      { productId: 4, quantity: 1 }
    ]
  }
]
yêu cầu viết hàm tìm ra sản phẩm có doanh thu cao nhất
*/

const products = [
    { id: 1, name: 'iPhone', price: 2000 },
    { id: 2, name: 'Samsung', price: 1500 },
    { id: 3, name: 'Xiaomi', price: 1000 },
    { id: 4, name: 'Oppo', price: 1200 }
];

const orders = [
    {
        id: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ]
    },
    {
        id: 2,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 3 }
        ]
    },
    {
        id: 3,
        items: [
            { productId: 2, quantity: 2 },
            { productId: 4, quantity: 1 }
        ]
    }
];

function getTopRevenueProduct(products, orders) {
    const revenueMap = {};
    // Initialize revenue
    for (let i = 0; i < products.length; i++) {
        revenueMap[products[i].id] = 0;
    }
    // Calculate revenue
    for (let i = 0; i < orders.length; i++) {
        const items = orders[i].items;

        for (let j = 0; j < items.length; j++) {
            const item = items[j];

            const product = products.find(function (p) {
                return p.id === item.productId;
            });

            revenueMap[item.productId] +=
                product.price * item.quantity;
        }
    }
    // Find the product with the highest revenue
    let maxRevenue = 0;
    let topProduct = null;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const revenue = revenueMap[product.id];

        if (revenue > maxRevenue) {
            maxRevenue = revenue;

            topProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                revenue: revenue
            };
        }
    }
    return topProduct;
}
console.log(getTopRevenueProduct(products, orders)
);