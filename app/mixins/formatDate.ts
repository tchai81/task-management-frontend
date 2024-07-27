const formatDate = (dateString: string | null) => {
  if (!dateString) {
    return;
  }
  return new Date(dateString).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default formatDate;
