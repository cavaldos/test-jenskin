pipeline {
    agent any // Hoặc chỉ định một agent/node cụ thể

    stages {
        stage('Clone stage') {
            steps {
                // Lấy mã nguồn từ SCM
                checkout scm
            }
        }
        stage('Check Jenkinsfile') {
            steps {
                // Kiểm tra xem Jenkinsfile có tồn tại không
                sh 'ls Jenkinsfile'
            }
        }
    }
}
