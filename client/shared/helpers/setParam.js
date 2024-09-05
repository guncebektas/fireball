/**
 * @param route {string}
 * @param params {{key: string, value: string}}
 * @return {string}
 */
export const setParam = (route, params) => {
  return route.replace(`:${params.key}`, params.value);
};
