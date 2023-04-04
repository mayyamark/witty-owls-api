# Witty owls api
An api for creating and reading posts. Users can comment on posts, give reactions and much more...

## Setup
- Add a `.env` file with the following variables:

| Environment Variable                | Description                                                                                                                                             |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POSTGRES_HOST      | Use `localhost`                                                                                                                 |
| POSTGRES_PORT       | Default value is `5432`                                                                         |
| POSTGRES_USERNAME  | Pick a username for your DB                         |
| POSTGRES_PASSWORD     | Pick a password for your DB                                                                                                                  |
| POSTGRES_DB | Name of your DB                         |
| PGADMIN_DEFAULT_EMAIL           | Pick a email for pgAdmin4                                                                                                             |
| PGADMIN_DEFAULT_PASSWORD     | Pick a password for pgAdmin                                                                                                                 |
| JWT_SECRET | A secret, used for generating JWT tokens                         |

- Install Docker Desktop
- In the root directory, run:
```sh
docker compose up
```
- In the root directory, run:
```sh
yarn install
```
- Run the application:
```sh
yarn start
```
- Access the application at  http://localhost:3000/graphql

### pgAdmin
- Access phpAdmin4 at http://localhost:5050/
- Use your pgAdmin credentials to log in
- Right click **Servers** > **Register** > **Server**
- In the **General** tab for the *Name* field, pick a name
- In the **Connection** tab
    - *Host* field
      - To see all running containers, run: 
        ```sh
        docker ps
        ```
      - Find the comtainer with `IMAGE = postgres` and copy its `CONTAINER ID` value
      - To get the host, run
        ```sh
        docker inspect <CONTAINER ID> | grep IPAddress
        ```
      - Copy the value and paste it in the *Host* field
    - *Port* - use the port, specified in `.env`
    - *Maintaince database* - pick `postgres`
    - *Username* and *Password* - the DB credentials from `.env`

## Available quieries and mutations
TODO