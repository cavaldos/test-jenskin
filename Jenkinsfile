pipeline {
    agent any

    stages {
        stage('SSH server and run command') { // using ssh agent
            steps {
                // Ensure 'manjaro' matches the credential ID configured in Jenkins
                sshagent(['manjaro']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -p 2323 bourbon@bourbon.zapto.org 'docker start my-rust-app'
                    """
                }
            }
        }
    }
}
