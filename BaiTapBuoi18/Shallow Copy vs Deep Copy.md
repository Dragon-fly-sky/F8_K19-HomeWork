```javascript
Bài 1: Spread Operator với Object (Shallow Copy)
const student = {
  name: 'hoang',
  parent: {
    name: 'bo hoang'
  }
}

const mentor = { ...student }  // Spread Operator - Shallow Copy

mentor.name = 'bang'
mentor.parent.name = 'bo bang'

console.log(student)
console.log(mentor)

Câu hỏi & Giải thích:
1. student.name có bị đổi không?
→ Không bị đổi.
Giá trị 'hoang' vẫn giữ nguyên.
2. student.parent.name có bị đổi không?
→ Bị đổi. Thành 'bo bang'.
Lý do:
Spread Operator { ...student } chỉ copy nông (shallow copy).
Các thuộc tính primitive (string, number, boolean, null, undefined) được copy giá trị.
Các thuộc tính là object/array chỉ copy tham chiếu (reference).
→ mentor.parent và student.parent trỏ vào cùng một object trong bộ nhớ.
Khi thay đổi mentor.parent.name, đang sửa object chung → ảnh hưởng đến cả hai.


Bài 2: Deep Copy bằng JSON.parse(JSON.stringify())
JavaScriptconst student = {
  name: 'hoang',
  parent: {
    name: 'bo hoang'
  }
}

const mentor = JSON.parse(JSON.stringify(student))  // Deep Copy

mentor.parent.name = 'bo bang'

console.log(student)
console.log(mentor)

Câu hỏi & Giải thích:
student.parent.name có bị ảnh hưởng không?
→ Không bị ảnh hưởng.
Tại sao khác với Spread Operator?
JSON.stringify() chuyển object thành chuỗi JSON (toàn bộ dữ liệu được serialize).
JSON.parse() tạo ra một object hoàn toàn mới từ chuỗi đó.
Tất cả các cấp (nested objects) đều được copy giá trị → Deep Copy.

Bài 3: Spread Operator với Array
JavaScriptconst students = [
  { name: 'a' },
  { name: 'b' }
]

const newStudents = [...students]  // Shallow Copy mảng

newStudents[0].name = 'z'

console.log(students)
console.log(newStudents)
Câu hỏi & Giải thích:
1. Mảng có bị thay đổi không?
→ Mảng gốc (students) không thay đổi về cấu trúc (vẫn có 2 phần tử).
2. Phần tử bên trong có bị thay đổi không?
→ Bị thay đổi. students[0].name trở thành 'z'.
Lý do:
Spread [...students] chỉ copy tham chiếu của các phần tử trong mảng.
Nó tạo mảng mới, nhưng các object bên trong vẫn là cùng tham chiếu.
newStudents[0] và students[0] trỏ vào cùng một object.

Bài 4: Nested Object với Spread
JavaScriptconst user = {
  name: 'hoang',
  address: {
    city: 'HN',
    location: {
      lat: 123
    }
  }
}

const newUser = { ...user }

newUser.address.location.lat = 999

console.log(user.address.location.lat)
Kết quả:
999
Giải thích:
Spread chỉ shallow copy → newUser.address và user.address là cùng một object.
address.location cũng là cùng một object.
Thay đổi bất kỳ mức nested nào đều ảnh hưởng đến object gốc.