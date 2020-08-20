import React from "react";
import { connect } from "react-redux";
import { fetchCryptoData, fetchUser } from "../../actions";
import { CryptoInfoBox } from "./CryptoInfoBox";

class CryptoList extends React.Component {
  componentDidMount() {
    if (this.props.holdings.length && this.props.currency !== undefined) {
      const requestedSymbols = this.getHoldingsSymbols(this.props.holdings);
      this.props.fetchCryptoData(requestedSymbols, this.props.currency).then(data => {
        // this.mergeCryptoData();
      });
    }
  }

  componentDidUpdate(prevProps) {
    const currentCryptoProp = JSON.stringify(this.props.crypto);
    const previousCryptoProp = JSON.stringify(prevProps.crypto);

    if (/*currentCryptoProp !== previousCryptoProp && previousCryptoProp !== '{}' ||*/ JSON.stringify(this.props.crypto) == '{}' && Array.isArray(this.props.holdings) && this.props.currency !== undefined) {
      const requestedSymbols = this.getHoldingsSymbols(this.props.holdings);
      this.props.fetchCryptoData(requestedSymbols, this.props.currency).then(data => {
        console.log('crypto data refreshed');
        // this.mergeCryptoData();
      });
    }
  }

  getHoldingsSymbols = (crypto) => {
    let result = '';

    for (let i = 0; i < crypto.length; i++) {
      if (crypto[i].symbol !== null) {
        if (i == 0 || result == '') {
          result += crypto[i].symbol;
        } else {
          result += ',' + crypto[i].symbol
        }
      }
    }
    return result;
  }

  // mergeCryptoData = (crypto, holdings) => {
  //   crypto = this.props.crypto;
  //   holdings = this.props.holdings;

  //   crypto.map((item, index) => {
  //     for (let i = 0; i < holdings.length; i++) {
  //       if (item.symbol == holdings[i].symbol) {
  //         return (
  //           item.amount = holdings[i].amount,
  //           item.invested = holdings[i].invested
  //         );
  //       }
  //     }
  //   });
  // }

  // sortCryptoData = (crypto) => {
  //   let cryptoArray = [];
  //   return cryptoArray;
  // }

  calculateProfit = (quantity, value, invested) => {
    const profit = quantity * value - invested;
    return profit;
  }

  renderList() {
    if (this.props.crypto.length) {
      return this.props.crypto.map((cryptoItem, index) => {
        return (
          <CryptoInfoBox
            key={cryptoItem.symbol}
            displayToggle="visible"
            infoBoxName={cryptoItem.name}
            infoBoxID={cryptoItem.symbol}
            infoBoxPrice={cryptoItem.quote.USD.price}
            infoBox1h={cryptoItem.quote.USD.percent_change_1h}
            infoBox24h={cryptoItem.quote.USD.percent_change_24h}
            infoBox7d={cryptoItem.quote.USD.percent_change_7d}
            amount={cryptoItem.amount}
            amountValue={this.calculateProfit(cryptoItem.amount, cryptoItem.quote.USD.price, cryptoItem.invested)}
          />
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    if (this.props.holdings !== undefined && this.props.isSignedIn) {
      return <div>{this.renderList()}</div>;
    } else {
      return <div>Login to add your holdings and see live crypto stats.</div>;
    }
  }
}

const mapStateToProps = state => {
  return { crypto: state.crypto, holdings: state.holdings, currency: state.user.currency, isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { fetchCryptoData, CryptoInfoBox, fetchUser })(CryptoList);
