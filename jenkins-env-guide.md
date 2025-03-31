# Hướng dẫn cấu hình Credentials và biến môi trường trong Jenkins

Đây là hướng dẫn về cách thiết lập các credentials và biến môi trường trong Jenkins để tạo file `.env` tự động cho dự án của bạn.

## 1. Cài đặt plugin cần thiết

- Đăng nhập vào Jenkins
- Truy cập **Manage Jenkins** > **Manage Plugins**
- Chuyển đến tab **Available**
- Tìm kiếm và cài đặt các plugin sau:
  - **Credentials Plugin** (thường đã được cài đặt sẵn)
  - **Credentials Binding Plugin**
  - **SSH Agent Plugin** (để sử dụng SSH key)
  - **Environment Injector Plugin**

## 2. Thiết lập Credentials

Để thiết lập credentials cho database và API key:

1. Truy cập **Manage Jenkins** > **Manage Credentials**
2. Nhấp vào **Jenkins** store (global)
3. Nhấp vào **Global credentials (unrestricted)**
4. Nhấp vào **Add Credentials** ở menu bên trái

### Thiết lập credentials cho Database:

1. Chọn **Kind**: Username with password
2. Nhập **Username**: (tên người dùng database của bạn)
3. Nhập **Password**: (mật khẩu database của bạn)
4. Nhập **ID**: `db-credentials` (ID này phải khớp với ID trong Jenkinsfile)
5. Nhập **Description**: "Database Credentials"
6. Nhấp vào **OK**

### Thiết lập credentials cho API key:

1. Chọn **Kind**: Secret text
2. Nhập **Secret**: (API key của bạn)
3. Nhập **ID**: `api-key` (ID này phải khớp với ID trong Jenkinsfile)
4. Nhập **Description**: "API Key"
5. Nhấp vào **OK**

### Thiết lập SSH Key cho deployment:

1. Chọn **Kind**: SSH Username with private key
2. Nhập **Username**: bourbon (hoặc tên người dùng SSH của bạn)
3. Chọn **Private Key**: Enter directly
4. Dán **private key** của bạn vào ô văn bản
5. Nhập **ID**: `manjaro` (ID này phải khớp với ID trong Jenkinsfile)
6. Nhập **Description**: "SSH Key for deployment"
7. Nhấp vào **OK**

## 3. Tạo và cấu hình Pipeline Job

1. Tại trang chủ Jenkins, nhấp vào **New Item**
2. Nhập tên dự án, ví dụ: "test-jenskin"
3. Chọn **Pipeline** và nhấp vào **OK**
4. Trong phần cấu hình:
   - **Description**: Thêm mô tả về dự án
   - **Pipeline**:
     - Chọn **Pipeline script from SCM**
     - **SCM**: Git
     - **Repository URL**: URL của repository GitHub của bạn
     - **Credentials**: Thêm hoặc chọn credentials Git nếu cần
     - **Branch Specifier**: */main (hoặc branch mà bạn muốn sử dụng)
     - **Script Path**: Jenkinsfile
5. Nhấp vào **Save**

## 4. Tạo file custom-env.properties (tùy chọn)

Nếu bạn muốn thêm các biến môi trường tùy chỉnh mà không cần phải thay đổi Jenkinsfile, bạn có thể tạo file `custom-env.properties` trong repository của bạn:

```properties
# Thêm các biến môi trường tùy chỉnh tại đây
CUSTOM_VAR1=giá_trị_1
CUSTOM_VAR2=giá_trị_2
```

## 5. Chạy Pipeline

1. Truy cập vào dự án của bạn trong Jenkins
2. Nhấp vào **Build Now** để chạy pipeline

## Ghi chú:

- File `.env` sẽ được tạo tự động trong quá trình build và được gửi đến server của bạn
- File `.env` chứa các biến môi trường từ Jenkins, bao gồm thông tin nhạy cảm từ credentials
- Để thay đổi các biến môi trường, bạn có thể cập nhật các credentials trong Jenkins hoặc sửa đổi Jenkinsfile
- Đảm bảo rằng file `.env` không được commit vào Git (thêm vào .gitignore)