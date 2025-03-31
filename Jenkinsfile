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

        stage('Test') {
            steps {
                // Chạy thử nghiệm
                sh 'npm test' // Điều chỉnh lệnh nếu cần
            }
        }
    }
}
