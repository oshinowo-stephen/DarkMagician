import dotenv from 'dotenv'
import secrets from 'docker-secret-env'

if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
} else {
	secrets.load()
}
