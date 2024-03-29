#!/bin/bash
set -e

USER="magician"
DATABASE="${DATABASE}"
DATABASE_USER="${DATABASE}_user"
READONLY=${READONLY_ROLE}

echo "tables for database: ${DATABASE} is getting built"

if [ -e /run/secrets/PG_DMG_PASSWORD ];
	then
		PASSW="$(< /run/secrets/PG_DMG_PASSWORD)"
else
	PASSW=${PG_DMG_PASSWORD}
fi

if [ "$RUST_ENV" != "prod" ];
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

	CREATE TABLE IF NOT EXISTS player_card (
		name VARCHAR NOT NULL PRIMARY KEY,
		rarity VARCHAR NOT NULL,
		holder VARCHAR NOT NULL,
		amount INT NOT NULL DEFAULT '0',	
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
		FOREIGN KEY (card_name) REFERENCES player_card(name),
		FOREIGN KEY (deck_name) REFERENCES decks(name)
	)
EOSQL

