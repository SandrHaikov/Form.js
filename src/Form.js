

import React, { Component } from 'react';
import { FormErrors } from './FormErrors';


class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      formErrors: {email: '', phone: ''},
      emailValid: false,
      phoneValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'phone':
      phoneValid = value.match( /^((?!(0))[0-9]{9})$/);
      fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
      break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    phoneValid: phoneValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.phoneValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form>
        <h2>Регистрация</h2>
        
          <FormErrors formErrors={this.state.formErrors} />
        
        <div className={this.errorClass(this.state.formErrors.email)}>
          
          <input   name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <div className={this.errorClass(this.state.formErrors.phone)}>
          
          <input  name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleUserInput}  />
        </div>
        <button type="submit"  disabled={!this.state.formValid}>зарегистрироваться</button>
      </form>
    )
  }
}

export default Form;