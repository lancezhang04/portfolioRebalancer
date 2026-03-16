from portfolio import Position, Portfolio
from equity import Ticker, EQUITIES
from constants import PORTFOLIO_DATA


current_portfolio = Portfolio([
    Position(value=item['value'], equity=EQUITIES[Ticker[item['ticker']]])
    for item in PORTFOLIO_DATA
])


if __name__ == "__main__":
    print()
    print(f"Current value tilt: {current_portfolio.value_tilt:.2%}")
    print(f"Target value tilt: {current_portfolio.target_value_tilt:.2%}")
    print(f"Active share: {current_portfolio.active_share:.2%}")

    regional_dist = current_portfolio.regional_distribution()
    print("Regional distribution:")
    for region, proportion in regional_dist.items():
        print(f"\t{region} - {proportion:.2%}")

    # current_portfolio.display()
    # print()
    current_portfolio.balance_with_infusion(550)
