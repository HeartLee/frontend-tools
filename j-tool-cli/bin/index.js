#!/usr/bin/env node
const program = require('commander');

const { showIP } = require('../src/command')

program
  .command('myip')
  .description('展示ip')
  .action(showIP);
