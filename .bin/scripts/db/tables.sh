#!/bin/bash
set -e

# DATABASE = "magician_bot"

# PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
# 	DROP TABLE guild
# EOSQL

# PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
# 	CREATE TABLE guild (
# 		VARCHAR card_drop_ch,
# 		VARCHAR id PRIMARY KEY NOT NULL,
# 	)
# EOSQL

DATABASE = "magician_api"

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
	DROP TABLE player
	DROP TABLE cards
	DROP TABLE decks
	DROP TABLE deck_cards
EOSQL

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
	CREATE TABLE player (
		INT bal NOT NULL DEFAULT '0',
		VARCHAR id NOT NULL PRIMARY KEY,
	)

	CREATE TABLE cards (
		VARCHAR name NOT NULL,
		VARCHAR	rarity NOT NULL,
		VARCHAR holder NOT NULL PRIMARY KEY,					
		FOREIGN KEY (holder) REFERENCES player(id),
	)

	CREATE TABLE decks (
		VARCHAR name NOT NULL,
		VARCHAR owner NOT NULL PRIMARY KEY,
		FOREIGN KEY (owner) REFERENCES player(id),
	)

	CREATE TABLE deck_card (
		VARCHAR card_name NOT NULL,
		VARCHAR deck_name NOT NULL,
		VARCHAR owner NOT NULL PRIMARY KEY,
		FOREIGN KEY (owner) REFERENCES player(id),
		FOREIGN KEY (card_name) REFERENCES cards(name),
		FOREIGN KEY (deck_name) REFERENCES decks(name),
	)
EOSQL

DATABASE = "ygo_api"

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
	DROP TABLE entry_card
	DROP TABLE entry_card_img
	DROP TABLE entry_card_set
	DROP TABLE entry_card_price
	DROP TABLE entry_card_stats
	DROP TABLE entry_card_format
EOSQL

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
	CREATE TABLE entry_card (
		VARCHAR name NOT NULL PRIMARY KEY,
		VARCHAR desc NOT NULL,
		VARCHAR race NOT NULL,
	)

	CREATE TABLE entry_card_img (
		VARCHAR card_name NOT NULL PRIMARY KEY,
		VARCHAR card_art NOT NULL,
		VARCHAR card_img NOT NULL,
		VARCHAR card_img_small NOT NULL,
		VARCHAR card_alt NOT NULL,
		VARCHAR card_alt_small NOT NULL,
	)

	CREATE TABLE entry_card_set (
		VARCHAR card_name NOT NULL PRIMARY KEY,
		VARCHAR set_name NOT NULL,
		VARCHAR	set_release NOT NULL,
		VARCHAR set_market NOT NULL,
	)

	CREATE TABLE entry_card_price (
		VARCHAR card_name NOT NULL PRIMARY KEY,
		VARCHAR market_name NOT NULL,
		VARCHAR market_uri NOT NULL,
		VARCHAR market_price NOT NULL,
	)
	
	CREATE TABLE entry_card_stats (
		VARCHAR card_name NOT NULL PRIMARY KEY,
		VARCHAR atk NOT NULL,
		VARCHAR	_level,
		VARCHAR	_lval,'
		VARCHAR _scale,
		VARCHAR	_def,
		VARCHAR _markers,
	)

	CREATE TABLE entry_card_format (
		VARCHAR card_name NOT NULL PRIMARY KEY,
		VARCHAR format NOT NULL,
		VARCHAR limited NOT NULL DEFAULT '0'
	)
EOSQL