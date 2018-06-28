import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "teletubbies",
      type: "list",
      message: "Who is your favorite Teletubby?",
      choices: ["Tinky Winky", "Dipsy", "Laa-Laa", "Po"]
    }
  ])
  .then(() => {
    console.log("You are a deranged person!");
    process.exit(0);
  })
  .catch(e => {
    console.error("Something went wrong:", e);
    process.exit(1);
  });
