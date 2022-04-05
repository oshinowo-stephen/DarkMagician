#!/bin/bash
set -e

DATABASE="magician_main"

if [ "$RUST_ENV" != "production" ];
then
	PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
		DROP TABLE IF EXISTS player CASCADE;
		DROP TABLE IF EXISTS cards CASCADE;
		DROP TABLE IF EXISTS decks CASCADE;
		DROP TABLE IF EXISTS deck_cards CASCADE;
	EOSQL
fi

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
	CREATE TABLE IF NOT EXISTS player (
		bal INT NOT NULL DEFAULT '0',
		id VARCHAR NOT NULL PRIMARY KEY
	);

	CREATE TABLE IF NOT EXISTS cards (
		name VARCHAR NOT NULL PRIMARY KEY,
		rarity VARCHAR NOT NULL,
		holder VARCHAR NOT NULL,
		CONSTRAINT fk_holder FOREIGN KEY (holder) REFERENCES player(id)
	);

	CREATE TABLE IF NOT EXISTS decks (
		name VARCHAR NOT NULL PRIMARY KEY,
		owner VARCHAR NOT NULL,
		FOREIGN KEY (owner) REFERENCES player(id)
	);

	CREATE TABLE IF NOT EXISTS deck_card (
		card_name VARCHAR NOT NULL,
		deck_name VARCHAR NOT NULL,
		owner VARCHAR NOT NULL PRIMARY KEY,
		FOREIGN KEY (owner) REFERENCES player(id),
		FOREIGN KEY (card_name) REFERENCES cards(name),
		FOREIGN KEY (deck_name) REFERENCES decks(name)
	)
EOSQL

if [ "$RUST_ENV" != "production" ];
then
PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
	DROP TABLE IF EXISTS entry_card CASCADE;
	DROP TABLE IF EXISTS entry_card_img CASCADE;
	DROP TABLE IF EXISTS entry_card_set CASCADE;
	DROP TABLE IF EXISTS entry_card_price CASCADE;
	DROP TABLE IF EXISTS entry_card_format CASCADE;
EOSQL
fi

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
	CREATE TABLE IF NOT EXISTS entry_card (
		name VARCHAR NOT NULL PRIMARY KEY,
		card_desc VARCHAR NOT NULL,
		race VARCHAR NOT NULL,
		card_type VARCHAR NOT NULL,
		_atk INT,
		_def INT,
		_lvl INT,
		_lval INT,
		_scale INT,
		_markers VARCHAR
	);

	CREATE TABLE IF NOT EXISTS entry_card_img (
		card_name VARCHAR NOT NULL PRIMARY KEY,
		card_alt VARCHAR NOT NULL,
		card_img VARCHAR NOT NULL,
		card_img_small VARCHAR NOT NULL,
		FOREIGN KEY (card_name) REFERENCES entry_card(name)
	);

	CREATE TABLE IF NOT EXISTS entry_card_set (
		card_name VARCHAR NOT NULL PRIMARY KEY,
		set_name VARCHAR NOT NULL,
		set_release VARCHAR NOT NULL,
		set_market VARCHAR NOT NULL,
		FOREIGN KEY (card_name) REFERENCES entry_card(name)
	);

	CREATE TABLE IF NOT EXISTS entry_card_price (
		card_name VARCHAR NOT NULL PRIMARY KEY,
		market_name VARCHAR NOT NULL,
		market_uri VARCHAR NOT NULL,
		market_price VARCHAR NOT NULL,
		FOREIGN KEY (card_name) REFERENCES entry_card(name)
	);
	
	CREATE TABLE IF NOT EXISTS entry_card_format (
		card_name VARCHAR NOT NULL PRIMARY KEY,
		format VARCHAR NOT NULL,
		limited INT NOT NULL DEFAULT '0',
		FOREIGN KEY (card_name) REFERENCES entry_card(name)
	)
EOSQL