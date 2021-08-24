import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
  SERVER_URL: process.env.REACT_APP_SERVER_URL,
};

export default CONFIG;
