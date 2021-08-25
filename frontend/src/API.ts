import CONFIG from './config';

export interface checkScoreAccuracyResponse {
  ok: boolean;
  accuracy: {
    [module: string]: {
      actual: string;
      expected: string;
    };
  };
}

const API = {
  checkScoreAccuracy: async (): Promise<checkScoreAccuracyResponse> => {
    const endpoint = `${CONFIG.SERVER_URL}/check/score-accuracy`;
    return await (await fetch(endpoint)).json();
  },
};

export default API;
