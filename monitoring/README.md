# Phase 5: Monitoring & Observability (Grafana & Prometheus)

## Overview
This folder contains the configuration for **Unit V of your Syllabus: Monitoring & Observability**. 

Once your application is deployed to your AWS EC2 server, you need to track its health to ensure it doesn't crash from too much traffic or run out of RAM.

## The Tools
1. **Prometheus:** The data scraper. It constantly pings your backend API and your AWS server to collect metrics (like CPU usage, memory, and HTTP response times). The configuration for this is in `prometheus.yml`.
2. **Grafana:** The visualizer. It takes the raw data from Prometheus and turns it into beautiful, easy-to-read graphs and charts.

## Implementation Details
In a production environment, you would spin up these two tools using Docker alongside your application:

```yaml
# Add this to your docker-compose.yml or Kubernetes cluster
  prometheus:
    image: prom/prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
```

## Why this matters for your Project:
Having this configuration demonstrates that you have planned for **Day 2 Operations**. Deploying an app is easy, but keeping it running smoothly requires observability. With this setup, if your AWS server hits 90% CPU usage, Grafana can automatically send you an alert so you can upgrade the server before it crashes!
