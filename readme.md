1. Clone a project
2. Type ``` cd ``` command to enter inside folder
3. Type ``` composer install ``` in terminal to install required packages
3. Copy and Paste ".env.example" to ".env"
4. Create database in MySQL
5. Change .env file and set database configs: DB_DATABASE, DB_USERNAME, DB_PASSWORD
6. Then run command ``` php artisan key:generate ```
6. Then run command ``` php artisan migrate ``` in terminal
