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
    <div className="flex flex-col items-center">
      <span className="text-red-400 my-8">No grades were found.</span>
      <div>
        <h1 className="font-semibold text-lg mb-2">Option 1</h1>
        <div className="flex flex-row flex-grow justify-center border border-white p-8 max-w-max">
          <input
            type="file"
            name="file"
            accept=".json"
            onChange={changeHandler}
            className="border-l border-t border-b border-indigo-300 h-10 leading-10 placeholder-gray-500"
          />
          <div className="h-10">
            <button
              className="h-10 border border-indigo-300 bg-indigo-700 p-2"
              onClick={handleFileUpload}
            >
              Upload grades...
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="font-semibold text-lg mb-2">Option 2</h1>
        <button
          className="border border-indigo-300 bg-indigo-700 p-2"
          onClick={loadDefaultGradesTemplate}
        >
          Start from scratch...
        </button>
      </div>
    </div>
  );
};

export default Uploader;
