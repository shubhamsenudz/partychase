#!/usr/bin/env bash
set -euo pipefail
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin git
sudo mkdir -p /opt/partychase
cd /opt/partychase
sudo git pull || sudo git clone https://github.com/shubhamsenudz/partychase.git .
sudo docker compose up -d --build
