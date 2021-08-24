import CONFIG from './config';

const API = {
  checkScoreAccuracy: async () => {
    let endpoint = `${CONFIG.SERVER_URL}/check/score-accuracy`;
    return await (await fetch(endpoint)).json();
  },
};

export default API;
