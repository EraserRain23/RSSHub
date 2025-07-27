const got = require('@/utils/got');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {
    const url = 'https://m.163.com/touch/reconstruct/article/list/BA8D4A3Rwangning/0-20.html';
    const response = await got(url);
    const data = response.data.BA8D4A3Rwangning;

    const items = data.map((item) => ({
        title: item.title,
        description: item.digest || '',
        link: item.url.startsWith('http') ? item.url : `https://www.163.com${item.url}`,
        pubDate: parseDate(item.ptime),
    }));

    ctx.state.data = {
        title: '网易地方新闻',
        link: 'https://m.163.com/touch/local/',
        item: items,
    };
};
