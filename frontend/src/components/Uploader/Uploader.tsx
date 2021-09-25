import React from 'react';
import axios from 'axios';
import {useAppDispatch} from '../../hooks';
import {setGrades, setGradesLoaded} from '../../features/grades/gradesSlice';
import CONFIG from '../../config';

const Uploader = (): JSX.Element => {
  const dispatch = useAppDispatch();

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
      <span style={{color: 'red'}}>No grades found.</span>
      <div>
        <button>Upload existing configuration file...</button>
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
