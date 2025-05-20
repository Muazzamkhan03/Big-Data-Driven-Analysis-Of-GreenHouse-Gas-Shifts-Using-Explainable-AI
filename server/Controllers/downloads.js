const DownloadableFile = require('../Models/DownloadableFile');

const getDownloadUrl = async (req, res) => {
    const { gas, country } = req.query;

    if (!gas || !country) {
        return res.status(400).json({ success: false, error: "Missing gas or country parameter" });
    }

    try {
        // Find file in database
        const file = await DownloadableFile.findOne({
            gas: gas.toLowerCase(),
            country: country.toLowerCase()
        });

        if (!file) {
            return res.status(404).json({ success: false, error: "File not found for given gas and country" });
        }

        // Return download URL
        res.json({ success: true, url: file.url });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ success: false, error: "Internal server error occured" });
    }
}

const addNewFile = async (req, res) => {
    /* Takes the data in the following format
    {
        country: PAK,
        gas: CO2,
        url: test.com,
        fileName: pak_co2.zip 
    }
    */

    try {
        const newFile = new DownloadableFile(req.body);

        await newFile.save();

        // Return download URL
        res.json({ success: true, file: newFile });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ success: false, error: "Internal server error occured" });
    }

}

module.exports = { getDownloadUrl, addNewFile };