async function loadSelectMenus(client) {
  const { loadFiles } = require("../Apps/Functions/fileLoader");
  const ascii = require("ascii-table");
  const chalk = require("chalk");
  const table = new ascii("Select Menus List");

  const Files = await loadFiles("Apps/Menus");

  Files.forEach((file) => {
    const selectMenu = require(file);
    if (!selectMenu.id) return;

    client.selectMenus.set(selectMenu.id, selectMenu);
    table.setHeading(`SelectMenu ID`, `Status`);
    table.addRow(`${selectMenu.id}`, "🟩 Success");
  });
}

module.exports = { loadSelectMenus };