pipeline {
    agent any
    tools{
        nodejs 'nodejs16.16'
    }

    stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                git 'https://gitlab.com/devopswebelight/webelight_practical_test.git'

        
                sh "npm install"
                sh "npm run build"
            
            }
        }
    }
       stage('Push To ECR') {
            steps {
                sh "docker build -t frontend_app ."
            }
        }
        stage('reomte ec2') {
            steps {
                sh "ansible-playbook playbook.yml"
            }
        }
}