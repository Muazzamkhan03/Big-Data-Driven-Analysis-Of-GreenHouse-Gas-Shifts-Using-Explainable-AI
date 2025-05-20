import pandas as pd
import glob

# Get all CSV file paths
csv_files = glob.glob("./*.csv")

# Output file
output_file = "combined.csv"

# Read the first file (keep headers)
df = pd.read_csv(csv_files[0])
df.to_csv(output_file, index=False)

# Append remaining files in chunks
for file in csv_files[1:]:
    chunk_iter = pd.read_csv(file, chunksize=100000)  # Load in small chunks
    for chunk in chunk_iter:
        chunk.to_csv(output_file, mode="a", header=False, index=False)

print("✅ All CSV files merged efficiently without RAM issues.")
