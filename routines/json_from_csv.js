import papaparse from '../node_modules/papaparse/papaparse.js';

const csvData = papaparse.parse(open('../test_data/small_example.csv'), { header: true });
//console.log(JSON.stringify(csvData.data[0]))


export default function(){
let nfi_json = JSON.stringify(csvData.data[0])
return nfi_json
//console.log(nfi_json)
}
