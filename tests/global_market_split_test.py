import pandas as pd
import requests
import io


def get_global_market_split():
    # The public iShares URL for the MSCI ACWI ETF daily holdings
    url = "https://www.ishares.com/us/products/239600/ishares-msci-acwi-etf/1467271812596.ajax?fileType=csv&fileName=ACWI_holdings&dataType=fund"

    # iShares blocks default python user-agents, so we spoof a standard browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    response = requests.get(url, headers=headers)

    # BlackRock CSVs have a metadata header. The actual data usually starts at line 9.
    # We read it into pandas and clean the trailing junk rows.
    df = pd.read_csv(io.StringIO(response.text), skiprows=9)
    df = df.dropna(subset=['Weight (%)', 'Location'])

    # Convert weights to numeric, stripping any potential string artifacts
    df['Weight (%)'] = pd.to_numeric(df['Weight (%)'], errors='coerce')

    # Group by country and sum the market float weights
    country_weights = df.groupby('Location')['Weight (%)'].sum() / 100

    # Define your custom classification dictionaries
    # You can move 'South Korea' to 'developed_countries' if you prefer the FTSE/Avantis model
    emerging_countries = [
        # The Heavyweights
        'Taiwan', 'Korea (South)', 'China', 'India', 'Brazil',
        'Saudi Arabia', 'South Africa', 'Mexico',

        # The Mid-Weights & Small-Caps
        'Kuwait', 'Hungary', 'Thailand', 'Indonesia', 'Poland',
        'Qatar', 'Peru', 'United Arab Emirates', 'Malaysia',
        'Colombia', 'Greece', 'Chile', 'Turkey', 'Philippines',
        'Czech Republic', 'Egypt'
    ]

    us_weight = country_weights.get('United States', 0)

    emerging_weight = sum([country_weights.get(country, 0) for country in emerging_countries])

    # Ex-US Developed is simply the remainder of the equity float (ignoring cash/derivatives)
    total_equity_weight = country_weights.sum()
    developed_ex_us_weight = total_equity_weight - us_weight - emerging_weight

    # Normalize to 1.0 to account for the ~0.5% cash drag in the ETF
    total = us_weight + developed_ex_us_weight + emerging_weight

    return {
        "US": round(us_weight / total, 4),
        "Developed_Ex_US": round(developed_ex_us_weight / total, 4),
        "Emerging": round(emerging_weight / total, 4)
    }


# Execute
current_split = get_global_market_split()
print(current_split)
