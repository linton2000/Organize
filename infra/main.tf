# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.1"
    }
  }

  backend "azurerm" { # Storing state file in an Azure blob
    use_oidc = true
  }  

  required_version = ">= 1.6.0"   # Current stable (GA)
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "app_rg" {
  name     = var.app_rg_name
  location = var.azure_region
}
