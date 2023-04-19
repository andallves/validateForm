class ValidateCpf {
  constructor(sendCpf) {
    Object.defineProperty(this, 'clearCpf', {
      writable: false,
      enumerable: false,
      configurable: false,
      value: sendCpf.replace(/\D+/g, '')
    });
  }

  isSequence() {
    const sequence = this.clearCpf[0].repeat(this.clearCpf.length);
    return sequence === this.clearCpf;
  }

  static createDigit(halfCpf) {
    const arrayCpf = Array.from(halfCpf)

    let regressive = arrayCpf.length + 1;
    const total = arrayCpf.reduce((ac, val) => {
      ac += regressive * Number(val);
      regressive--;
      return ac
    }, 0)

    const digit = (11 - (total % 11));
    return digit > 9 ? '0' : String(digit);
  }

  createNewCpf() {
    const halfCpf = this.clearCpf.slice(0, - 2);
    const digit1 = ValidateCpf.createDigit(halfCpf);
    const digit2 = ValidateCpf.createDigit(halfCpf + digit1);
    this.newCpf = halfCpf + digit1 + digit2;
  }

  validate() {
    if (typeof this.clearCpf === 'undefined') return false;
    if (this.clearCpf.length !== 11) return false;
    if (this.isSequence()) return false;
    this.createNewCpf();
    return this.newCpf === this.clearCpf;
  }
}
