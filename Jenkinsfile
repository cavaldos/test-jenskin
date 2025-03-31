pipeline {
    agent any

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

        stage('Deploy') {
            steps {
                // Thêm các bước deploy tùy theo dự án của bạn
                echo 'Deploying application...'
            }
        }
    }
}
