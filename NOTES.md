### Notes

- ***Statement*** = ***Declaração***

## Database:


- Install PostgreSQL in my PC

- **Ubuntu**: ***sudo apt install postgresql-18*** <!-- Install PostgreSQL 18 -->

- To check the installation: ***psql --version*** <!-- PostgreSQL 18.3 (Ubuntu) -->

- To Connect to Postgres Database: ***sudo -u postgres psql*** <!-- Conecta com o USUÁRIO 'postgres' -->

- To Connect to Another Database: ***sudo -u postgres psql -d <database_name>*** <!-- Conecta com o USUÁRIO 'postgres' no BANCO DE DADOS <database_name> -->

- To Create a Database: ***CREATE DATABASE mydatabase;*** <!-- Inside PSQL -->

- To Create a Table:
    > ***CREATE TABLE <table_name>(id TEXT NOT NULL PRIMARY KEY, name TEXT NOT NULL);*** <!-- Exemplo -->

- To Connect to a Database inside PSQL: ***\c <database_name>***

- To Check Connection with a Database inside PSQL: ***\c***

- To List ALL DATABASES inside PSQL: ***\l***

- To Get Variables Values inside PSQL: ***\set***

- To Exit Connection: ***\q*** <!-- Encerra a Conexão -->

## Config:

- DATABASE: ***postgres***
- HOST: ***localhost***
- PORT: ***5433***
- HOST: ***postgres***
- PASSWORD: ***'12345678'***

## PgAdmin 4:

- To Connect to a Database:

- Register > Server. 
- General > ServerName. 
- Connection > Host > Port > Username > Password

## Connection:

- Install **node-postgres**: ***npm install pg***

<!-- database.ts -->
- import { Pool } from "pg"

- const pool = await new Pool({ <!-- Creates a new Pool -->
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port,
            max: 10
        })

- await pool.query(<statement>, <params>) <!-- Create Connection, Execute a Statemente with Params and Close Connection -->