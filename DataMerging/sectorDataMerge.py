import os
import pandas as pd

# The root path
root_dir = "./extractedData" 

# Iterate through each country folder
for country in os.listdir(root_dir):

    country_path = os.path.join(root_dir, country)

    if os.path.isdir(country_path):  # Ensure it's a directory

        print("Inside country => " + country_path)

        # Initialize lists to store country-level data
        country_emissions_data = []
        emissions_sources_data = []

        # Iterate through each sector folder
        for sector in os.listdir(country_path + '/DATA'):

            sector_path = os.path.join(country_path + '/DATA', sector)

            if os.path.isdir(sector_path):  # Ensure it's a directory

                print("Inside sector => " + sector_path)
                
                # File paths for the sub-sectors merged data
                sector_emissions_sources_file = os.path.join(sector_path, f"{sector}_emissions_sources_merged.xlsx")
                sector_country_emissions_file = os.path.join(sector_path, f"{sector}_country_emissions_merged.xlsx")

                # Read merged sub-sectors emissions sources if it exists
                if os.path.exists(sector_emissions_sources_file):
                    try:
                        df = pd.read_excel(sector_emissions_sources_file)
                        emissions_sources_data.append(df)
                    except Exception as e:
                        print(f"Error reading file {sector_emissions_sources_file}: {e}")

                # Read merged sub-sectors country emissions if it exists
                if os.path.exists(sector_country_emissions_file):
                    try:
                        df = pd.read_excel(sector_country_emissions_file)
                        country_emissions_data.append(df)
                    except Exception as e:
                        print(f"Error reading file {sector_country_emissions_file}: {e}")

        # Combining all sector-level emissions sources for the country
        if emissions_sources_data:
            country_emissions_sources_combined = pd.concat(emissions_sources_data, ignore_index=True)
            country_emissions_sources_file = os.path.join(
                country_path + '/DATA', f"{country}_emissions_sources.xlsx"
            )
            country_emissions_sources_file = country_emissions_sources_file.replace('.xlsx', '.csv')
            country_emissions_sources_combined.to_csv(country_emissions_sources_file, index=False)
            print(f"Created: {country_emissions_sources_file}")

        # Combining all sector-level country emissions for the country
        if country_emissions_data:
            country_country_emissions_combined = pd.concat(country_emissions_data, ignore_index=True)
            country_country_emissions_file = os.path.join(
                country_path + '/DATA', f"{country}_country_emissions.xlsx"
            )
            country_country_emissions_file = country_country_emissions_file.replace('.xlsx', '.csv')
            country_country_emissions_combined.to_csv(country_country_emissions_file, index=False)
            print(f"Created: {country_country_emissions_file}")
        
        print(f"******** {country_path} Completed *******")
