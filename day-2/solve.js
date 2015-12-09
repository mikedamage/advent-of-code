import _        from 'lodash';
import fs       from 'fs';
import path     from 'path';
import {Parser} from '../lib/parser';

export class Tabulator extends Parser {
  constructor(input) {
    super(input);
    this.total = 0;
    this.lines = this.input.split("\n");
  }

  reset() {
    this.total = 0;
  }

  parse() {
    this.reset();

    this.total = _.reduce(this.lines, (total, line, lineNo) => {
      return total + this._getSurfaceArea(line);
    }, 0);
  }

  _getSurfaceArea(str) {
    let [len, width, height] = this._parseDimensions(str);
    return (2 * len * width) + (2 * width * height) + (2 * height * len);
  }

  _parseDimensions(str) {
    let parts = str.trim().split('x');
    return _.map(parts, part => parseInt(part, 10));
  }
}

export default {
  run: function(inputFile) {
    let tab = new Tabulator(fs.readFileSync(path.resolve(inputFile)).toString());
    tab.parse();
    console.log('Total Square Feet: %d', tab.total);
  }
}
