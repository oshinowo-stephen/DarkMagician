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
		DROP TABLE IF EXISTS entry_card CASCADE;
		DROP TABLE IF EXISTS entry_card_img CASCADE;
		DROP TABLE IF EXISTS entry_card_price CASCADE;
		DROP TABLE IF EXISTS entry_card_set CASCADE;
		DROP TABLE IF EXISTS entry_card_format CASCADE;
	EOSQL
fi

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE" <<-EOSQL
	CREATE TABLE IF NOT EXISTS entry_card (
		name VARCHAR NOT NULL PRIMARY KEY,
		card_desc VARCHAR NOT NULL,
		card_race VARCHAR NOT NULL,
		card_type VARCHAR NOT NULL,
		_atk INT,
		_def INT,
		_lvl INT,
		_lval INT,
		_scale INT,
		_markers VARCHAR,
		_attribute VARCHAR,
		_archetype VARCHAR,
		_has_effect CHAR DEFAULT 'Y',
		_market_url VARCHAR
	);

	CREATE TABLE IF NOT EXISTS entry_card_format (
		card_name VARCHAR NOT NULL PRIMARY KEY,
		_goat_limit INT,
		_tcg_limit INT NOT NULL,
		_ocg_limit INT NOT NULL,
		_tcg_release VARCHAR NOT NULL,
		_ocg_release VARCHAR NOT NULL,
		_allowed_formats VARCHAR NOT NULL,
		FOREIGN KEY (card_name) REFERENCES entry_card (name)
	);

	CREATE TABLE IF NOT EXISTS entry_card_img (
		id VARCHAR PRIMARY KEY NOT NULL,
		card_name VARCHAR NOT NULL,
		card_img VARCHAR NOT NULL,
		card_img_small VARCHAR NOT NULL,
		FOREIGN KEY (card_name) REFERENCES entry_card(name)
	);

	CREATE TABLE IF NOT EXISTS entry_card_set (
		id VARCHAR PRIMARY KEY NOT NULL,
		card_name VARCHAR NOT NULL,
		set_name VARCHAR NOT NULL,
		set_market VARCHAR NOT NULL,
		FOREIGN KEY (card_name) REFERENCES entry_card(name)
	)
EOSQL
