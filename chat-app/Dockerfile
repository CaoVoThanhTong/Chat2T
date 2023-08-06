# Sử dụng một base image có sẵn chứa Node.js
FROM node:lts-alpine

# Tạo thư mục làm việc cho ứng dụng
WORKDIR /app

# Sao chép các file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn ứng dụng vào thư mục làm việc
COPY . .

# Build ứng dụng React
RUN npm run build

# Port mà ứng dụng sẽ lắng nghe
EXPOSE 4000

# Lệnh để chạy ứng dụng React khi container được khởi chạy
CMD ["npm", "start"]
