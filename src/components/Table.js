import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, editStart } from '../redux/actions';

class Table extends Component {
  delete = (id) => {
    const { dispatch, expenses } = this.props;
    const newExpense = expenses.filter((expense) => expense.id !== id);
    dispatch(removeExpense(newExpense));
  };

  edit = (id) => {
    const { dispatch } = this.props;
    dispatch(editStart(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <>
        <div>Table</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((item) => (
                <tr key={ item.id }>
                  <td>{ item.description }</td>
                  <td>{ item.tag }</td>
                  <td>{ item.method }</td>
                  <td>{ Number(item.value).toFixed(2) }</td>
                  <td>{ item.exchangeRates[item.currency].name }</td>
                  <td>
                    { Number(item.exchangeRates[item.currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>
                    { Number(item.value * item.exchangeRates[item.currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.edit(item.id) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.delete(item.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.shape({}),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
