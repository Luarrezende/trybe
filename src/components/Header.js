import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <>
        <div>Header</div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          {
            expenses.reduce((acc, item) => acc + (Number(item
              .value) * Number(item.exchangeRates[item.currency].ask)), 0)
              .toFixed(2)
          }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  ...state.wallet,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.shape({}),
}.isRequired;

export default connect(mapStateToProps)(Header);
