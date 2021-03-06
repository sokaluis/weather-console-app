require("colors");
const inquirer = require("inquirer");

const inquirerMenu = async () => {
  console.clear();
  console.log("=====================================".green);
  console.log("       Select an option below".white);
  console.log("=====================================\n".green);

  const optQuestions = [
    {
      type: "list",
      name: "option",
      message: "¿What do you want to do?",
      choices: [
        {
          value: 1,
          name: `${"1.".green} Search City`,
        },
        {
          value: 2,
          name: `${"2.".green} History`,
        },
        {
          value: 0,
          name: `${"3.".green} Exit`,
        },
      ],
    },
  ];

  const { option } = await inquirer.prompt(optQuestions);

  return option;
};

const pauseMenu = async () => {
  console.log("\n");

  const optPauseQuestions = [
    {
      type: "input",
      name: "option",
      message: `Press ${"ENTER".green} to continue`,
    },
  ];

  const { option } = await inquirer.prompt(optPauseQuestions);

  return option;
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingresa un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: place.id,
      name: `${idx}. ${place.name}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0".green + " Cancelar",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Select place",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

module.exports = {
  inquirerMenu,
  pauseMenu,
  readInput,
  listPlaces,
};
