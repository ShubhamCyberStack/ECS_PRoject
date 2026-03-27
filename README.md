

This project demonstrates a real-world DevOps workflow: taking a local Node.js application, containerizing it with **Docker**, and deploying it to a highly available, serverless environment using **Amazon ECS (Elastic Container Service)** and **AWS Fargate**.

---

## 📚 Educational Guide: The Tech Stack

Before building, it is important to understand the components of a modern cloud architecture:

### 1. Docker (The Container)
* **What it is:** A tool that packages code and all its dependencies so the application runs quickly and reliably from one computing environment to another.
* **Why use it:** It eliminates the "it works on my machine" problem.
* **Key Concept:** A **Docker Image** is a read-only template with instructions for creating a Docker container.

### 2. Amazon ECR (The Registry)
* **What it is:** A fully managed Docker container registry that makes it easy for developers to store, manage, and deploy Docker container images.
* **Why use it:** It provides a secure and scalable location to host your images before they are pulled by ECS.

### 3. Amazon ECS & AWS Fargate (The Orchestrator)
* **ECS:** A highly scalable, high-performance container management service.
* **Fargate:** A serverless compute engine for containers that works with ECS. It removes the need to provision and manage servers, allowing you to pay only for the resources used.
* **Concepts:** * **Cluster:** A logical grouping of tasks or services.
    * **Task Definition:** A blueprint that describes how a docker container should launch (CPU, memory, ports, etc.).
    * **Task:** An instantiation of a Task Definition within a cluster.

### 4. IAM (Security)
* **What it is:** Identity and Access Management manages permissions for AWS services.
* **Role in this project:** We use an **ECS Task Execution Role** to allow ECS to pull images from ECR and send logs to CloudWatch.

---

## 🛠️ Implementation Steps

### Phase 1: Build Server Setup (EC2)
We use an Ubuntu VM as our "Build Server" to prepare our image.
1.  **Launch Instance:** Create an Ubuntu VM named `ECS-vm`.
2.  **Clone Repository:** Pull the car showroom application code to the.
3.  **Install Docker:** Initialize the container engine and add the user to the `docker` group to run commands without sudo.
4.  **Install AWS CLI:** Configure the command line interface to interact with your AWS account.


---

### Phase 2: Dockerizing and Pushing to ECR
1.  **Create Repository:** Create a public ECR repository named `car-apk`.
2.  **Authenticate:** Use the `get-login-password` command to authenticate your local Docker client to the ECR registry.
3.  **Build Image:** Run `docker build -t car-apk .` inside your project directory.
4.  **Tag & Push:** Tag the image with your ECR URI and push it to the cloud .
---

### Phase 3: ECS Configuration
1.  **Create Cluster:** Use the ECS console to create a cluster (e.g., `carApkcluster`) using **Fargate**.
2.  **IAM Role:** Create a role with `AmazonECSTaskExecutionRolePolicy` so the service has permission to run your container.
3.  **Task Definition:** Create a new definition (e.g., `carAPkTaskdefine`) specifying.
    * **Launch Type:** Fargate.
    * **OS/Architecture:** Linux/X86_64.
    * **Task Size:** 1 vCPU and 3 GB Memory.
    * **Container Port:** 8000 (standard for this Node.js app)
---

### Phase 4: Running and Troubleshooting
1.  **Run Task:** Launch the task within your cluster.
2.  **Access App:** Find the **Public IP** in the Task Configuration and paste it into your browser.
3.  **Security Group Fix:** If the page won't load, go to the **Security Group Inbound Rules** and add a rule for **Port 8000** allowing traffic from "Anywhere" (0.0.0.0/0).
---

## 📊 Monitoring with CloudWatch
All container logs are sent to **AWS CloudWatch**. This is essential for:
* **Debugging:** Seeing application errors in real-time.
* **Performance:** Monitoring CPU and Memory utilization.

---

## 📝 Conclusion
This project demonstrates how to leverage serverless technologies to host applications without managing infrastructure. By using **ECS Fargate**, we ensure that our car showroom application is scalable and cost-effective.
