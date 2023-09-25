function getLoadingCard() {
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

export function showLoadingCard(event) {
  const button = event.target;
  const card = button.closest('.product');
  if (!card) return;

  const loadingCard = getLoadingCard();
  card.appendChild(loadingCard);
}