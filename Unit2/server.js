const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Dữ liệu sinh viên mẫu
const students = [
  {
    email: "student1@example.com",
    name: "Nguyen Van A",
    grades: { Math: 8, Physics: 9 },
  },
  {
    email: "student2@example.com",
    name: "Tran Thi B",
    grades: { Math: 7, Chemistry: 8 },
  },
];

// Cung cấp trang HTML khi truy cập vào trang chủ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Đăng nhập và trả về thông tin sinh viên
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const student = students.find((student) => student.email === email);

  if (student) {
    res.json({
      success: true,
      name: student.name,
      grades: student.grades,
    });
  } else {
    res.json({
      success: false,
      message: "Sinh viên không có trong hệ thống",
    });
  }
});

// Chạy server trên port 3000
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
