import logging
import requests
from os import environ
from dotenv import load_dotenv
from pypika import Query, Table, Field

load_dotenv()

resp = requests.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=Yes')

for card in resp.json()['data']:
	cards = Table('raw_card')
	q = Query.into(cards).insert()