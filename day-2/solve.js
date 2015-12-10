import _        from 'lodash';
import fs       from 'fs';
import path     from 'path';
import {Parser} from '../lib/parser';

export class Presents extends Parser {
  constructor(input) {
    super(input);
    this.paper  = 0;
    this.ribbon = 0;
    this.bow    = 0;
    this.lines  = this.input.split("\n");
  }

  reset() {
    this.paper  = 0;
    this.ribbon = 0;
    this.bow    = 0;
  }

  parse() {
    super.parse();

    _.forEach(this.lines, (line, lineNo) => {
      let dims = this._parseDimensions(line);

      this.paper  += this._getSurfaceArea(dims);
      this.ribbon += this._getSmallestPerimeter(dims);
      this.bow    += this._getVolume(dims);
    });
  }

  _parseDimensions(str) {
    let parts = str.trim().split('x');
    return _.map(parts, part => parseInt(part, 10));
  }

  _getSmallestPerimeter(dims) {
    let [len, width, height] = dims;
    let sortedSides = _.sortBy(dims);
    return (2 * sortedSides[0]) + (2 * sortedSides[1]);
  }

  _getSurfaceArea(dims) {
    let [len, width, height] = dims;
    let sortedSides = _.sortBy(dims)
    let extraArea   = sortedSides[0] * sortedSides[1];
    return (2 * len * width) + (2 * width * height) + (2 * height * len) + extraArea;
  }

  _getVolume(dims) {
    return _.reduce(dims, (total, dim) => total * dim, 1);
  }
}

export default {
  run: function(inputFile) {
    let tab = new Presents(fs.readFileSync(path.resolve(inputFile)).toString());
    tab.parse();
    console.log('Total square feet of wrapping paper: %d', tab.paper);
    console.log('Total feet of ribbon: %d', tab.ribbon + tab.bow);
  }
}
