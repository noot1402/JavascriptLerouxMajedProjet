const fs = require('fs');
const Papa = require('papaparse');

const csvFilePath = 'C:\\Users\\noorm\\WebstormProjects\\javas\\csvfiles\\breast-cancer-wisconsin-data.csv'

// Function to read csv which returns a promise so you can do async / await.

const readCSV = async (filePath) => {
    const csvFile = fs.readFileSync(filePath)
    const csvData = csvFile.toString()
    return new Promise(resolve => {
        Papa.parse(csvData, {
            header: true,
            complete: results => {
                console.log('Complete', results.data.length,results.data, 'records.');
                resolve(results.data);
            }
        });
    });
};
const test = async () => {
    let parsedData = await readCSV(csvFilePath);
}

test()
