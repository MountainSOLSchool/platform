variable "AWS_ACCESS_KEY_ID" {}
variable "AWS_SECRET_ACCESS_KEY" {}
variable "AWS_AMPLIFY_APP_ROLE_ARN" {}

terraform {
  cloud {
    organization = "mountain-sol-platform"

    workspaces {
      name = "student-portal"
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

resource "aws_amplify_app" "student_portal" {
  name       = "student_portal"

  environment_variables = {
    AMPLIFY_MONOREPO_APP_ROOT = "apps/student-portal"
    "_CUSTOM_IMAGE": "amplify:al2023",
    "_LIVE_UPDATES": "[{\"pkg\":\"node\",\"type\":\"nvm\",\"version\":\"20\"}]"
  }

  # should come from a terraform resource for a service role
  iam_service_role_arn = var.AWS_AMPLIFY_APP_ROLE_ARN

  build_spec = <<-EOT
    version: 1
    applications:
      - appRoot: apps/student-portal
        frontend:
          buildPath: /
          phases:
            preBuild:
              commands:
                - npm ci
            build:
              commands:
                - npx nx run student-portal:build:production
          artifacts:
            baseDirectory: dist/apps/student-portal/.next
            files:
              - '**/*'
          cache:
            paths:
              - node_modules/**/*
  EOT

  platform = "WEB_COMPUTE"
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.student_portal.id
  branch_name = "main"
  enable_auto_build = false

  stage     = "PRODUCTION"
}

resource "aws_amplify_webhook" "main" {
  app_id      = aws_amplify_app.student_portal.id
  branch_name = aws_amplify_branch.main.branch_name
  description = "triggermain"
}
