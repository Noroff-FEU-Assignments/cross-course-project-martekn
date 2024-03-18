const baseUrl = "https://martekn.com/noroff/gamehub/wp-json/wc/v3";
const consumerKey = "consumer_key=ck_2d8c91c030c68ff6af93c2a2f6d4d685d9c65025";
const consumerSecret = "consumer_secret=cs_eee8df559ab31e03d7db64b7041fd94f2a745c93";

/**
 * Fetches the result from api
 * @param {String | null} [endpoint] - Endpoint starting with /
 * @param {String | null} [query] - Query starting with ?
 * @returns Result of the api call
 */
export const fetchApiResults = async (endpoint, query) => {
  let url = baseUrl;
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

/**
 * Turns String: "key: value, key: value ..." into Object
 * @param {String} string
 * @returns Object
 */
const multiValueToObject = (string) => {
  return Object.fromEntries(
    string.split(",").map((keyValuePair) =>
      keyValuePair
        .trim()
        .split(":")
        .map((value) => value.trim())
    )
  );
};

/**
 * Formats the meta_data to a more readable object format with key and values
 * @param {Object} game
 * @returns Object
 */
export const parseGameRes = (game) => {
  game.meta_data = Object.fromEntries(
    game.meta_data.map((object) => {
      return [object.key, object.value];
    })
  );

  game.meta_data.release_date = game.meta_data.release_date.split("-").reverse().join("-");
  if (game.meta_data.conditions) {
    game.meta_data.conditions = multiValueToObject(game.meta_data.conditions);
  }

  if (game.meta_data.meta_score) {
    game.meta_data.meta_score = multiValueToObject(game.meta_data.meta_score);
  }

  if (game.meta_data.min_system_requirements) {
    game.meta_data.min_system_requirements = multiValueToObject(game.meta_data.min_system_requirements);
  }

  if (game.meta_data.recommended_system_requirements) {
    game.meta_data.recommended_system_requirements = multiValueToObject(game.meta_data.recommended_system_requirements);
  }

  return game;
};
