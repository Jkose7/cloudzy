pipeline {
    agent any
    environment {
        COMPOSE_PROJECT_NAME = 'cloudzy_ci'
    }
    stages {
        stage('Clean Previous Runs') {
            steps {
                echo 'Stopping any existing containers from previous builds...'
                // Forzamos la detención y limpieza manual usando comandos simples
                sh 'docker rm -f cloudzy_api cloudzy_db cloudzy_api_test 2>/dev/null || true'
            }
        }
        stage('Build & Start Services') {
            steps {
                echo 'Building backend application image...'
                sh 'docker build -t cloudzy-api ./app'
                
                echo 'Starting PostgreSQL Relational Database...'
                sh 'docker run -d --name cloudzy_db --network cloudzy_network -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cloudzy_db -p 5432:5432 postgres:15-alpine || true'
                
                echo 'Starting Backend API Service...'
                sh 'docker run -d --name cloudzy_api --network cloudzy_network -e DB_HOST=cloudzy_db -e DB_USER=postgres -e DB_PASSWORD=postgres -e DB_NAME=cloudzy_db -e DB_PORT=5432 -p 3000:3000 cloudzy-api || true'
            }
        }
        stage('Run Integration Tests') {
            steps {
                echo 'Executing Node QA Assertions Suite...'
                // Ejecutamos las pruebas directamente utilizando la API de Docker básica
                sh 'docker build -t cloudzy-api-test ./app'
                sh 'docker run --name cloudzy_api_test --network cloudzy_network -e API_URL=http://cloudzy_api:3000 cloudzy-api-test npm test'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up Docker environment and temporary containers...'
            sh 'docker rm -f cloudzy_api cloudzy_db cloudzy_api_test 2>/dev/null || true'
        }
    }
}