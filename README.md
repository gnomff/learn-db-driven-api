# learn-db-driven-api
repo for learning how to set up a sql backed api

# Background

The purpose of this project is to get familiar with developing SQL backed APIs. To get started, run `docker run --name some-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=test -p5432:5432 -d postgres`
to start up your local postgres container.

then run `npm migrate`  
to execute the migration files against your database  

and finally  
`node index.js`  
will start up your server.

There are several important things to talk about. First, `flyway.conf` is where all of your connection information is stored. It looks like:  
```flyway.url=jdbc:postgresql://localhost:5432/test
flyway.user=postgres
flyway.password=password

flyway.locations=filesystem:migrations
flyway.schemas=dragons
```  

You'll notice that the connection info lines up with the database that you started earlier.  
`flyway.locations` tells flyway which directory your migration scripts are in, and `flyway.schemas` tells flyway which schema it should install itself into.  

When you run `npm migrate` for the first time, flyway will create a special table in the `dragons` schema, called `flyway_schema_history`. This is where it will keep track of which .sql files have been run and which ones haven't. Subsequent calls to `npm migrate` will check against that table and only run files which have not been run before.

Flyway will not let you change your migration files once they have been run. If you want to do that, you can call `npm clean` which will drop the `dragons` schema entirely. You can then run `npm migrate` again and the db will be populated with your new script.

# Project

The project is as follows. Create an API with the following endpoints:
```
POST /dragons - creates a new dragon {"name":<name>, "color":<color>, "spells": [spell ids], "wizard_id":<id>} wizard_id is optional
POST /wizard - creates a new wizard {"name":<name>, "dragons":[dragon ids], "spells":[spell ids]}
GET /dragons - lists all dragons - id, name, color and wizard master, if they have one
GET /wizard - lists all wizards - id, name, and the name/id/color of all the dragons they have
GET /dragon/:id - shows info for a specific dragon, including thier spell list and the name of thier wizard
GET /wizard/:id - shows info for a specific wizard, including thier spell list and thier list of dragons
```

There are three main entities - Dragons, Wizards and Spells.
Dragons can have one, and only one Wizard.  
Dragons can have any number of Spells.  
Wizards can have any number of Dragons.
Wizards can also have any number of Spells.  

Spell list:
```
magic missle (30 damage, arcane)
firebreath (40 damage, fire)
icebreath (35 damage, ice)
electricbreath (50 damage, electric)
```  
