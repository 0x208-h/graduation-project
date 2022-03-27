export function isCanClear(val: any) {
  return (
    val === "" ||
    val === undefined ||
    val !== val ||
    val === null ||
    (Array.isArray(val) && val.length === 0)
  );
}
export const queryClean = (query: any) => {
  const _query = { ...query };
  for (const k in _query) {
    if (_query.hasOwnProperty(k) && isCanClear(query[k])) {
      delete _query[k];
    }
  }

  return _query;
};
