# SDK Reference

Welcome to the Cylestio SDK Reference. This section provides detailed information about the official Cylestio SDKs, which allow you to integrate Cylestio monitoring into your applications.

## Overview

Cylestio provides official SDKs for several programming languages, making it easy to integrate monitoring into your applications regardless of your technology stack. These SDKs provide a convenient wrapper around the Cylestio API, handling authentication, request formatting, and error handling for you.

## Available SDKs

Cylestio currently provides the following official SDKs:

- [Python SDK](python.md): For Python applications
- [JavaScript SDK](javascript.md): For Node.js and browser applications
- [Go SDK](go.md): For Go applications
- [Java SDK](java.md): For Java applications

## Common Features

All Cylestio SDKs provide the following core features:

- **Agent Monitoring**: Monitor AI agents and collect metrics
- **Metrics Access**: Retrieve and analyze monitoring data
- **Alert Management**: Configure and manage alerts
- **Dashboard Integration**: Create and manage dashboards
- **Authentication**: Secure access to the Cylestio API

## Installation

### Python SDK

```bash
pip install cylestio
```

### JavaScript SDK

```bash
npm install cylestio
# or
yarn add cylestio
```

### Go SDK

```bash
go get github.com/cylestio/cylestio-go
```

### Java SDK

Maven:

```xml
<dependency>
    <groupId>com.cylestio</groupId>
    <artifactId>cylestio-java</artifactId>
    <version>1.0.0</version>
</dependency>
```

Gradle:

```groovy
implementation 'com.cylestio:cylestio-java:1.0.0'
```

## Basic Usage

### Python SDK

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

### JavaScript SDK

```javascript
const { enableMonitoring } = require('cylestio');
const { Anthropic } = require('@anthropic-ai/sdk');

// Initialize your AI client
const client = new Anthropic({
  apiKey: 'your-api-key',
});

// Enable monitoring
enableMonitoring({
  agentId: 'my_agent',
  llmClient: client
});

// Use your client as normal
async function main() {
  const response = await client.messages.create({
    model: 'claude-3-sonnet-20240229',
    messages: [{ role: 'user', content: 'Hello!' }]
  });
  console.log(response.content);
}

main();
```

### Go SDK

```go
package main

import (
    "context"
    "fmt"
    
    "github.com/cylestio/cylestio-go"
    "github.com/anthropic/anthropic-go"
)

func main() {
    // Initialize your AI client
    client, err := anthropic.NewClient("your-api-key")
    if err != nil {
        panic(err)
    }
    
    // Enable monitoring
    err = cylestio.EnableMonitoring(cylestio.MonitoringOptions{
        AgentID: "my_agent",
        LLMClient: client,
    })
    if err != nil {
        panic(err)
    }
    
    // Use your client as normal
    resp, err := client.Messages.Create(context.Background(), &anthropic.MessageCreateParams{
        Model: "claude-3-sonnet-20240229",
        Messages: []anthropic.Message{
            {
                Role: "user",
                Content: "Hello!",
            },
        },
    })
    if err != nil {
        panic(err)
    }
    
    fmt.Println(resp.Content)
}
```

### Java SDK

```java
import com.cylestio.Cylestio;
import com.cylestio.MonitoringConfig;
import com.anthropic.Anthropic;
import com.anthropic.Messages;

public class Example {
    public static void main(String[] args) {
        // Initialize your AI client
        Anthropic client = Anthropic.builder()
            .apiKey("your-api-key")
            .build();
        
        // Enable monitoring
        Cylestio.enableMonitoring(
            "my_agent",
            client,
            new MonitoringConfig()
        );
        
        // Use your client as normal
        Messages.MessageResponse response = client.messages()
            .create(Messages.MessageCreateParams.builder()
                .model("claude-3-sonnet-20240229")
                .addMessage(Messages.Message.builder()
                    .role("user")
                    .content("Hello!")
                    .build())
                .build());
        
        System.out.println(response.getContent());
    }
}
```

## Advanced Usage

For advanced usage and detailed API reference, please refer to the specific SDK documentation:

- [Python SDK Reference](python.md)
- [JavaScript SDK Reference](javascript.md)
- [Go SDK Reference](go.md)
- [Java SDK Reference](java.md)

## SDK Versioning

Cylestio SDKs follow semantic versioning (MAJOR.MINOR.PATCH):

- MAJOR version changes indicate incompatible API changes
- MINOR version changes add functionality in a backward-compatible manner
- PATCH version changes include backward-compatible bug fixes

## SDK Compatibility

| SDK Version | API Version | Minimum Cylestio Version |
|-------------|-------------|--------------------------|
| 1.x.x       | v1          | 1.0.0                    |

## Contributing

All Cylestio SDKs are open source and contributions are welcome. For more information on contributing, please see the GitHub repositories for each SDK:

- [Python SDK Repository](https://github.com/cylestio/cylestio-python)
- [JavaScript SDK Repository](https://github.com/cylestio/cylestio-js)
- [Go SDK Repository](https://github.com/cylestio/cylestio-go)
- [Java SDK Repository](https://github.com/cylestio/cylestio-java)

## Support

If you encounter any issues with the SDKs, please check the [Troubleshooting Guide](../troubleshooting/common-issues.md) or open an issue in the respective GitHub repository. 