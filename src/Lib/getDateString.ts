// Ref. https://gist.github.com/ntuaha/f4b16ad377505a8519c7
//      https://stackoverflow.com/a/45592550

const pad = (v: number) => {
  return v < 10 ? "0" + v : v;
};

export const getDateString = (d: Date) => {
  let str = "";

  const yyyy = d.getFullYear().toString();
  const mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
  const dd = d.getDate().toString();
  const hour = pad(d.getHours());
  const min = pad(d.getMinutes());
  const sec = pad(d.getSeconds());

  str += `${yyyy}-${mm[1] ? mm : "0" + mm[0]}-${dd[1] ? dd : "0" + dd[0]}`;
  str += ` ${hour}:${min}:${sec}`;

  return str;
};
