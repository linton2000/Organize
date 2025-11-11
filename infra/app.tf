# Hosts React SPA
resource "azurerm_static_web_app" "app_swa" {
  name                = "${var.app_rg_name}-swa"
  resource_group_name = var.app_rg_name
  location            = var.azure_region
  sku_tier = "Free"
  sku_size = "Free"
}

# Django API container hosting & prereq resources
resource "azurerm_log_analytics_workspace" "api_law" { # Will potentially make this a shared workspace in future
  name                = "${var.app_rg_name}-law"
  location            = var.azure_region
  resource_group_name = var.app_rg_name
  sku                 = "PerGB2018"   # Cheapest tier (PAYG pricing with up to 5GB per month free)
  retention_in_days   = 7
}

resource "azurerm_container_app_environment" "api_aca_env" {
  name                       = "${var.app_rg_name}-aca-env"
  location                   = var.azure_region
  resource_group_name        = var.app_rg_name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.api_law.id
}

resource "azurerm_container_app" "api_aca" {
  name                         = "${var.app_rg_name}-aca"
  container_app_environment_id = azurerm_container_app_environment.api_aca_env.id
  resource_group_name          = var.app_rg_name
  revision_mode                = "Single"

  template {
    container {
      name   = "examplecontainerapp"
      image  = "mcr.microsoft.com/k8se/quickstart:latest"
      cpu    = 0.25
      memory = "0.5Gi"
    }
  }
}