## Getting started
First thing you need to compile the project if you haven't done it yet: 
```
    $ npm run tsc
```

## HoweWork #3    
Usage:
``` 
    $ node ./dist/utils/streams.js [options] 
```

Options:
```
    -h, --help      prints this message
    -a, --action    the action to perform     
    -f, --file      the file to perform action on
    -p, --path      path to *.css files to bundle
```  
Examples:
   * Notify user about wrong input and print a usage message (task #3):
   
     ```$ node ./dist/utils/streams.js```
   * Pipe the given file to process.stdout (task #4):
   
     ```$ node ./dist/utils/streams.js -f nodemon.json```
   * Convert data from process.stdin to upper-case data on process.stdout (task #5):
    
        ```$ cat nodemon.json | node ./dist/utils/streams.js -a transform```
   * Convert file from csv to json and output data to process.stdout (task #6):
   
        ```$ node ./dist/utils/streams.js -f data/FL_insurance_sample.csv -a transform-file```
   * Convert file from csv to json and output data to a result file with the same name but .json extension (task #7):
   
        ```$ node ./dist/utils/streams.js -f data/FL_insurance_sample.csv -a to-json-file```
   * Run cssBundler (task #8):
   
        ```$ node dist/utils/streams.js -a bundle-css -p ./data/assets/css```
   * Provide an ability to import this program as a module (task #2f)
   
        ```$ node dist/utils```                  
