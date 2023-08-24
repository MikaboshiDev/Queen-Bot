const chalk = require('chalk');

function logWithLabel(label, message) {
    const labels = {
        error: chalk.red('[ERROR]'),
        success: chalk.green('[SUCCESS]'),
        debug: chalk.blue('[DEBUG]'),
        shards: chalk.yellow('[SHARDS]'),
    };

    const formattedLabel = labels[label] || label || '';

    console.log(`${formattedLabel} ${message}`);
}

module.exports = {
    logWithLabel,
};
