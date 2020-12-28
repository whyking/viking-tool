import {Command} from '@oclif/command'
import {randomQuote} from '../quotes'
import {getBanner} from '../banner'
import chalk = require('chalk');

const banner = getBanner()

export default class Quote extends Command {
  static description = 'print a random quote'

  static examples = [
    '$ viking-tool quote\n' +
    banner +
    chalk.blue('"Talk is cheap. Show me the code." (Linus Torvalds)'),
  ]

  async run() {
    this.log(banner)
    this.log(chalk.blue(randomQuote()))
  }
}
