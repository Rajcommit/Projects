# Real-Time Chat Application on Kubernetes 🚀

![Kubernetes](https://img.shields.io/badge/Kubernetes-v1.28-blue) ![Docker](https://img.shields.io/badge/Docker-v24.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-v18-green) ![React](https://img.shields.io/badge/React-v18.2-green)

Welcome to the **Real-Time Chat Application** project! This is an advanced Kubernetes-based deployment of a microservices architecture featuring a scalable, secure, and monitored chat application. It demonstrates the power of Kubernetes in managing complex, real-time applications with features like autoscaling, network policies, persistent storage, and observability.

## 📖 Project Overview

This project deploys a real-time chat application using a microservices architecture on Kubernetes. The application consists of:

- **Frontend**: A React-based UI for sending and receiving chat messages in real-time.
- **Backend**: A Node.js API with WebSocket support (via `socket.io`) to handle chat logic.
- **Database**: MongoDB to persist chat messages.
- **Message Broker**: Redis for pub/sub messaging to enable real-time communication.
- **Monitoring**: Prometheus and Grafana for observability and performance monitoring.

### Key Features
- **Real-Time Communication**: Uses WebSockets for instant message delivery.
- **Autoscaling**: Horizontal Pod Autoscaling (HPA) for the backend based on CPU usage.
- **Security**: NetworkPolicies to restrict traffic between microservices.
- **Persistence**: Persistent Volume (PV) and Persistent Volume Claim (PVC) for MongoDB.
- **Configuration Management**: ConfigMaps and Secrets for environment variables and sensitive data.
- **Monitoring**: Prometheus and Grafana for cluster and application metrics.

## 🏛️ Architecture Diagram

Below is the architecture of the chat application deployed on Kubernetes:

```mermaid
graph TD
    A[User] -->|HTTP| B[Frontend Service<br/>(React)]
    B -->|WebSocket| C[Backend Service<br/>(Node.js + Socket.io)]
    C -->|MongoDB Protocol| D[MongoDB Service<br/>(Persistent Storage)]
    C -->|Redis Protocol| E[Redis Service<br/>(Pub/Sub)]
    C -->|Metrics| F[Prometheus Service]
    F -->|Data Source| G[Grafana Service]
    subgraph Kubernetes Cluster
        B -->|NetworkPolicy| C
        C -->|NetworkPolicy| D
        C -->|NetworkPolicy| E
    end
```

## 📦 Project Structure

The project is organized into several directories for clarity:

```
chat-app-k8s/
├── frontend/                  # React frontend code
│   ├── Dockerfile
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/                   # Node.js backend code
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── kubernetes/                # Kubernetes manifests
│   ├── config/                # Configuration files
│   │   ├── configmap.yaml
│   │   └── secret.yaml
│   ├── database/              # MongoDB manifests
│   │   ├── mongodb-pvc.yaml
│   │   ├── mongodb-deployment.yaml
│   │   └── mongodb-service.yaml
│   ├── redis/                 # Redis manifests
│   │   ├── redis-deployment.yaml
│   │   └── redis-service.yaml
│   ├── frontend/              # Frontend manifests
│   │   ├── frontend-deployment.yaml
│   │   └── frontend-service.yaml
│   ├── backend/               # Backend manifests
│   │   ├── backend-deployment.yaml
│   │   ├── backend-service.yaml
│   │   └── backend-hpa.yaml
│   ├── network-policies/      # Network policy manifests
│   │   ├── frontend-backend-policy.yaml
│   │   ├── backend-redis-policy.yaml
│   │   └── backend-mongodb-policy.yaml
│   └── monitoring/            # Monitoring manifests
│       ├── prometheus/
│       │   ├── prometheus-deployment.yaml
│       │   └── prometheus-service.yaml
│       └── grafana/
│           ├── grafana-deployment.yaml
│           └── grafana-service.yaml
└── README.md
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following:

- **Kubernetes Cluster**: A running cluster (e.g., Minikube, Kind, GKE, EKS, AKS).
- **kubectl**: Installed and configured to access your cluster.
- **Docker**: Installed to build and push container images.
- **DockerHub Account**: To push your container images.
- **Git**: To clone this repository.

## 🚀 Setup Instructions

Follow these steps to deploy the chat application on your Kubernetes cluster.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/chat-app-k8s.git
cd chat-app-k8s
```

### 2. Build and Push Docker Images
#### Frontend
Navigate to the `frontend` directory and build the Docker image:
```bash
cd frontend
docker build -t yourdockerhubusername/chat-frontend:latest .
docker push yourdockerhubusername/chat-frontend:latest
cd ..
```

#### Backend
Navigate to the `backend` directory and build the Docker image:
```bash
cd backend
docker build -t yourdockerhubusername/chat-backend:latest .
docker push yourdockerhubusername/chat-backend:latest
cd ..
```

#### Update Image Names
Update the `image` fields in the following files with your DockerHub username:
- `kubernetes/frontend/frontend-deployment.yaml`
- `kubernetes/backend/backend-deployment.yaml`

### 3. Create the Namespace
Create a dedicated namespace for the application:
```bash
kubectl create namespace chat-app
```

### 4. Deploy Kubernetes Manifests
Apply all Kubernetes manifests to deploy the application:
```bash
kubectl apply -f kubernetes/config/
kubectl apply -f kubernetes/database/
kubectl apply -f kubernetes/redis/
kubectl apply -f kubernetes/backend/
kubectl apply -f kubernetes/frontend/
kubectl apply -f kubernetes/network-policies/
kubectl apply -f kubernetes/monitoring/
```

### 5. Verify Deployment
Check that all Pods are running:
```bash
kubectl get pods -n chat-app
```

Expected output:
```
NAME                           READY   STATUS    RESTARTS   AGE
backend-xxx                    1/1     Running   0          2m
frontend-xxx                   1/1     Running   0          2m
mongodb-xxx                    1/1     Running   0          2m
redis-xxx                      1/1     Running   0          2m
prometheus-xxx                 1/1     Running   0          2m
grafana-xxx                    1/1     Running   0          2m
```

## 🌐 Accessing the Application

### Chat Application
Get the external IP of the frontend service to access the chat UI:
```bash
kubectl get svc frontend-service -n chat-app
```

Example output:
```
NAME              TYPE           CLUSTER-IP      EXTERNAL-IP    PORT(S)        AGE
frontend-service  LoadBalancer   10.96.123.456   203.0.113.10   3000:31000/TCP  5m
```

Open `http://203.0.113.10:3000` in your browser to access the chat application. Start sending and receiving messages in real-time!

### Monitoring
#### Prometheus
Get the external IP for Prometheus:
```bash
kubectl get svc prometheus-service -n chat-app
```
Open `http://<EXTERNAL-IP>:9090` to access the Prometheus UI.

#### Grafana
Get the external IP for Grafana:
```bash
kubectl get svc grafana-service -n chat-app
```
Open `http://<EXTERNAL-IP>:3000` to access Grafana. Log in with the default credentials (username: `admin`, password: `admin`), then add Prometheus as a data source to visualize metrics.

## 🔍 Key Kubernetes Features Demonstrated

This project showcases advanced Kubernetes features:

- **Microservices Architecture**: Multiple services (frontend, backend, MongoDB, Redis) communicating via Services.
- **Horizontal Pod Autoscaling (HPA)**: The backend scales based on CPU usage (see `backend-hpa.yaml`).
- **NetworkPolicies**: Restrict traffic between microservices for security (e.g., frontend can only talk to backend).
- **Persistent Storage**: MongoDB uses a PVC for data persistence.
- **Configuration Management**: ConfigMaps and Secrets for environment variables and sensitive data.
- **Monitoring**: Prometheus and Grafana for observability.

## 🛠️ Troubleshooting

### Pods Not Starting
- Check Pod logs:
  ```bash
  kubectl logs <pod-name> -n chat-app
  ```
- Ensure Docker images are correctly pushed to DockerHub and referenced in the manifests.

### Service Not Accessible
- Verify the service type is `LoadBalancer` and an external IP is assigned:
  ```bash
  kubectl get svc -n chat-app
  ```
- If using Minikube, use `minikube service <service-name> --url` to access the service.

### MongoDB Connection Issues
- Ensure the `MONGO_USER` and `MONGO_PASS` in `secret.yaml` are correctly base64 encoded.
- Check MongoDB Pod logs for errors:
  ```bash
  kubectl logs -l app=mongodb -n chat-app
  ```

### Autoscaling Not Working
- Verify that the Kubernetes Metrics Server is installed in your cluster:
  ```bash
  kubectl top pods -n chat-app
  ```
- Check HPA status:
  ```bash
  kubectl describe hpa backend-hpa -n chat-app
  ```

## 📚 Learning Outcomes

By working on this project, you’ll gain experience with:

- Deploying a microservices-based application on Kubernetes.
- Implementing real-time communication with WebSockets.
- Using advanced Kubernetes features like HPA, NetworkPolicies, and PV/PVC.
- Setting up monitoring with Prometheus and Grafana.
- Managing configuration and secrets in a secure way.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

⭐ If you found this project helpful, please give it a star on GitHub!