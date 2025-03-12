# Dashboards

This page provides detailed information about using and customizing dashboards in Cylestio.

## Overview

Cylestio dashboards provide a visual interface for monitoring your AI agents. They allow you to:

- View real-time and historical metrics
- Create custom visualizations
- Share monitoring data with your team
- Set up alerts based on dashboard metrics
- Export data for further analysis

## Accessing the Dashboard

### Using the CLI

The simplest way to access the Cylestio dashboard is through the CLI:

```bash
cylestio dashboard
```

This will start the dashboard server and open it in your default browser at `http://localhost:8080`.

### Using Docker

If you're running Cylestio in Docker, you can access the dashboard at:

```
http://<docker-host>:8080
```

### Using Kubernetes

If you're running Cylestio in Kubernetes, you can access the dashboard by port-forwarding:

```bash
kubectl port-forward svc/cylestio-dashboard 8080:8080 -n cylestio
```

Then access the dashboard at `http://localhost:8080`.

## Dashboard Components

The Cylestio dashboard consists of several components:

### Navigation

- **Home**: Overview of all monitored agents
- **Agents**: Detailed view of individual agents
- **Metrics**: Exploration of all collected metrics
- **Alerts**: View and manage alerts
- **Settings**: Configure dashboard settings

### Default Dashboards

Cylestio comes with several default dashboards:

- **Overview**: High-level summary of all agents
- **Performance**: Detailed performance metrics
- **Errors**: Error rates and types
- **Content Safety**: Content safety metrics
- **Cost**: Token usage and cost metrics
- **System**: System resource usage

### Widgets

Dashboards are composed of widgets, which can display various types of data:

- **Time Series**: Line charts for time-based metrics
- **Gauges**: Visual indicators of current values
- **Tables**: Tabular data display
- **Heatmaps**: Visualization of data density
- **Bar Charts**: Comparison of categorical data
- **Pie Charts**: Distribution of values
- **Text**: Custom text and markdown
- **Alerts**: Current alert status

## Creating Custom Dashboards

### Using the Web Interface

1. Click on the "Dashboards" menu
2. Click "Create Dashboard"
3. Enter a name and description
4. Click "Create"
5. Add widgets to your dashboard
6. Arrange and resize widgets as needed
7. Save your dashboard

### Using the API

You can also create dashboards programmatically:

```python
from cylestio import create_dashboard, DashboardWidget

# Create a dashboard
dashboard = create_dashboard(
    name="Production Monitoring",
    description="Monitoring dashboard for production AI agents",
    tags=["production", "monitoring"]
)

# Add widgets to the dashboard
create_widget(
    dashboard_id=dashboard.id,
    title="Response Time",
    type="time_series",
    metrics=["response_time"],
    agent_ids=["production_agent_1", "production_agent_2"],
    position={"x": 0, "y": 0, "w": 6, "h": 4}
)

create_widget(
    dashboard_id=dashboard.id,
    title="Error Rate",
    type="gauge",
    metrics=["error_rate"],
    agent_ids=["production_agent_1", "production_agent_2"],
    position={"x": 6, "y": 0, "w": 6, "h": 4}
)
```

## Customizing Dashboards

### Adding Widgets

To add a widget to a dashboard:

1. Open the dashboard
2. Click "Add Widget"
3. Select the widget type
4. Configure the widget settings
5. Click "Add"

### Widget Configuration

Each widget type has specific configuration options:

#### Time Series Widget

- **Metrics**: The metrics to display
- **Agents**: The agents to include
- **Time Range**: The time period to display
- **Aggregation**: How to aggregate the data (avg, sum, min, max)
- **Refresh Interval**: How often to update the data

#### Gauge Widget

- **Metric**: The metric to display
- **Agents**: The agents to include
- **Thresholds**: Color-coded value ranges
- **Unit**: The unit of measurement
- **Refresh Interval**: How often to update the data

#### Table Widget

- **Metrics**: The metrics to display as columns
- **Agents**: The agents to include as rows
- **Sorting**: How to sort the table
- **Pagination**: Number of rows per page
- **Refresh Interval**: How often to update the data

### Layout Customization

You can customize the dashboard layout:

1. Click "Edit Layout"
2. Drag widgets to reposition them
3. Resize widgets by dragging their corners
4. Click "Save Layout" when done

### Theme Customization

You can customize the dashboard theme:

1. Go to "Settings" > "Theme"
2. Choose a predefined theme or create a custom theme
3. Customize colors, fonts, and other visual elements
4. Click "Apply" to save your changes

## Sharing Dashboards

### Public Sharing

To share a dashboard publicly:

1. Open the dashboard
2. Click "Share"
3. Toggle "Public Access" to on
4. Copy the public URL
5. Share the URL with others

### User Sharing

To share a dashboard with specific users:

1. Open the dashboard
2. Click "Share"
3. Enter the email addresses of users to share with
4. Select permission level (View, Edit, Admin)
5. Click "Share"

### Embedding

You can embed Cylestio dashboards in other applications:

1. Open the dashboard
2. Click "Share"
3. Select the "Embed" tab
4. Configure embedding options
5. Copy the embed code
6. Paste the code into your application

## Exporting Dashboard Data

### CSV Export

To export dashboard data as CSV:

1. Open the dashboard
2. Click "Export"
3. Select "CSV"
4. Configure export options
5. Click "Export"

### JSON Export

To export dashboard data as JSON:

1. Open the dashboard
2. Click "Export"
3. Select "JSON"
4. Configure export options
5. Click "Export"

### API Export

You can also export dashboard data programmatically:

```python
from cylestio import export_dashboard_data

# Export dashboard data
data = export_dashboard_data(
    dashboard_id="dashboard-123",
    format="csv",
    time_range="7d"
)

# Save the data to a file
with open("dashboard_data.csv", "w") as f:
    f.write(data)
```

## Dashboard Templates

### Using Templates

Cylestio provides dashboard templates for common use cases:

1. Click "Create Dashboard"
2. Select "From Template"
3. Choose a template
4. Customize as needed
5. Click "Create"

### Creating Templates

You can create your own dashboard templates:

1. Create and customize a dashboard
2. Click "Save as Template"
3. Enter a name and description
4. Click "Save"

### Sharing Templates

You can share templates with your team:

1. Go to "Settings" > "Templates"
2. Select a template
3. Click "Share"
4. Configure sharing options
5. Click "Share"

## Best Practices

### Dashboard Organization

- **Keep It Simple**: Focus on the most important metrics
- **Group Related Metrics**: Organize widgets logically
- **Use Consistent Naming**: Use clear, consistent names for dashboards and widgets
- **Add Context**: Include text widgets to explain the purpose and interpretation of metrics

### Performance Optimization

- **Limit Time Range**: Use appropriate time ranges to avoid loading too much data
- **Use Aggregation**: Aggregate data when possible to improve performance
- **Limit Refresh Rate**: Set appropriate refresh intervals based on data update frequency
- **Archive Old Dashboards**: Archive dashboards that are no longer needed

## Troubleshooting

If you encounter issues with dashboards, check the following:

- Ensure your metrics are being collected correctly
- Verify that your dashboard has the correct permissions
- Check your browser console for any error messages
- Try clearing your browser cache

For more detailed troubleshooting, see the [Troubleshooting Guide](../troubleshooting/common-issues.md). 