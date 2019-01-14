const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const google = 'https://www.google.com';

module.exports = async (ctx, done) => {
    // 1. Task monitoring data
    const { keyword, competitors } = ctx.task.data,
        q = keyword.split(' ').join('+');
    
    // 2. Load and parse search result page
    const dom = await JSDOM.fromURL(`${google}/search?q=${q}`),
        { window } = dom,
        { document } = window;
        links = [
            ...document.querySelectorAll('.g .r > a')
        ].map((entry) => {
            return entry.getAttribute('href').substring(7, (link.length - 1));
        });

    // 3. Return competitors index
    return competitors.map((competitor) => {
        return {
            [competitor]: links.findIndex(link => link.startsWith(competitor))
        }
    });
}