const os = require("os")
const chalk = require('chalk')

const ip = os.networkInterfaces().en0[1].address
const options = process.argv.slice(2)
if (options[0] === '-v') {
  console.log('v1.0.0')
} else {
  console.log(chalk.blue(`your ip is: ${ip}`))
}