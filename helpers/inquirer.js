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

const deleteTaskFromList = async (tasks = []) => {
  const choices = tasks.map((tarea, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0".green + "Cancelar",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirmAction = async (message = "") => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((tarea, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
      checked: tarea.completedIn ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pauseMenu,
  readInput,
  deleteTaskFromList,
  confirmAction,
  showCheckList,
};
