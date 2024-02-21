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
  type      = string
  default   = env("DB_PASSWORD")
  sensitive = true
}

variable "PORT" {
  type    = number
  default = env("PORT")
}

variable "project_id" {
  type    = string
  default = env("GCP_PROJECT")
}

variable "zone" {
  type    = string
  default = env("GCP_ZONE")
}

variable "source_image_family" {
  type    = string
  default = env("SOURCE_IMAGE_FAMILY")
}

variable "image_storage_locations" {
  type    = list(string)
  default = ["us-east1"]
}

variable "ssh_username" {
  type    = string
  default = env("SSH_USERNAME")
}

variable "image_name" {
  type    = string
  default = env("IMAGE_NAME")
}

variable "image_family" {
  type    = string
  default = "centos-8-custom"
}

variable "disk_size" {
  type    = number
  default = env("DISK_SIZE")
}

variable "disk_type" {
  type    = string
  default = env("DISK_TYPE")
}

source "googlecompute" "centos" {
  project_id              = var.project_id
  zone                    = var.zone
  source_image_family     = var.source_image_family
  image_storage_locations = var.image_storage_locations
  ssh_username            = var.ssh_username
  image_name              = "${var.image_name}-{{timestamp}}"
  image_family            = var.image_family
  disk_size               = var.disk_size
  disk_type               = var.disk_type
}

build {
  sources = ["source.googlecompute.centos"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/"
  }

  provisioner "shell" {
    scripts = ["packer/scripts/upgrade.sh", "packer/scripts/install.sh", "packer/scripts/user.sh"]
  }

  provisioner "shell" {
    environment_vars = ["DB_NAME=${var.DB_NAME}", "DB_USER=${var.DB_USER}", "DB_PASSWORD=${var.DB_PASSWORD}", "PORT=${var.PORT}"]
    scripts          = ["packer/scripts/db_setup.sh", "packer/scripts/project.sh", "packer/scripts/systemd.sh"]
  }


}