import { pgp } from './database.connection';

export const buildFormattedWhere = (
  whereClause: ' AND ' | ' OR ',
  props: {
    [key: string]: any;
  }
) => ({
  rawType: true,
  toPostgres: () =>
    Object.keys(props)
      .map((key) => {
        const value = props[key];
        if (value === null || value === undefined) {
          return pgp.as.format('$1:name IS NULL', [key]);
        }
        return pgp.as.format('$1:name = $2', [key, value]);
      })
      .join(whereClause),
});
