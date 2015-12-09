import _            from 'lodash';
import fs           from 'fs';
import yargs        from 'yargs';
import path         from 'path';
import EventEmitter from 'events';

const argv = yargs.argv;

export class Elevator extends EventEmitter {
  constructor(input) {
    super();
    this.input = _.isString(input) ? input : '';
    this.floor = 0;
  }

  parse() {
    this.reset();

    if (_.isEmpty(this.input)) return;

    _.forEach(this.input, (chr, pos) => {
      let oldFloor = this.floor;

      switch (chr) {
        case '(':
          this.floor++;
          this.emit('floorChange', oldFloor, this.floor, chr, pos);
          break;
        case ')':
          this.floor--;
          this.emit('floorChange', oldFloor, this.floor, chr, pos);
          break;
      }
    });
  }

  reset() {
    this.floor = 0;
  }
}

export default {
  run: function(inputFile) {
    let enteredBasement = false;
    let input           = fs.readFileSync(path.resolve(inputFile));
    let lift            = new Elevator(input.toString());

    lift.addListener('floorChange', (old, cur, chr, pos) => {
      if (!enteredBasement && cur < 0) {
        enteredBasement = true;
        console.log('Entered basement at position %d', (pos + 1));
      }
    });

    lift.parse();

    console.log('Final floor: %d', lift.floor);
  }
};
