export const formatDateTime = (date) => {
  const _date = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${_date} ${time}`;
};


// const dateString = ''
//     const date = new Date(dateString.replace(' ', 'T'));
//     const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}`;

