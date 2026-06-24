pipeline {
    agent any
    environment {
        COMPOSE_PROJECT_NAME = 'cloudzy_ci'
    }
    stages {
        stage('Clean Previous Runs') {
            steps {
                echo 'Stopping any existing container from previous builds...'
                // Usamos la ruta absoluta del binario de docker
                sh '/usr/bin/docker compose down --volumes --remove-orphans'
            }
        }
        stage('Build & Start Services') {
            steps {
                echo 'Building and starting API and PostgreSQL services...'
                sh '/usr/bin/docker compose up -d --build api db'
            }
        }
        stage('Run Integration Tests') {
            steps {
                echo 'Running integration tests container...'
                sh '/usr/bin/docker compose up --exit-code-from api-test api-test'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up Docker environment...'
            sh '/usr/bin/docker compose down --volumes --remove-orphans'
        }
    }
}