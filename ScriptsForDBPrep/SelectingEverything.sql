SELECT countries.name AS country, sectors.name AS sector, sub_sectors.name AS subsector, start_time, end_time, gases.name AS gas, emission, year
FROM emissions 
JOIN countries ON countries.id = emissions.country_id
JOIN sub_sectors ON sub_sectors.id = emissions.subsector_id
JOIN sectors ON sub_sectors.sector_id = sectors.id
JOIN gases ON gases.id = emissions.gas_id
LIMIT 10;