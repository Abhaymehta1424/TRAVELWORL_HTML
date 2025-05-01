pipeline {
    agent any

    environment {
        IMAGE_NAME = "abhay202001/gym"
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
        stage('Run Docker Container') {
        steps {
                script {
                    sh 'docker rm -f gym || true'

                    sh 'docker run -d --name gym -p 80:80 abhay202001/gym:latest'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh 'docker push abhay202001/gym:latest'
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
