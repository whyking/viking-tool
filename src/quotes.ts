import chalk from 'chalk';
import { Caller } from './viking-tools';

export const quotes = [
  '"Keep calm and care your code." (Viking)',
  '"Walking on water and developing software from a specification are easy if both are frozen." (Edward V. Berard)',
  '"Talk is cheap. Show me the code." (Linus Torvalds)',
  '"Programs must be written for people to read, and only incidentally for machines to execute." (Harold Abelson)',
  '"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you'
  + ' live." (John Woods)',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."'
  + ' (Martin Fowler)',
  '"A computer once beat me at chess, but it was no match for me at kick boxing." (Emo Philips)',
  '"Premature optimization is the root of all evil." (Donald Knuth)',
  '"Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the '
  + 'organization\'s communication structure." (Melvin E. Conway)',
  '"Quality is not an act, it is a habit." (Aristotle)',
  '"Testers don’t like to break things; they like to dispel the illusion that things work." (Kaner, Bach, Pettichord)',
  '"Work smarter not harder."',
  '"Discipline is the best tool. Design first, then code. Don\'t patch bugs out, rewrite them out. '
  + 'Don\'t test bugs out, design them out." (N. E. Adams)',
  '"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly '
  + 'as possible, you are, by definition, not smart enough to debug it." (Brian Kernighan)',
  '"If you think good architecture is expensive, try bad architecture." (Brian Foote and Joseph Yoder)',
];

export const randomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

export const showQuote = () => (caller: Caller) => new Promise<Caller>((resolve) => {
  // eslint-disable-next-line no-console
  console.info(chalk.blue(randomQuote()));
  resolve(caller);
});
