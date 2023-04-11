import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationAll);
  };

  validationAll = () => {
    const { email, password } = this.state;
    const number6 = 6;
    const isPasswordsValid = password.length >= number6;

    this.setState({
      buttonDisabled: !(this.isEmailValid(email) && isPasswordsValid),
    });
  };

  submitBtn = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addUser(email));
    history.push('/carteira');
  };

  isEmailValid(email) {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email);
  }

  render() {
    const { buttonDisabled, password, email } = this.state;

    return (
      <>
        <div>Login</div>
        <form>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Email"
            value={ email }
            required
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ buttonDisabled }
            onClick={ this.submitBtn }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
