import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../hooks';
import { setGrades, setGradesLoaded } from '../../features/grades/gradesSlice';
import CONFIG from '../../config';
import { gradesResponse } from '../../types';

const Uploader = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState({});
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileContent, setFileContent] = useState({});

  function setFileContentAsJSON(event: ProgressEvent<FileReader>) {
    const json = JSON.parse(String(event?.target?.['result']) || '');
    setFileContent(json);
  }

  const changeHandler = (event) => {
    const file = event.target['files'][0];
    setSelectedFile(file);
    const fileReader = new FileReader();
    fileReader.onload = setFileContentAsJSON;
    fileReader.readAsText(file);
    setIsFilePicked(true);
  };

  const handleFileUpload = async () => {
    if (!isFilePicked) return alert('Please select a file to upload.');

    try {
      const response = await axios.post(
        `${CONFIG.SERVER_URL}/validate-config`,
        fileContent
      );
      if (response.data.error) {
        alert(
          "The selected file couldn't be loaded successfully. Please try uploading a different file."
        );
      } else {
        const grades: gradesResponse = response.data.config.data;
        setStateGrades(grades);
      }
    } catch (error) {
      console.log('Error when uploading grades...', error.message);
    }
  };

  const loadDefaultGradesTemplate = async () => {
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}/get-template`);
      const grades: gradesResponse = await response.data;
      setStateGrades(grades);
    } catch (error) {
      console.log('Error fetching template...', error.message);
    }
  };

  const setStateGrades = (grades) => {
    dispatch(setGrades(grades));
    dispatch(setGradesLoaded(true));
    localStorage.setItem('grades', JSON.stringify(grades));
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
