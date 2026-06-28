#!/bin/bash
# Start core platform services

echo "Starting IDP core services..."
docker compose up -d

echo "Waiting for services to be healthy..."
sleep 10

echo "Checking service health..."
docker compose ps

echo ""
echo "Services should be available at:"
echo "  PostgreSQL: localhost:5432"
echo "  Redis:      localhost:6379"
echo "  MinIO UI:   http://localhost:9001"