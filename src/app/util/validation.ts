export const isValidTweetUrl = (value) => {
  return /^(http|https):\/\/twitter.com\/.*?\/status\/\d+$/.test(value);
};
