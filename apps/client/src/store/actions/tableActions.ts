export const UPDATE_TABLE = 'UPDATE_TABLE';

export const updateTable = (table: any) => ({
  type: UPDATE_TABLE as typeof UPDATE_TABLE,
  payload: table,
});
