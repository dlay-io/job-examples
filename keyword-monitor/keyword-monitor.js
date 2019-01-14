const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = (ctx, done) => {
    const { keyword, competitors } = ctx.task.data;
    return JSDOM.fromURL(`https://www.google.com/search?q=${keyword.split(' ').join('+')}`).then(dom => {
        const { window } = dom,
            { document } = window;

        const links = [
            ...document.querySelectorAll('.g .r > a')
        ].map((entry) => {
            const link = entry.getAttribute('href'),
            url = link.substring(7, (link.length - 1));
            return url;
        });
    
        const result = competitors.map((competitor) => {
            return {
                [competitor]: links.findIndex(link => link.startsWith(competitor))
            }
        });

        done(null, result);
    });
}