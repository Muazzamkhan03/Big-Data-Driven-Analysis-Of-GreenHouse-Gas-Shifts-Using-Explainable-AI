import json
import calendar

# Load mappings
with open("mappings/subsector_mapping.json", "r") as f:
    SUBSECTOR_MAPPING = json.load(f)

with open("mappings/default_lat_lon.json", "r") as f:
    DEFAULT_LAT_LON = json.load(f)

def get_subsectors(sector):
    return SUBSECTOR_MAPPING.get(sector, [])

def get_default_lat_lon(country):
    object = DEFAULT_LAT_LON.get(country, {'lat': 0, 'lon': 0})
    return (object['lat'], object['lon'])

def get_month_duration(year, month):
    return calendar.monthrange(year, month)[1]