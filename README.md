npm i @trineshl/jsutility
---------------------------
code snippet:
---------------------------

import JSUtility from 'jsutility';

var LTemp = 'Some data';

//This must returns false, because LTemp has a data

console.log(JSUtility.isEmpty(LTemp));

//Clearing temp variable

LTemp = null;

//Now this will return true, as its empty

console.log(JSUtility.isEmpty(LTemp));
