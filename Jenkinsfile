pipeline {
    agent any

    environment {
        IMAGE_NAME = "abhay202001/gym"
        CONTAINER_NAME = "gym"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        HOST_PORT = "80"
        CONTAINER_PORT = "80"
    }

    stages {
        stage('Configure Git SSL') {
            steps {
                sh 'git config --global http.sslVerify false'  // Disables SSL verification
            }
        }

        stage('Checkout Code') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    extensions: [],
                    userRemoteConfigs: [[url: 'https://github.com/Abhaymehta1424/TRAVELWORL_HTML.git']]
                ])
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Stop Previous Container') {
            steps {
                script {
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    sh """
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${HOST_PORT}:${CONTAINER_PORT} \
                        ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: env.DOCKER_CREDENTIALS_ID,
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }
    }

    post {
        success {
            echo "SUCCESS: Container ${CONTAINER_NAME} running on port ${HOST_PORT}"
            echo "Docker image pushed: ${IMAGE_NAME}:latest"
        }
        failure {
            echo "FAILURE: Check pipeline logs for errors"
        }
        always {
            cleanWs()
        }
    }
}