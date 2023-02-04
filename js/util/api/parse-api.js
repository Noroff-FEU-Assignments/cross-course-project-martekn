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
