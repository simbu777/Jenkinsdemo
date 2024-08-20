pipeline {
    agent any

    environment {
        REGISTRY_CREDENTIALS = credentials('docker-registry-credentials-id')
        DOCKER_REGISTRY = "your-docker-registry-url"
        KUBE_CONFIG = credentials('kube-config-credentials-id')
        KUBE_NAMESPACE = "your-kubernetes-namespace"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://your-git-repo-url.git'
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
                            docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-registry-credentials-id') {
                                docker.image("${DOCKER_REGISTRY}/frontend:${env.BUILD_ID}").push()
                            }
                        }
                    }
                }
                stage('Push Backend Image') {
                    steps {
                        script {
                            docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-registry-credentials-id') {
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
