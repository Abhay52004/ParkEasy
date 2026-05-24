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

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Simulating: kubectl apply -f k8s/'
                sleep 4
                echo 'Deployment successful! Pods are running.'
            }
        }
    }
}
