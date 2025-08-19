import * as cheerio from "cheerio";

const html = `
<html>
  <head>
    <title>My Test Page</title>
    <meta name="description" content="This is a demo page.">
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a sample paragraph with some text.</p>
  </body>
</html>
`;

const $ = cheerio.load(html);

console.log("Title:", $("title").text());
console.log("Meta:", $('meta[name="description"]').attr("content"));
console.log("Body text:", $("body").text().trim());
