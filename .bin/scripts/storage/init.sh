USER="magician"
DATABASE="${DATABASE}"
READONLY="${READONLY_ROLE}"
DATABASE_USER="${DATABASE}_user"

echo "database: ${DATABASE} is being built."

if [ "$RUST_ENV" != "prod" ]; then
	PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
		DROP DATABASE IF EXISTS $DATABASE;
	EOSQL
fi

PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE DATABASE $DATABASE;

	CREATE ROLE $DATABASE_USER;
	CREATE USER $USER WITH ENCRYPTED PASSWORD '$PASSW';

	GRANT $DATABASE_USER TO       $USER;
	GRANT $DATABSE_USER TO       	$READONLY;

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
