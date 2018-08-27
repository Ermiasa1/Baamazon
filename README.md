# Baamazon
Node.js & MySQL
This is an Amazon-like storefront using Node.js and MySQL. The app takes in orders from customers and depletes stock from the store's inventory.Likewise on manager side, it provides a list of menue that allowes different actions.


1. bamazonCustomer.js 

  * It displays all the items available for sale that includes the ids, names, and prices of products for sale.
  * The app then prompts users with two messages.
           1, The first asks the ID of the product the customer would like to buy.
           2, The second message asks how many units of the product the customer would like to buy.
  * Once the customer has placed the order, the app checkes if the store has enough of the product to meet the customer's request.
  * If the store have enough of the product, it fulfills the customer's order.
  * If the store doesnn't have not enough of the product, the app would log a phrase like `Insufficient quantity!`.

2. bamazonManager.js
 
   This app lists a set of menu options:  

     - View Products for Sale
    
     - View Low Inventory
    
     - Add to Inventory
    
     - Add New Product

  * If a manager selects `View Products for Sale`, the app  lists every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it lists all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app displays a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it allows the manager to add a completely new product to the store.
  * If the manager selects End Session, it ends the session and doesn't go back to the menu.



  DEMO LINKS 
 
  The vidos are available on the link.
  <br>
  BamazonCustomer: <a href= " https://drive.google.com/open?id=1F920i_YPJm3HjIZ2-NVbvUyG2u2EEzyv">BamazonCustomer.js Vidio </a>
  <br>
  BamazonManager: <a href= " https://drive.google.com/open?id=1HR6LPChSslSDurvIYJBbytESVGwQXCsT ">BamazonManager.js Vidio</a>

