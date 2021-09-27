import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../hooks';
import { setGrades, setGradesLoaded } from '../../features/grades/gradesSlice';
import CONFIG from '../../config';

const Uploader = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState({});
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileContent, setFileContent] = useState({});

  function setFileContentAsJSON(event: ProgressEvent<FileReader>) {
    const json = JSON.parse(String(event?.target?.['result']) || '');
    const jsonMinified = JSON.stringify(json);
    setFileContent(jsonMinified);
  }

  const changeHandler = (event) => {
    const file = event.target['files'][0];
    setSelectedFile(file);
    const fileReader = new FileReader();
    fileReader.onload = setFileContentAsJSON;
    fileReader.readAsText(file);
    setIsFilePicked(true);
  };

  // TODO: this function should do the following:
  // - Read the uploaded file as a string
  // - Send the string as an URL parameter to the backend to instantiate a new Grades object and get the config in return
  // - Should handle failure when the config isn't valid and set states accordingly (alert and re-display component)
  // - Should handle successful response by calling the setGrades action so the uploader component isn't shown anymore
  const handleFileUpload = () => {
    if (!isFilePicked) return alert('Please select a file to upload.');
    // uploadedFileIsValid()
    console.log(selectedFile, typeof selectedFile);
    console.log('uploadGradesFile:', isFilePicked, selectedFile);
    console.log('fileContent:', fileContent);
  };

  const loadDefaultGradesTemplate = async () => {
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}/get-template`);
      const grades = await response.data;
      dispatch(setGrades(grades));
      dispatch(setGradesLoaded(true));
      localStorage.setItem('grades', JSON.stringify(grades));
    } catch (err) {
      console.log('Error fetching template...', err.message);
    }
  };

  return (
    <div>
      <span style={{ color: 'red' }}>No grades found.</span>
      <div>
        <div>
          <input
            type="file"
            name="file"
            accept=".json"
            onChange={changeHandler}
          />
          <div>
            <button onClick={handleFileUpload}>Upload grades...</button>
          </div>
        </div>
        <br />
      </div>
      <div>
        <button onClick={loadDefaultGradesTemplate}>
          Start from scratch...
        </button>
      </div>
    </div>
  );
};

export default Uploader;
