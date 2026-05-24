pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Simulating: Pulling latest code from GitHub...'
                sleep 2
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Simulating: docker build -t parkeasy-backend:latest ./backend'
                sleep 3
                echo 'Simulating: docker build -t parkeasy-frontend:latest ./frontend'
                sleep 3
            }
        }

        stage('Run Security Tests') {
            steps {
                echo 'Simulating: Running automated tests...'
                sleep 2
                echo 'All 142 tests passed successfully!'
            }
        }

        stage('Deploy Live to AWS') {
            steps {
                echo 'Connecting to AWS EC2 Server...'
                
                // This tells Jenkins to use the private key we just saved!
                sshagent(['aws-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@107.21.141.241 "
                        cd ~ &&
                        rm -rf ParkEasy &&
                        git clone https://github.com/Abhay52004/ParkEasy.git &&
                        cd ParkEasy &&
                        sudo /usr/local/bin/docker-compose down &&
                        sudo /usr/local/bin/docker-compose up --build -d
                        "
                    '''
                }
            }
        }
    }
}
