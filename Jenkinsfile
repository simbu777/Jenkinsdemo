pipeline {
    agent any

    environment {
        REGISTRY_CREDENTIALS = credentials('dockerhubcreds')
        DOCKER_REGISTRY = "simbu777/docker"
        KUBE_CONFIG = credentials('kubeconfigcreds')
        KUBE_NAMESPACE = "default"
    }

    stages {
        stage('Checkout') {
            steps {
               git branch: 'main', credentialsId: 'githubcreds', url: 'https://github.com/simbu777/Jenkinsdemo.git'
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend Image') {
                    steps {
                        script {
                            docker.build("${DOCKER_REGISTRY}/frontend:${env.BUILD_ID}", "./frontend")
                        }
                    }
                }
                stage('Build Backend Image') {
                    steps {
                        script {
                            docker.build("${DOCKER_REGISTRY}/backend:${env.BUILD_ID}", "./backend")
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            parallel {
                stage('Push Frontend Image') {
                    steps {
                        script {
                            docker.withRegistry("https://${DOCKER_REGISTRY}", 'dockerhubcreds') {
                                docker.image("${DOCKER_REGISTRY}/frontend:${env.BUILD_ID}").push()
                            }
                        }
                    }
                }
                stage('Push Backend Image') {
                    steps {
                        script {
                            docker.withRegistry("https://${DOCKER_REGISTRY}", 'dockerhubcreds') {
                                docker.image("${DOCKER_REGISTRY}/backend:${env.BUILD_ID}").push()
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    kubernetesDeploy(
                        kubeConfig: [path: KUBE_CONFIG],
                        configs: "k8s/deployment.yaml",
                        enableConfigSubstitution: true
                    )
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
