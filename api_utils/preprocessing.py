import numpy as np
from api_utils.utils import get_month_duration, get_default_lat_lon, get_subsectors

def preprocess_input(user_input, scaler_model, indexers):
    country = user_input.get('country')
    sector = user_input.get('sector')
    gas = user_input.get('gas')
    year = user_input.get('year')
    lat = user_input.get('lat')
    lon = user_input.get('lon')

    if lat is None or lon is None:
        lat, lon = get_default_lat_lon(country)

    subsectors = get_subsectors(sector)

    results = {}


    for subsector in subsectors:
        sequence = []
        for month in range(1, 13):
            duration = get_month_duration(year, month)
            month_sin = np.sin(2 * np.pi * month / 12)
            month_cos = np.cos(2 * np.pi * month / 12)

            # Encode categorical features
            iso3_country_index = indexers["iso3_country"].get(country, -1)
            sector_index = indexers["sector"].get(sector, -1)
            subsector_index = indexers["subsector"].get(subsector, -1)
            gas_index = indexers["gas"].get(gas, -1)

            # Scale continuous features
            features = np.array([[lat, lon, duration, year]], dtype=np.float64)
            scaled_features = (features - scaler_model["means"]) / scaler_model["stds"]

            # Combine all features
            timestep = [
                iso3_country_index,
                sector_index,
                subsector_index,
                gas_index,
                *scaled_features[0],
                month_sin,
                month_cos
            ]

            sequence.append(timestep)
        results[subsector] = np.array(sequence)
        
    return results