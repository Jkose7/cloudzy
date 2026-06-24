pipeline {
    agent any
    environment {
        COMPOSE_PROJECT_NAME = 'cloudzy_ci'
    }
    stages {
        stage('Clean Previous Runs') {
            steps {
                echo 'Stopping any existing container from previous builds...'
                // Cambiamos "docker compose" por "docker-compose"
                sh 'docker-compose down --volumes --remove-orphans'
            }
        }
        stage('Build & Start Services') {
            steps {
                echo 'Building and starting API and PostgreSQL services...'
                sh 'docker-compose up -d --build api db'
            }
        }
        stage('Run Integration Tests') {
            steps {
                echo 'Running integration tests container...'
                sh 'docker-compose up --exit-code-from api-test api-test'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up Docker environment...'
            sh 'docker-compose down --volumes --remove-orphans'
        }
    }
}