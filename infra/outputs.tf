# EKS
output "eks_cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = module.eks.cluster_name
}

output "eks_kubeconfig" {
  description = "Kubeconfig for EKS cluster"
  value       = module.eks.kubeconfig
  sensitive   = true
}

# RDS
output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = module.rds.endpoint
  sensitive   = true
}

output "rds_password" {
  description = "RDS master password"
  value       = random_db_password.result
  sensitive   = true
}

# Redis
output "redis_endpoint" {
  description = "ElastiCache Redis endpoint"
  value       = module.redis.endpoint
}

output "redis_port" {
  description = "Redis port"
  value       = 6379
}

# S3
output "s3_bucket_artifacts" {
  description = "S3 bucket for container artifacts"
  value       = module.s3.bucket_artifacts
}

output "s3_bucket_backups" {
  description = "S3 bucket for backups"
  value       = module.s3.bucket_backups
}