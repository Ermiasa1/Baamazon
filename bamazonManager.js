//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "abc",
  database: "bamazon_db"
})

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts();
});


function runApp(){
  inquirer.prompt([{
    type: "list",
    name: "Action",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End Session"]
  }]).then(function(ans){
  	if (ans.action == "View Products for Sale") {
  		viewProducts();
  	}else if (ans.action == "View Low Inventory") {
  		viewLowInventory();
  	}else if (ans.action == "Add to Inventory") {
  		addToInventory();
  	}else if (ans.action == "Add New Product") {
  		addNewProduct();
  	}else (ans.action == "End Session") {
  		console.log('Bye!');
  	}
  });
}


function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
  	if(err) throw err;
  console.log('----------------------------------------------------------------------------------------------------')
    for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
    console.log('--------------------------------------------------------------------------------------------------')
    }     
runApp();
  });
}

//views inventory lower than 5
function viewLowInventory(){
  console.log('>>>>>>Viewing Low Inventory<<<<<<');

  connection.query('SELECT * FROM products', function(err, res){
  if(err) throw err;
  console.log('----------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    if(res[i].stock_quantity <= 5){
    console.log("ID: " + res[i].item_id + " | " + "product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
    console.log('--------------------------------------------------------------------------------------------------');
    }
  }

  runApp();
  });
}
     
function addToInventory(){
//gather data from user
    inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "What is the ID of the product you wish to restock?"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to add?"
        },
        ]).then(function(answers) {
        //set captured input as variables, pass variables as parameters.
        var quantityAdded = answers.Quantity;
        var idOfProduct = answers.ID;
        restockDatabase(idOfProduct, quantityAdded);
    });
}; //end restockRequest




}