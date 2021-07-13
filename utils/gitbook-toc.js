const fs = require('fs');
const toc = require('markdown-toc');
const uslug = require('uslug')

const fileToRead = process.argv[2]
const fileToWrite = fileToRead
const MAX_DEPTH = 3

// @begin promisifyin fs operations
const psReadFile = fileToRead => new Promise( function(resolve, reject) {
  fs.readFile(fileToRead, 'utf8', (error, contentFile) => {
    if (error) reject(error)
    resolve(contentFile)
  })

})

const psWriteFile = contentToWrite => 
new Promise(resolve => {
  fs.writeFile(fileToWrite, contentToWrite, error => {
    if (error) reject(error)
    resolve(`Results written succesfully`)
  })
})
// @end promisifyin fs operations

const customSlugParser = (headerDetected /*, optionsSlug */) => {
  const parsedHeader = headerDetected
    .replace(/html2react/g, 'html 2 react')
    .replace(/\./g, ' ')
    .replace(/[\[|\]]/g, ' ')
    .replace(/\<.*\>/g, '')
  
  const headerToWrite = uslug(parsedHeader)
  
  return headerToWrite
}

const parseMarkdownTOC = contentFile => {
  return toc.insert(contentFile, { 
    slugify: customSlugParser,
    maxdepth: MAX_DEPTH
  });
  
}


psReadFile(fileToRead)
  .then(parseMarkdownTOC)
  .then(psWriteFile)
  .then(console.log)
  .catch(console.log)