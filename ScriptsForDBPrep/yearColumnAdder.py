import pandas as pd

def add_year_column(input_file, output_file):
    """
    Adds a 'year' column extracted from the 'start_time' column in a CSV file.

    Parameters:
        input_file (str): The path to the input CSV file.
        output_file (str): The path to save the updated CSV file.
    """
    try:
        # Read the input CSV file
        df = pd.read_csv(input_file)
        print(f"Loaded {input_file}. Columns: {list(df.columns)}")

        # Ensure 'start_time' column exists
        if 'start_time' not in df.columns:
            print("'start_time' column not found in the file.")
            return

        # Convert 'start_time' to datetime and extract the year
        df['year'] = pd.to_datetime(df['start_time'], format='%Y-%m-%d %H:%M:%S').dt.year
        print("Added 'year' column.")

        # Save the updated dataframe to the output file
        df.to_csv(output_file, index=False)
        print(f"Updated file saved as {output_file}")
    except FileNotFoundError:
        print(f"File {input_file} not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Replace these paths with your input and output file paths
    input_file = "cleaned_ghg_emissions.csv"
    output_file = "ghg_emissions_with_year.csv"
    add_year_column(input_file, output_file)
