#!/usr/bin/env node
const program = require('commander');
const { command } = require('commander');
// 定义当前版本
// 定义使用方法
// 定义四个指令
program
    .version(require('../package.json').version)
    .usage('<command> [options]')
    .command('add', 'add a new template')
    .command('delete', 'delete a template')
    .command('list', 'list all the templates')
    .command('init', 'generate a new project from a template')
program.parse(process.argv)