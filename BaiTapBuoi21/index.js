/*
Giả sử bạn đang làm việc cho một trang web thương mại điện tử. Bạn nhận được dữ liệu từ backend gồm hai mảng: một mảng chứa Danh sách sản phẩm (products) và một mảng chứa Danh sách đơn hàng (orders).

Dữ liệu mẫu:

const products = [
  { id: 1, name: 'MacBook Pro', price: 2000, category: 'Laptop' },
  { id: 2, name: 'iPhone 15', price: 1000, category: 'Phone' },
  { id: 3, name: 'Bàn phím cơ', price: 150, category: 'Accessories' },
  { id: 4, name: 'Màn hình Dell', price: 500, category: 'Monitor' }
];

const orders = [
  { orderId: 'ORD01', productId: 2, quantity: 2, status: 'completed' },
  { orderId: 'ORD02', productId: 1, quantity: 1, status: 'pending' },
  { orderId: 'ORD03', productId: 4, quantity: 3, status: 'completed' },
  { orderId: 'ORD04', productId: 3, quantity: 1, status: 'canceled' },
  { orderId: 'ORD05', productId: 2, quantity: 1, status: 'completed' }
];
Yêu cầu:

Bạn hãy viết một đoạn code ngắn gọn (có thể dùng chaining - nối chuỗi các phương thức) để tạo ra một mảng mới tên là completedOrderDetails với các điều kiện sau:

Chỉ lấy những đơn hàng có trạng thái là 'completed' (đã hoàn thành).

Kết hợp với mảng products để lấy tên sản phẩm và tính tổng tiền cho từng đơn hàng.

Mảng kết quả trả về phải có cấu trúc object như sau:

{ idDonHang, tenSanpham, tongTien } (trong đó tongTien = price * quantity).
*/

//O(n)
const products = [
    { id: 1, name: 'MacBook Pro', price: 2000, category: 'Laptop' },
    { id: 2, name: 'iPhone 15', price: 1000, category: 'Phone' },
    { id: 3, name: 'Bàn phím cơ', price: 150, category: 'Accessories' },
    { id: 4, name: 'Màn hình Dell', price: 500, category: 'Monitor' }
];

const orders = [
    { orderId: 'ORD01', productId: 2, quantity: 2, status: 'completed' },
    { orderId: 'ORD02', productId: 1, quantity: 1, status: 'pending' },
    { orderId: 'ORD03', productId: 4, quantity: 3, status: 'completed' },
    { orderId: 'ORD04', productId: 3, quantity: 1, status: 'canceled' },
    { orderId: 'ORD05', productId: 2, quantity: 1, status: 'completed' }
];

const productMap = products.reduce((map, product) => {
    map[product.id] = product;
    return map;
}, {});

const completedOrderDetails = orders
    .filter(order => order.status === 'completed')
    .map(order => {
        const product = productMap[order.productId];

        if (!product) { //Check product
            return null;
        }

        return {
            idDonHang: order.orderId,
            tenSanpham: product.name,
            tongTien: product.price * order.quantity
        };
    })
    .filter(Boolean);

console.log(completedOrderDetails);