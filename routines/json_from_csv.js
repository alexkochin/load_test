import papaparse from '../node_modules/papaparse/papaparse.js';

//const csvData = papaparse.parse(open('../test_data/small_example.csv'), { header: true });



export default function(){
let raw_json = '{"result":true, "count":42}'
let nfi_json = JSON.stringify(raw_json)
console.log(nfi_json)
}
