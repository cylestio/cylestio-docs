#!/usr/bin/env python3
"""
Script to create the remaining documentation structure for Cylestio docs.
This will create placeholder files for all sections defined in mkdocs.yml.
"""

import os
import yaml

def create_file(path, content):
    """Create a file with the given content if it doesn't exist."""
    if not os.path.exists(path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as f:
            f.write(content)
        print(f"Created: {path}")
    else:
        print(f"Skipped (already exists): {path}")

def generate_placeholder(title):
    """Generate placeholder content for a documentation page."""
    return f"""# {title}

This page is under construction. Content will be added soon.

## Overview

Brief overview of {title.lower()} will be provided here.

## Features

List of features related to {title.lower()} will be added here.

## Usage

Usage examples and instructions will be provided here.

## Reference

Detailed reference information will be added here.
"""

def process_nav_item(item, base_path="docs"):
    """Process a navigation item from mkdocs.yml and create the corresponding file."""
    if isinstance(item, dict):
        # This is a section with subsections
        for section_title, section_items in item.items():
            if isinstance(section_items, list):
                for sub_item in section_items:
                    process_nav_item(sub_item, base_path)
    elif isinstance(item, str):
        # This is a direct file reference
        if ': ' in item:
            # Format is "Title: path.md"
            title, path = item.split(': ', 1)
        else:
            # Format is just "path.md"
            path = item
            title = os.path.splitext(os.path.basename(path))[0].replace('-', ' ').title()
        
        # Create the file
        full_path = os.path.join(base_path, path)
        if not os.path.exists(full_path):
            create_file(full_path, generate_placeholder(title))

def main():
    """Main function to create the documentation structure."""
    # Load the mkdocs.yml file
    with open('mkdocs.yml', 'r') as f:
        config = yaml.safe_load(f)
    
    # Process the navigation items
    if 'nav' in config:
        for item in config['nav']:
            process_nav_item(item)
    
    print("Documentation structure created successfully!")

if __name__ == "__main__":
    main() 