import _        from 'lodash';
import fs       from 'fs';
import path     from 'path';
import {Parser} from '../lib/parser';

const instructions = {
  '^': [ 0, 1 ],
  '>': [ 1, 0 ],
  'v': [ 0, -1 ],
  '<': [ -1, 0 ]
};

export class Santa extends Parser {
  constructor(input) {
    super(input);

    this.position = [ 0, 0 ];
    this.mapGrid  = new Map();

    Object.defineProperty(this, 'presents', {
      get: function() {
        let total = 0;

        for (let [position, house] of this.mapGrid) {
          total += house.presents;
        }

        return total;
      }
    });

    // Visit starting house
    this.mapGrid.set('0,0', { presents: 1 });
  }

  reset() {
    this.position = [ 0, 0 ];
    this.mapGrid  = new Map();
    this.mapGrid.set('0,0', { presents: 1 });
  }

  parse() {
    super.parse();
    _.forEach(this.input, this.move.bind(this));
  }

  move(chr) {
    let house;
    let oldPos    = this.position;
    let direction = instructions[chr];
    let [x, y]    = direction;
    let distance  = x + y;

    this.position[0] += x;
    this.position[1] += y;

    this.emit('move', oldPos, this.position);

    if (this.mapGrid.has(this._positionString())) {
      house = this.mapGrid.get(this._positionString());
    } else {
      house = { presents: 0 };
    }

    this.mapGrid.set(this._positionString(), {
      presents: house.presents + 1
    });

    this.emit('deliverPresent', this.position, house);

    return this.position;
  }

  _positionString() {
    return `${this.position[0]},${this.position[1]}`;
  }
}

export default {
  run: function(inputFile) {
    let input              = fs.readFileSync(path.resolve(inputFile)).toString();
    let santa              = new Santa(input);
    let housesWithPresents = [];

    santa.parse();

    for (let [coords, house] of santa.mapGrid) {
      if (house.presents >= 1) {
        housesWithPresents.push(house);
      }
    }

    console.log('Houses w/ >= 1 presents: %d', housesWithPresents.length);
  }
}
