let url = "https://martekn.com/noroff/gamehub/wp-json/wc/v3";
const consumerKey = "consumer_key=ck_2d8c91c030c68ff6af93c2a2f6d4d685d9c65025";
const consumerSecret = "consumer_secret=cs_eee8df559ab31e03d7db64b7041fd94f2a745c93";

export const fetchApiResults = async (endpoint, query) => {
  if (endpoint) {
    url += endpoint;
  }
  if (query) {
    url += `${query}&${consumerKey}&${consumerSecret}`;
  } else {
    url += `?${consumerKey}&${consumerSecret}`;
  }
  const req = await fetch(url);
  const res = await req.json();

  return res;
};
