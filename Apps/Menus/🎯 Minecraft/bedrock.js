const chalk = require("chalk");
const { Client, EmbedBuilder, SelectMenuInteraction, ChatInputCommandInteraction } = require("discord.js");
module.exports = {
    id: "Bedrock",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.values.includes('first_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Informacion acerca de los archivos de comportamiento de bloques")
                    .setDescription("*Los archivos de comportamiento de bloques son archivos que contienen datos de comportamiento de bloques. Estos archivos se pueden usar para cambiar el comportamiento de bloques predeterminados o agregar nuevos bloques.*")
                    .addFields(
                        { name: `¿Donde se encuentran?`, value: `Los archivos de comportamiento de bloques se encuentran en la carpeta "behavior_packs" dentro de la carpeta "games" de tu dispositivo.` },
                        { name: `Ejemplo de un archivo de comportamiento de bloques`, value: `\`\`\`json\n{\n  "format_version": "1.12.0",\n  "minecraft:block": {\n    "description": {\n      "identifier": "minecraft:stone",\n      "is_experimental": false\n    },\n    "components": {\n      "minecraft:breakable": {\n        "hardness": 1.5,\n        "resistance": 6\n      },\n      "minecraft:material": {\n        "material": "stone",\n        "destroy_time": 1.5,\n        "can_burn": true\n      },\n      "minecraft:push_reaction": "normal",\n      "minecraft:light_block": 0,\`\`\`` },
                        { name: `¿Como se llaman?`, value: `Los archivos de comportamiento de bloques se llaman "block_name.json" donde "block_name" es el nombre del bloque que quieres cambiar.` },
                        { name: `Propiedades del Bloque`, value: `\`\`\`json\n      "minecraft:render_layer": "solid",\n      "minecraft:collision_box": {\n        "min": [0, 0, 0],\n        "max": [1, 1, 1]\n      },\n      "minecraft:bounding_box": {\n        "min": [0, 0, 0],\n        "max": [1, 1, 1]\n      },\n      "minecraft:can_place_on": {\n        "blocks": [\n          "minecraft:stone",\n          "minecraft:grass",\n          "minecraft:dirt",\n          "minecraft:cobblestone",\n          "minecraft:planks",\n          "minecraft:sandstone",\n          "minecraft:bedrock",\n          "minecraft:gold_ore",\`\`\`` },
                        { name: `Descripcion de Componentes JSON`, value: `"identifier" under "description" is already familiar to us. It is the identifier of the block. "is_experimental" is a boolean value that determines whether the block is experimental or not. "hardness" is the hardness of the block. "resistance" is the resistance of the block. "material" is the material of the block. "destroy_time" is the time it takes to destroy the block. "can_burn" is a boolean value that determines whether the block can be burned or not. "push_reaction" is the push reaction of the block. "light_block" is the light block of the block. "render_layer" is the render layer of the block. "collision_box" is the collision box of the block. "bounding_box" is the bounding box of the block. "can_place_on" is the blocks that the block can be placed on. "can_destroy" is the blocks that the block can destroy.` },
                        { name: `Propiedades del Bloque Parte 2`, value: `\`\`\`json\n          "minecraft:iron_ore",\n          "minecraft:coal_ore",\n          "minecraft:log",\n          "minecraft:leaves",\n          "minecraft:sponge",\n          "minecraft:glass",\n          "minecraft:lapis_ore",\n          "minecraft:lapis_block",\n          "minecraft:dispenser",\n          "minecraft:sandstone",\n          "minecraft:noteblock",\n          "minecraft:bed",\n          "minecraft:golden_rail",\n          "minecraft:detector_rail",\n          "minecraft:sticky_piston",\n          "minecraft:web",\n          "minecraft:tallgrass",\n          "minecraft:deadbush",\n          "minecraft:piston",\n          "minecraft:piston_head\`\`\`` },
                        { name: `Mas Descripciones`, value: `"can_hang" is the blocks that the block can hang on. "can_fall" is a boolean value that determines whether the block can fall or not. "can_fall_through" is a boolean value that determines whether the block can fall through or not. "can_be_pushed" is a boolean value that determines whether the block can be pushed or not. "can_be_pulled" is a boolean value that determines whether the block can be pulled or not. "can_be_piston_pushed" is a boolean value that determines whether the block can be pushed by a piston or not. "can_be_piston_pulled" is a boolean value that determines whether the block can be pulled by a piston or not. "can_be_piston_pushed" is a boolean value that determines whether the block can be pushed by a piston or not. "can_be_piston_pulled" is a boolean value that determines whether the block can be pulled by a piston or not.`},
                        { name: `Extras JSON`, value: `"can_be_pushed" is a boolean value that determines whether the block can be pushed or not. "can_be_pulled" is a boolean value that determines whether the block can be pulled or not. "can_be_pushed" is a boolean value that determines whether the block can be pushed or not. "can_be_pulled" is a boolean value that determines whether the block can be pulled or not. "can_be_pushed" is a boolean value that determines whether the block can be pushed or not. "can_be_pulled" is a boolean value that determines` }
                    )
                    .setThumbnail(client.user.avatarURL())
                    .setTimestamp()
                    .setFooter({ text: "Informacion de los archivos de comportamiento de bloques", iconURL: client.user.avatarURL() })
                ], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Minecraft Bedrock] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('second_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle(`Informacion de los archivos de recursos de bloques`)
                    .setDescription(`*The resource definition for blocks differs from entities/items because all the definitions appear in a single file. The only two things we can define for blocks are its sound and its textures. As you can see, every block's identifier is applied with textures and step sounds. When we define the textures, we use their shortnames which we will define in terrain_texture.json later on. There are 3 ways we can define the texture of a block:*`)
                    .addFields(
                        { name: `Ejemplo de un archivo de recursos de bloques`, value: `\`\`\`json\n{\n  "format_version": "1.16.100",\n  "minecraft:block": {\n    "description": {\n      "identifier": "minecraft:stone",\n      "is_experimental": false\n    },\n    "sounds": {\n      "break": "block.stone.break",\n      "step": "block.stone.step",\n      "place": "block.stone.place",\n      "hit": "block.stone.hit",\n      "fall": "block.stone.fall"\n    },\n    "textures": {\n      "all": "block/stone"\n    }\n  }\n}\`\`\`` },
                        { name: `Block terrain texture definition`, value: `These "gorgeous" textures are the ones I'm going to use for my example blocks. The first three are located in the RP/textures/blocks/ folder and, the last 6 are located in the RP/textures/blocks/compass_block subfolder - they show North, South, etc.` },
                        { name: `Block flipbook texture definition`, value: `\`\`\`json\n[\n  {\n  "flipbook_texture": "textures/blocks/flashing_flipbook",\n  "uv": [0, 0, 16, 16],\n  "texture_size": [16, 16],\n  "frames": 4,\n  "frame_time": 0.1\n  }\n]\`\`\`` },
                        { name: `Setting block names`, value: `\`\`\`json\n{\ntile.wiki:blocky.name=Blocky Block\ntile.wiki:sapp_log.name=Sapphire Wood\ntile.wiki:compass_block.name=A compass in block-form\ntile.wiki:flashing.name=Block of Flashing Matter\n }\`\`\`` },
                    )
                    .setThumbnail(client.user.avatarURL())
                    .setTimestamp()
                    .setFooter({ text: "Informacion de los archivos de recursos de bloques", iconURL: client.user.avatarURL() })
                ], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Minecraft Bedrock] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('third_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle(`Informacion de los archivos JSON UI`)
                    .setDescription(`*La interfaz de usuario del juego está basada en datos y se puede modificar. Nos permite modificar cómo se renderizarían ciertas interfaces de usuario y, hasta cierto punto, cómo se comportarían. Para comenzar, todos los archivos de la interfaz de usuario estándar se almacenan en una RP/ui/...carpeta.`)
                    .addFields(
                        { name: `Archivos de Interfaz de Usuario`, value: `Los archivos de interfaz de usuario se almacenan en la carpeta ui/ de la carpeta de recursos. Los archivos de interfaz de usuario se pueden dividir en dos categorías: archivos de interfaz de usuario estándar y archivos de interfaz de usuario personalizados.` },
                        { name: `Ejemplo de un archivo de interfaz de usuario`, value: `\`\`\`json\n{\n  "format_version": "1.16.100",\n  "minecraft:client_entity": {\n    "description": {\n      "identifier": "minecraft:example_entity",\n      "is_experimental": false\n    },\n    "component_groups": {\n      "minecraft:geometry": {\n        "geometry": "geometry.example_entity"\n      },\n      "minecraft:render_controller": {\n        "materials": [\n          "material.example_entity"\n        ],\n        "textures": [\n          "texture.example_entity"\n        ]\n      }\n    }\n  }\n}\`\`\`` },
                        { name: `Archivos Del Sistema`, value: `Estos son archivos integrados que se utilizan en la interfaz de usuario de JSON: hud_screen.json- muestra la pantalla principal del juego donde se representan las funciones del juego, como la barra de acceso rápido, inventory_screen.json- muestra la pantalla de inventario del jugador etc.`},
                        { name: `Archivos Personalizados`, value: `Estos son archivos que se pueden crear para personalizar la interfaz de usuario del juego. Estos archivos se pueden crear en la carpeta ui/ de la carpeta de recursos. Estos archivos se pueden usar para crear una interfaz de usuario personalizada para el juego.` },
                    )
                    .setThumbnail(client.user.avatarURL())
                    .setTimestamp()
                    .setFooter({ text: "Informacion de los archivos JSON UI", iconURL: client.user.avatarURL() })
                ], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Minecraft Bedrock] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('fourth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Informacion de los archivos Scripting API")
                    .setDescription(`The Script API (formerly GameTests, and not to be confused with the Legacy Scripting API) is a beta feature that allows for a new variety of creations, as well as unit tests ("GameTests") to make it easier to test if game mechanics work. These are built with JavaScript files in the behavior pack folder`)
                    .addFields(
                        { name: `Scripting API`, value: `The Scripting API is a beta feature that allows for a new variety of creations, as well as unit tests ("GameTests") to make it easier to test if game mechanics work. These are built with JavaScript files in the behavior pack folder.` },
                        { name: `Using Scripting`, value: `\`\`\`js\n// Path: behavior_packs\my_pack\scripts\my_script.js\n// This is a simple example of a script that prints "Hello, world!" to the console.\nconsole.log("Hello, world!");\`\`\`` },
                        { name: `GameTests`, value: `GameTests are a way to test if game mechanics work. They are built with JavaScript files in the behavior pack folder.`},
                        { name: `GameTest API`, value: `The GameTest API is a JavaScript API that allows you to create GameTests. It is built into the Scripting API.`},
                        { name: `Using Minecraft Scripting`, value: `\`\`\`json\n{\n"uuid": "239c134f-67bf-4738-9bcc-8c69d31b1f72",\n"version": [1, 0, 0],\n"type": "javascript",\n"entry": "scripts/gametests/Main.js"\n}\`\`\`` },
                    )
                    .setThumbnail(client.user.avatarURL())
                    .setTimestamp()
                    .setFooter({ text: "Informacion de los archivos Scripting API", iconURL: client.user.avatarURL() })
                ], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Minecraft Bedrock] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        }
    }
}