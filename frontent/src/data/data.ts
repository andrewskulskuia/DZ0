import type { Post } from "../type/type";

export const Posts: Post[] = [
  {
    id: '1',
    title: 'Why is "Hello, World!" always the first program?',
    content: 'The tradition of displaying "Hello, World!" started back in 1978 in the book "The C Programming Language" by Brian Kernighan and Dennis Ritchie. Since then, it has become the simplest way to check if a development environment is configured properly.',
    createdAt: '2026.9.3 time:19:00',
  },
  {
    id: '2',
    title: 'Where did the term "Bug" in programming come from?',
    content: 'In 1947, Harvard University scientists were investigating an error on the Mark II computer. They discovered a real moth trapped between the contacts of a relay. They removed it and taped it into the logbook with the note: "First actual case of bug being found."',
    createdAt: '2026.9.2 time:14:30',
  },
  {
    id: '3',
    title: 'An interesting fact about JavaScript\'s name',
    content: 'JavaScript was originally created in just 10 days by Brendan Eich under the name Mocha, later renamed to LiveScript. The name was changed to JavaScript purely for marketing reasons to capitalize on Java\'s popularity at the time, despite having very little in common.',
    createdAt: '2026.9.1 time:09:15',
  },
  {
    id: '4',
    title: 'The first web page in internet history',
    content: 'Tim Berners-Lee created the world\'s first web page on August 6, 1991. It contained a description of the World Wide Web (WWW) project and explained how to use a browser and set up a web server. It ran on a NeXT computer at CERN.',
    createdAt: '2026.8.30 time:16:45',
  },
  {
    id: '5',
    title: 'Why do developers prefer Dark Mode?',
    content: 'Besides reducing eye strain at night and saving battery life on OLED screens, bugs have a much harder time hiding in the dark! Jokes aside, dark backgrounds provide high contrast that makes syntax highlighting significantly easier to read.',
    createdAt: '2026.8.28 time:11:20',
  },
  {
    id: '6',
    title: 'How many lines of code are in modern software?',
    content: 'For comparison: a typical smartphone app contains around 50,000 lines of code, Grand Theft Auto V has roughly 10 million, Windows 11 spans over 50 million lines, and all of Google\'s services combined exceed 2 billion lines of code!',
    createdAt: '2026.8.25 time:18:00',
  },
];