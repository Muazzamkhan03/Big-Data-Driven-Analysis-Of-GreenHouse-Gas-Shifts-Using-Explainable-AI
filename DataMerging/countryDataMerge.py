import os
import pandas as pd

# The root path
root_dir = "./extractedData"  

# Extract the name of the root directory for dynamic naming
root_dir_name = os.path.basename(os.path.abspath(root_dir))

# Initialize global-level lists to store data from all countries
global_emissions_sources_data = []
global_country_emissions_data = []

# Iterate through each country folder
for country in os.listdir(root_dir):

    country_path = os.path.join(root_dir, country)

    if os.path.isdir(country_path + "/DATA"):  # Ensure it's a directory

        # File paths for country-level merged files
        country_emissions_sources_file = os.path.join(country_path + "/DATA", f"{country}_emissions_sources.csv")
        country_country_emissions_file = os.path.join(country_path + "/DATA", f"{country}_country_emissions.csv")

        # Read country-level emissions sources if it exists
        if os.path.exists(country_emissions_sources_file):
            try:
                df = pd.read_csv(country_emissions_sources_file)
                global_emissions_sources_data.append(df)
            except Exception as e:
                print(f"Error reading file {country_emissions_sources_file}: {e}")

        # Read country-level country emissions if it exists
        if os.path.exists(country_country_emissions_file):
            try:
                df = pd.read_csv(country_country_emissions_file)
                global_country_emissions_data.append(df)
            except Exception as e:
                print(f"Error reading file {country_country_emissions_file}: {e}")

# Combine all country-level emissions sources data globally
if global_emissions_sources_data:
    global_emissions_sources_combined = pd.concat(global_emissions_sources_data, ignore_index=True)
    global_emissions_sources_file = os.path.join(root_dir, f"{root_dir_name}_emissions_sources.csv")
    global_emissions_sources_combined.to_csv(global_emissions_sources_file, index=False)
    print(f"Created: {global_emissions_sources_file}")

# Combine all country-level country emissions data globally
if global_country_emissions_data:
    global_country_emissions_combined = pd.concat(global_country_emissions_data, ignore_index=True)
    global_country_emissions_file = os.path.join(root_dir, f"{root_dir_name}_country_emissions.csv")
    global_country_emissions_combined.to_csv(global_country_emissions_file, index=False)
    print(f"Created: {global_country_emissions_file}")
