const { parseEmoji } = require("discord.js");
/**
 * 
 * @param {string} str input string
 * @returns {{ str: string, parsed: { id: string|undefined, name: string, animated: boolean }}[]} All Emojis as string and parsed from parseEmoji
 */
function extractEmojis(stringInput, filterDupes = false) {
    const emojiMatches = /(<?(a)?:?(\w{2,32}):(\d{17,19})>?|(?:\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc]|\ud83d\udc69\ud83c\udffe\u200d\ud83e])|\ufe0f)/g;
    const matches = [...stringInput.matchAll(emojiMatches)];
    if (!matches.length) return [];
    const matchedEmojis = matches.map(x => {
        const [unicode, animated, name, id] = x.slice(1);
        const str = id && name ? `<${animated || ""}:${name}:${id}>` : unicode;
        return { str, parsed: parseEmoji(str) }
    });
    return filterDupes ? matchedEmojis.reduce((a, c) => !a.find(item => item.str === c.str) ? a.concat([c]) : a, []) : matchedEmojis;
}
module.exports = {
    extractEmojis
}
