import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApi } from '../service';
import { addExpense, apiList } from '../redux/actions';

// console.log(thunkE);

class WalletForm extends Component {
  state = {
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    value: '',
    description: '',
    id: 0,
    exchangeRates: {},
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { dispatch } = this.props;
    const data = await getApi();
    delete data.USDT;
    const filter = Object.keys(data);
    dispatch(apiList(filter));
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { id } = this.state;
    this.setState({
      id: id + 1,
    });
    dispatch(addExpense(this.state));
    this.setState({
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: '',
      description: '',
      exchangeRates: {},
    });
  };

  render() {
    const { currency, method, tag, value, description } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <div>WalletForm</div>
        <form>
          <input
            type="text"
            name="value"
            data-testid="value-input"
            placeholder="Valor da Despesa"
            onChange={ this.handleChange }
            value={ value }
          />

          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Descrição"
            onChange={ this.handleChange }
            value={ description }
          />

          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies && currencies.map((item) => (
              <option
                value={ item }
                key={ item }
              >
                {item}
              </option>))}
          </select>

          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
