pipeline {
    agent any

    environment {
        IMAGE_NAME = "abhay202001/travel-website"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh 'docker push abhay202001/travel-website:latest'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Docker image pushed to Docker Hub: ${IMAGE_NAME}:latest"
        }
        failure {
            echo "Something went wrong!"
        }
    }
}
