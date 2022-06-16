#!/bin/bash
set -e

USER="magician"
DATABASE="mg_raw"
DATABASE_USER="${DATABASE}_user"
READONLY=${READONLY_ROLE}

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
		DROP TABLE IF EXISTS entry_card_set CASCADE;
		DROP TABLE IF EXISTS entry_card_price CASCADE;
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
		_has_effect CHAR DEFAULT 'Y'
	);

	CREATE TABLE IF NOT EXISTS entry_card_format (
		card_name VARCHAR NOT NULL PRIMARY KEY,
		_tcg_limit INT NOT NULL,
		_ocg_limit INT NOT NULL,
		_goat_limit INT NOT NULL,
		_tcg_release VARCHAR NOT NULL,
		_ocg_release VARCHAR NOT NULL,
		FOREIGN KEY (card_name) REFERENCES entry_card (name)
	);

	CREATE TABLE IF NOT EXISTS entry_card_img (
		card_name VARCHAR NOT NULL,
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
	)
EOSQL