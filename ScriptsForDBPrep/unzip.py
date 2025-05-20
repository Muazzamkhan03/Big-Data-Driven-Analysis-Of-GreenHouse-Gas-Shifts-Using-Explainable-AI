import os
import zipfile

def unzip_all_files(folder_path):
    """
    Unzips all zip files in the given folder.

    Parameters:
        folder_path (str): The path to the folder containing zip files.
    """
    # Ensure the folder exists
    if not os.path.exists(folder_path):
        print(f"The folder {folder_path} does not exist.")
        return

    # List all files in the folder
    files = os.listdir(folder_path)

    # Process each file
    for file in files:
        if file.endswith('.zip'):
            zip_file_path = os.path.join(folder_path, file)
            output_folder = os.path.join(folder_path, file.replace('.zip', ''))

            # Create the output folder if it doesn't exist
            if not os.path.exists(output_folder):
                os.makedirs(output_folder)

            # Unzip the file
            try:
                with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
                    zip_ref.extractall(output_folder)
                print(f"Unzipped: {file} to {output_folder}")
            except zipfile.BadZipFile:
                print(f"Error: {file} is not a valid zip file.")
            except Exception as e:
                print(f"An error occurred with {file}: {e}")

if __name__ == "__main__":
    # Replace this with your folder path
    folder_path = "./zips"
    unzip_all_files(folder_path)
