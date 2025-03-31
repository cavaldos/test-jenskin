pipeline {
    agent any

    stages {
        stage('SSH and Run Commands') {
            steps {
                // Ensure 'manjaro' matches the credential ID configured in Jenkins
                sshagent(['manjaro']) {
                    sh """
                        # Connect to remote server and execute the preparation commands
                        ssh -o StrictHostKeyChecking=no -p 2323 bourbon@bourbon.zapto.org '
                            # Check if the directory exists and create if not
                            mkdir -p ~/Code/CICD
                            
                            # Change to the directory
                            cd ~/Code/CICD
                            
                            # Check if repository already exists
                            if [ -d "test-jenskin" ]; then
                                echo "Project exists, updating from GitHub..."
                                cd test-jenskin
                                git fetch
                                git reset --hard origin/main
                                git pull origin main
                            else
                                echo "Project does not exist, cloning from GitHub..."
                                git clone https://github.com/cavaldos/test-jenskin.git
                                cd test-jenskin
                            fi
                            
                            # Ensure we are on main branch
                            git checkout main
                            
                            # Now run the deploy script
                            chmod +x ~/deploy.sh
                            ~/deploy.sh
                        '
                    """
                }
            }
        }
    }
}
