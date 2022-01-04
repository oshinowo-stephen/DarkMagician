#!/bin/bash

# INITIAL BIN SETUP FOR DARK MAGICIAN GENERAL USE.

## checking for node...
node -v > /dev/null
if [ $? != 0 ]; then
	echo "Node.JS not found, please install..."

	exit 1
fi

## checking for python...
python --version > /dev/null
if [ $? != 0 ]; then
	echo "Python not found, please install..."

	exit 1
fi

## checking for rust...
cargo --version > /dev/null && rustc --version > /dev/null
if [ $? != 0 ]; then
	echo "Rust not found, please install..."	

	exit 1
fi

## checking for psql...
psql --version > /dev/null
if [ $? != 0 ]; then
	sudo apt update
	if [ $? != 0 ]; then
		sudo pacman -S postgresql
		if [ $? != 0 ]; then
			echo "PostgreSQL is now installed, will resume with initial script..."
		else
			sudo zypper \n 
				postgresql \n
				postgresql-server \n
				postgresql-contrib
			if [ $? != 0 ]; then
				echo "Couldn't assume local package manager, please install manually..."
			fi
		fi
	else
		sudo apt install postgresql postgresql-contrib	

		echo "PostgreSQL is now installed, will resume with initial script..."
	fi	
fi

echo "Setting up database permissions..."
chmod +x ./.bin/database/perms.sh

echo "Setting up database tables..."
chmod +x ./.bin/database/tables.sh

echo "Running database permission script..."
./bin/database/perms.sh

echo "Running database tables script..."
./bin/database/tables.sh