import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
  SERVER_URL: process.env.REACT_APP_SERVER_URL,
  GRADES_CONFIG_FILE: process.env.REACT_APP_GRADES_CONFIG_FILE,
};

export default CONFIG;
