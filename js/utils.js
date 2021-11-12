const fetchData = async (url) => {
  const response = await fetch(url);
  if (response.status <= 299 && response.status >= 200) {
    const data = await response.json();
    return data;
  }
  return;
};

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const get = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  } else {
    throw new Error(`no element,check "${selection}"  selection`);
  }
};

export { fetchData, formatNumber, get };
