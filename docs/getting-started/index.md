# Getting Started with Cylestio

Welcome to Cylestio, the open-source monitoring solution for AI agents. This section will help you get up and running quickly with our monitoring platform.

## Overview

Cylestio provides comprehensive monitoring for AI agents, helping you track performance, detect issues, and ensure reliability. Our platform is designed to be:

- **Easy to integrate**: Add monitoring to your AI agents with just a few lines of code
- **Flexible**: Works with various AI frameworks and platforms
- **Scalable**: Handles monitoring for systems of any size
- **Secure**: Protects your data and ensures compliance with security standards

## Quick Start

For those who want to get started immediately, check out our [Quick Start Guide](quick-start.md). This guide will walk you through the basic setup process and have you monitoring your AI agents in minutes.

```python
from cylestio import enable_monitoring
from anthropic import Anthropic

# Enable monitoring with one line
enable_monitoring(agent_id="my_agent", llm_client=Anthropic())

# Use your client as normal - we'll handle the rest
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## Installation Options

Cylestio can be installed in various environments:

- [Standard Installation](installation.md): Install Cylestio on your local machine or server
- [Docker Installation](installation.md#docker): Run Cylestio in a Docker container
- [Kubernetes Installation](installation.md#kubernetes): Deploy Cylestio on a Kubernetes cluster
- [Cloud Installation](installation.md#cloud): Deploy Cylestio on major cloud providers

## Configuration

After installation, you'll need to configure Cylestio to suit your needs. Our [Configuration Guide](configuration.md) covers:

- Basic configuration options
- Authentication and security settings
- Integration with AI frameworks
- Setting up alerts and notifications
- Customizing dashboards

## Next Steps

Once you have Cylestio installed and configured, you can:

- Explore the [User Guide](../user-guide/index.md) to learn about all features
- Check out the [API Reference](../api-reference/index.md) for detailed API documentation
- Learn about [Security & Compliance](../security/index.md) features
- Dive into [Advanced Topics](../advanced-topics/index.md) for more complex use cases 