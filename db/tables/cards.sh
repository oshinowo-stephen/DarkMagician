#!/bin/bash
set -e

echo "Setting up card_tables | environment"

USER="$USER"
DATABASE="${USER}_cards"
DATABASE_USER="${DATABASE}_user"

echo "Setting up card_tables | generating tables"

if [ "$RUST_ENV" != "prod" ]; then
	PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="$DATABASE" <<-EOSQL
		DROP TABLE IF EXISTS card_info CASCADE;
        DROP TABLE IF EXISTS card_img_info CASCADE;
        DROP TABLE IF EXISTS card_set_info CASCADE;
        DROP TABLE IF EXISTS card_format_info CASCADE;
	EOSQL
fi

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username="$POSTGRES_USER" --dbname="$DATABASE" <<-EOSQL
    CREATE TABLE card_info (
        id INT NOT NULL PRIMARY KEY,
        atk INT,
        def INT,
        lvl INT,
        lval INT,
        scale INT,
        effect INT,
        markers VARCHAR,
        attribute VARCHAR,
        archetype VARCHAR,
        market_url VARCHAR,
        card_type VARCHAR NOT NULL,
        card_race VARCHAR NOT NULL,
        card_desc VARCHAR NOT NULL,
        name VARCHAR NOT NULL UNIQUE
    );

    CREATE TABLE card_img_info (
        id VARCHAR NOT NULL PRIMARY KEY,
        img_url_small VARCHAR,
        img_url VARCHAR NOT NULL,        
        card_name VARCHAR NOT NULL,
        FOREIGN KEY (card_name) REFERENCES card_info (name)
    );

    CREATE TABLE card_set_info (
        id VARCHAR NOT NULL PRIMARY KEY,
        set_market_url VARCHAR, 
        set_name VARCHAR NOT NULL,
        card_name VARCHAR NOT NULL,
        FOREIGN KEY (card_name) REFERENCES card_info (name)
    );

    CREATE TABLE card_format_info (
        tcg_limit VARCHAR,
        ocg_limit VARCHAR,
        goat_limit VARCHAR,
        tcg_release VARCHAR,
        ocg_release VARCHAR,
        allowed_formats VARCHAR,
        card_name VARCHAR NOT NULL PRIMARY KEY,
        FOREIGN KEY (card_name) REFERENCES card_info (name)
    )
EOSQL