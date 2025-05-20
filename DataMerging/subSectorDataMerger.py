import os
import pandas as pd

# The root path
root_dir = "./extractedData" 

# Iterating through each country folder
for country in os.listdir(root_dir):
    country_path = os.path.join(root_dir, country)

    if os.path.isdir(country_path):  # Ensuring it's a directory

        print("Inside country => " + country_path)
        
        # Iterating through each sector folder
        for sector in os.listdir(country_path + '/DATA'):
            sector_path = os.path.join(country_path  + '/DATA', sector)

            print("Inside sector => " + sector_path)

            if os.path.isdir(sector_path):  # Ensure it's a directory

                # Initializing lists to store dataframes for merging
                emissions_sources_data = []
                country_emissions_data = []

                # Iterating through files in the sector folder
                for file in os.listdir(sector_path):
                    file_path = os.path.join(sector_path, file)

                    if file.endswith("_emissions_sources.csv"):
                        # Read and append _emissions_sources data
                        df = pd.read_csv(file_path, low_memory=False)
                        emissions_sources_data.append(df)

                    elif file.endswith("_country_emissions.csv"):
                        # Read and append _country_emissions data
                        df = pd.read_csv(file_path, low_memory=False)
                        country_emissions_data.append(df)

                # Combine all _emissions_sources files
                if emissions_sources_data:
                    emissions_sources_combined = pd.concat(emissions_sources_data, ignore_index=True)
                    emissions_sources_file = os.path.join(
                        sector_path, f"{sector}_emissions_sources_merged.xlsx"
                    )
                    emissions_sources_combined.to_excel(emissions_sources_file, index=False)
                    print(f"Created: {emissions_sources_file}")

                # Combine all _country_emissions files
                if country_emissions_data:
                    country_emissions_combined = pd.concat(country_emissions_data, ignore_index=True)
                    country_emissions_file = os.path.join(
                        sector_path, f"{sector}_country_emissions_merged.xlsx"
                    )
                    country_emissions_combined.to_excel(country_emissions_file, index=False)
                    print(f"Created: {country_emissions_file}")

        print(f"******** {country_path} Completed *******")
