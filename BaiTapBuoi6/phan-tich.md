# Phân tích CSS Priority

**Câu 1: Selector nào có độ ưu tiên cao nhất trong CSS?**
- Inline style (viết trực tiếp bằng thuộc tính `style="..."` trong thẻ HTML) có độ ưu tiên cao nhất so với ID, Class và Tag (không tính từ khóa `!important`).

**Câu 2: Nếu một phần tử HTML có cả h1, .title, và #main cùng set color — selector nào thắng? Tại sao?**
- Selector `#main` (ID) sẽ thắng.
- Tại sao: Theo quy tắc tính điểm độ ưu tiên của CSS, ID có trọng số (100) cao hơn Class (10) và Tag (1). Vì vậy `#main` sẽ đè màu của `.title` và `h1`.

**Câu 3: Nếu bạn thêm style="color: pink" trực tiếp vào phần tử ở Câu 2, kết quả thay đổi như thế nào?**
- Phần tử sẽ đổi sang màu hồng (pink).
- Bởi vì Inline Style có trọng số (1000) cao nhất, nó sẽ ghi đè mọi quy tắc từ CSS bên ngoài (bao gồm cả ID, Class, Tag).

**Câu 4: Tại sao theme.css có thể override style từ base.css? Điều kiện để override thành công là gì?**
- `theme.css` override được `base.css` vì nó được chèn (link) vào file HTML *sau* `base.css`. Trình duyệt đọc CSS từ trên xuống dưới.
- Điều kiện để override thành công: CSS dùng để ghi đè phải có độ ưu tiên **bằng hoặc cao hơn** CSS cũ. Nếu cùng độ ưu tiên, CSS khai báo sau (ở dưới) sẽ thắng.

**Câu 5: Trong project của bạn, có hai phần tử đều dùng class .title nhưng hiển thị màu khác nhau. Giải thích tại sao.**
- Điều này xảy ra khi một thẻ dùng `.title` nhưng lại mang thêm một ID (ví dụ: `<h1 class="title" id="main">`). ID `#main` có độ ưu tiên cao hơn class `.title` nên nó áp dụng màu của `#main`.
- Thẻ còn lại chỉ dùng `<h2 class="title">` thì không có ID đè lên, nên nó hiển thị màu của class `.title`. Hoặc do một thẻ bị áp Inline Style hay Internal CSS nhắm mục tiêu cụ thể hơn (`h1.title#main`).

**Câu 6: Phần tử nào trong project của bạn có CSS phức tạp nhất? Liệt kê các selector tác động lên nó và giải thích selector nào thắng cuối cùng.**
- Phần tử phức tạp nhất là bẫy CSS trong trang Dashboard: `<h1 class="title" id="special" style="color: red;">DASHBOARD</h1>`.
- Các CSS tác động lên nó bao gồm:  
  1. tag: h1
  2. class: .title
  3. id: #special
  4. external css: base.css
  5. external css: theme.css
  6. inline css
- **Selector thắng cuối cùng**: Inline style (`color: red`). Vì Inline style nằm ở cấp độ ưu tiên gần như tuyệt đối (chỉ đứng sau `!important`).