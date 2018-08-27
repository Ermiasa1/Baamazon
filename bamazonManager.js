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
  viewProducts();
});


function runApp(){
  inquirer.prompt([{
    type: "list",
    name: "Action",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End Session"]
  }]).then(function(ans){
  	if (ans.Action == "View Products for Sale") {	
    viewProducts();
  	} else if (ans.Action == "View Low Inventory") {
  		viewLowInventory();
  	}else if (ans.Action == "Add to Inventory") {
  		addToInventory();
  	}else if (ans.Action == "Add New Product") {
  		addNewProduct();
  	}else if (ans.Action == "End Session") {
  		console.log('Bye!');
  	}
  });
}


function viewProducts() {
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
  console.log('Viewing Low Inventory');

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

}; 

function restockDatabase(id, quantityAdded) {
    //update the database
    connection.query('SELECT * FROM products WHERE item_id = ' + id, function(error, response) {
        if (error) { console.log(error) };
        connection.query('UPDATE products SET stock_quantity = stock_quantity + ' + quantityAdded + ' WHERE item_id = ' + id);
        
        runApp();
    });
}; 

function addNewProduct() {
    inquirer.prompt([

        {
            name: "Name",
            type: "input",
            message: "What is the name of the product you wish to stock?"
        },
        {
            name: 'Department',
            type: 'input',
            message: "What department does this item belong in?"
        },
        {
            name: 'Price',
            type: 'input',
            message: "How much would you like this to cost?"
        },
        {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to add?"
        }

      ]).then(function (newProducts) {

               connection.query("INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES (?,?,?,?)",[newProducts.Name, newProducts.Department, newProducts.Price, newProducts.Quantity],
               function(err, res) {
                    if (err) throw err;
                    // Runs the prompt again, so the user can keep shopping.
                    console.log('Another item was added to the store.');
                    runApp();
             }); 

           }); 
         };  














