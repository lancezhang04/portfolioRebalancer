import yaml
from equity import Region

def load_config():
    with open("config.yaml", "r") as f:
        return yaml.safe_load(f)

config_data = load_config()

EQUITIES_DATA = config_data["equities"]

TARGET_REGIONAL_SPLIT = {
    Region[k]: v for k, v in config_data["target_regional_split"].items()
}

TARGET_VALUE_SPLIT = {
    Region[k]: v for k, v in config_data["target_value_split"].items()
}

PORTFOLIO_DATA = config_data["current_portfolio"]
