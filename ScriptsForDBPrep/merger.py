import os
import pandas as pd

def merge_csv_files(folder_path, output_file):
    """
    Merges all CSV files in a given folder into one CSV file.

    Parameters:
        folder_path (str): The path to the folder containing the CSV files.
        output_file (str): The name of the output file.
    """
    # Ensure the folder exists
    if not os.path.exists(folder_path):
        print(f"The folder {folder_path} does not exist.")
        return

    # List all CSV files in the folder
    files = [f for f in os.listdir(folder_path) if f.endswith('.csv')]

    if not files:
        print(f"No CSV files found in {folder_path}.")
        return

    print(f"Found {len(files)} CSV files. Merging...")

    # Initialize an empty list to store dataframes
    dataframes = []

    # Read each file and append to the list
    for file in files:
        file_path = os.path.join(folder_path, file)
        try:
            df = pd.read_csv(file_path)
            dataframes.append(df)
            print(f"Loaded: {file}")
        except Exception as e:
            print(f"Error loading {file}: {e}")

    # Concatenate all dataframes
    merged_df = pd.concat(dataframes, ignore_index=True)

    # Save the merged dataframe to the output file
    try:
        merged_df.to_csv(output_file, index=False)
        print(f"Merged file saved as {output_file}")
    except Exception as e:
        print(f"Error saving merged file: {e}")

if __name__ == "__main__":
    # Replace these with your folder path and output file name
    folder_path = "./"
    output_file = "merged_ghg_emissions.csv"
    merge_csv_files(folder_path, output_file)
