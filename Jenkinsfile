pipeline {
    agent any // Hoặc chỉ định một agent/node cụ thể

    stages {
        stage('Checkout') {
            steps {
                // Lấy mã nguồn từ SCM
                checkout scm
                // Chạy script cài đặt
                sh './install.sh'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Giả sử môi trường Node.js đã có sẵn
                sh 'npm install'
            }
        }

        // Giai đoạn Build tùy chọn - Bỏ ghi chú nếu cần
        // stage('Build') {
        //     steps {
        //         sh 'npm run build' // Điều chỉnh lệnh nếu cần
        //     }
        // }

        stage('Test') {
            steps {
                // Chạy thử nghiệm
                sh 'npm test' // Điều chỉnh lệnh nếu cần
            }
        }

        // Giai đoạn Deploy tùy chọn - Bỏ ghi chú và cấu hình nếu cần
        // stage('Deploy') {
        //     steps {
        //         // Thêm các bước triển khai tại đây
        //         echo 'Deploying...'
        //         // Ví dụ: sh './deploy.sh'
        //     }
        // }
    }

    post {
        // Các hành động thực hiện sau khi pipeline chạy (ví dụ: thông báo)
        always {
            echo 'Pipeline finished.'
            // Ví dụ: cleanWs() // Dọn dẹp không gian làm việc
        }
        success {
            echo 'Pipeline succeeded!'
            // Ví dụ: mail to: 'team@example.com', subject: 'Build Successful'
        }
        failure {
            echo 'Pipeline failed!'
            // Ví dụ: mail to: 'team@example.com', subject: 'Build Failed'
        }
    }
}
