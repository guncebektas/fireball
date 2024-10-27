export const createProjection = (columns) => {
  const keys = columns.map(column => column.key);
  const projection = {};

  keys.forEach(key => {
    projection[key] = 1;
  });

  return {fields: projection};
};
