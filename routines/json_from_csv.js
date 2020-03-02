import papaparse from '../node_modules/papaparse/papaparse.js';

const csvData = papaparse.parse(open('../test_data/small_example.csv'), { header: true });

export default function() {
  csvData.data.forEach(userPwdPair => {
    console.log(JSON.stringify(userPwdPair));
  });
}
