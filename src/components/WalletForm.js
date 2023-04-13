import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApi } from '../service';
import { addExpense, apiList, editFinish } from '../redux/actions';

const ali = 'Alimentação';

const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  description: '',
  method: 'Dinheiro',
  tag: ali,
};

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

  componentDidUpdate(prevProps) {
    const { edit, expenses, idEdit } = this.props;
    if (prevProps.edit !== edit && edit === true) {
      this.setState({
        value: expenses[idEdit].value,
        currency: expenses[idEdit].currency,
        description: expenses[idEdit].description,
        method: expenses[idEdit].method,
        tag: expenses[idEdit].tag,
      });
    }
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
      tag: ali,
      value: '',
      description: '',
      exchangeRates: {},
    });
  };

  edit = () => {
    const { idEdit, expenses, dispatch } = this.props;
    const { value, currency, description, method,
      tag } = this.state;

    const payload = [
      ...expenses,
    ];

    payload[idEdit] = {
      ...expenses[idEdit],
      value,
      currency,
      description,
      method,
      tag,
    };

    dispatch(editFinish(payload));
    this.setState(INITIAL_STATE);
  };

  render() {
    const { currency, method, tag, value, description } = this.state;
    const { currencies, edit } = this.props;
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

          {!edit
            ? (
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            )
            : (
              <button type="button" onClick={ this.edit }>Editar despesa</button>
            )}
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  edit: state.wallet.edit,
  idEdit: state.wallet.idEdit,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  idEdit: PropTypes.number,
  edit: PropTypes.bool,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ),
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
