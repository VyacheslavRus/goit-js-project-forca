import bgImageUrl from './getBackgroundApi.js';

const setBackground = () => {
  bgImageUrl.getBackgroundApi('Kiev').then(data => console.log(data));
};

// setBackground();
