#!/bin/bash
# Setup local Kubernetes cluster

echo "Creating KinD cluster..."
kind create cluster --config kubernetes/kind-config.yaml

echo "Installing ArgoCD..."
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

echo "Waiting for ArgoCD to be ready..."
kubectl wait --for=condition=readiness pod -l app.kubernetes.io/name=argocd-server -n argocd --timeout=300s

echo "Installing Prometheus Stack..."
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install monitoring prometheus-community/kube-prometheus-stack -n idp-system --create-namespace

echo "Installing Nginx Ingress..."
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx --create-namespace

echo "Cluster setup complete!"
echo "ArgoCD UI: kubectl port-forward svc/argocd-server -n argocd 8080:443"
echo "Grafana: kubectl port-forward svc/monitoring-grafana -n idp-system 3000:80"