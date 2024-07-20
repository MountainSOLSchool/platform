variable "GITHUB_TOKEN" {}
variable "AWS_ACCESS_KEY_ID" {}
variable "AWS_SECRET_ACCESS_KEY" {}
variable "AWS_AMPLIFY_APP_ROLE_ARN" {}

terraform {
  cloud {
    organization = "mountain-sol-platform"

    workspaces {
      name = "admin-portal"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
}

resource "aws_amplify_app" "admin_portal" {
  name       = "admin_portal"
  repository = "https://github.com/MountainSOLSchool/platform"
  access_token = var.GITHUB_TOKEN

  environment_variables = {
    AMPLIFY_MONOREPO_APP_ROOT = "apps/portal-react"
    "_CUSTOM_IMAGE": "amplify:al2023",
    "_LIVE_UPDATES": "[{\"pkg\":\"node\",\"type\":\"npm\",\"version\":\"20\"}]"
  }

  # should come from a terraform resource for a service role
  iam_service_role_arn = var.AWS_AMPLIFY_APP_ROLE_ARN

  build_spec = <<-EOT
    version: 1
    applications:
      - appRoot: apps/portal-react
        frontend:
          phases:
            build:
              commands:
                - cd ../
                - npm ci
                - npx nx run portal-react:build:production
          artifacts:
            baseDirectory: ../dist/test-app/.next
            files:
              - '**/*'
          cache:
            paths:
              - node_modules/**/*
  EOT

  platform = "WEB_COMPUTE"
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.admin_portal.id
  branch_name = "main"
  enable_auto_build = false

  stage     = "PRODUCTION"
}

resource "aws_amplify_webhook" "main" {
  app_id      = aws_amplify_app.admin_portal.id
  branch_name = aws_amplify_branch.main.branch_name
  description = "triggermain"
}
