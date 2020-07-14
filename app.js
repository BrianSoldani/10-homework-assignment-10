const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];

// Array of questions for user
inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager's name?",
        name: "name"
      },
      {
        type: "input",
        message: "What is your manager's id?",
        name: "id"
      },
      {
        type: "input",
        message: "What is your manager's email?",
        name: "email"
      },
      {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber"
      }
    ])
    // Creates and stores instance of Manager to teamArray
    .then((response) => {
      const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
      teamArray.push(manager);
      createEmployee();
    });

function createEmployee() {
  return inquirer
          .prompt([{
            type: "list",
            message: "Which type of team member would you like to add?",
            name: "team",
            choices: ["Engineer", "Intern", "No more"]
          }])
          .then(result => {
            console.log(result);
            switch (result.team) {
              case "Engineer":
                return inquirer
                        .prompt([
                            {
                              type: "input",
                              message: "What is your Engineer's name?",
                              name: "name"
                            },
                            {
                              type: "input",
                              message: "What is your Engineer's id?",
                              name: "id"
                            },
                            {
                              type: "input",
                              message: "What is your Engineer's email?",
                              name: "email"
                            },
                            {
                              type: "input",
                              message: "What is your Engineer's GitHub?",
                              name: "github"
                            }
                          ])
                          // Creates and stores instance of Engineer to teamArray
                          .then((response) => {
                            const engineer = new Engineer(response.name, response.id, response.email, response.github);
                            teamArray.push(engineer);
                            createEmployee();
                        });
                    break;
              case "Intern":
                return inquirer
                        .prompt([
                            {
                              type: "input",
                              message: "What is your Intern's name?",
                              name: "name"
                            },
                            {
                              type: "input",
                              message: "What is your Intern's id?",
                              name: "id"
                            },
                            {
                              type: "input",
                              message: "What is your Intern's email?",
                              name: "email"
                            },
                            {
                              type: "input",
                              message: "What is your Intern's School?",
                              name: "school"
                            }
                          ])
                          // Creates and stores instance of Intern to teamArray
                          .then((response) => {
                            const intern = new Intern(response.name, response.id, response.email, response.school);
                            teamArray.push(intern);
                            createEmployee();
                        });
                    break;
              case "No more":
                // When there are no other employees to input, create html with teamArray content
                writeTeamHtml() 
                    break;
            }
          });
}


function writeTeamHtml() {
  // Write html file based on the teamArray contents
  fs.writeFile(outputPath, render(teamArray), (err) => {
    if (err) throw err;
  });
}
  

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```