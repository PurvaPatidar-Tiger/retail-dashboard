ASSIGNMENT 2

"Create API endpoints using Flask"

1. Created virtual environment and activate it:
    $virtualenv venv --python=python3.9
    $source venv/bin/activate

2. Made 4 models and 4 resources.

3. To get the required information use the following endpoints:

    - To get total sales: "/sales"
    - To get total sales for a specific customer: "/sale/<string:username>"
    - To register the owner: "/owner"                           <!-- he/she have the authority to make changes in the database -->
    - To register the unique customer: "/customer"
    - To add new product in the shop: "/product"
    - To get average sale by date: "/avg-sales"
    - To get the total sale by date: "/total-sales"
