# Monitoring {: .monitoring-title }

This page provides detailed information about monitoring your AI agents with Cylestio.

## Overview {: .section-header }

Cylestio provides comprehensive monitoring capabilities for AI agents, allowing you to track performance, detect issues, and ensure reliability. Our platform is designed to give you complete visibility into your AI systems with minimal setup.

<div class="feature-summary">
  <div class="feature-item">
    <span class="feature-icon">📊</span>
    <span class="feature-text">Real-time metrics collection</span>
  </div>
  <div class="feature-item">
    <span class="feature-icon">📈</span>
    <span class="feature-text">Historical data analysis</span>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🔍</span>
    <span class="feature-text">Customizable dashboards</span>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🔔</span>
    <span class="feature-text">Alerting and notification</span>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🔄</span>
    <span class="feature-text">Integration with popular AI frameworks</span>
  </div>
</div>

## Metrics Collected {: .section-header }

Cylestio collects a wide range of metrics from your AI agents, providing comprehensive insights into performance, errors, content, and system health.

<div class="metrics-grid">
  <div class="metric-card">
    <h4>Performance Metrics</h4>
    <ul class="metric-list">
      <li><strong>Response Time</strong>: Time taken to generate a response</li>
      <li><strong>Token Usage</strong>: Number of input and output tokens used</li>
      <li><strong>Cost</strong>: Estimated cost based on token usage</li>
      <li><strong>Throughput</strong>: Number of requests processed per minute</li>
      <li><strong>Latency</strong>: Various percentiles (p50, p90, p99) of response time</li>
    </ul>
  </div>
  
  <div class="metric-card">
    <h4>Error Metrics</h4>
    <ul class="metric-list">
      <li><strong>Error Rate</strong>: Percentage of requests that result in errors</li>
      <li><strong>Error Types</strong>: Breakdown of errors by type (timeout, rate limit, etc.)</li>
      <li><strong>Retry Count</strong>: Number of retries for failed requests</li>
      <li><strong>Error Patterns</strong>: Common patterns in errors for diagnosis</li>
    </ul>
  </div>
  
  <div class="metric-card">
    <h4>Content Metrics</h4>
    <ul class="metric-list">
      <li><strong>Content Safety Scores</strong>: Safety ratings for generated content</li>
      <li><strong>Topic Distribution</strong>: Analysis of content topics</li>
      <li><strong>Sentiment Analysis</strong>: Sentiment of user inputs and AI responses</li>
      <li><strong>Hallucination Detection</strong>: Metrics for identifying potential hallucinations</li>
    </ul>
  </div>
  
  <div class="metric-card">
    <h4>System Metrics</h4>
    <ul class="metric-list">
      <li><strong>CPU Usage</strong>: CPU utilization of the monitoring system</li>
      <li><strong>Memory Usage</strong>: Memory consumption</li>
      <li><strong>Disk Usage</strong>: Storage utilization</li>
      <li><strong>Network Traffic</strong>: Inbound and outbound network traffic</li>
    </ul>
  </div>
</div>

## Setting Up Monitoring {: .section-header }

Setting up Cylestio monitoring is straightforward and only requires a few lines of code in your application.

### Basic Monitoring {: .subsection-header }

To set up basic monitoring for your AI agent:

```python
from cylestio import enable_monitoring
from anthropic import Anthropic

# Initialize your AI client
client = Anthropic(api_key="your-api-key")

# Enable monitoring
enable_monitoring(agent_id="my_agent", llm_client=client)

# Use your client as normal
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

!!! tip "Quick Setup"
    Basic monitoring requires just one line of code with `enable_monitoring()` and automatically captures all essential metrics without any additional configuration.

### Advanced Monitoring {: .subsection-header }

For more advanced monitoring with custom metrics:

```python
from cylestio import enable_monitoring, MonitoringConfig, MetricDefinition
from anthropic import Anthropic

# Define custom metrics
custom_metrics = [
    MetricDefinition(
        name="response_quality",
        type="gauge",
        description="Quality score of AI responses",
        labels=["model", "task"]
    )
]

# Create a custom configuration
config = MonitoringConfig(
    metrics_interval=30,  # seconds
    enable_content_safety=True,
    custom_metrics=custom_metrics
)

# Enable monitoring with custom configuration
enable_monitoring(
    agent_id="production_assistant",
    llm_client=Anthropic(api_key="your-api-key"),
    config=config
)

# Later in your code, you can update custom metrics
from cylestio import update_metric

update_metric(
    "response_quality", 
    value=0.95, 
    labels={"model": "claude-3", "task": "summarization"}
)
```

## Monitoring Different AI Frameworks {: .section-header }

Cylestio supports monitoring for various AI frameworks with consistent APIs across different providers.

<div class="framework-tabs">
  <div class="framework-tab" id="anthropic-tab">
    <h3>Anthropic</h3>
    
```python
from cylestio import enable_monitoring
from anthropic import Anthropic

client = Anthropic(api_key="your-api-key")
enable_monitoring(agent_id="claude_agent", llm_client=client)
```
  </div>

  <div class="framework-tab" id="openai-tab">
    <h3>OpenAI</h3>
    
```python
from cylestio import enable_monitoring
from openai import OpenAI

client = OpenAI(api_key="your-api-key")
enable_monitoring(agent_id="openai_agent", llm_client=client)
```
  </div>

  <div class="framework-tab" id="huggingface-tab">
    <h3>Hugging Face</h3>
    
```python
from cylestio import enable_monitoring
from transformers import pipeline

pipe = pipeline("text-generation", model="gpt2")
enable_monitoring(agent_id="hf_agent", llm_client=pipe)
```
  </div>
</div>

## Viewing Monitoring Data {: .section-header }

Cylestio provides multiple ways to access and visualize your monitoring data.

### Dashboard {: .subsection-header }

The Cylestio dashboard provides a visual interface for viewing monitoring data. To access the dashboard:

```bash
cylestio dashboard
```
{: .command-line }

This will start the dashboard server and open it in your default browser at `http://localhost:8080`.

<div class="dashboard-preview">
  <img src="../../assets/images/dashboard-example.png" alt="Cylestio Dashboard Preview" />
  <p class="image-caption">Cylestio Dashboard showing AI agent metrics</p>
</div>

### API {: .subsection-header }

You can also access monitoring data programmatically using the Cylestio API:

```python
from cylestio import get_metrics

# Get metrics for a specific agent
metrics = get_metrics(
    agent_id="my_agent",
    metric_names=["response_time", "token_usage", "error_rate"],
    start_time="2024-03-01T00:00:00Z",
    end_time="2024-03-02T00:00:00Z",
    interval="1h"
)

# Process the metrics
for metric in metrics:
    print(f"{metric.name}: {metric.value} {metric.unit}")
```

## Best Practices {: .section-header .best-practices }

Follow these best practices to get the most out of Cylestio monitoring.

<div class="best-practices-grid">
  <div class="practice-card">
    <h4>Effective Monitoring</h4>
    <ul class="practice-list">
      <li><strong>Use Descriptive Agent IDs</strong>: Choose meaningful names for your agents to easily identify them in the dashboard</li>
      <li><strong>Monitor in Development</strong>: Set up monitoring in development to catch issues early</li>
      <li><strong>Set Appropriate Sampling Rates</strong>: For high-volume systems, use sampling to reduce overhead</li>
      <li><strong>Use Tags and Labels</strong>: Add tags and labels to your metrics for better filtering and analysis</li>
    </ul>
  </div>
  
  <div class="practice-card">
    <h4>Performance Optimization</h4>
    <ul class="practice-list">
      <li><strong>Batch Metrics</strong>: Use batching for high-frequency metrics to reduce overhead</li>
      <li><strong>Use Appropriate Intervals</strong>: Set metrics collection intervals based on your needs</li>
      <li><strong>Enable Compression</strong>: Enable compression for metrics data to reduce network traffic</li>
      <li><strong>Use Local Storage</strong>: For edge deployments, use local storage with periodic syncing</li>
    </ul>
  </div>
</div>

## Troubleshooting {: .section-header .troubleshooting }

If you encounter issues with monitoring, check the following:

<div class="troubleshooting-checklist">
  <div class="checklist-item">
    <span class="checklist-icon">✓</span>
    <span class="checklist-text">Ensure your API keys are valid and have the necessary permissions</span>
  </div>
  <div class="checklist-item">
    <span class="checklist-icon">✓</span>
    <span class="checklist-text">Check that your network allows connections to the Cylestio API</span>
  </div>
  <div class="checklist-item">
    <span class="checklist-icon">✓</span>
    <span class="checklist-text">Verify that your monitoring configuration is correct</span>
  </div>
  <div class="checklist-item">
    <span class="checklist-icon">✓</span>
    <span class="checklist-text">Check the Cylestio logs for error messages</span>
  </div>
</div>

For more detailed troubleshooting, see the [Troubleshooting Guide](../troubleshooting/common-issues.md).

## Next Steps {: .section-header }

Now that you've set up monitoring for your AI agents, you might want to explore:

- [Setting up alerts](./alerts.md) for important metrics
- [Creating custom dashboards](./dashboards.md) for your team
- [Integrating with your existing tools](../advanced-topics/custom-integrations.md)
- [Exploring advanced configuration options](../advanced-topics/advanced-configuration.md) 