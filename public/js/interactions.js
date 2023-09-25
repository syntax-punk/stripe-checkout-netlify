export function getLoadingCard() {
  const loadingScreen = document.createElement('div');
  loadingScreen.classList.add('loading-screen');

  const dots = document.createElement('div');
  dots.classList.add('dots-loading');
  dots.appendChild(document.createElement('div'));
  dots.appendChild(document.createElement('div'));
  dots.appendChild(document.createElement('div'));

  loadingScreen.appendChild(dots);
  return loadingScreen;
}