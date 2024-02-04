#!/bin/bash
set -e

echo "Setting up deck_tables | environment"

USER="$USER"
DATABASE="${USER}_decks"
DATABASE_USER="${DATABASE}_user"

echo "Setting up deck_tables | generating tables"

if [ "$RUST_ENV" != "prod" ]; then
	PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="$DATABASE" <<-EOSQL
        DROP TABLE IF EXISTS deck_info CASCADE;
        DROP TABLE IF EXISTS deck_card CASCADE;
	EOSQL
fi

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username="$POSTGRES_USER" --dbname="$DATABASE" <<-EOSQL
    CREATE TABLE deck_info (
        name VARCHAR,
        deck_about VARCHAR,
        deck_format VARCHAR,
        id VARCHAR NOT NULL PRIMARY KEY,
        owner VARCHAR NOT NULL
    );

    CREATE TABLE deck_card (
        entry_id VARCHAR NOT NULL PRIMARY KEY,
        card_id INT NOT NULL,
        deck_id VARCHAR NOT NULL,
        copies INT NOT NULL DEFAULT '1'
    );
EOSQL
