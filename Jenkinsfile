pipeline {
    agent any

    triggers {
        // Kích hoạt pipeline khi push code lên branch main
        pollSCM('* * * * *') // Kiểm tra thay đổi mỗi phút, hoặc cấu hình webhook
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone mã nguồn
                checkout scm
            }
        }

        stage('Verify Jenkinsfile') {
            steps {
                // Kiểm tra Jenkinsfile có trong workspace hay không
                sh 'test -f Jenkinsfile && echo "Jenkinsfile exists" || (echo "Jenkinsfile not found" && exit 1)'
            }
        }

        stage('Build and Test') {
            steps {
                // Thêm các bước build hoặc test tùy theo dự án của bạn
                echo 'Running build and tests...'
            }
        }

        stage('Deploy') {
            steps {
                // Thêm các bước deploy tùy theo dự án của bạn
                echo 'Deploying application...'
            }
        }
    }
}
