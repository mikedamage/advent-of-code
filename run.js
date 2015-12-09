#!/usr/bin/env node

// Advent of Code Solution Runner

var _    = require('lodash');
var argv = require('yargs').argv;

require('babel-register');

var solution = require(argv._[0]).default;

solution.run.apply(this, _.rest(argv._));
