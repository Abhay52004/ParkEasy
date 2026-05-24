# ParkEasy: Cloud & DevOps Implementation

This repository contains the complete Cloud & DevOps lifecycle implementation for the ParkEasy MERN-stack application. It was built as a capstone project to demonstrate mastery of Containerization, Orchestration, CI/CD, Infrastructure as Code, and Observability.

## 🚀 Step-by-Step Execution Guide (How I Built This)

Here is every single step I performed to take this app from local development to a cloud-native architecture:

### Phase 1: Containerization (Docker)
1. **Upgraded Base Images:** Updated the `Dockerfile` in both the `frontend/` and `backend/` folders to use `node:22-alpine` to ensure compatibility with modern Vite requirements.
2. **Docker Compose:** Wrote a `docker-compose.yml` to define the 3-tier architecture (MongoDB, Express Backend, React Frontend).
3. **Local Testing:** Ran `docker-compose up --build` to verify that the containers could securely talk to each other on an isolated Docker network.

### Phase 2: Orchestration (Kubernetes)
1. **Manifest Creation:** Created a `k8s/` folder and wrote Deployment and Service YAML files for all three microservices.
2. **Local Cluster:** Spun up a local Kubernetes cluster using Docker Desktop.
3. **Deployment:** Applied the configurations using `kubectl apply -f k8s/`.
4. **Port Bridging:** Solved network isolation by using `kubectl port-forward svc/frontend-service 5173:5173` to safely bridge the Kubernetes cluster to my local browser.
5. **Database Seeding:** Remotely executed `seed.js` inside the Kubernetes backend pod to populate the empty MongoDB instance with parking spots.

### Phase 3: CI/CD Pipeline (Jenkins)
1. **Pipeline as Code:** Wrote a declarative `Jenkinsfile` to automate the build and deployment process.
2. **Local Jenkins:** Spun up a Jenkins server using Docker on my local machine.
3. **Automation:** Configured Jenkins to read the script, simulating the automatic checkout of code, building of Docker images, and deploying to Kubernetes, eliminating human error from the deployment cycle.

### Phase 4: Infrastructure as Code (Terraform & AWS)
1. **Terraform Configuration:** Wrote `terraform/main.tf` to define a cloud environment.
2. **Security & Keys:** Configured Terraform to automatically generate an SSH key (`parkeasy-key.pem`) and strict firewall rules (allowing only ports 80, 22, 5000, 5173).
3. **Cloud Provisioning:** Ran `aws configure` followed by `terraform init` and `terraform apply` to instantly provision an AWS EC2 `t2.micro` server.
4. **Live Deployment:** Used `scp` and `ssh` to push the compressed code to the live AWS server and start it using Docker. (App was successfully hosted live on the internet!)
5. **Cost Optimization:** Ran `terraform destroy` when finished to safely delete the server and protect AWS credits.

### Phase 5: Monitoring & Observability (Prometheus)
1. **Metric Scraping:** Created `monitoring/prometheus.yml` to define scrape jobs for the AWS server health (CPU/RAM) and the backend API metrics.
2. **Day 2 Operations:** Documented the integration with Grafana to ensure the server could be visually monitored for spikes in traffic, proving readiness for production maintenance.

---
*Project completed for Cloud & DevOps Syllabus requirements.*
