const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  id: "MenuGuides",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  execute(interaction) {
    if (interaction.values.includes('first_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que es y como se Usa **Python**")
          .setDescription(`
         <a:Dashbord:997754372496830534> En términos técnicos, Python es un lenguaje de programación de alto nivel, orientado a objetos, con una semántica dinámica integrada, principalmente para el desarrollo web y de aplicaciones informáticas. `)
          .addFields(
            { name: `Ejemplo de codigo`, value: `\`\`\`py\nprint("Hola Mundo")\n\`\`\`` },
            { name: `Que es pip`, value: `pip es un sistema de gestión de paquetes utilizado para instalar y administrar software escrito en Python.` },
            { name: `Como ejecutarlo`, value: `\`\`\`py\npython nombre.py\n\`\`\`` },
            { name: `Caracteristicas`, value: `Python es un lenguaje de programación interpretado, de tipado dinámico y multiplataforma.` },
            { name: `Como instalarlo`, value: `\`\`\`py\nhttps://www.python.org/downloads/\n\`\`\`` },
            { name: `Como instalarlo en termux`, value: `\`\`\`py\npkg install python\n\`\`\`` },
            { name: `Como instalarlo en linux`, value: `\`\`\`py\nsudo apt install python3\n\`\`\`` },
            { name: `Aplicaciones`, value: `Python se utiliza en una amplia variedad de aplicaciones, desde aplicaciones web hasta aplicaciones de escritorio, pasando por aplicaciones de Internet de las cosas (IoT).` },
            { name: `Librerias`, value: `Python tiene una amplia variedad de librerías, que se pueden utilizar para realizar tareas específicas.` },
            { name: `Metodo de listas`, value: `\`\`\`py\nlista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nprint(lista[0])\n\`\`\`` },
            { name: `Metodo de diccionarios`, value: `\`\`\`py\nmi_diccionario = {"nombre": "Juan", "apellido": "Perez", "edad": 25}\nprint(mi_diccionario["nombre"])\n\`\`\`` },
            { name: `Metodo de tuplas`, value: `\`\`\`py\nmi_tupla = ("Juan", "Perez", 25)\nprint(mi_tupla[0])\n\`\`\`` },
            { name: `Metodo de conjuntos`, value: `\`\`\`py\nmi_conjunto = {"Juan", "Perez", 25}\nprint(mi_conjunto)\n\`\`\`` },
            { name: `Condicion falsa`, value: `\`\`\`py\nif 5 > 2:\n  print("Cinco es mayor que dos!")\n\`\`\`` },
            { name: `Ciclos anidados`, value: `\`\`\`py\nfor x in [0, 1, 2]:\n  for y in [0, 1, 2]:\n    print(x, y)\n\`\`\`` },
            { name: `Funciones`, value: `\`\`\`py\ndef mi_funcion():\n  print("Hola desde una función")\n\`\`\`` },
            { name: `Funciones de patron con asteriscos`, value: `\`\`\`py\ndef mi_funcion(*kids):\n  print("El más pequeño es " + kids[2])\n\`\`\`` },
            { name: `Clausula Try`, value: `\`\`\`py\ntry:\n  print(x)\nexcept:\n  print("Algo salió mal")\n\`\`\`` },
            { name: `Clausula Try con else`, value: `\`\`\`py\ntry:\n  print("Hola")\nexcept:\n  print("Algo salió mal")\nelse:\n  print("Nada salió mal")\n\`\`\`` },
            { name: `Clausula Try con finally`, value: `\`\`\`py\ntry:\n  print(x)\nexcept:\n  print("Algo salió mal")\nfinally:\n  print("El 'try except' está terminado")\n\`\`\`` },
            { name: `Atributos de instancia`, value: `\`\`\`py\nclass Persona:\n  def __init__(self, nombre, edad):\n    self.nombre = nombre\n    self.edad = edad\n\`\`\`` },
            { name: `Como actualizar un atributo de clase`, value: `\`\`\`py\nclass Persona:\n  def __init__(self, nombre, edad):\n    self.nombre = nombre\n    self.edad = edad\np1 = Persona("John", 36)\np1.edad = 40\n\`\`\`` },
            { name: `Como eliminar un atributo de clase`, value: `\`\`\`py\nclass Persona:\n  def __init__(self, nombre, edad):\n    self.nombre = nombre\n    self.edad = edad\np1 = Persona("John", 36)\ndel p1.edad\n\`\`\`` },
            { name: `Como eliminar un objeto`, value: `\`\`\`py\nclass Persona:\n  def __init__(self, nombre, edad):\n    self.nombre = nombre\n    self.edad = edad\np1 = Persona("John", 36)\ndel p1\n\`\`\`` },
            { name: `Propiedades, getters, y setters en Python`, value: `\`\`\`py\nclass Persona:\n  def __init__(self, nombre):\n    self._nombre = nombre\n  @property\n  def nombre(self):\n    print("Llamando al método getter nombre()")\n    return self._nombre\n  @nombre.setter\n  def nombre(self, valor):\n    print("Llamando al método setter nombre()")\n    self._nombre = valor\n  @nombre.deleter\n  def nombre(self):\n    print("Llamando al método deleter nombre()")\n    del self._nombre\np1 = Persona("John")\np1.nombre = "Mike"\nprint(p1.nombre)\ndel p1.nombre\n\`\`\`` },
          )
          .setFooter({ text: "Python lenguaje de alto nivel" })
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setColor("Random")
          .setTimestamp()], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('second_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Hola quieres saber que es kernel ahorita te explico")
          .setDescription(`
         <a:Dashbord:997754372496830534> Que tal ${interaction.user} El Kernel o núcleo, es una parte fundamental del sistema operativo que se encarga de conceder el acceso al hardware de forma segura para todo el software que lo solicita, el Kernel es una pequeña e invisible parte del sistema operativo, pero la más importante, ya que sin esta no podría funcionar. Todos los sistemas operativos tienen un Kernel, incluso Windows 10, pero quizá el más famoso es el Kernel de Linux, que ahora además está integrado en Windows 10 con sus últimas actualizaciones.. `)
          .addFields(
            { name: `Para que sirve Kernel`, value: `El Kernel o núcleo de un sistema operativo sirve para administrar los recursos de hardware solicitados por los diferentes elementos de software y hacer de intermediario decidiendo a que y cuando se concede este acceso evitando así sobrecarga del sistema, recursos innecesarios y acceso a software malicioso al propio Kernel y llegar a poder controlar así todo el sistema. De este modo el Kernel sirve como elemento de seguridad teniendo que pasar por varias capas antes de poder tener acceso, además tiene que distribuir los recursos de manera eficiente y ordenada para que el Hardware.` },
            { name: `Que tareas realiza un Kernel`, value: `El principal cometido del kernel es el procesamiento paralelo de diferentes tareas, el multitasking. Para ello debe, por un lado, cumplir con los tiempos establecidos y, por otro, permanecer disponible para tareas adicionales. La norma necesita excepciones para poder funcionar en un sistema tan acelerado como es el sistema operativo. Por tanto, el kernel solo sirve de intermediario para el software del sistema, el software de aplicación y las bibliotecas. La interfaz gráfica de un sistema operativo es completamente independiente del kernel, incluso en el caso de Linux.` })
          .setFooter({ text: "Bots para copilado de lenguaje en discord" })
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setColor("Random")
          .setTimestamp()], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('third_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Guia de mongoose")
          .setDescription("Guia de mongoose para principiantes")
          .addFields(
            { name: "¿Que es mongoose?", value: "Mongoose es un ODM (Object Data Modeling) para MongoDB y Node.js. Es un mapeador de objetos de MongoDB diseñado para trabajar en un entorno asíncrono. Mongoose soporta tanto promesas como devoluciones de llamada." },
            { name: "¿Como instalar mongoose?", value: "npm i mongoose" },
            { name: `¿Como conectar con mongoose?`, value: `\`\`\`js\nconst mongoose = require('mongoose');\n\nmongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});\n\`\`\`` },
            { name: "¿Como crear un modelo?", value: `\`\`\`js\nconst mongoose = require('mongoose');\n\nconst Schema = mongoose.Schema;\n\nconst userSchema = new Schema({\n  name: String,\n  age: Number\n});\n\`\`\`` },
            { name: "¿Como crear un documento?", value: `\`\`\`js\nconst mongoose = require('mongoose');\n\nconst Schema = mongoose.Schema;\n\nconst userSchema = new Schema({\n  name: String,\n  age: Number\n});\n\nconst User = mongoose.model('User', userSchema);\n\nconst user = new User({ name: 'John', age: 27 });\n\nuser.save();\n\`\`\`` },
            { name: "Tipos de datos", value: "String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array" },
            { name: "Usos de los tipos de datos", value: "String: para guardar texto\nNumber: para guardar numeros\nDate: para guardar fechas\nBuffer: para guardar imagenes\nBoolean: para guardar valores booleanos\nMixed: para guardar cualquier tipo de dato\nObjectId: para guardar id's\nArray: para guardar arrays" },
            { name: "¿Como crear un documento con datos?", value: `\`\`\`js\nconst mongoose = require('mongoose');\n\nconst Schema = mongoose.Schema;\n\nconst userSchema = new Schema({\n  name: String,\n  age: Number\n});\n\nconst User = mongoose.model('User', userSchema);\n\nconst user = new User({ name: 'John', age: 27 });\n\nuser.save();\n\`\`\`` },
          )
          .setFooter({ text: ` Que es mongoose y como se trabaja actualmente` })
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setColor("Random")], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('fourth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Hola quieres saber que son las redes neuronales en programacion ahorita te explico")
          .setDescription(`
             <a:Dashbord:997754372496830534> Que tal ${interaction.user} Las redes neuronales son unos algoritmos muy potentes en el mundo del Machine Learning. ¿cómo podría yo programar una red neuronal desde 0 ?. ¿Te suena interesante? Las redes neuronales están compuestas de neuronas, que a su vez se agrupan en capas: cada neurona de cada capa está conectada con todas las neuronas de la capa anterior. En cada neurona, se realizarán una serie de operaciones (que explicaremos más adelante) las cuales, al optimizar, conseguiremos que nuestra red aprenda.. `)
          .addFields(
            { name: `Creacion de Capas`, value: `Para poder programar una capa de neuronas, primero debemos entender bien cómo funcionan. Básicamente una red neuronal funciona de la siguiente manera:.` },
            { name: `1.`, value: `Una capa recibe valores, llamados inputs. En la primera capa, esos valores vendrán definidos por los datos de entrada, mientras que el resto de capas recibirán el resultado de la capa anterior.` },
            { name: `2.`, value: "Se realiza una suma ponderada todos los valores de entrada. Para hacer esa ponderación necesitamos una matriz de pesos, conocida como W. La matriz W tiene tantas filas como neuronas la capa anterior y tantas columnas como neuronas tiene esa capa." },
            { name: "3.", value: "Al resultado de la suma ponderada anterior se le sumará otro parámetro, conocido como bias o, simplemente, b. En este caso, cada neurona tiene su propio bias, por lo que las dimensiones del vector bias será una columna y tantas filas como neuronas tiene esa capa." },
            { name: "4.", value: "Por cuarto lugar tenemos una de las claves de las redes neuronales: la función de activación. Y es que, si te das cuenta, lo que tenemos hasta ahora no es más que una regresión lineal. Para evitar que toda la red neuronal se pueda reducir a una simple regresión lineal, al resultado de la suma del bias a la suma ponderada se le aplica una función, conocido como función de activación. El resultado de esta función será el resultado de la neurona." },
            { name: "Ejemplo Basico", value: `\`\`\`python\nfrom scipy import stats\nclass capa():\ndef __init__(self, n_neuronas_capa_anterior, n_neuronas, funcion_act):\nself.funcion_act = funcion_act\nself.b  = np.round(stats.truncnorm.rvs(-1, 1, loc=0, scale=1, size= n_neuronas).reshape(1,n_neuronas),3)\nself.W  = np.round(stats.truncnorm.rvs(-1, 1, loc=0, scale=1, size= n_neuronas * n_neuronas_capa_anterior).reshape(n_neuronas_capa_anterior,n_neuronas),3)\n\`\`\`` })
          .setFooter({ text: "Bots para copilado de lenguaje en discord" })
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setColor("Random")
          .setTimestamp()], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('fifth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`Wings en un entorno de Python`)
          .setDescription(`El editor de Wing acelera el desarrollo de Python aportando autocompletado y documentación apropiada para el contexto. Además nos permitirá disponer de edición automática, plegado de código, selección múltiple, marcadores y mucho más. Wing puede emular a vi, emacs, Eclipse, Visual Studio y Xcode.`)
          .addFields(
            { name: `Entorno Python`, value: `Wing facilita el manejo del código con goto-definition, encuentra usos, encuentra símbolos en el proyecto y cuenta con una potente opción de búsqueda. También nos va a ofrece cientos de opciones de configuración que afectan a la emulación del editor, al diseño de la interfaz de usuario, a los temas de visualización, a la coloración de sintaxis y mucho más. Se pueden agregar nuevas características al IDE escribiendo código Python que acceda a la API de scripting de Wing.` },
            { name: `Ejemplo de Codigo de un Red Neuronal`, value: `\`\`\`python\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\n# Importing the dataset\n\ndataset = pd.read_csv('Churn_Modelling.csv')\nX = dataset.iloc[:, 3:13].values\ny = dataset.iloc[:, 13].values\n\n# Encoding categorical data\n# Encoding the Independent Variable\nfrom sklearn.preprocessing import LabelEncoder, OneHotEncoder\nlabelencoder_X_1 = LabelEncoder()\nX[:, 1] = labelencoder_X_1.fit_transform(X[:, 1])\nlabelencoder_X_2 = LabelEncoder()\nX[:, 2] = labelencoder_X_2.fit_transform(X[:, 2])\nonehotencoder = OneHotEncoder(categorical_features = [1])\nX = onehotencoder.fit_transform(X).toarray()\nX = X[:, 1:]\n\n# Splitting the dataset into the Training set and Test set\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)\n# Feature Scaling\nfrom sklearn.preprocessing import StandardScaler\nsc = StandardScaler()\n\`\`\`` },
            { name: `Parte II`, value: `\`\`\`python\nX_train = sc.fit_transform(X_train)\nX_test = sc.transform(X_test)\n\n# Importing the Keras libraries and packages\nimport keras\nfrom keras.models import Sequential\nfrom keras.layers import Dense\n\n# Initialising the ANN\nclassifier = Sequential()\n\n# Adding the input layer and the first hidden layer\nclassifier.add(Dense(output_dim = 6, init = 'uniform', activation = 'relu', input_dim = 11))\n\n# Adding the second hidden layer\nclassifier.add(Dense(output_dim = 6, init = 'uniform', activation = 'relu'))\n\n# Adding the output layer\nclassifier.add(Dense(output_dim = 1, init = 'uniform', activation = 'sigmoid'))\n\n# Compiling the ANN\nclassifier.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])\n\n# Fitting the ANN to the Training set\nclassifier.fit(X_train, y_train, batch_size = 10, nb_epoch = 100)\n\n# Part 3 - Making the predictions and evaluating the model\n\n# Predicting the Test set results\ny_pred = classifier.predict(X_test)\`\`\`` },
          )
          .setFooter({ text: `Wing en un entorno de Python` })
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setColor("Random")], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('sixth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Bucles y funciones")
          .setDescription("Uso de bucles y funciones en js")
          .addFields(
            { name: `Que es un bucle ?`, value: `El bucle es una estructura de control que nos permite repetir una o varias instrucciones un determinado número de veces o hasta que se cumpla una condición.` },
            { name: `Ejemplo de un Bucle`, value: `\`\`\`js\nfor (let i = 0; i < 10; i++) {\nconsole.log(i);\n}\n\`\`\`` },
            { name: `Que es una función ?`, value: `Una función es un bloque de código que se puede ejecutar varias veces. Se utiliza para realizar una tarea específica.` },
            { name: `Ejemplo de una función`, value: `\`\`\`js\nfunction saludar(nombre) {\nconsole.log("Hola " + nombre);\n}\n\`\`\`` },
            { name: `Que es un bucle for ?`, value: `El bucle for es una estructura de control que nos permite repetir una o varias instrucciones un determinado número de veces.` },
            { name: `Ejemplo de un bucle for`, value: `\`\`\`js\nfor (let i = 0; i < 10; i++) {\nconsole.log(i);\n}\n\`\`\`` },
            { name: `Que es un bucle while ?`, value: `El bucle while es una estructura de control que nos permite repetir una o varias instrucciones mientras se cumpla una condición.` },
            { name: `Ejemplo de un bucle while`, value: `\`\`\`js\nlet i = 0;\nwhile (i < 10) {\nconsole.log(i);\ni++;\n}\n\`\`\`` },
            { name: `Que es un bucle do while ?`, value: `El bucle do while es una estructura de control que nos permite repetir una o varias instrucciones mientras se cumpla una condición.` },
            { name: `Ejemplo de un bucle do while`, value: `\`\`\`js\nlet i = 0;\ndo {\nconsole.log(i);\ni++;\n} while (i < 10);\n\`\`\`` },
            { name: `Ejemplo de un Bucle avanzado`, value: `\`\`\`js\nconst array = [1, 2, 3, 4, 5];\nfor (let i = 0; i < array.length; i++) {\nconsole.log(array[i]);\n}\n\`\`\`` },
          )
          .setFooter({ text: `Que es un bucle y sus trabajaos en JavaScript` })
          .setColor("Random")
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setTimestamp()], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('seventh_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`📓 Herencias en Typescript`)
          .setTimestamp()
          .setDescription(`<a:Dashbord:997754372496830534> **Herencia** es un concepto de la programación orientada a objetos que permite que una clase herede los atributos y métodos de otra clase. La clase que hereda se llama subclase y la clase de la que hereda se llama superclase. La subclase puede agregar sus propios atributos y métodos, además de los heredados de la superclase. La subclase puede reemplazar los métodos heredados de la superclase o extenderlos.`)
          .addFields(
            { name: `📓 Herencia Simple`, value: `\`\`\`ts\n// Definimos la clase padre\nexport class Padre {\n    // Definimos el atributo nombre\n    nombre: string;\n    // Definimos el constructor\n    constructor(nombre: string) {\n        this.nombre = nombre;\n    }\n    // Definimos el método hablar\n    hablar(): void {\n        console.log(\`Hola soy \${this.nombre}\`);\n    }\n}\n// Definimos la clase hija\nexport class Hijo extends Padre {\n    // Definimos el constructor\n    constructor(nombre: string) {\n        // Llamamos al constructor de la clase padre\n        super(nombre);\n    }\n}\n// Creamos un objeto de la clase hija\nconst hijo = new Hijo("Juan");\n// Llamamos al método hablar\nhijo.hablar();\n\`\`\`` },
            { name: `📓 Herencia Múltiple`, value: `\`\`\`ts\n// Definimos la clase padre 1\nexport class Padre1 {\n    // Definimos el atributo nombre\n    nombre: string;\n    // Definimos el constructor\n    constructor(nombre: string) {\n        this.nombre = nombre;\n    }\n    // Definimos el método hablar\n    hablar(): void {\n        console.log(\`Hola soy \${this.nombre}\`);\n    }\n}\n// Definimos la clase padre 2\nexport class Padre2 {\n    // Definimos el atributo nombre\n    nombre: string;\n    // Definimos el constructor\n    constructor(nombre: string) {\n        this.nombre = nombre;\n    }\n    // Definimos el método hablar\n    hablar(): void {\n        console.log(\`Hola soy \${this.nombre}\`);\n    }\n}\n// Definimos la clase hija\nexport class Hijo extends Padre1, Padre2 {\n    // Definimos el constructor\n    constructor(nombre: string) {\n        // Llamamos al constructor de la clase padre\n        super(nombre);\n    }\n}\n// Creamos un objeto de la clase hija\nconst hijo = new Hijo("Juan");\n// Llamamos al método hablar\nhijo.hablar();\n\`\`\`` },
            { name: `📓 Herencia Múltiple con Interfaces`, value: `\`\`\`ts\n// Definimos la interfaz padre 1\nexport interface Padre1 {\n    // Definimos el atributo nombre\n    nombre: string;\n    // Definimos el método hablar\n    hablar(): void;\n}\n// Definimos la interfaz padre 2\nexport interface Padre2 {\n    // Definimos el atributo nombre\n    nombre: string;\n    // Definimos el método hablar\n    hablar(): void;\n}\n// Definimos la clase hija\nexport class Hijo implements Padre1, Padre2 {\n    // Definimos el atributo nombre\n    nombre: string;\n    // Definimos el constructor\n    constructor(nombre: string) {\n        this.nombre = nombre;\n    }\n    // Definimos el método hablar\n    hablar(): void {\n        console.log(\`Hola soy \${this.nombre}\`);\n    }\n}\n// Creamos un objeto de la clase hija\nconst hijo = new Hijo("Juan");\n// Llamamos al método hablar\nhijo.hablar();\n\`\`\`` },
          )
          .setFooter({ text: `Que es la herencia de clases en typescript y como abordarlo` })
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setColor("Random")], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('eighth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`Node.js y uso de Process`)
          .setColor("Random")
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setDescription(`Node.js es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome. Node.js usa un modelo de operaciones E / S sin bloqueo y orientado a eventos, que lo hace liviano y eficiente. El ecosistema de paquetes de Node.js, npm, es el ecosistema más grande de librerías de código abierto en el mundo.`)
          .addFields(
            { name: `Que es Process.on`, value: `El método process.on () se utiliza para registrar un manejador de eventos para el evento especificado. El evento se puede emitir varias veces, cada vez que se emite, el manejador de eventos se ejecuta. Si se emite el evento una vez, el manejador de eventos se ejecuta una vez; si se emite el evento 10 veces, el manejador de eventos se ejecuta 10 veces. El método process.on () devuelve un objeto EventEmitter, que puede usarse para registrar múltiples manejadores para el mismo evento.` },
            { name: `Que es unhandledRejection`, value: `El evento unhandledRejection se emite cuando una promesa es rechazada y no tiene un manejador de rechazo asociado. Cuando se emite un evento unhandledRejection, el evento process.on ('unhandledRejection') se ejecuta. Si no hay un manejador de rechazo asociado a la promesa, el evento unhandledRejection se emite cuando la promesa se rechaza. Si hay un manejador de rechazo asociado a la promesa, el evento unhandledRejection no se emite cuando la promesa se rechaza.` },
            { name: `Ejemplos de unhandledRejection`, value: `\`\`\`js\nprocess.on('unhandledRejection', error => {\n    console.error('Unhandled promise rejection:', error);\n});\n\`\`\`` },
            { name: `Que es uncaughtException`, value: `El evento uncaughtException se emite cuando se produce una excepción que no se captura con un bloque try / catch. Cuando se emite un evento uncaughtException, el evento process.on ('uncaughtException') se ejecuta. Si no hay un bloque try / catch que capture la excepción, el evento uncaughtException se emite cuando se produce una excepción. Si hay un bloque try / catch que capture la excepción, el evento uncaughtException no se emite cuando se produce una excepción.` },
            { name: `Ejemplo de uncaughtException`, value: `\`\`\`js\nprocess.on('uncaughtException', error => {\n    console.error('Uncaught exception:', error);\n});\n\`\`\`` },
            { name: `Que es Warning`, value: `El evento warning se emite cuando se produce una advertencia. Cuando se emite un evento warning, el evento process.on ('warning') se ejecuta. Si no hay un manejador de advertencias asociado a la advertencia, el evento warning no se emite cuando se produce tal advertencia` },
            { name: `Ejemplo en Discord.js`, value: `\`\`\`js\nprocess.on('warning', warning => {\n    console.warn(warning.name);\n    console.warn(warning.message);\n    console.warn(warning.stack);\n});\n\`\`\`` },
            { name: `Que es exit`, value: `El evento exit se emite cuando el proceso Node.js está a punto de terminar. Cuando se emite un evento exit, el evento process.on ('exit') se ejecuta. Si no hay un manejador de salida asociado al evento exit, el evento exit no se emite cuando se produce tal evento.` },
            { name: `Ejemplo de exit`, value: `\`\`\`js\nprocess.on('exit', code => {\n    console.log(\`About to exit with code: \${code}\`);\n});\n\`\`\`` },
            { name: `Ejemplo de beforeExit`, value: `\`\`\`js\nprocess.on('beforeExit', code => {\n    console.log(\`Process beforeExit event with code: \${code}\`);\n});\n\`\`\`` },
            { name: `Que es MultipleResolves`, value: `El evento multipleResolves se emite cuando se llama a la función de resolución o rechazo de una promesa más de una vez. Cuando se emite un evento multipleResolves, el evento process.on ('multipleResolves') se ejecuta. Si no hay un manejador de resolución múltiple asociado a la promesa, el evento multipleResolves no se emite cuando se produce tal promesa.` },
            { name: `Ejemplo en multipleResolves`, value: `\`\`\`js\nprocess.on('multipleResolves', (type, promise, reason) => {\n    console.error(\`Multiple \${type} event with: \${promise} and \${reason}\`);\n});\n\`\`\`` },
            { name: `Que es rejectionHandled`, value: `El evento rejectionHandled se emite cuando una promesa es rechabada y tiene un manejador de rechazo asociado. Cuando se emite un evento rejectionHandled, el evento process.on ('rejectionHandled') se ejecuta. Si no hay un manejador de rechazo asociado a la promesa, el evento rejectionHandled no se emite cuando la promesa se rechaza.` },
            { name: `Ejemplo en rejectionHandled`, value: `\`\`\`js\nprocess.on('rejectionHandled', promise => {\n    console.log(\`Promise rejectionHandled event with: \${promise}\`);\n});\n\`\`\`` },
            { name: `Que es uncaughtExceptionMonitor`, value: `El evento uncaughtExceptionMonitor se emite cuando se produce una excepción que no se captura con un bloque try / catch. Cuando se emite un evento uncaughtExceptionMonitor, el evento process.on ('uncaughtExceptionMonitor') se ejecuta. Si no hay un bloque try / catch que capture la excepción, el evento uncaughtExceptionMonitor se emite cuando se produce una excepción. Si hay un bloque try / catch que capture la excepción, el evento uncaughtExceptionMonitor no se emite cuando se produce una excepción.` },
            { name: `Ejemplo de uncaughtExceptionMonitor`, value: `\`\`\`js\nprocess.on('uncaughtExceptionMonitor', (error, origin) => {\n    console.error(\`Uncaught Exception monitor: \${error} and \${origin}\`);\n});\n\`\`\`` },
          )
          .setFooter({ text: `Que es Node.js y el Evento Process.On` })], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('ninth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`Como estudiar c++ y que es`)
          .setColor("Random")
          .setDescription(`C++ es un lenguaje de programacion, y es muy util para programar, y para estudiar c++ tienes que aprender los conceptos basicos, como las variables, los ciclos, las funciones, etc, y luego puedes aprender a programar en c++`)
          .addFields(
            { name: `Ejemplo de c++`, value: `\`\`\`cpp\n#include <iostream>\n\nint main() {\n  std::cout << "Hello World!";\n  return 0;\n}\n\`\`\`` },
            { name: `Que es un Ciclo for`, value: `Un ciclo for es un ciclo que se repite una cantidad de veces, por ejemplo, si tu quieres que un programa te diga hola 10 veces, puedes usar un ciclo for, y el codigo seria asi:\n\`\`\`cpp\n#include <iostream>\n\nint main() {\n  for(int i = 0; i < 10; i++) {\n    std::cout << "Hola";\n  }\n  return 0;\n}\n\`\`\`` },
            { name: `Ejemplo de ciclo for`, value: `\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 0; i < 5; i++) {\n    cout << i << "\n";\n  }\n  return 0;\n}\n\`\`\`` },
            { name: `Que es una funcion`, value: ` Una funcion es un bloque de codigo que se ejecuta cuando la llamas, por ejemplo, si tu quieres que un programa te diga hola, puedes hacer una funcion que diga hola, y luego llamarla, y el codigo seria asi:\n\`\`\`cpp\n#include <iostream>\n\nvoid hola() {\n  std::cout << "Hola";\n}\n\nint main() {\n  hola();\n  return 0;\n}\n\`\`\`` },
            { name: `Ejemplo de funcion`, value: `\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nvoid myFunction() {\n  cout << "I just got executed!";\n}\n\nint main() {\n  myFunction();\n  return 0;\n}\n\`\`\`` },
            { name: `Que es una variable`, value: `Una variable es un espacio de memoria que se usa para guardar datos, por ejemplo, si tu quieres guardar un numero, puedes usar una variable, y el codigo seria asi:\n\`\`\`cpp\n#include <iostream>\n\nint main() {\n  int numero = 10;\n  std::cout << numero;\n  return 0;\n}\n\`\`\`` },
            { name: `Ejemplo de variable`, value: `\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int myNum = 5;\n  cout << myNum;\n  return 0;\n}\n\`\`\`` },
            { name: `Que es una clase`, value: `Una clase es un tipo de dato, por ejemplo, si tu quieres guardar un numero, puedes usar una variable, pero si tu quieres guardar un objeto, puedes usar una clase, y el codigo seria asi:\n\`\`\`cpp\n#include <iostream>\n\nclass Persona {\n  public:\n    std::string nombre;\n    int edad;\n};\n\nint main() {\n  Persona persona1;\n  persona1.nombre = "Juan";\n  persona1.edad = 20;\n  std::cout << persona1.nombre << " tiene " << persona1.edad << " años";\n  return 0;\n}\n\`\`\`` },
            { name: `Ejemplo de clase`, value: `\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nclass MyClass {\n  public:\n    void myMethod() {\n      cout << "Hello World!";\n    }\n};\n\nint main() {\n  MyClass myObj;\n  myObj.myMethod();\n  return 0;\n}\n\`\`\`` },
            { name: `Que es un objeto`, value: `Un objeto es una instancia de una clase, por ejemplo, si tu quieres guardar un numero, puedes usar una variable, pero si tu quieres guardar un objeto, puedes usar una clase, y el codigo seria asi:\n\`\`\`cpp\n#include <iostream>\n\nclass Persona {\n  public:\n    std::string nombre;\n    int edad;\n};\n\nint main() {\n  Persona persona1;\n  persona1.nombre = "Juan";\n  persona1.edad = 20;\n  std::cout << persona1.nombre << " tiene " << persona1.edad << " años";\n  return 0;\n}\n\`\`\`` },
            { name: `Ejemplo de objeto`, value: `\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nclass MyClass {\n  public:\n    void myMethod() {\n      cout << "Hello World!";\n    }\n};\n\nint main() {\n  MyClass myObj;\n  myObj.myMethod();\n  return 0;\n}\n\`\`\`` },
            { name: `Que es un constructor`, value: `Un constructor es un metodo que se ejecuta cuando se crea un objeto, por ejemplo, si tu quieres que un programa te diga hola, puedes hacer una funcion que diga hola, y luego llamarla, y el codigo seria asi:\n\`\`\`cpp\n#include <iostream>\n\nclass Persona {\n  public:\n    std::string nombre;\n    int edad;\n    Persona(std::string nombre, int edad) {\n      this->nombre = nombre;\n      this->edad = edad;\n    }\n};\n\nint main() {\n  Persona persona1("Juan", 20);\n  std::cout << persona1.nombre << " tiene " << persona1.edad << " años";\n  return 0;\n}\n\`\`\`` },
            { name: `Ejemplo de array`, value: `\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n  string cars[4] = {"Volvo", "BMW", "Ford", "Mazda"};\n  cout << cars[0];\n  return 0;\n}\n\`\`\`` },
          )
          .setFooter({ text: `Que es c++ y sus funciones` })
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setTimestamp()], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('tenth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que es distube y como usarlo en discord.js")
          .setDescription("Distube es un modulo de npm que nos permite reproducir musica en discord.js")
          .addFields(
            { name: `Que packetes requiere distube`, value: `Distube requiere los siguientes packetes:\n\`\`\`js\nnpm i distube\nnpm i ytdl-core\nnpm i ytdl-core-discord\nnpm i spotify/plugin\n\`\`\`` },
            { name: `Ejemplo de distube`, value: `\`\`\`js\nconst Discord = require("discord.js");\nconst client = new Discord.Client();\nconst { Player } = require("discord-player");\nconst player = new Player(client);\nclient.player = player;\n\nclient.on("ready", () => {\n  console.log("Estoy listo!");\n});\n\nclient.on("message", async (message) => {\n if (message.content === "play") {\n  const connection = await message.member.voice.channel.join();\n  const dispatcher = connection.play("https://www.youtube.com/watch?v=dQw4w9WgXcQ");\ndispatcher.on("finish", () => {\nconnection.disconnect();\n  });\n }\n});\n\nclient.login("token");\n\`\`\`` },
            { name: `Comandos tradicionales de distube`, value: `Distube tienes unos comandos que siempre debe tener como son:\n\`\`\`js\nplay\nstop\nskip\nqueue\n\`\`\`` },
            { name: `Que otras opciones hay en lugar de distube`, value: `Hay otras opciones como son:\n\`\`\`js\nnpm i discord-music-player\nnpm i discord-music-player\nnpm i discord-music-player\ninstall lavalink\ninstall the erela, spo\n\`\`\`` },
            { name: `Que es lavalink`, value: `Lavalink es un servidor de musica que se puede usar en discord.js y otros lenguajes de programacion` },
          )
          .setColor("Random")
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setFooter({ text: `Que es distube y como usarlo en discord.js` })
          .setTimestamp()], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('eleventh_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Guia de mysql")
          .setDescription("Guia de mysql para principiantes")
          .addFields(
            { name: "¿Que es mysql?", value: "MySQL es un sistema de gestión de bases de datos relacional (RDBMS por sus siglas en inglés), que utiliza lenguaje SQL como interfaz. MySQL se basa en el modelo cliente-servidor, y utiliza múltiples sublenguajes SQL para la administración, consulta, actualización, inserción y eliminación de datos." },
            { name: `¿Como instalar mysql?`, value: "npm i mysql" },
            { name: `¿Como conectar con mysql?`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password'\n});\n\`\`\`` },
            { name: `¿Como crear una base de datos?`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password'\n});\n\nconnection.connect();\n\nconnection.query('CREATE DATABASE mydb', function (err, result) {\n  if (err) throw err;\n  console.log('Database created');\n});\n\`\`\`` },
            { name: `¿Como crear una tabla?`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'mydb'\n});\n\nconnection.connect();\n\nconnection.query('CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))', function (err, result) {\n  if (err) throw err;\n  console.log('Table created');\n});\n\`\`\`` },
            { name: `¿Como insertar datos en una tabla?`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'mydb'\n});\n\nconnection.connect();\n\nvar sql = 'INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')';\nconnection.query(sql, function (err, result) {\n  if (err) throw err;\n  console.log('1 record inserted');\n});\n\`\`\`` },
            { name: `¿Como insertar multiples datos en una tabla?`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'mydb'\n});\n\nconnection.connect();\n\nvar sql = 'INSERT INTO customers (name, address) VALUES ?';\nvar values = [\n  ['John', 'Highway 71'],\n  ['Peter', 'Lowstreet 4'],\n  ['Amy', 'Apple st 652'],\n  ['Hannah', 'Mountain 21'],\n  ['Michael', 'Valley 345'],\n  ['Sandy', 'Ocean blvd 2'],\n  ['Betty', 'Green Grass 1'],\n  ['Richard', 'Sky st 331'],\n  ['Susan', 'One way 98'],\n  ['Vicky', 'Yellow Garden 2'],\n  ['Ben', 'Park Lane 38'],\n  ['William', 'Central st 954'],\n  ['Chuck', 'Main Road 989'],\n  ['Viola', 'Sideway 1633']\n];\nconnection.query(sql, [values], function (err, result) {\n  if (err) throw err;\n  console.log('Number of records inserted: ' + result.affectedRows);\n});\n\`\`\`` },
            { name: `¿Como seleccionar datos de una tabla?`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'mydb'\n});\n\nconnection.connect();\n\nconnection.query('SELECT * FROM customers', function (err, result, fields) {\n  if (err) throw err;\n  console.log(result);\n});\n\`\`\`` },
            { name: `¿Como seleccionar datos de una tabla con una condicion?`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'mydb'\n});\n\nconnection.connect();\n\nconnection.query('SELECT * FROM customers WHERE address = 'Park Lane 38'', function (err, result) {\n  if (err) throw err;\n  console.log(result);\n});\n\`\`\`` },
            { name: `Usando el operador LIKE`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'mydb'\n});\n\nconnection.connect();\n\nconnection.query('SELECT * FROM customers WHERE address LIKE 'S%''', function (err, result) {\n  if (err) throw err;\n  console.log(result);\n});\n\`\`\`` },
            { name: `Usando el operador OR`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'mydb'\n});\n\nconnection.connect();\n\nconnection.query("SELECT * FROM customers WHERE address = 'Park Lane 38' OR address = 'Valley 345'", function (err, result) {\n  if (err) throw err;\n  console.log(result);\n});\n\`\`\`` },
            { name: `Usando el operador AND`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'mydb'\n});\n\nconnection.connect();\n\nconnection.query("SELECT * FROM customers WHERE address = 'Park Lane 38' AND address = 'Valley 345'", function (err, result) {\n  if (err) throw err;\n  console.log(result);\n});\n\`\`\`` },
            { name: `Usando el operador NOT`, value: `\`\`\`js\nconst mysql = require('mysql');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'mydb'\n});\n\nconnection.connect();\n\nconnection.query("SELECT * FROM customers WHERE NOT address = 'Park Lane 38'", function (err, result) {\n  if (err) throw err;\n  console.log(result);\n});\n\`\`\`` },
          )
          .setFooter({ text: `Que es mysql y sus usos en la programacion` })
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setColor("Random")], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes(`twelfth_option`)) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que son los times en javascript y su uso en discord.js")
          .setDescription("Los Times son una forma de ejecutar una función en un tiempo determinado en milisegundos (ms).")
          .addFields(
            { name: `Que es un time ?`, value: `Los Times son una forma de ejecutar una función en un tiempo determinado en milisegundos (ms).` },
            { name: `Ejemplo de un time`, value: `\`\`\`js\nsetTimeout(() => {\nconsole.log("Hola");\n}, 1000);\n\`\`\`` },
            { name: `Que es un time interval ?`, value: `Los Times Interval son una forma de ejecutar una función en un tiempo determinado en milisegundos (ms) y repetirlo cada cierto tiempo.` },
            { name: `Ejemplo de un time interval`, value: `\`\`\`js\nsetInterval(() => {\nconsole.log("Hola");\n}, 1000);\n\`\`\`` },
            { name: `Ejemplo de un time interval avanzado`, value: `\`\`\`js\nlet i = 0;\nconst interval = setInterval(() => {\nconsole.log(i);\ni++;\nif (i === 10) {\nclearInterval(interval);\n}\n}, 1000);\n\`\`\`` },
            { name: `Que es un time out ?`, value: `Los Times Out son una forma de ejecutar una función en un tiempo determinado en milisegundos (ms) y repetirlo cada cierto tiempo.` },
            { name: `Ejemplo de un time out`, value: `\`\`\`js\nsetTimeout(() => {\nconsole.log("Hola");\n}, 1000);\n\`\`\`` },
            { name: `Ejemplo de un time out avanzado`, value: `\`\`\`js\nlet i = 0;\nconst timeout = setTimeout(() => {\nconsole.log(i);\ni++;\nif (i === 10) {\nclearTimeout(timeout);\n}\n}, 1000);\n\`\`\`` },

          )
          .setColor("Random")
          .setTimestamp()
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setFooter({ text: `Que son los times y sus usos en javascript y discord.js` })], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes(`thirteenth_option`)) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que es Rust el nuevo lenguaje paradigmatico")
          .setDescription("Rust es un lenguaje de programación de código abierto, multiparadigma y multiplataforma, diseñado para ser seguro, eficiente y concurrente.")
          .addFields(
            { name: `Desarrollo`, value: `El lenguaje fue creado por Graydon Hoare en Mozilla Research en 2006, y se lanzó en 2010. Rust es un lenguaje de programación de código abierto, multiparadigma y multiplataforma, diseñado para ser seguro, eficiente y concurrente. Rust se inspiró en C++, Go, Haskell, OCaml y Rust.` },
            { name: `Ejemplo de un hola mundo en Rust`, value: `\`\`\`rs\nfn main() {\n    println!("Hello, world!");\n}\n\`\`\`` },
            { name: `Ejemplo de como crear una variable en Rust`, value: `\`\`\`rs\nfn main() {\n    let x = 5;\n    println!("The value of x is: {}", x);\n}\n\`\`\`` },
            { name: `Ejemplo de como crear una variable mutable en Rust`, value: `\`\`\`rs\nfn main() {\n    let mut x = 5;\n    println!("The value of x is: {}", x);\n    x = 6;\n    println!("The value of x is: {}", x);\n}\n\`\`\`` },
            { name: `Ejemplo de como crear una constante en Rust`, value: `\`\`\`rs\nfn main() {\n    const MAX_POINTS: u32 = 100_000;\n    println!("The value of MAX_POINTS is: {}", MAX_POINTS);\n}\n\`\`\`` },
            { name: `Ejemplo de como crear una variable oculta en Rust`, value: `\`\`\`rs\nfn main() {\n    let x = 5;\n    let x = x + 1;\n    let x = x * 2;\n    println!("The value of x is: {}", x);\n}\n\`\`\`` },
            { name: `Ejemplo de como crear una variable oculta mutable en Rust`, value: `\`\`\`rs\nfn main() {\n    let mut spaces = "   ";\n    spaces = spaces.len();\n}\n\`\`\`` },
            { name: `Ejemplo de codigo en Rust`, value: `\`\`\`rs\nfn main() {\n    let guess: u32 = "42".parse().expect("Not a number!");\n}\n\`\`\`` },
            { name: `Ejemplo de codigo avanzado en Rust`, value: `\`\`\`rs\nfn main() {\n    let mut guess = String::new();\n    io::stdin()\n        .read_line(&mut guess)\n        .expect("Failed to read line");\n    println!("You guessed: {}", guess);\n}\n\`\`\`` },
          )
          .setColor("Random")
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setTimestamp()
          .setFooter({ text: `Que es rust un lenguaje paradigmatico` })], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes(`fourteenth_option`)) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`📝 Intents`)
          .setColor("Random")
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setDescription(`**Intents** son una nueva forma de especificar qué eventos de Discord desea que su bot reciba. Los eventos son la forma en que Discord le dice a su bot que algo ha sucedido, como un mensaje nuevo o una reacción agregada.`)
          .addFields(
            { name: `Ejemplos Intents en v14`, value: `\`\`\`js\nconst client = new Discord.Client( intents: [ Discord.GatewayIntentBits.Guilds,\n Discord.GatewayIntentBits.GuildMembers,\n Discord.GatewayIntentBits.GuildMessages,\n Discord.GatewayIntentBits.MessageContent,\n Discord.GatewayIntentBits.GuildVoiceStates,\n Discord.GatewayIntentBits.GuildMessageReactions,\n Discord.GatewayIntentBits.GuildEmojisAndStickers,\n ],\n partials: [\nDiscord.Partials.User,\n Discord.Partials.Channel,\n Discord.Partials.GuildMember,\n Discord.Partials.Message,\n Discord.Partials.Reaction]\`\`\`})` },
            { name: `Ejemplos Intents en v13`, value: `\`\`\`js\nconst client = new Discord.Client( intents: [ Discord.Intents.FLAGS.GUILDS,\n Discord.Intents.FLAGS.GUILD_MEMBERS,\n Discord.Intents.FLAGS.GUILD_MESSAGES,\n Discord.Intents.FLAGS.MESSAGE_CONTENT,\n Discord.Intents.FLAGS.GUILD_VOICE_STATES,\n Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,\n Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,\n ],\n partials: [\nDiscord.Partials.User,\n Discord.Partials.Channel,\n Discord.Partials.GuildMember,\n Discord.Partials.Message,\n Discord.Partials.Reaction]\`\`\`})` }
          )
          .setColor("Aqua")
          .setTimestamp()
          .setFooter({ text: `Intents en discord.js v13` })], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes(`fifteenth_option`)) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Como se manejan las reacciones en discord.js")
          .setDescription(`En discord.js se manejan las reacciones de la siguiente manera:\n\`\`\`js\nconst Discord = require("discord.js");\nconst client = new Discord.Client();\n\nclient.on("message", async (message) => {\nif (message.content === "reaccion") {\n\nconst embed = new Discord.MessageEmbed()\n.setTitle("Reaccion")\n.setDescription("Reaccion")\n.setColor("RANDOM")\n.setFooter({text: "Reaccion"});\nconst msg = await message.channel.send({ embeds: [embed] });\n  await msg.react("👍");\n  await msg.react("👎");\n}\n});\n\nclient.login("token");\n\`\`\``)
          .addFields(
            { name: `Que es una reaccion`, value: `Una reaccion es un emoji que se pone en un mensaje para que los usuarios puedan interactuar con el mensaje` },
            { name: `Que es un emoji`, value: `Un emoji es un simbolo que se puede poner en un mensaje para que los usuarios puedan interactuar con el mensaje` },
            { name: `Que es un mensaje`, value: `Un mensaje es un texto que se puede poner en un canal de texto para que los usuarios puedan interactuar con el mensaje` },
            { name: `Que es un canal de texto`, value: `Un canal de texto es un canal donde se puede poner mensajes para que los usuarios puedan interactuar con el mensaje` },
            { name: `Ejemplo de agregar una reaccion`, value: `\`\`\`js\nconst Discord = require("discord.js");\nconst client = new Discord.Client();\n\nclient.on("message", async (message) => {\nif (message.content === "reaccion") {\nconst embed = new Discord.MessageEmbed()\n  .setTitle("Reaccion")\n  .setDescription("Reaccion")\n  .setColor("RANDOM")\n  .setFooter({text: "Reaccion"});\n\nconst msg = await message.channel.send({ embeds: [embed] });\n  await msg.react("👍");\n  await msg.react("👎");\n}\n});\n\nclient.login("token");\n\`\`\`` },
            { name: `Nota de agregar reacciones`, value: `Esta no es la unica forma de agregar reacciones a un mensaje hay varias formas y tratare de enseñarte todas` },
            { name: `Ejemplo de eliminar una reaccion`, value: `\`\`\`js\nconst Discord = require("discord.js");\nconst client = new Discord.Client();\n\nclient.on("message", async (message) => {\nif (message.content === "reaccion") {\n\nconst embed = new Discord.EmbedBuilder()\n  .setTitle("Reaccion")\n  .setDescription("Reaccion")\n  .setColor("RANDOM")\n  .setFooter({text: "Reaccion"});\n\nconst msg = await message.channel.send({ embeds: [embed] });\n  await msg.react("👍");\n  await msg.react("👎");\nawait msg.reactions.removeAll();\n}\n});\n\nclient.login("token");\n\`\`\`` },
            { name: `Ejemplo de eliminar una reaccion especifica`, value: `\`\`\`js\nconst Discord = require("discord.js");\nconst client = new Discord.Client();\n\nclient.on("message", async (message) => {\nif (message.content === "reaccion") {\n\nconst embed = new Discord.EmbedBuilder()\n  .setTitle("Reaccion")\n  .setDescription("Reaccion")\n  .setColor("RANDOM")\n  .setFooter({text: "Reaccion"});\n\nconst msg = await message.channel.send({ embeds: [embed] });\n  await msg.react("👍");\n  await msg.react("👎");\nawait msg.reactions.cache.get("👍").remove();\n}\n});\n\nclient.login("token");\n\`\`\`` },
            { name: `Ejemplo de eliminar todas las reacciones de un mensaje`, value: `\`\`\`js\nconst Discord = require("discord.js");\nconst client = new Discord.Client();\n\nclient.on("message", async (message) => {\nif (message.content === "reaccion") {\n\nconst embed = new Discord.EmbedBuilder()\n  .setTitle("Reaccion")\n  .setDescription("Reaccion")\n  .setColor("RANDOM")\n  .setFooter({text: "Reaccion"});\n\nconst msg = await message.channel.send({ embeds: [embed] });\n  await msg.react("👍");\n  await msg.react("👎");\nawait msg.reactions.removeAll();\n}\n});\n\nclient.login("token");\n\`\`\`` },
          )
          .setColor("Random")
          .setFooter({ text: `Las reacciones y su control en el mundo XD` })], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes(`sixteenth_option`)) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`📝 Presencias`)
          .setColor("Random")
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setDescription(`**Presencias** son las cosas que aparecen en la parte de abajo de tu perfil de discord`)
          .addFields(
            { name: `Como crear una presencia`, value: `\`\`\`js\nconst Discord = require('discord.js');\nconst client = new Discord.Client();\n\nclient.on('ready', () => {\n    client.user.setPresence({\n        activity: {\n            name: 'nombre de la actividad',\n            type: 'tipo de actividad',\n            url: 'url de la actividad'\n        },\n        status: 'estado'\n    });\n});\`\`\`` },
            { name: `Tipos de actividad`, value: `\`\`\`js\nPLAYING\nSTREAMING\nLISTENING\nWATCHING\`\`\`` },
            { name: `Estados`, value: `\`\`\`js\nonline\nidle\ndnd\`\`\`` },
            { name: `Como crear una presencia con un juego`, value: `\`\`\`js\nconst Discord = require('discord.js');\nconst client = new Discord.Client();\n\nclient.on('ready', () => {\n    client.user.setPresence({\n        activity: {\n            name: 'nombre del juego',\n            type: 'PLAYING'\n        },\n        status: 'online'\n    });\n});\`\`\`` },
            { name: `Como crear una presencia con un viendo`, value: `\`\`\`js\nconst Discord = require('discord.js');\nconst client = new Discord.Client();\n\nclient.on('ready', () => {\n    client.user.setPresence({\n        activity: {\n            name: 'nombre del video',\n            type: 'WATCHING'\n        },\n        status: 'online'\n    });\n});\`\`\`` },
            { name: `Como crear una presencia con un transmitiendo`, value: `\`\`\`js\nconst Discord = require('discord.js');\nconst client = new Discord.Client();\n\nclient.on('ready', () => {\n    client.user.setPresence({\n        activity: {\n            name: 'nombre del video',\n            type: 'STREAMING',\n            url: 'url del video'\n        },\n        status: 'online'\n    });\n});\`\`\`` },
            { name: `Como crear una presencia con un escuchando`, value: `\`\`\`js\nconst Discord = require('discord.js');\nconst client = new Discord.Client();\n\nclient.on('ready', () => {\n    client.user.setPresence({\n        activity: {\n            name: 'nombre de la cancion',\n            type: 'LISTENING'\n        },\n        status: 'online'\n    });\n});\`\`\`` },
            { name: `Como crear una presencia en Discord v13`, value: `\`\`\`js\nconst Discord = require('discord.js');\nconst client = new Discord.Client();\n\nclient.on('ready', () => {\n    client.user.setPresence({\n        activities: [{\n            name: 'nombre de la actividad',\n            type: 'tipo de actividad',\n            url: 'url de la actividad'\n        }],\n        status: 'estado'\n    });\n});\`\`\`` },
            { name: `Como crear presencias en Discord v14`, value: `\`\`\`js\nconst Discord = require('discord.js');\nconst { ActivityType } = require("discord.js");\nconst client = new Discord.Client();\n\nclient.on('ready', () => {\n    client.user.setActivity('nombre de la actividad', { type: 'ActivityType.(Tipo de actividad)' });\n});\`\`\`` },
            { name: `Notas Version`, value: `La documentacion se hiso con respecto a v13 si quieres v14 solo en vez del tipo de presencias en mayuscula ponlas minusculas :D.` }
          )
          .setFooter({ text: `Que son las presencias y com establecerlas en discord.js` })
          .setTimestamp()], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes(`seventeenth_option`)) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("📝 Uso de Canvas Basico")
          .setColor("Random")
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setDescription("*Canvas que es ? Crea una instancia de Canvas. Este método funciona tanto en Node.js como en los navegadores web, donde no hay un constructor de Canvas. (Consulte browser.jsla implementación que se ejecuta en los navegadores).*")
          .addFields(
            { name: `Como crear un canvas`, value: `\`\`\`js\nconst { createCanvas, loadImage } = require('canvas');\nconst canvas = createCanvas(700, 250);\nconst ctx = canvas.getContext('2d');\`\`\`` },
            { name: `Como crear un canvas con un fondo`, value: `\`\`\`js\nconst { createCanvas, loadImage } = require('canvas');\nconst canvas = createCanvas(700, 250);\nconst ctx = canvas.getContext('2d');\n\nloadImage('https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg').then((image) => {\n    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);\n});\`\`\`` },
            { name: `Como crear un canvas con un fondo y texto`, value: `\`\`\`js\nconst { createCanvas, loadImage } = require('canvas');\nconst canvas = createCanvas(700, 250);\nconst ctx = canvas.getContext('2d');\n\nloadImage('https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg').then((image) => {\n    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);\n\n    ctx.strokeStyle = '#74037b';\n    ctx.strokeRect(0, 0, canvas.width, canvas.height);\n\n    ctx.font = '28px sans-serif';\n    ctx.fillStyle = '#ffffff';\n    ctx.fillText('Hola Mundo', canvas.width / 2.5, canvas.height / 1.8);\n});\`\`\`` },
            { name: `Como crear un canvas con un fondo y texto con un color de fondo`, value: `\`\`\`js\nconst { createCanvas, loadImage } = require('canvas');\nconst canvas = createCanvas(700, 250);\nconst ctx = canvas.getContext('2d');\n\nloadImage('https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg').then((image) => {\n    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);\n\n    ctx.strokeStyle = '#74037b';\n    ctx.strokeRect(0, 0, canvas.width, canvas.height);\n\n    ctx.font = '28px sans-serif';\n    ctx.fillStyle = '#ffffff';\n    ctx.fillText('Hola Mundo', canvas.width / 2.5, canvas.height / 1.8);\n\n    ctx.beginPath();\n    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);\n    ctx.closePath();\n    ctx.clip();\n\n    const avatar = await loadImage(message.author.displayAvatarURL({ format: 'jpg' }));\n    ctx.drawImage(avatar, 25, 25, 200, 200);\n});\`\`\`` },
            { name: `Ejemplo Basico`, value: `\`\`\`js\nconst { createCanvas, loadImage } = require('canvas');\nconst canvas = createCanvas(700, 250);\nconst ctx = canvas.getContext('2d');\n\nloadImage('https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg').then((image) => {\n    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);\n\n    ctx.strokeStyle = '#74037b';\n    ctx.strokeRect(0, 0, canvas.width, canvas.height);\n\n    ctx.font = '28px sans-serif';\n    ctx.fillStyle = '#ffffff';\n    ctx.fillText('Hola Mundo', canvas.width / 2.5, canvas.height / 1.8);\n\n    ctx.beginPath();\n    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);\n    ctx.closePath();\n    ctx.clip();\n\n    const avatar = await loadImage(message.author.displayAvatarURL({ format: 'jpg' }));\n    ctx.drawImage(avatar, 25, 25, 200, 200);\n\n    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');\n\n    message.channel.send(attachment);\n});\`\`\`` }
          )
          .setTimestamp()
          .setFooter({text: `Cnavas Basico como Empezar`})], ephemeral: true 
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes("eighteenth_option")) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`Discord.js & Webhooks`)
          .setColor("Random")
          .setThumbnail(`https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg`)
          .setDescription(`Aqui podras encontrar tutoriales de como crear webhooks y como usarlos en discord.js`)
          .addFields(
            { name: `Como crear un webhook`, value: `\`\`\`js\nconst { WebhookClient } = require('discord.js');\nconst hook = new WebhookClient('ID', 'TOKEN');\n\nhook.send('Hola Mundo');\`\`\``},
            { name: `Para que sirve mandar mensaje por webhook`, value: `Para que puedas mandar mensajes por un webhook sin necesidad de tener un bot  en el servidor es bastante utilizado para bots de moderacion`},
            { name: `Como crear un webhook con un embed`, value: `\`\`\`js\nconst { WebhookClient } = require('discord.js');\nconst hook = new WebhookClient('ID', 'TOKEN');\n\nhook.send({\n    content: 'Hola Mundo',\n    embeds: [\n        {\n            title: 'Hola Mundo',\n            description: 'Hola Mundo',\n            color: 'RANDOM'\n        }\n    ]\n});\`\`\``},
            { name: `Como crear un webhook con un archivo`, value: `\`\`\`js\nconst { WebhookClient } = require('discord.js');\nconst hook = new WebhookClient('ID', 'TOKEN');\n\nhook.send({\n    content: 'Hola Mundo',\n    files: [\n        './archivo.txt'\n    ]\n});\`\`\``},
            { name: `Como crear un webhook con un archivo y un embed`, value: `\`\`\`js\nconst { WebhookClient } = require('discord.js');\nconst hook = new WebhookClient('ID', 'TOKEN');\n\nhook.send({\n    content: 'Hola Mundo',\n    files: [\n        './archivo.txt'\n    ],\n    embeds: [\n        {\n            title: 'Hola Mundo',\n            description: 'Hola Mundo',\n            color: 'RANDOM'\n        }\n    ]\n});\`\`\``},
            { name: `Como crear un webhook con un archivo y un embed y un avatar`, value: `\`\`\`js\nconst { WebhookClient } = require('discord.js');\nconst hook = new WebhookClient('ID', 'TOKEN');\n\nhook.send({\n    content: 'Hola Mundo',\n    files: [\n        './archivo.txt'\n    ],\n    embeds: [\n        {\n            title: 'Hola Mundo',\n            description: 'Hola Mundo',\n            color: 'RANDOM'\n        }\n    ],\n    avatarURL: 'https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg',\n    username: 'Hola Mundo'\n});\`\`\``},
            { name: `Como crear un webhook con un archivo y un embed y un avatar y un nombre`, value: `\`\`\`js\nconst { WebhookClient } = require('discord.js');\nconst hook = new WebhookClient('ID', 'TOKEN');\n\nhook.send({\n    content: 'Hola Mundo',\n    files: [\n        './archivo.txt'\n    ],\n    embeds: [\n        {\n            title: 'Hola Mundo',\n            description: 'Hola Mundo',\n            color: 'RANDOM'\n        }\n    ],\n    avatarURL: 'https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg',\n    username: 'Hola Mundo'\n});\`\`\``},
          )
          .setTimestamp()
          .setFooter({text: `Discord.js & Webhooks`})], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes("nineteenth_option")) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`Primer Comienzo en Java`)
          .setColor("Random")
          .setThumbnail(`https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg`)
          .setDescription(`*Java es un lenguaje de programación y una plataforma informática comercializada por primera vez por Sun Microsystems en 1995. Hay muchas aplicaciones y sitios web que no funcionarán a menos que tenga Java instalado y, en general, tener Java instalado abre más opciones cuando se navega por Internet.*`)
          .addFields(
            { name: `Primer Comienzo`, value: `\`\`\`java\npublic class HolaMundo {\n    public static void main(String[] args) {\n        System.out.println("Hola Mundo");\n    }\n}\`\`\``},
            { name: `Como compilar`, value: `Para compilar un archivo de java debes de tener instalado el JDK (Java Development Kit) y luego debes de abrir la consola de comandos y escribir el siguiente comando:\n\`\`\`java\njavac "Nombre del archivo".java\`\`\``},
            { name: `Como ejecutar`, value: `Para ejecutar un archivo de java debes de tener instalado el JDK (Java Development Kit) y luego debes de abrir la consola de comandos y escribir el siguiente comando:\n\`\`\`java\njava "Nombre del archivo"\`\`\``},
            { name: `Como empezar a codificar`, value:`\`\`\`java\npublic class HolaMundo {\n    public static void main(String[] args) {\n        System.out.println("Hola Mundo");\n    }\n}\`\`\``},
            { name: `Como crear un archivo`, value: `Para crear un archivo de java debes de tener instalado el JDK (Java Development Kit) y luego debes de abrir la consola de comandos y escribir el siguiente comando:\n\`\`\`java\nnotepad "Nombre del archivo".java\`\`\``},
            { name: `Como crear un archivo y un paquete`, value: `Para crear un archivo de java debes de tener instalado el JDK (Java Development Kit) y luego debes de abrir la consola de comandos y escribir el siguiente comando:\n\`\`\`java\nnotepad "Nombre del paquete"."Nombre del archivo".java\`\`\``},
            { name: `Ejemplo de un Paquete`, value: `\`\`\`java\npackage package_name;\n\npublic class main {\n    public static void main(String[] args) {\n        System.out.println("Código en un paquete");\n    }\n}\`\`\``},
            { name: `Constantes`, value: `Las constantes son valores que no cambian durante la ejecución del programa. Las constantes se declaran con la palabra clave final. Por ejemplo:\n\`\`\`java\npublic class Constantes {\n    public static void main(String[] args) {\n        final int NUMERO = 10;\n        System.out.println(NUMERO);\n    }\n}\`\`\``},
            { name: `Variables`, value: `Las variables son contenedores para almacenar datos. En Java, hay tres tipos de variables:\n\n* Variables locales: son variables declaradas dentro de un método, constructor o bloque.\n* Variables de instancia: son variables declaradas dentro de una clase, pero fuera de un método, constructor o bloque.\n* Variables de clase: son variables declaradas con la palabra clave static dentro de una clase, pero fuera de un método, constructor o bloque.\n\nPor ejemplo:\n\`\`\`java\npublic class Variables {\n    public static void main(String[] args) {\n        int numero = 10;\n        System.out.println(numero);\n    }\n}\`\`\``},
            { name: `Ejemplo de Codigo Java`, value: `\`\`\`java\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print("Ingresa tu nombre: ");\n        String nombre = scanner.nextLine();\n        System.out.println("Hola " + nombre);\n    }\n}\`\`\``},
          )
          .setTimestamp()
          .setFooter({text:`Como Empezar en Java desde 0`})], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Tutoriales] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    }
  },
};