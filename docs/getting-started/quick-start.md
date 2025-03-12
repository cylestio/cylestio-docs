# Quick Start Guide

This guide will help you get started with Cylestio monitoring for your AI agents in just a few minutes.

## Prerequisites

Before you begin, make sure you have:

- Python 3.8 or higher installed
- pip package manager
- An AI agent or application that you want to monitor

## Installation

Install Cylestio using pip:

```bash
pip install cylestio
```

## Basic Setup

### 1. Import Cylestio

```python
from cylestio import enable_monitoring
```

### 2. Enable Monitoring

For a basic setup with default settings:

```python
# Enable monitoring with default settings
enable_monitoring()
```

### 3. Monitor Your AI Agent

Cylestio works with popular AI frameworks. Here's how to monitor an agent using Anthropic's Claude:

```python
from cylestio import enable_monitoring
from anthropic import Anthropic

# Initialize your AI client
client = Anthropic(api_key="your-api-key")

# Enable monitoring for this client
enable_monitoring(agent_id="my_claude_agent", llm_client=client)

# Use your client as normal - Cylestio will automatically track all interactions
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    messages=[{"role": "user", "content": "Hello, how can you help me today?"}]
)
```

### 4. Access the Dashboard

Once you've enabled monitoring, you can access the Cylestio dashboard to view your metrics:

```bash
cylestio dashboard
```

This will start the dashboard server and open it in your default browser at `http://localhost:8080`.

## What's Being Monitored?

By default, Cylestio monitors:

- Request and response times
- Token usage and costs
- Error rates
- Model parameters
- Content safety metrics

## Next Steps

Now that you have basic monitoring set up, you might want to:

- [Configure advanced settings](configuration.md)
- [Set up alerts](../user-guide/alerts.md)
- [Create custom dashboards](../user-guide/dashboards.md)
- [Integrate with your existing monitoring stack](../advanced-topics/custom-integrations.md)

## Example: Complete Monitoring Setup

Here's a more complete example showing how to set up monitoring with custom options:

```python
from cylestio import enable_monitoring, MonitoringConfig
from anthropic import Anthropic

# Create a custom configuration
config = MonitoringConfig(
    log_level="INFO",
    metrics_interval=60,  # seconds
    enable_content_safety=True,
    enable_cost_tracking=True,
    database_url="sqlite:///cylestio.db"  # Local SQLite database
)

# Initialize your AI client
client = Anthropic(api_key="your-api-key")

# Enable monitoring with custom configuration
enable_monitoring(
    agent_id="production_assistant",
    llm_client=client,
    config=config
)

# Your application code continues as normal
response = client.messages.create(
    model="claude-3-opus-20240229",
    messages=[
        {"role": "user", "content": "Can you help me analyze this dataset?"}
    ],
    max_tokens=1000
)

print(response.content)
```

For more detailed information, check out the [Installation Guide](installation.md) and [Configuration Guide](configuration.md). 