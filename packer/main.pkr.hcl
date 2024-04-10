packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.0.0"
    }
  }
}

variable "builder" {
  type = object({
    project_id              = string
    zone                    = string
    source_image_family     = string
    image_storage_locations = list(string)
    ssh_username            = string
    image_name              = string
    image_family            = string
    disk_size               = number
    disk_type               = string
  })

  default = {
    project_id              = env("GCP_PROJECT")
    zone                    = env("GCP_ZONE")
    source_image_family     = env("SOURCE_IMAGE_FAMILY")
    image_storage_locations = ["us-east1"]
    ssh_username            = env("SSH_USERNAME")
    image_name              = env("IMAGE_NAME")
    image_family            = "webapp-csye6225"
    disk_size               = env("DISK_SIZE")
    disk_type               = env("DISK_TYPE")
  }
}

source "googlecompute" "centos" {
  project_id              = var.builder.project_id
  zone                    = var.builder.zone
  source_image_family     = var.builder.source_image_family
  image_storage_locations = var.builder.image_storage_locations
  ssh_username            = var.builder.ssh_username
  image_name              = "${var.builder.image_name}-{{timestamp}}"
  image_family            = var.builder.image_family
  disk_size               = var.builder.disk_size
  disk_type               = var.builder.disk_type
}

build {
  sources = ["source.googlecompute.centos"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/"
  }

  provisioner "file" {
    source      = "packer/files/config.yaml"
    destination = "/tmp/"
  }

  provisioner "file" {
    source      = "packer/files/webapp.service"
    destination = "/tmp/"
  }

  provisioner "shell" {
    scripts = [
      "packer/scripts/upgrade.sh",
      "packer/scripts/install.sh",
      "packer/scripts/user.sh"
    ]
  }

  provisioner "shell" {
    scripts = [
      "packer/scripts/project.sh",
      "packer/scripts/systemd.sh",
      "packer/scripts/configOpsAgent.sh"
    ]
  }

  post-processor "manifest" {
    output     = "manifest.json"
    strip_path = true
  }

}
