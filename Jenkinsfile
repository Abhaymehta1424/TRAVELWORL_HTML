pipeline {
    agent any

    environment {
        // Docker configuration
        IMAGE_NAME = "abhay202001/gym"
        CONTAINER_NAME = "gym"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        
        // Network configuration
        HOST_PORT = "80"
        CONTAINER_PORT = "80"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
                sh 'git config --global http.sslVerify false' // Temporary SSL fix
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image ${IMAGE_NAME}:latest"
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Clean Previous Deployment') {
            steps {
                script {
                    echo "Removing any existing containers"
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    echo "Starting new container"
                    sh """
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${HOST_PORT}:${CONTAINER_PORT} \
                        ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "Checking container status"
                    sh "docker ps | grep ${CONTAINER_NAME}"
                    echo "Application should be available at http://localhost:${HOST_PORT}"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: DOCKER_CREDENTIALS_ID,
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        echo "Logging into Docker Hub"
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        
                        echo "Pushing image to Docker Hub"
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded! 🎉"
            echo "Docker image: ${IMAGE_NAME}:latest"
            echo "Container: ${CONTAINER_NAME} running on port ${HOST_PORT}"
        }
        failure {
            echo "Pipeline failed! ❌"
            echo "Check the logs above for errors"
        }
        always {
            echo "Cleaning up workspace"
            cleanWs()
        }
    }
}