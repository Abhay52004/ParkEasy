pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'your-dockerhub-username'
        APP_NAME = 'parkeasy'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code from Git...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Backend Image...'
                sh 'docker build -t ${DOCKER_REGISTRY}/${APP_NAME}-backend:latest ./backend'
                
                echo 'Building Frontend Image...'
                sh 'docker build -t ${DOCKER_REGISTRY}/${APP_NAME}-frontend:latest ./frontend'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests...'
                // You would add real testing commands here
                // sh 'cd backend && npm test'
                // sh 'cd frontend && npm test'
                echo 'Tests passed successfully!'
            }
        }

        stage('Push to Registry') {
            steps {
                echo 'Pushing images to Docker Hub...'
                // You would need credentials configured in Jenkins for this
                // sh 'docker push ${DOCKER_REGISTRY}/${APP_NAME}-backend:latest'
                // sh 'docker push ${DOCKER_REGISTRY}/${APP_NAME}-frontend:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes cluster...'
                sh 'kubectl apply -f k8s/mongo-deployment.yaml'
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully! 🎉'
        }
        failure {
            echo 'Pipeline failed! Please check the logs.'
        }
    }
}
