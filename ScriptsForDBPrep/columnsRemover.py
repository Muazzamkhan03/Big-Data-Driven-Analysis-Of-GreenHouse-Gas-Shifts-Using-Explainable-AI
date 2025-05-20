import pandas as pd

def remove_columns(input_file, output_file, columns_to_remove):
    """
    Removes specified columns from a CSV file.

    Parameters:
        input_file (str): The path to the input CSV file.
        output_file (str): The path to save the updated CSV file.
        columns_to_remove (list): A list of column names to remove.
    """
    try:
        # Read the input CSV file
        df = pd.read_csv(input_file)
        print(f"Loaded {input_file}. Columns: {list(df.columns)}")

        # Remove the specified columns
        df = df.drop(columns=columns_to_remove, errors='ignore')
        print(f"Removed columns: {columns_to_remove}")

        # Save the updated dataframe to the output file
        df.to_csv(output_file, index=False)
        print(f"Updated file saved as {output_file}")
    except FileNotFoundError:
        print(f"File {input_file} not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    
    input_file = "merged_ghg_emissions.csv"
    output_file = "cleaned_ghg_emissions.csv"
    columns_to_remove = [
        "emissions_quantity_units",
        "temporal_granularity",
        "created_date",
        "modified_date",
    ]
    remove_columns(input_file, output_file, columns_to_remove)
