async function loadCommands(client) {
    const { loadFiles } = require(`../Apps/Functions/fileLoader`);
    const ascii = require(`ascii-table`);
    const chalk = require("chalk");
    const table = new ascii("Commands List").setHeading(`Command ID`, `Load Status`);

    await client.commands.clear();

    let commandsArray = [];

    const Files = await loadFiles(`Apps/Commands`);

    Files.forEach((file) => {
        const command = require(file);

        client.commands.set(command.data.name, command);

        commandsArray.push(command.data.toJSON());

        table.addRow(command.data.name, `🟩 Success`);
    });

    client.application.commands.set(commandsArray);
}

module.exports = { loadCommands };