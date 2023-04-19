class ValidateForm {
  constructor() {
    this.form = document.querySelector('.form');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const fieldValid = this.isValid();
    const fieldPassword = this.passwordIsValid();

    if (fieldValid && fieldPassword) {
      alert('Formulário enviado!')
      this.form.submit();
    }
  }

  passwordIsValid() {
    let valid = true;

    const password = this.form.querySelector('.password');
    const passwordRepeat = this.form.querySelector('.password-repeat');

    if (password.value !== passwordRepeat.value) {
      valid = false;
      this.createError(passwordRepeat, 'Campos senhas e repetir senhas precisam ser iguais.');
    }

    if ((password.value.length < 6 || password.value.length > 12) && password.value) {
      valid = false;
      this.createError(password, 'Senha precisa conter entre 6 e 12 caracteres.');
    }

    return valid;
  }

  isValid() {
    let valid = true;

    for (let errorText of this.form.querySelectorAll('.error-msg')) {
      errorText.remove();
    }

    for (let field of this.form.querySelectorAll('.valid')) {
      let label = field.previousElementSibling.innerText;

      if (!field.value) {
        this.createError(field, `Campo "${label}" não pode estar em branco`)
        valid = false;
      }

      if (field.classList.contains('cpf') && field.value) {
        if (!this.validateCpf(field)) valid = false;
      }

      if (field.classList.contains('user') && field.value) {
        if (!this.validateUser(field)) valid = false;
      }
    }

    return valid;
  }

  validateCpf(field) {
    const cpf = new ValidateCpf(field.value);

    if (!cpf.validate()) {
      this.createError(field, 'CPF inválido.');
      return false;
    }

    return true;
  }

  validateUser(field) {
    const user = field.value
    let valid = true;

    if (user.length < 3 || user.length > 12) {
      this.createError(field, `Usuário precisa ter entre 3 e 12 caracteres`);
      valid = false;
    }

    if (!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(field, `Nome de usuário precisar conter apenas letra e/ou números`);
      valid = false;
    }
    return valid;
  }

  createError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-msg');
    field.insertAdjacentElement('afterend', div);
  }
}

const valida = new ValidateForm()