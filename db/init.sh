# Only need to run once for the environemnt

#!/bin/bash
set -e

USER="$USER"
DATABASE="$USER"
DATABASE_USER="${DATABASE}_user"

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username="$POSTGRES_USER" --dbname="$DATABASE" <<-EOSQL
    CREATE DATABASE ${DATABASE}_cards;

    CREATE ROLE $DATABASE_USER;
    CREATE USER $USER WITH ENCRYPTED PASSWORD '$PASSW';

    GRANT $DATABASE_USER TO  $USER;

    REVOKE ALL ON DATABASE $DATABASE FROM PUBLIC;
    GRANT CONNECT ON DATABASE $DATABASE TO $DATABASE_USER;
EOSQL

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username="$POSTGRES_USER" --dbname="$DATABASE" <<-EOSQL
    CREATE DATABASE "$DATABASE"_decks;

    CREATE ROLE $DATABASE_USER;
    CREATE USER $USER WITH ENCRYPTED PASSWORD '$PASSW';

    GRANT $DATABASE_USER TO  $USER;

    REVOKE ALL ON DATABASE $DATABASE FROM PUBLIC;
    GRANT CONNECT ON DATABASE $DATABASE TO $DATABASE_USER;
EOSQL

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	REVOKE ALL ON SCHEMA public FROM PUBLIC;

	GRANT USAGE ON SCHEMA public TO $DATABASE_USER;
	ALTER DEFAULT PRIVILEGES IN SCHEMA public;
		GRANT USAGE, SELECT ON SEQUENCES TO $DATABASE_USER;
	
	ALTER DEFAULT PRIVILEGES IN SCHEMA public;
		GRANT SELECT ON TABLES TO $READONLY;
	
	ALTER DEFUALT PRIVILEGES IN SCHEMA public;
		GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO $USER;
EOSQL