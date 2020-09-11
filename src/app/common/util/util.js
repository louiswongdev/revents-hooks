export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getFileExtension(filename) {
  // return filename.split('.').pop()
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

// ""                            -->   ""
// "name"                        -->   ""
// "name.txt"                    -->   "txt"
// ".htpasswd"                   -->   ""
// "name.with.many.dots.myext"   -->   "myext"
