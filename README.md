# PartyChase

Chase outstanding when Tally sits at the CA. Promise Friday. Collect.

Java 21 + Spring Boot + PostgreSQL + React. Mumbai region (ap-south-1).

## Local
```bash
docker compose up --build
```
Open http://localhost:8083

## Production logs
JSON-file docker logs, request id on every HTTP call, login events without passwords.

## AWS
1. RDS PostgreSQL 16 in ap-south-1
2. Copy `.env.example` to `.env` and set secrets
3. Run `aws/deploy-ec2-ap-south-1.sh`

GitHub: https://github.com/shubhamsenudz/partychase
