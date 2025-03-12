# Alerts

This page provides detailed information about setting up and managing alerts in Cylestio.

## Overview

Alerts in Cylestio allow you to be notified when specific conditions are met in your monitoring data. This helps you quickly respond to issues and ensure the reliability of your AI agents.

## Alert Components

A Cylestio alert consists of the following components:

- **Alert Rule**: The condition that triggers the alert
- **Alert Channel**: The method used to deliver the alert notification
- **Alert Template**: The format and content of the alert notification
- **Alert Severity**: The importance level of the alert

## Setting Up Alert Channels

Before creating alerts, you need to set up one or more alert channels. Cylestio supports various notification channels:

### Email Alerts

```python
from cylestio import enable_monitoring, MonitoringConfig, AlertConfig, AlertChannel

# Define an email alert channel
email_channel = AlertChannel(
    type="email",
    name="team-email",
    config={
        "recipients": ["team@example.com", "oncall@example.com"],
        "smtp_server": "smtp.example.com",
        "smtp_port": 587,
        "smtp_username": "alerts@example.com",
        "smtp_password": "your-smtp-password"
    }
)

# Create alert configuration with the channel
alert_config = AlertConfig(
    channels=[email_channel]
)

# Enable monitoring with alerts
config = MonitoringConfig(alerts=alert_config)
enable_monitoring(config=config)
```

### Slack Alerts

```python
from cylestio import AlertChannel

# Define a Slack alert channel
slack_channel = AlertChannel(
    type="slack",
    name="monitoring-slack",
    config={
        "webhook_url": "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
        "channel": "#monitoring-alerts"
    }
)
```

### Webhook Alerts

```python
from cylestio import AlertChannel

# Define a webhook alert channel
webhook_channel = AlertChannel(
    type="webhook",
    name="custom-webhook",
    config={
        "url": "https://api.example.com/alerts",
        "method": "POST",
        "headers": {
            "Authorization": "Bearer your-api-key",
            "Content-Type": "application/json"
        }
    }
)
```

### PagerDuty Alerts

```python
from cylestio import AlertChannel

# Define a PagerDuty alert channel
pagerduty_channel = AlertChannel(
    type="pagerduty",
    name="oncall-pagerduty",
    config={
        "integration_key": "your-pagerduty-integration-key",
        "severity_mapping": {
            "critical": "critical",
            "warning": "warning",
            "info": "info"
        }
    }
)
```

## Creating Alert Rules

After setting up alert channels, you can create alert rules:

### Basic Alert Rules

```python
from cylestio import AlertConfig, AlertRule

# Define alert rules
rules = [
    AlertRule(
        name="high_latency",
        condition="avg(response_time) > 2000",  # milliseconds
        duration="5m",
        severity="warning",
        channels=["team-email"]
    ),
    AlertRule(
        name="error_spike",
        condition="rate(error_count) > 0.05",  # 5% error rate
        duration="1m",
        severity="critical",
        channels=["team-email", "oncall-pagerduty"]
    )
]

# Create alert configuration with rules
alert_config = AlertConfig(
    channels=[email_channel, pagerduty_channel],
    rules=rules
)
```

### Alert Conditions

Alert conditions are expressions that define when an alert should be triggered. Cylestio supports a variety of functions and operators in alert conditions:

- **Aggregation Functions**: `avg()`, `sum()`, `min()`, `max()`, `count()`, `rate()`
- **Comparison Operators**: `>`, `>=`, `<`, `<=`, `==`, `!=`
- **Logical Operators**: `and`, `or`, `not`
- **Time Functions**: `timeShift()`, `delta()`

Examples:

```
avg(response_time) > 2000
rate(error_count) > 0.05
max(cpu_usage) > 80 and min(memory_available) < 1000000000
delta(token_usage_total) > 1000000
```

### Alert Severity Levels

Cylestio supports the following severity levels for alerts:

- **Critical**: Highest severity, requires immediate attention
- **Warning**: Important issue that should be addressed soon
- **Info**: Informational alert, no immediate action required
- **Debug**: Low-level alert for debugging purposes

## Alert Templates

You can customize the format and content of alert notifications using templates:

```python
from cylestio import AlertTemplate

# Define a custom alert template
template = AlertTemplate(
    name="detailed-alert",
    subject="[{{ severity | upper }}] {{ rule_name }}: {{ condition }}",
    body="""
Alert: {{ rule_name }}
Severity: {{ severity }}
Time: {{ timestamp }}
Condition: {{ condition }}
Value: {{ value }}
Agent: {{ agent_id }}

Dashboard: {{ dashboard_url }}
    """
)

# Add the template to your alert configuration
alert_config = AlertConfig(
    channels=[email_channel],
    rules=[high_latency_rule],
    templates=[template]
)
```

## Alert Escalation

For critical alerts, you can set up escalation policies:

```python
from cylestio import AlertEscalation

# Define an escalation policy
escalation = AlertEscalation(
    name="critical-escalation",
    steps=[
        {
            "delay": "15m",
            "channels": ["team-email"]
        },
        {
            "delay": "30m",
            "channels": ["oncall-pagerduty"]
        },
        {
            "delay": "1h",
            "channels": ["manager-sms"]
        }
    ]
)

# Add the escalation policy to a rule
critical_error_rule = AlertRule(
    name="critical_error",
    condition="rate(critical_error_count) > 0",
    duration="1m",
    severity="critical",
    channels=["team-email"],
    escalation="critical-escalation"
)
```

## Managing Alerts

### Viewing Active Alerts

You can view active alerts in the Cylestio dashboard or using the API:

```python
from cylestio import get_active_alerts

# Get all active alerts
alerts = get_active_alerts()

# Get active alerts for a specific agent
agent_alerts = get_active_alerts(agent_id="my_agent")

# Get active alerts with a specific severity
critical_alerts = get_active_alerts(severity="critical")
```

### Acknowledging Alerts

When you're working on an issue, you can acknowledge the alert to prevent further notifications:

```python
from cylestio import acknowledge_alert

# Acknowledge an alert
acknowledge_alert(
    alert_id="alert-123",
    comment="Investigating high latency issue",
    acknowledged_by="john.doe@example.com"
)
```

### Silencing Alerts

You can temporarily silence alerts during maintenance or when working on known issues:

```python
from cylestio import silence_alert

# Silence an alert for 2 hours
silence_alert(
    alert_id="alert-123",
    duration="2h",
    reason="Maintenance in progress",
    silenced_by="jane.smith@example.com"
)

# Silence all alerts for a specific agent
silence_alerts(
    agent_id="my_agent",
    duration="1h",
    reason="Deploying new version"
)
```

## Best Practices

### Effective Alerting

- **Alert on Symptoms, Not Causes**: Alert on user-facing issues rather than internal metrics
- **Reduce Noise**: Only alert on actionable issues to avoid alert fatigue
- **Use Appropriate Severity Levels**: Reserve critical alerts for truly critical issues
- **Include Context**: Provide enough information in alerts to understand and diagnose the issue
- **Set Reasonable Thresholds**: Base thresholds on historical data and business requirements

### Alert Organization

- **Group Related Alerts**: Use consistent naming and grouping for related alerts
- **Document Alert Procedures**: Document the expected response for each alert type
- **Review and Refine**: Regularly review and refine your alerts based on experience

## Troubleshooting

If you're having issues with alerts, check the following:

- Ensure your alert channels are correctly configured
- Verify that your alert conditions are valid expressions
- Check that your metrics are being collected correctly
- Review the alert logs for any error messages

For more detailed troubleshooting, see the [Troubleshooting Guide](../troubleshooting/common-issues.md). 