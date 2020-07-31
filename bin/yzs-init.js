#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const tplObj = require(`${__dirname}/../template.json`);

program
    .usage('<template-name> [project-name]')
program.parse(process.argv); // 用于解析process.env
if (program.args.length < 1) return program.help()
// 好比vue init webpack project-name的命令一样，第一个参数是webpack，第二个参数是project-name
const templateName = program.args[0];
const projectName = program.args[1];
// 校验参数
if (!tplObj[templateName]) {
    console.log(chalk.red('\n Template does not exit!\n'));
    return;
}
if (!projectName) {
    console.log(chalk.red('\nProject should not be empty!\n'));
    return;
}
const url = tplObj[templateName];
console.log(chalk.white('\nStart generation...\n'));
// 出现加载图标
const spinner = ora('Downloading...');
spinner.start();
// 执行下载方法并传入参数
download(
    url,
    projectName,
    err => {
        if (err) {
            spinner.fail();
            console.log(chalk.red(`Generation failed.${err}`));
            return;
        }
        // 结束加载图标
        spinner.succeed();
        console.log(chalk.green('\nGeneration completed!'));
        console.log('\n To get started');
        console.log(`\n cd ${projectName}\n`);
    }
)