pipeline {
    agent any

    stages {
        stage('SSH and Run Commands') {
            steps {
                // Ensure 'manjaro' matches the credential ID configured in Jenkins
                sshagent(['manjaro']) {
                    sh """
                        # Copy the deploy script to remote server
                        scp -o StrictHostKeyChecking=no -P 2323 deploy.sh bourbon@bourbon.zapto.org:~/deploy.sh
                        # Make the script executable and run it
                        ssh -o StrictHostKeyChecking=no -p 2323 bourbon@bourbon.zapto.org 'chmod +x ~/deploy.sh && ~/deploy.sh'
                    """
                }
            }
        }
    }
}
