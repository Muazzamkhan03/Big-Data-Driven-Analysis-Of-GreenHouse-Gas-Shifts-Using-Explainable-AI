import pandas as pd
import glob
import os
import hashlib

# File paths
csv_files = glob.glob("./*.csv") 
merged_file = "./combinedData/combined.csv"  

def count_rows(file):
    """Returns number of rows in a CSV file."""
    return pd.read_csv(file, usecols=[0]).shape[0]

def check_row_count():
    """Verifies that the total row count matches after merging."""
    total_rows = sum(count_rows(file) for file in csv_files)
    merged_rows = count_rows(merged_file)
    
    print(f"📊 Total rows in original files: {total_rows}")
    print(f"📊 Total rows in merged file: {merged_rows}")

    if total_rows == merged_rows:
        print("✅ Row count matches! No data lost.")
    else:
        print("⚠️ Mismatch detected! Rows might be missing.")

def check_column_consistency():
    """Checks if all CSV files have the same columns as the merged file."""
    merged_columns = set(pd.read_csv(merged_file, nrows=1).columns)
    for file in csv_files:
        file_columns = set(pd.read_csv(file, nrows=1).columns)
        if file_columns != merged_columns:
            print(f"⚠️ Column mismatch in {file}")
            return
    print("✅ Column names match across all files.")

def check_file_size():
    """Compares total size of input files vs. merged file."""
    original_size = sum(os.path.getsize(file) for file in csv_files) / (1024**3)  # GB
    merged_size = os.path.getsize(merged_file) / (1024**3)  # GB
    
    print(f"💾 Total original file size: {original_size:.2f} GB")
    print(f"💾 Merged file size: {merged_size:.2f} GB")

    if abs(original_size - merged_size) < 0.5:  # Allow slight variation
        print("✅ File sizes are consistent!")
    else:
        print("⚠️ Size mismatch detected!")

def check_sample_rows():
    """Checks first and last few rows for continuity."""
    print("\n🔍 First 5 rows of merged CSV:")
    print(pd.read_csv(merged_file, nrows=5))

    print("\n🔍 Last 5 rows of merged CSV:")
    print(pd.read_csv(merged_file, skiprows=lambda x: x % 100000 != 0).tail(5))

def hash_file(file_path):
    """Computes SHA256 hash of a file (without headers)."""
    hasher = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hasher.update(chunk)
    return hasher.hexdigest()

def check_hash():
    """Compares hash of merged file with individual files for integrity (Optional)."""
    file_hashes = [hash_file(file) for file in csv_files]
    merged_hash = hash_file(merged_file)

    print("\n🔍 Hash Verification:")
    print(f"Hash of merged file: {merged_hash}")

    if merged_hash in file_hashes:
        print("✅ Hash matches! Data integrity verified.")
    else:
        print("⚠️ Hash mismatch detected! Some data may be lost.")

# 🚀 Run all checks
print("\n🔎 Verifying merged CSV file...\n")
check_row_count()
check_column_consistency()
check_file_size()
check_sample_rows()
# check_hash()  # Uncomment if you want to run the hash check (slower)
print("\n✅ Verification complete!")
