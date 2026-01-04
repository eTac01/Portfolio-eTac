#!/usr/bin/env python3
"""
Update portfolio projects with real GitHub repositories
Keeps all design intact, just updates URLs and project names
"""

import re

# Read the current HTML
with open('index.html', 'r') as f:
    html = f.read()

# Real GitHub projects mapping
projects = {
    'MalwareAnalyzer': 'Malware-File-Classification-Batch-10',
    'IPShifter': 'Network-analysis-using-wireshark',
    './ip_shifter': './network_analyzer'
}

# Update project 1: Malware Analyzer
html = html.replace(
    'https://github.com/eTac01/MalwareAnalyzer',
    'https://github.com/eTac01/Malware-File-Classification-Batch-10'
)
html = html.replace(
    '$ ./malware_analyzer',
    '$ ./malware_classifier'
)

# Update project 2: Network Analyzer  
html = html.replace(
    'https://github.com/eTac01/IPShifter',
    'https://github.com/eTac01/Network-analysis-using-wireshark'
)
html = html.replace(
    '$ ./ip_shifter',
    '$ ./network_analyzer'
)
html = html.replace(
    'Initializing TOR network',
    'Monitoring enterprise traffic'
)
html = html.replace(
    'IP rotation successful',
    'Wireshark + Tshark integration'
)
html = html.replace(
    'Anonymity level:',
    'Identifying threats and bottlenecks'
)
html = html.replace(
    'Network privacy ensured',
    'Continuous packet capture enabled'
)

# Update tech tags for project 2
html = html.replace(
    '<span class="tech-tag">TOR</span>',
    '<span class="tech-tag">Wireshark</span>'
)

# Write updated HTML
with open('index.html', 'w') as f:
    f.write(html)

print("✓ Updated portfolio with real GitHub projects!")
print("✓ Project 1: Malware-File-Classification-Batch-10")
print("✓ Project 2: Network-analysis-using-wireshark")
print("✓ All elite design elements preserved")
