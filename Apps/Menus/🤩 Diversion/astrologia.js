const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const chalk = require("chalk");

module.exports = {
    id: "Astros",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        if (interaction.values.includes('first_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Mercurio")
                    .setDescription(`*Mercurio es el planeta más pequeño del Sistema Solar, el más cercano al Sol y el más rápido en orbitar alrededor de él. Es el único planeta del Sistema Solar que no tiene satélites naturales. Recibe su nombre del dios romano Mercurio, mensajero de los dioses.*`)
                    .addFields(
                        { name: 'Temperatura', value: '430°C', inline: true },
                        { name: 'Diametro', value: '4.879 km', inline: true },
                        { name: 'Gravedad', value: '3.7 m/s²', inline: true },
                        { name: 'Distancia al Sol', value: '57.91 millones de km', inline: true },
                        { name: 'Periodo de Rotacion', value: '58.6 días', inline: true },
                        { name: 'Periodo de Orbita', value: '88 días', inline: true },
                        { name: 'Masa', value: '3.285 × 10^23 kg', inline: true },
                        { name: 'Densidad', value: '5.427 g/cm³', inline: true },
                        { name: 'Volumen', value: '6.083 × 10^10 km³', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('second_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Venus")
                    .setDescription(`*Venus es el segundo planeta del Sistema Solar, el sexto en orden de distancia al Sol y el tercero más grande. Recibe su nombre del dios romano del amor y la belleza, Venus. Es el planeta más parecido a la Tierra en tamaño y masa, y es el único que gira en sentido contrario a la mayoría de los planetas del Sistema Solar.*`)
                    .addFields(
                        { name: 'Temperatura', value: '462°C', inline: true },
                        { name: 'Diametro', value: '12.104 km', inline: true },
                        { name: 'Gravedad', value: '8.87 m/s²', inline: true },
                        { name: 'Distancia al Sol', value: '108.2 millones de km', inline: true },
                        { name: 'Periodo de Rotacion', value: '243 días', inline: true },
                        { name: 'Periodo de Orbita', value: '224.7 días', inline: true },
                        { name: 'Masa', value: '4.867 × 10^24 kg', inline: true },
                        { name: 'Densidad', value: '5.243 g/cm³', inline: true },
                        { name: 'Volumen', value: '9.284 × 10^11 km³', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('third_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Tierra")
                    .setDescription(`*La Tierra es el tercer planeta del Sistema Solar, el más denso y el quinto más grande. Es el único planeta conocido con vida. Recibe su nombre del dios romano de la Tierra, Gea.*`)
                    .addFields(
                        { name: 'Temperatura', value: '14°C', inline: true },
                        { name: 'Diametro', value: '12.756 km', inline: true },
                        { name: 'Gravedad', value: '9.807 m/s²', inline: true },
                        { name: 'Distancia al Sol', value: '149.6 millones de km', inline: true },
                        { name: 'Periodo de Rotacion', value: '0.997 días', inline: true },
                        { name: 'Periodo de Orbita', value: '365.26 días', inline: true },
                        { name: 'Masa', value: '5.972 × 10^24 kg', inline: true },
                        { name: 'Densidad', value: '5.515 g/cm³', inline: true },
                        { name: 'Volumen', value: '1.083 × 10^12 km³', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('fourth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Marte")
                    .setDescription(`*Marte es el cuarto planeta del Sistema Solar, el segundo más pequeño y el más denso. Recibe su nombre del dios romano de la guerra, Marte. Es el planeta interior más cercano a la Tierra, y el único que puede ser visto a simple vista con un telescopio desde la Tierra.*`)
                    .addFields(
                        { name: 'Temperatura', value: '-65°C', inline: true },
                        { name: 'Diametro', value: '6.779 km', inline: true },
                        { name: 'Gravedad', value: '3.711 m/s²', inline: true },
                        { name: 'Distancia al Sol', value: '227.9 millones de km', inline: true },
                        { name: 'Periodo de Rotacion', value: '1.03 días', inline: true },
                        { name: 'Periodo de Orbita', value: '687 días', inline: true },
                        { name: 'Masa', value: '6.39 × 10^23 kg', inline: true },
                        { name: 'Densidad', value: '3.933 g/cm³', inline: true },
                        { name: 'Volumen', value: '1.631 × 10^11 km³', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('fifth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Jupiter")
                    .setDescription(`*Júpiter es el quinto planeta del Sistema Solar, el más grande y el más masivo. Recibe su nombre del dios romano del cielo, Júpiter. Es el planeta más masivo del Sistema Solar y el quinto más grande en tamaño.*`)
                    .addFields(
                        { name: 'Temperatura', value: '-110°C', inline: true },
                        { name: 'Diametro', value: '142.984 km', inline: true },
                        { name: 'Gravedad', value: '24.79 m/s²', inline: true },
                        { name: 'Distancia al Sol', value: '778.5 millones de km', inline: true },
                        { name: 'Periodo de Rotacion', value: '0.413 días', inline: true },
                        { name: 'Periodo de Orbita', value: '11.86 años', inline: true },
                        { name: 'Masa', value: '1.898 × 10^27 kg', inline: true },
                        { name: 'Densidad', value: '1.326 g/cm³', inline: true },
                        { name: 'Volumen', value: '1.431 × 10^15 km³', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('sixth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Saturno")
                    .setDescription(`*Saturno es el sexto planeta del Sistema Solar, el segundo más grande y el más masivo. Recibe su nombre del dios romano del tiempo, Saturno. Es el planeta más masivo del Sistema Solar y el quinto más grande en tamaño.*`)
                    .addFields(
                        { name: 'Temperatura', value: '-140°C', inline: true },
                        { name: 'Diametro', value: '120.536 km', inline: true },
                        { name: 'Gravedad', value: '10.44 m/s²', inline: true },
                        { name: 'Distancia al Sol', value: '1.429 billones de km', inline: true },
                        { name: 'Periodo de Rotacion', value: '0.444 días', inline: true },
                        { name: 'Periodo de Orbita', value: '29.46 años', inline: true },
                        { name: 'Masa', value: '5.683 × 10^26 kg', inline: true },
                        { name: 'Densidad', value: '0.687 g/cm³', inline: true },
                        { name: 'Volumen', value: '8.271 × 10^14 km³', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('seventh_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Urano")
                    .setDescription(`*Urano es el séptimo planeta del Sistema Solar, el tercero más grande y el cuarto más masivo. Recibe su nombre del dios romano del cielo, Urano. Es el planeta más masivo del Sistema Solar y el quinto más grande en tamaño.*`)
                    .addFields(
                        { name: 'Temperatura', value: '-195°C', inline: true },
                        { name: 'Diametro', value: '51.118 km', inline: true },
                        { name: 'Gravedad', value: '8.87 m/s²', inline: true },
                        { name: 'Distancia al Sol', value: '2.871 billones de km', inline: true },
                        { name: 'Periodo de Rotacion', value: '-0.718 días', inline: true },
                        { name: 'Periodo de Orbita', value: '84.01 años', inline: true },
                        { name: 'Masa', value: '8.681 × 10^25 kg', inline: true },
                        { name: 'Densidad', value: '1.27 g/cm³', inline: true },
                        { name: 'Volumen', value: '6.833 × 10^13 km³', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('eighth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Pluton")
                    .setDescription(`*Plutón es un planeta enano del Sistema Solar, el más grande de los cinco conocidos. Recibe su nombre del dios romano del inframundo, Plutón. Es el planeta más masivo del Sistema Solar y el quinto más grande en tamaño.*`)
                    .addFields(
                        { name: 'Temperatura', value: '-229°C', inline: true },
                        { name: 'Diametro', value: '2.370 km', inline: true },
                        { name: 'Gravedad', value: '0.62 m/s²', inline: true },
                        { name: 'Distancia al Sol', value: '5.913 billones de km', inline: true },
                        { name: 'Periodo de Rotacion', value: '6.387 días', inline: true },
                        { name: 'Periodo de Orbita', value: '248.00 años', inline: true },
                        { name: 'Masa', value: '1.309 × 10^22 kg', inline: true },
                        { name: 'Densidad', value: '1.88 g/cm³', inline: true },
                        { name: 'Volumen', value: '1.303 × 10^10 km³', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('ninth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Luna")
                    .setDescription(`*La Luna es el único satélite natural de la Tierra. Recibe su nombre del dios romano de la Luna.*`)
                    .addFields(
                        { name: 'Temperatura', value: '-173°C', inline: true },
                        { name: 'Diametro', value: '3.474 km', inline: true },
                        { name: 'Gravedad', value: '1.62 m/s²', inline: true },
                        { name: 'Distancia a la Tierra', value: '384.400 km', inline: true },
                        { name: 'Periodo de Rotacion', value: '27.32 días', inline: true },
                        { name: 'Periodo de Orbita', value: '27.32 días', inline: true },
                        { name: 'Masa', value: '7.347 × 10^22 kg', inline: true },
                        { name: 'Densidad', value: '3.34 g/cm³', inline: true },
                        { name: 'Volumen', value: '1.737 × 10^10 km³', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('tenth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Sol")
                    .setDescription(`*El Sol es una estrella enana amarilla de tipo G2 que se encuentra en el centro del Sistema Solar. Recibe su nombre del dios romano del Sol.*`)
                    .addFields(
                        { name: 'Temperatura', value: '5.778°C', inline: true },
                        { name: 'Diametro', value: '1.392.000 km', inline: true },
                        { name: 'Gravedad', value: '274 m/s²', inline: true },
                        { name: 'Distancia a la Tierra', value: '149.600.000 km', inline: true },
                        { name: 'Periodo de Rotacion', value: '25.05 días', inline: true },
                        { name: 'Periodo de Orbita', value: '25.05 días', inline: true },
                        { name: 'Masa', value: '1.989 × 10^30 kg', inline: true },
                        { name: 'Densidad', value: '1.41 g/cm³', inline: true },
                        { name: 'Volumen', value: '1.410 × 10^15 km³', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('eleventh_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Cometas")
                    .setDescription(`*Los cometas son cuerpos celestes que orbitan alrededor del Sol, formados principalmente por hielo y polvo. Reciben su nombre del dios griego del mar, el viento y la lluvia, Cometa.*`)
                    .addFields(
                        { name: 'Temperatura', value: '-233°C', inline: true },
                        { name: 'Diametro', value: '10 km', inline: true },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.username}` })], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Astrologia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        }
    },
};