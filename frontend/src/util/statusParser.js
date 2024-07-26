export const statusParser = (status) => {
  switch (status) {
    case 400:
    case 500:
    case 503:
      return "error";
    case 403:
    case 404:
    case 409:
      return "warning";
    default:
      return "error";
  }
};
