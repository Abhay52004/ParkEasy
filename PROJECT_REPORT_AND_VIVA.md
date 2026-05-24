# ParkEasy Cloud & DevOps Project Report
This document explains exactly what technologies were used, why they were chosen over alternatives, and provides a cheat sheet of Viva (Interview) questions to help you score top marks!

---

## 1. Technologies Used & "Why Not Something Else?"

### Containerization: Docker
* **What I used:** Docker
* **Why not Virtual Machines (VMs)?** Virtual machines require a full operating system for every app, making them huge and slow. Docker shares the host OS, meaning my containers start in milliseconds and use much less RAM. It ensures the classic "it works on my machine" problem is solved because the environment is standardized.

### Orchestration: Kubernetes (K8s)
* **What I used:** Kubernetes
* **Why not Docker Swarm?** While Docker Swarm is easier to learn, Kubernetes is the industry standard for enterprise applications. It provides advanced features like self-healing (restarting crashed apps automatically), auto-scaling, and seamless load balancing. 

### CI/CD Pipeline: Jenkins
* **What I used:** Jenkins
* **Why not GitHub Actions or GitLab CI?** Jenkins is open-source, highly customizable, and deeply integrated into legacy and modern enterprise systems. By writing a declarative `Jenkinsfile`, I demonstrated understanding of "Pipeline as Code", which is a highly sought-after DevOps skill.

### Infrastructure as Code (IaC): Terraform
* **What I used:** Terraform (by HashiCorp)
* **Why not AWS CloudFormation?** CloudFormation only works on AWS. Terraform is "Cloud Agnostic," meaning if I wanted to move my project from AWS to Google Cloud (GCP) or Azure tomorrow, I could use the exact same Terraform skills. 

### Cloud Provider: AWS EC2
* **What I used:** AWS Elastic Compute Cloud (EC2) - `t2.micro`
* **Why not Serverless (AWS Lambda)?** Our application uses a persistent MongoDB database and long-running services. Serverless functions are great for quick, isolated tasks, but a full MERN stack with Docker containers requires the persistent host access that an EC2 Virtual Machine provides.

---

## 2. Top Viva / Presentation Questions (Cheat Sheet)

**Q1: What is the main benefit of using Docker in your project?**
* **Answer:** Docker packages my Frontend, Backend, and Database with all their exact dependencies. This guarantees that if the app runs on my laptop, it will run exactly the same way on the AWS server, eliminating environment configuration bugs.

**Q2: What is "Infrastructure as Code" (IaC) and why did you use Terraform?**
* **Answer:** IaC is the process of writing code to automatically provision servers instead of manually clicking buttons on a website. I used Terraform so my AWS infrastructure is version-controlled. If a server crashes, I can re-create the exact same environment in 60 seconds by simply running `terraform apply`.

**Q3: Explain what your CI/CD Pipeline does.**
* **Answer:** Continuous Integration/Continuous Deployment (CI/CD) automates the deployment process. My `Jenkinsfile` pulls the latest code, builds the Docker images, runs tests, and deploys it automatically to Kubernetes. It removes human error from the deployment process.

**Q4: I see you added Prometheus configuration. What is that for?**
* **Answer:** That is for "Observability" (Phase 5). Prometheus scrapes metrics from my AWS server (like CPU and Memory usage). If my application gets too much traffic, I can use Grafana to visualize the CPU spike and upgrade my AWS server before the app crashes.

**Q5: How are the Frontend and Backend talking to each other inside Kubernetes?**
* **Answer:** Inside the cluster, they communicate using Kubernetes `Services`. I created a `frontend-service` and a `backend-service` which act as internal load balancers, ensuring that even if a Pod dies and restarts with a new IP, the services can still find each other seamlessly.

---
**Tip for your presentation:** Open this file on your screen, and keep the AWS public link open in a browser tab. If they ask about cost, tell them you specifically provisioned a `t2.micro` instance using Terraform to maximize the AWS Free Tier and keep CapEx/OpEx costs near $0!
