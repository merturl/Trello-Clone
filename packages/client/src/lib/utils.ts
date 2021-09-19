export const move = <T>(array: Array<T>, from: number, to: number) => {
  var element = array[from];
  array.splice(from, 1);
  array.splice(to, 0, element);
};
