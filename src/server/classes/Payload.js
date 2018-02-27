import _ from 'lodash';

class Payload {
  constructor(payload) {
    this.payload = payload || {};
  }

  get(property) {
    return _.get(this.payload, property);
  }

  getPayload() {
    return this.payload;
  }

  format(filter) {
    return _.pick(this.payload, filter);
  }

  set(property, value) {
    _.set(this.payload, property, value);
  }
}

export default Payload;
