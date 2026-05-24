# Cloud Economics & Infrastructure Summary (ParkEasy Project)

This document addresses the **Cloud Economics** and **Cloud Services** requirements from the syllabus.

## 1. Cloud Services Selected
For the ParkEasy application, we have selected **AWS EC2 (Elastic Compute Cloud)** over serverless options like AWS Lambda or Elastic Beanstalk. 
* **Why EC2?** Our application uses a persistent MongoDB database and long-running Docker/Kubernetes containers. EC2 provides the foundational Virtual Machine access required to run a Kubernetes node directly.

## 2. Infrastructure as Code (IaC)
We use **Terraform** to provision the cloud resources. 
* **Principles applied:** Declarative templates allow us to version-control our servers just like our application code. If the server crashes, we don't have to manually click through the AWS console; we simply run `terraform apply` to recreate the exact environment.

## 3. Cloud Economics: Pricing & TCO
Understanding the Total Cost of Ownership (TCO) is critical for deploying ParkEasy.

### Monthly Pricing Estimate (t2.micro instance)
* **Compute:** We selected the `t2.micro` instance type in our Terraform file. This is covered under the **AWS Free Tier** (750 hours/month). If paying out of pocket, it costs approximately **$0.0116 per hour** (~$8.35 / month).
* **Storage:** 8GB of EBS General Purpose SSD storage is free under the Free Tier. (Normally ~$0.80 / month).
* **Bandwidth:** Data transfer in is free. The first 100GB out is free.

### Total Cost of Ownership (TCO) Comparison
If we bought a physical server for ParkEasy:
1. **Capital Expenditure (CapEx):** High upfront cost ($1,000+ for hardware).
2. **Maintenance:** Paying IT staff for cooling, power, and hardware failures.
3. **Inflexibility:** If traffic drops, we still paid for the server.

By using AWS Cloud Services (OpEx - Operational Expenditure):
1. **Pay-as-you-go:** We only pay the $8.35/month when the server is actually running.
2. **No Maintenance:** AWS handles hardware failures and cooling.
3. **Elasticity:** If ParkEasy goes viral, we can change our Terraform script from `t2.micro` to `t3.large` in seconds to handle the traffic.
