export const extrairPublicId = (url) => {
  const match = url.match(/\/v1\/images\/(.+?)\./);
  return match ? match[1] : url;
};
