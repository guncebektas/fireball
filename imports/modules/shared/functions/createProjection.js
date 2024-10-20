export const createProjection = (columns) => {
  const keys = columns.map(column => column.key);
  const projection = [];

  keys.forEach(key => {
    projection.push({
      [key]: 1
    });
  });

  return projection;
};
