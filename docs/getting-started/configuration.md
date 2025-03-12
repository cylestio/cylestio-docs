# Configuration Guide

This guide covers the various configuration options available in Cylestio to customize your monitoring setup.

## Configuration Methods

Cylestio can be configured in several ways:

1. **Programmatic configuration**: Using the `MonitoringConfig` class in your code
2. **Environment variables**: Setting environment variables for global configuration
3. **Configuration file**: Using a YAML or JSON configuration file
4. **Command-line arguments**: When using the Cylestio CLI

## Basic Configuration

### Using MonitoringConfig

The most flexible way to configure Cylestio is by using the `MonitoringConfig` class:

```python
from cylestio import enable_monitoring, MonitoringConfig

config = MonitoringConfig(
    log_level="INFO",
    metrics_interval=60,  # seconds
    enable_content_safety=True,
    database_url="sqlite:///cylestio.db"
)

enable_monitoring(config=config)
```

### Using Environment Variables

You can set environment variables to configure Cylestio globally:

```bash
# Linux/macOS
export CYLESTIO_LOG_LEVEL=INFO
export CYLESTIO_METRICS_INTERVAL=60
export CYLESTIO_ENABLE_CONTENT_SAFETY=true
export CYLESTIO_DATABASE_URL=sqlite:///cylestio.db

# Windows
set CYLESTIO_LOG_LEVEL=INFO
set CYLESTIO_METRICS_INTERVAL=60
set CYLESTIO_ENABLE_CONTENT_SAFETY=true
set CYLESTIO_DATABASE_URL=sqlite:///cylestio.db
```

### Using a Configuration File

Create a `cylestio.yaml` file:

```yaml
log_level: INFO
metrics_interval: 60
enable_content_safety: true
database_url: sqlite:///cylestio.db
```

Then load it in your code:

```python
from cylestio import enable_monitoring, load_config

config = load_config("path/to/cylestio.yaml")
enable_monitoring(config=config)
```

Or specify it when running the CLI:

```bash
cylestio --config path/to/cylestio.yaml dashboard
```

## Configuration Options

### General Settings

| Option | Environment Variable | Default | Description |
|--------|---------------------|---------|-------------|
| `log_level` | `CYLESTIO_LOG_LEVEL` | `INFO` | Logging level (DEBUG, INFO, WARNING, ERROR) |
| `metrics_interval` | `CYLESTIO_METRICS_INTERVAL` | `60` | Interval in seconds for collecting metrics |
| `agent_id` | `CYLESTIO_AGENT_ID` | `default` | Identifier for the agent being monitored |

### Database Settings

| Option | Environment Variable | Default | Description |
|--------|---------------------|---------|-------------|
| `database_url` | `CYLESTIO_DATABASE_URL` | `sqlite:///cylestio.db` | Database connection URL |
| `database_pool_size` | `CYLESTIO_DATABASE_POOL_SIZE` | `5` | Connection pool size |
| `database_max_overflow` | `CYLESTIO_DATABASE_MAX_OVERFLOW` | `10` | Maximum overflow connections |

### API Settings

| Option | Environment Variable | Default | Description |
|--------|---------------------|---------|-------------|
| `api_host` | `CYLESTIO_API_HOST` | `0.0.0.0` | Host to bind the API server |
| `api_port` | `CYLESTIO_API_PORT` | `9090` | Port for the API server |
| `api_workers` | `CYLESTIO_API_WORKERS` | `4` | Number of API worker processes |

### Dashboard Settings

| Option | Environment Variable | Default | Description |
|--------|---------------------|---------|-------------|
| `dashboard_host` | `CYLESTIO_DASHBOARD_HOST` | `0.0.0.0` | Host to bind the dashboard server |
| `dashboard_port` | `CYLESTIO_DASHBOARD_PORT` | `8080` | Port for the dashboard server |
| `dashboard_theme` | `CYLESTIO_DASHBOARD_THEME` | `light` | Dashboard theme (light, dark, auto) |

### Security Settings

| Option | Environment Variable | Default | Description |
|--------|---------------------|---------|-------------|
| `enable_content_safety` | `CYLESTIO_ENABLE_CONTENT_SAFETY` | `false` | Enable content safety monitoring |
| `enable_authentication` | `CYLESTIO_ENABLE_AUTHENTICATION` | `false` | Enable authentication for API and dashboard |
| `auth_secret_key` | `CYLESTIO_AUTH_SECRET_KEY` | None | Secret key for authentication |
| `allowed_origins` | `CYLESTIO_ALLOWED_ORIGINS` | `*` | CORS allowed origins |

### Monitoring Settings

| Option | Environment Variable | Default | Description |
|--------|---------------------|---------|-------------|
| `enable_cost_tracking` | `CYLESTIO_ENABLE_COST_TRACKING` | `true` | Track token usage costs |
| `enable_performance_tracking` | `CYLESTIO_ENABLE_PERFORMANCE_TRACKING` | `true` | Track performance metrics |
| `enable_error_tracking` | `CYLESTIO_ENABLE_ERROR_TRACKING` | `true` | Track errors and exceptions |
| `sampling_rate` | `CYLESTIO_SAMPLING_RATE` | `1.0` | Sampling rate for monitoring (0.0-1.0) |

## Advanced Configuration

### Custom Metrics

You can define custom metrics to track:

```python
from cylestio import enable_monitoring, MonitoringConfig, MetricDefinition

custom_metrics = [
    MetricDefinition(
        name="response_quality",
        type="gauge",
        description="Quality score of AI responses",
        labels=["model", "task"]
    )
]

config = MonitoringConfig(custom_metrics=custom_metrics)
enable_monitoring(config=config)

# Later in your code, you can update the metric
from cylestio import update_metric

update_metric(
    "response_quality", 
    value=0.95, 
    labels={"model": "claude-3", "task": "summarization"}
)
```

### Authentication Configuration

For production environments, you should enable authentication:

```python
from cylestio import enable_monitoring, MonitoringConfig, AuthConfig

auth_config = AuthConfig(
    enable=True,
    secret_key="your-secure-secret-key",
    token_expiry=86400,  # 24 hours in seconds
    admin_username="admin",
    admin_password="secure-password"
)

config = MonitoringConfig(auth=auth_config)
enable_monitoring(config=config)
```

### Alert Configuration

Configure alerts to be notified of important events:

```python
from cylestio import enable_monitoring, MonitoringConfig, AlertConfig, AlertChannel

# Define alert channels
email_channel = AlertChannel(
    type="email",
    name="admin-email",
    config={
        "recipients": ["admin@example.com"],
        "smtp_server": "smtp.example.com",
        "smtp_port": 587,
        "smtp_username": "alerts@example.com",
        "smtp_password": "password"
    }
)

slack_channel = AlertChannel(
    type="slack",
    name="monitoring-channel",
    config={
        "webhook_url": "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
    }
)

# Define alert rules
alert_config = AlertConfig(
    channels=[email_channel, slack_channel],
    rules=[
        {
            "name": "high_latency",
            "condition": "avg(response_time) > 2000",  # milliseconds
            "duration": "5m",
            "severity": "warning",
            "channels": ["admin-email"]
        },
        {
            "name": "error_spike",
            "condition": "rate(error_count) > 0.05",  # 5% error rate
            "duration": "1m",
            "severity": "critical",
            "channels": ["admin-email", "monitoring-channel"]
        }
    ]
)

config = MonitoringConfig(alerts=alert_config)
enable_monitoring(config=config)
```

## Environment-Specific Configurations

### Development Environment

```python
config = MonitoringConfig(
    log_level="DEBUG",
    metrics_interval=10,
    database_url="sqlite:///cylestio_dev.db",
    enable_authentication=False
)
```

### Production Environment

```python
config = MonitoringConfig(
    log_level="WARNING",
    metrics_interval=60,
    database_url="postgresql://user:password@localhost:5432/cylestio",
    enable_authentication=True,
    auth_secret_key="your-secure-secret-key",
    api_workers=8,
    sampling_rate=0.1  # Sample 10% of requests for high-volume systems
)
```

## Next Steps

Now that you've configured Cylestio, you can:

- [Set up monitoring](../user-guide/monitoring.md) for your AI agents
- [Create custom dashboards](../user-guide/dashboards.md)
- [Configure alerts](../user-guide/alerts.md)
- [Explore advanced features](../advanced-topics/index.md) 