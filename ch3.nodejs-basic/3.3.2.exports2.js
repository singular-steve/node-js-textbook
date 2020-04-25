import { odd, even } from '3.3.1.exports1';

const checkNumber = number => {
  if (number % 2) {
    return odd;
  } else {
    return even;
  }
};

export default checkNumber;