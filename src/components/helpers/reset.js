export const reset = props => {
  setTimeout(() => console.log('Resetting for new client'), 500);
  setTimeout(() => props.history.push('/'), 1050);
}