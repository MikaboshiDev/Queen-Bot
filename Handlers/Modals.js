async function loadModals(client) {
  const { loadFiles } = require("../Apps/Functions/fileLoader");
  const ascii = require("ascii-table");
  const chalk = require("chalk");
  const table = new ascii("Modals List");

  const Files = await loadFiles("Apps/Modales");

  Files.forEach((file) => {
    const modal = require(file);
    if (!modal.id) return;

    client.modals.set(modal.id, modal);
    table.setHeading(`Modal ID`, `Status`);
    table.addRow(`${modal.id}`, "🟩 Success");
  });
}

module.exports = { loadModals };