# Installation Guide

This guide provides detailed instructions for installing Cylestio in various environments.

## Standard Installation

### Prerequisites

- Python 3.8 or higher
- pip package manager
- (Optional) A virtual environment tool like venv or conda

### Using pip

The simplest way to install Cylestio is using pip:

```bash
pip install cylestio
```

### Using a Virtual Environment

We recommend using a virtual environment for isolation:

```bash
# Create a virtual environment
python -m venv cylestio-env

# Activate the environment (Linux/macOS)
source cylestio-env/bin/activate

# Activate the environment (Windows)
cylestio-env\Scripts\activate

# Install Cylestio
pip install cylestio
```

## Docker Installation {#docker}

Cylestio is available as a Docker image, which includes the monitoring service and dashboard.

### Prerequisites

- Docker installed on your system
- Docker Compose (optional, for multi-container setup)

### Using Docker Run

```bash
docker run -d \
  --name cylestio \
  -p 8080:8080 \
  -p 9090:9090 \
  -v cylestio-data:/data \
  cylestio/cylestio:latest
```

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3'
services:
  cylestio:
    image: cylestio/cylestio:latest
    ports:
      - "8080:8080"  # Dashboard
      - "9090:9090"  # API
    volumes:
      - cylestio-data:/data
    environment:
      - CYLESTIO_LOG_LEVEL=INFO
      - CYLESTIO_DATABASE_URL=sqlite:////data/cylestio.db

volumes:
  cylestio-data:
```

Then run:

```bash
docker-compose up -d
```

## Kubernetes Installation {#kubernetes}

For production deployments, Kubernetes provides scalability and resilience.

### Prerequisites

- Kubernetes cluster
- kubectl configured to access your cluster
- Helm (optional)

### Using kubectl

```bash
# Create a namespace for Cylestio
kubectl create namespace cylestio

# Apply the Cylestio manifests
kubectl apply -f https://raw.githubusercontent.com/cylestio/cylestio/main/deploy/kubernetes/cylestio.yaml -n cylestio
```

### Using Helm

```bash
# Add the Cylestio Helm repository
helm repo add cylestio https://charts.cylestio.com

# Update repositories
helm repo update

# Install Cylestio
helm install cylestio cylestio/cylestio -n cylestio --create-namespace
```

## Cloud Installation {#cloud}

Cylestio can be deployed on major cloud providers.

### AWS

#### Using AWS CloudFormation

1. Navigate to the AWS CloudFormation console
2. Click "Create stack" and select "With new resources"
3. Choose "Upload a template file" and upload the [Cylestio CloudFormation template](https://github.com/cylestio/cylestio/blob/main/deploy/aws/cloudformation.yaml)
4. Follow the prompts to complete the deployment

#### Using AWS CLI

```bash
aws cloudformation create-stack \
  --stack-name cylestio \
  --template-url https://cylestio-public.s3.amazonaws.com/deploy/aws/cloudformation.yaml \
  --parameters ParameterKey=InstanceType,ParameterValue=t3.medium
```

### Google Cloud Platform

#### Using Google Cloud Console

1. Navigate to the Google Cloud Marketplace
2. Search for "Cylestio"
3. Click "Deploy" and follow the prompts

#### Using gcloud CLI

```bash
gcloud deployment-manager deployments create cylestio \
  --template https://raw.githubusercontent.com/cylestio/cylestio/main/deploy/gcp/deployment.jinja
```

### Microsoft Azure

#### Using Azure Portal

1. Navigate to the Azure Marketplace
2. Search for "Cylestio"
3. Click "Create" and follow the prompts

#### Using Azure CLI

```bash
az deployment group create \
  --resource-group myResourceGroup \
  --template-uri https://raw.githubusercontent.com/cylestio/cylestio/main/deploy/azure/template.json
```

## Verifying Your Installation

After installation, verify that Cylestio is running correctly:

```bash
# For standard installation
cylestio --version

# For Docker installation
docker exec cylestio cylestio --version

# For Kubernetes installation
kubectl exec -it $(kubectl get pods -n cylestio -l app=cylestio -o jsonpath='{.items[0].metadata.name}') -n cylestio -- cylestio --version
```

You should see the version number of your Cylestio installation.

## Next Steps

Now that you have Cylestio installed, you can:

1. [Configure Cylestio](configuration.md) to suit your needs
2. [Set up monitoring](../user-guide/monitoring.md) for your AI agents
3. [Access the dashboard](../user-guide/dashboards.md) to view your metrics

If you encounter any issues during installation, please check the [Troubleshooting Guide](../troubleshooting/common-issues.md) or [contact support](../troubleshooting/index.md). 