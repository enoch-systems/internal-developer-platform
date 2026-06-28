# Internal Developer Platform - Core Infrastructure

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
  }
}

# Configure AWS Provider
provider "aws" {
  region = var.aws_region
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

# VPC
module "vpc" {
  source = "./modules/vpc"

  name_prefix = "${var.project_name}-${var.environment}"
  aws_region   = var.aws_region
  azs          = data.aws_availability_zones.available.names
  vpc_cidr     = var.vpc_cidr

  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets

  enable_nat_gateway = true
  single_nat_gateway = var.environment == "dev" ? true : false

  tags = local.common_tags
}

# EKS Cluster
module "eks" {
  source = "./modules/eks"

  cluster_name    = "${var.project_name}-${var.environment}"
  cluster_version = var.eks_version
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  public_subnets  = module.vpc.public_subnets

  node_groups = {
    general = {
      desired_size = var.environment == "dev" ? 2 : 3
      max_size     = 5
      min_size     = var.environment == "dev" ? 1 : 2

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
    }
    spot = {
      desired_size = 1
      max_size     = 3
      min_size     = 0

      instance_types = ["t3.large", "t3.xlarge"]
      capacity_type  = "SPOT"
    }
  }

  tags = local.common_tags
}

# RDS PostgreSQL
module "rds" {
  source = "./modules/rds"

  identifier     = "${var.project_name}-${var.environment}"
  engine         = "postgres"
  engine_version = "16.1"
  instance_class = var.environment == "dev" ? "db.t3.micro" : "db.t3.small"

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_encrypted     = true

  db_name  = "idp"
  username = "admin"
  password = random_db_password.result

  vpc_id            = module.vpc.vpc_id
  private_subnets   = module.vpc.private_subnets
  publicly_accessible = false

  backup_retention_period = 7
  skip_final_snapshot     = var.environment == "dev" ? true : false

  tags = local.common_tags
}

# ElastiCache Redis
module "redis" {
  source = "./modules/redis"

  cluster_id     = "${var.project_name}-${var.environment}"
  engine         = "redis"
  engine_version = "7.0"
  node_type      = var.environment == "dev" ? "cache.t3.micro" : "cache.t3.small"
  num_nodes      = var.environment == "dev" ? 1 : 2

  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets

  at_rest_encryption_enabled = true

  tags = local.common_tags
}

# S3 Buckets
module "s3" {
  source = "./modules/s3"

  bucket_names = {
    artifacts = "${var.project_name}-artifacts-${var.environment}"
    backups   = "${var.project_name}-backups-${var.environment}"
    logs      = "${var.project_name}-logs-${var.environment}"
  }

  tags = local.common_tags
}

# Security Groups
module "security_groups" {
  source = "./modules/security_groups"

  vpc_id      = module.vpc.vpc_id
  environment = var.environment

  tags = local.common_tags
}