const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra thông tin đăng nhập và xử lý phản hồi
  if (email === 'user@example.com' && password === 'password') {
    // Đăng nhập thành công
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'user@example.com',
    };

    return res.status(200).json({ user });
  } else {
    // Đăng nhập thất bại
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
