import React from "react";
import { connect } from "react-redux";
import { fetchCryptoData, fetchUserData } from "../actions";
import { CryptoInfoBox } from "./CryptoInfoBox";

class CryptoList extends React.Component {
  componentDidMount() {
    if (this.props.userCrypto !== undefined) {
      const requestedSymbols = this.getUserCryptoSymbols(this.props.userCrypto);
      this.props.fetchCryptoData(requestedSymbols, this.props.currency);
    }
  }

  componentDidUpdate(prevProps) {
    const currentCryptoProp = JSON.stringify(this.props.crypto);
    const previousCryptoProp = JSON.stringify(prevProps.crypto);

    if (currentCryptoProp !== previousCryptoProp && previousCryptoProp !== '{}' || JSON.stringify(this.props.crypto) == '{}' && this.props.userCrypto !== undefined) {
      const requestedSymbols = this.getUserCryptoSymbols(this.props.userCrypto);
      this.props.fetchCryptoData(requestedSymbols, this.props.currency).then(data => {
        console.log('crypto data refreshed');
        this.mergeCryptoData();
      });
    }
  }

  getUserCryptoSymbols = (crypto) => {
    let result = '';

    for (let i = 0; i < crypto.length; i++) {
      if (crypto[i].crypto_symbol !== null) {
        if (i == 0 || result == '') {
          result += crypto[i].crypto_symbol;
        } else {
          result += ',' + crypto[i].crypto_symbol
        }
      }
    }
    return result;
  }

  mergeCryptoData = (crypto, userCrypto) => {
    crypto = this.props.crypto;
    userCrypto = this.props.userCrypto;

    crypto.map((item, index) => {
      for (let i = 0; i < userCrypto.length; i++) {
        if (item.symbol == userCrypto[i].crypto_holding) {
          return (
            item.holding_amount = userCrypto[i].crypto_holding,
            item.invested = userCrypto[i].invested
          );
        }
      }
    });

    // this.props.mergedCrypto = crypto;
  }

  sortCryptoData = (crypto) => {
    let cryptoArray = [];
    return cryptoArray;
  }

  calculateProfit = (quantity, value, invested) => {
    const profit = quantity * value - invested;
    return profit;
  }

  renderList(holdingsList) {
    // console.log(this.props);
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
            amount={cryptoItem.crypto_holding}
            amountValue={this.calculateProfit(cryptoItem.crypto_holding, cryptoItem.quote.USD.price, cryptoItem.invested)}
          />
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    console.log(this.props);
    if (this.props.userCrypto !== undefined && this.props.isSignedIn) {
      return <div className="mainContent">{this.renderList()}</div>;
    } else {
      return <div className="mainContent">Login to add your holdings and see live crypto stats.</div>;
    }
  }
}

const mapStateToProps = state => {
  return { crypto: state.crypto, userCrypto: state.user.holdings, currency: state.user.currency, isSignedIn: state.auth.isSignedIn, mergedCrypto: [] };
};

export default connect(mapStateToProps, { fetchCryptoData, CryptoInfoBox, fetchUserData })(CryptoList);
