packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.0.0"
    }
  }
}

variable "DB_NAME" {
  type    = string
  default = env("DB_NAME")
}

variable "DB_USER" {
  type    = string
  default = env("DB_USER")
}

variable "DB_PASSWORD" {
  type    = string
  default = env("DB_PASSWORD")
}

variable "project_id" {
  type    = string
  default = env("GCP_PROJECT_ID")
}

variable "zone" {
  type    = string
  default = env("GCP_ZONE")
}

variable "source_image_family" {
  type    = string
  default = "centos-stream-8"
}

source "googlecompute" "centos" {
  project_id              = var.project_id
  zone                    = var.zone
  source_image_family     = var.source_image_family
  image_storage_locations = ["us-east1"]
  communicator            = "ssh"
  ssh_username            = "packer"
  image_name              = "centos-8-{{timestamp}}"
  image_family            = "centos-8-custom"
}

build {
  sources = ["source.googlecompute.centos"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/"
  }

  provisioner "shell" {
    scripts          = ["packer/scripts/upgrade.sh","packer/scripts/install.sh", "packer/scripts/user.sh"]
  }

  provisioner "shell" {
    environment_vars = ["DB_NAME=${var.DB_NAME}", "DB_USER=${var.DB_USER}", "DB_PASSWORD=${var.DB_PASSWORD}"]
    scripts          = ["packer/scripts/db_setup.sh", "packer/scripts/project.sh", "packer/scripts/systemd.sh"]
  }

  
}