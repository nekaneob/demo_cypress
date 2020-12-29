const cypress = require('cypress');
const fse =require('fs-extra');
const generator = require('mochawesome-report-generator');

async function runTest(){
    await fse.emptyDir('mochawesome-report');
    const {totalFailed} = await cypress.run();
    process.exit(totalFailed);
}
runTest();