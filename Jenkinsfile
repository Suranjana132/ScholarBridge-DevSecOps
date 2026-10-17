pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate Website Files') {
            steps {
                script {
                    if (!fileExists('index.html') ||
                        !fileExists('style.css') ||
                        !fileExists('script.js') ||
                        !fileExists('Dockerfile')) {
                        error('Required ScholarBridge files are missing')
                    }
                }
                echo 'ScholarBridge files validated'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t scholarbridge:latest .'
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --exit-code 0 --severity HIGH,CRITICAL scholarbridge:latest'
            }
        }
    }
}