pipeline {
    agent any

    stages {
        stage('SSH and Run Commands') {
            steps {
                // Ensure 'manjaro' matches the credential ID configured in Jenkins
                sshagent(['manjaro']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -p 2323 bourbon@bourbon.zapto.org '
                            # Check if project directory exists
                            mkdir -p ~/Code/CICD
                            cd ~/Code/CICD
                            
                            if [ -d "test-jenskin" ]; then
                                echo "Project already exists. Using existing project."
                                cd test-jenskin
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
                            docker-compose -f docker-compose.yml up -d
                            
                        '
                    """
                }
            }
        }
    }
}
