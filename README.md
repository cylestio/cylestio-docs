# Cylestio Documentation

This repository contains the documentation for Cylestio, an open-source monitoring solution for AI agents.

## Overview

The documentation is built using [MkDocs](https://www.mkdocs.org/) with the [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme. It follows a clean, minimal design inspired by Anthropic's documentation.

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip package manager

### Installation

1. Clone this repository:

```bash
git clone https://github.com/cylestio/cylestio-docs.git
cd cylestio-docs
```

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

### Local Development

To run the documentation site locally:

```bash
mkdocs serve
```

This will start a local development server at http://localhost:8000.

### Building the Site

To build the static site:

```bash
mkdocs build
```

The built site will be in the `site` directory.

## Documentation Structure

The documentation is organized into the following sections:

- **Getting Started**: Quick start guide, installation instructions, and configuration
- **User Guide**: Detailed information on using Cylestio
- **API Reference**: Documentation for the Cylestio API
- **SDK Reference**: Documentation for the Cylestio SDKs
- **Security & Compliance**: Information about security features and compliance
- **Advanced Topics**: Advanced usage and customization
- **Troubleshooting**: Common issues and solutions

## Contributing

Contributions to the documentation are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes
4. Submit a pull request

Please ensure your changes follow the existing style and structure of the documentation.

## License

This documentation is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback about the documentation, please open an issue in this repository or contact us at support@cylestio.com. 