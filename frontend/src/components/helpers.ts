import axios from 'axios';
import FileSaver from 'file-saver';
import CONFIG from '../config';
import { gradesPostRequestBody } from '../types';

export const downloadTemplate = async (): Promise<void> => {
  try {
    const response = await axios.get(`${CONFIG.SERVER_URL}/get-template`);
    let data = await response.data;

    // Prettify JSON output with indentation of 2 spaces
    data = JSON.stringify(data, null, 2);

    // Save with JSON mime type and correct config file name
    const blob = new Blob([data], { type: 'application/json' });
    FileSaver.saveAs(blob, CONFIG.GRADES_CONFIG_FILE);
  } catch (err) {
    console.log('Error fetching template...', err.message);
  }
};

export const downloadGrades = async (grades: gradesPostRequestBody): Promise<void> => {
  // Prettify JSON output with indentation of 2 spaces
  const data = JSON.stringify(grades, null, 2);

  // Save with JSON mime type and correct config file name
  const blob = new Blob([data], { type: 'application/json' });
  FileSaver.saveAs(blob, CONFIG.GRADES_CONFIG_FILE);
};
