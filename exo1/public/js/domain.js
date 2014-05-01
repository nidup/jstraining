function Operation() {
    this.date   = null;
    this.type   = null;
    this.amount = null;
    this.label  = null;

    this.isValid = function() {
        return typeof this.date !== null
            && (this.type === 'CREDIT' || this.type === 'DEBIT')
            && typeof this.amount === 'number'
            && typeof this.label === 'string';
    }
}

