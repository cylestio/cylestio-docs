# API Reference

Welcome to the Cylestio API Reference. This section provides detailed information about the Cylestio API, which allows you to interact with the monitoring platform programmatically.

## Overview

The Cylestio API is a RESTful API that provides access to all the features of the Cylestio monitoring platform. You can use the API to:

- Retrieve monitoring data
- Configure monitoring settings
- Manage alerts and notifications
- Create and update dashboards
- Access logs and events

## API Basics

### Base URL

All API requests should be made to the following base URL:

```
https://api.cylestio.com/v1
```

For self-hosted installations, the base URL will be:

```
http://<your-server-address>:<api-port>/v1
```

By default, the API port is `9090`.

### Authentication

Most API endpoints require authentication. You can authenticate using an API key or a JWT token.

#### API Key Authentication

To authenticate using an API key, include the key in the `X-API-Key` header:

```
X-API-Key: your-api-key
```

#### JWT Authentication

To authenticate using a JWT token, include the token in the `Authorization` header:

```
Authorization: Bearer your-jwt-token
```

You can obtain a JWT token by calling the `/auth/token` endpoint with your credentials.

### Request Format

API requests should be made using HTTP methods (GET, POST, PUT, DELETE) with JSON-encoded bodies where applicable.

### Response Format

API responses are returned in JSON format. A typical response has the following structure:

```json
{
  "status": "success",
  "data": {
    // Response data
  }
}
```

In case of an error, the response will have the following structure:

```json
{
  "status": "error",
  "error": {
    "code": "error_code",
    "message": "Error message"
  }
}
```

### Pagination

For endpoints that return multiple items, pagination is supported using the `page` and `limit` query parameters:

```
GET /agents?page=1&limit=10
```

Paginated responses include pagination metadata:

```json
{
  "status": "success",
  "data": [
    // Items
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## API Endpoints

The Cylestio API is organized into the following categories:

- [Authentication](authentication.md): Endpoints for authentication and authorization
- [Agents](endpoints.md#agents): Endpoints for managing monitored agents
- [Metrics](endpoints.md#metrics): Endpoints for retrieving monitoring metrics
- [Alerts](endpoints.md#alerts): Endpoints for managing alerts and notifications
- [Dashboards](endpoints.md#dashboards): Endpoints for managing dashboards
- [Logs](endpoints.md#logs): Endpoints for accessing logs and events
- [Settings](endpoints.md#settings): Endpoints for managing system settings

## Rate Limiting

The API implements rate limiting to prevent abuse. Rate limits are applied per API key or IP address. The current rate limits are:

- 100 requests per minute for most endpoints
- 1000 requests per minute for metrics endpoints

When a rate limit is exceeded, the API will return a `429 Too Many Requests` response with a `Retry-After` header indicating how long to wait before making another request.

## Error Codes

The API uses standard HTTP status codes to indicate the success or failure of a request. In addition, the response body includes an error code and message for more detailed information.

Common error codes include:

- `authentication_error`: Authentication failed
- `authorization_error`: Insufficient permissions
- `validation_error`: Invalid request parameters
- `not_found`: Requested resource not found
- `rate_limit_exceeded`: Rate limit exceeded
- `internal_error`: Internal server error

## SDKs

To simplify API integration, Cylestio provides official SDKs for several programming languages:

- [Python SDK](../sdk-reference/python.md)
- [JavaScript SDK](../sdk-reference/javascript.md)
- [Go SDK](../sdk-reference/go.md)
- [Java SDK](../sdk-reference/java.md)

## API Versioning

The Cylestio API is versioned to ensure backward compatibility. The current version is `v1`. When a new version is released, the previous version will be supported for at least 12 months.

## Next Steps

- [Authentication](authentication.md): Learn how to authenticate with the API
- [Endpoints](endpoints.md): Explore the available API endpoints
- [SDK Reference](../sdk-reference/index.md): Use our official SDKs for easier integration 