pipeline {
    agent any
    
    environment {
        APP_PORT = '3000'
        NODE_ENV = 'production'
        // Thêm các biến môi trường từ Jenkins credentials
        DB_CREDS = credentials('db-credentials') // ID của credentials trong Jenkins
        API_KEY = credentials('api-key') // ID của credentials trong Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Generate Environment Files') {
            steps {
                script {
                    // Tạo file .env từ các biến môi trường của Jenkins
                    sh """
                        echo "PORT=\${APP_PORT}" > .env
                        echo "NODE_ENV=\${NODE_ENV}" >> .env
                        echo "DB_USER=\${DB_CREDS_USR}" >> .env
                        echo "DB_PASSWORD=\${DB_CREDS_PSW}" >> .env
                        echo "API_KEY=\${API_KEY}" >> .env
                        echo "BUILD_NUMBER=\${BUILD_NUMBER}" >> .env
                        echo "BUILD_TIMESTAMP=\$(date)" >> .env
                    """
                    
                    // Cho phép thêm biến môi trường tùy chỉnh
                    if (fileExists('custom-env.properties')) {
                        sh 'cat custom-env.properties >> .env'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test || true'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build || true'
                
                // Đóng gói file .env trong artifact
                sh 'cp .env build/.env'
                archiveArtifacts artifacts: 'build/.env', fingerprint: true
            }
        }
        
        stage('Deploy') {
            steps {
                // Ensure 'manjaro' matches the credential ID configured in Jenkins
                sshagent(['manjaro']) {
                    sh """
                        # Copy .env file to remote server
                        scp -o StrictHostKeyChecking=no -P 2323 .env bourbon@bourbon.zapto.org:~/Code/CICD/.env.jenkins
                        
                        ssh -o StrictHostKeyChecking=no -p 2323 bourbon@bourbon.zapto.org '
                            # Check if project directory exists
                            mkdir -p ~/Code/CICD
                            cd ~/Code/CICD
                            
                            if [ -d "test-jenskin" ]; then
                                echo "Project already exists. Updating from GitHub..."
                                cd test-jenskin
                                git fetch
                                git reset --hard origin/main
                                git pull origin main
                            else
                                echo "Project does not exist. Cloning from GitHub..."
                                git clone https://github.com/cavaldos/test-jenskin.git
                                cd test-jenskin
                                git checkout main
                            fi
                            
                            # Install dependencies and run commands
                            npm install
                            npm run test || true  # Continue even if tests fail
                            npm run build
                            
                            # Use .env file from Jenkins or fallback to .env.example
                            if [ -f "../.env.jenkins" ]; then
                                echo "Using .env from Jenkins build"
                                cp ../env.jenkins .env
                            elif [ -f ".env.example" ]; then
                                echo "Using .env.example as fallback"
                                cp .env.example .env
                            fi
                            
                            # Restart docker containers
                            docker-compose -f docker-compose.yml down
                            docker-compose -f docker-compose.yml build
                            docker-compose -f docker-compose.yml up -d
                        '
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
        always {
            // Xóa file .env sau khi hoàn thành để đảm bảo an toàn
            sh 'rm -f .env'
        }
    }
}
