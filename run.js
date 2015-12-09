#!/usr/bin/env node

// Advent of Code Solution Runner

var _        = require('lodash');
var path     = require('path');
var argv     = require('yargs').argv;
var puzzle   = argv._[0];
var solution = path.resolve(path.join(puzzle, 'solve'));

require('babel-register');

var solution = require(solution).default;

solution.run.apply(this, _.rest(argv._));
