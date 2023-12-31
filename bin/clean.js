import { rm } from 'fs';

const removeList = ['./.astro/', './dist/', './test/artifacts', './test/report/'];

const removeItem = item => {
  rm(item, { force: true, recursive: true }, error => {
    if (error) console.error(error);
  });
};

removeList.forEach(item => removeItem(item));
