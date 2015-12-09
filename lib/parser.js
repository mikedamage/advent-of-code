import _            from 'lodash';
import EventEmitter from 'events';

export class Parser extends EventEmitter {
  constructor(input) {
    super();

    if (!_.isString(input) || input.length < 1) {
      throw new Error('input must be a non-empty string');
    }

    this.input = input;
  }

  parse() {
    throw new Error('parse must be overridden');
  }
}
