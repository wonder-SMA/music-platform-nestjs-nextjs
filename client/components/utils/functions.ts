export const getTrackProgress = (left: number, right: number): string => {
  const getTime = (secondAmount) => {
    const minutes = new Date(secondAmount * 1000).getMinutes();
    const seconds = new Date(secondAmount * 1000).getSeconds();
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  return `${getTime(left)} / ${getTime(right)}`;
};