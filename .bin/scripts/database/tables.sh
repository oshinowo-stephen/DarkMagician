#!/bin/bash
set -e

# pulling down tables

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
EOSQL

# pulling up tables

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	-- CREATING API TABLES
	CREATE TABLE user (
		VARCHAR id NOT NULL PRIMARY KEY,
		INT bal NOT NULL DEFAULT '0',
	);
	
	CREATE TABLE deck_list (
		VARCHAR id NOT NULL PRIMARY KEY,
		VARCHAR name NOT NULL,
		VARCHAR owner NOT NULL,
	);

	CREATE TABLE api_card ();

	-- CREATING BOT TABLES

	-- CREATING WRAPPER TABLES
	CREATE TABLE raw_card (
		VARCHAR name NOT NULL PRIMARY KEY,
		VARCHAR desc NOT NULL,
		INT atk,
		INT def,
		INT lvl,
		INT scale,
		INT link_val,
		VARCHAR img NOT NULL,
		VARCHAR race NOT NULL,
		VARCHAR archetype,
		VARCHAR	o_type
	);

	CREATE TABLE card_market_info (
		VARCHAR id NOT NULL PRIMARY KEY,
		VARCHAR market_name NOT NULL,
		VARCHAR direct_uri NOT NULL,
		INT price NOT NULL,
		VARCHAR card_name NOT NULL FOREIGN KEY REFERENCES raw_card(name)
	);
EOSQL
