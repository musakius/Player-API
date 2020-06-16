function duration(sec) {
  let min = Math.floor(sec / 60);
  sec = Math.floor(sec % 60);
  if (sec.toString().length == 1) sec = "0" + sec;
  if (min.toString().length == 1) min = "0" + min;
  let result = min + ":" + sec;
  return result;
}
