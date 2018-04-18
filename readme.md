NSW - NetSuite Simple Sync utility With Watcher
===============================================
Credit goes to https://github.com/ExploreConsulting/netsuite-sync

I have just implement the watcher on it and remove the unneccessary validations from it
==============================
This little utility uploads your suitescript files to the NetSuite file cabinet from the command line or as a
 menu item or button in your IDE.

The idea is it's much faster than to fiddling with the netsuite UI to repeatedly upload a code file you're developing.

# Installing

To install globally

    npm install -g netsuite-sync-watcher

The commandline program is named `nsw`

Get help with `nsw --help`

# Getting Started
This utility uploads files to a specific folder in your NetSuite file cabinet. We've found it a best practice to keep
all suitescripts in a single folder if possible.

3. Generate a config file with the `-g` or `--gen-config` option
    nsw -g

Answer the prompts and supply the internal id of the destination folder you noted in step 1. This will generate both
the encrypted and unencrypted NetSuiteConfig file.

4. Upload a file


    nsw -u SomeScriptFile.js

5. Confirm the file is there in NetSuite, then delete the plaintext NetSuiteConfig.js file.

# More Detail
Although generating a config with the `--gen-config` option is the easiest way to go, you can do it more
manually with steps described in this section.

## Create NetSuite Config
This tool uses SuiteTalk (NetSuite web services) to send files to the file cabinet. Hence it needs some configuration
connection info stored locally. This connection info is stored in a file named *NetSuiteConfig.js* which is encrypted
to *NetSuiteConfig.js.enc*

To generate a config file run with the `--gen-config` option:

    nsw -g

Answer the prompts. You can review the settings in the generated NetSuiteConfig.js file. Do remember to delete this file
after you've confirmed it works (e.g. after you've successfully uploaded a file). Only NetSuiteConfig.js.enc is needed at
runtime.

You can manually encrypt a NetSuiteConfig.js file with the `--encrypt` option.

Fill out your plaintext NetSuiteConfig.js file, then encrypt it:

    nsw --encrypt-config

Then delete your plaintext NetSuiteConfig.js

If you ever need to check the config, use --decrypt-config:

    nsw --decrypt-config

To help setup a new config file:

    nsw --geturl

## Upload a suitescript file to NS

    nsw -u filename
or


    nsw --upload filename


...pushes __filename__ to the NS file cabinet under the folder specified in _NetSuiteConfig.js_


#### Development/Tech notes

First step: `npm install` to pull in all dependencies.



##### Debugging

The webstorm regular node debug session doesn't seem to support interactive programs. So, launch the program in a 
separate terminal window like:

    node --debug-brk=5858 ./nsw.js 
    
Then create a node _remote debug_ session using this port and run it.

To just spew debug messages to the console, define an environment variable before launching like:

    DEBUG=ns node ./nsw.js

##### XML files
XML files under `/lib` named \<operation\>Template.xml are SOAP snippets representing the NetSuite web service _operation_

For example, _getTemplate.xml_ is the **get** operation as described in the NetSuite [wsdl](https://webservices.netsuite.com/wsdl/v2014_2_0/netsuite.wsdl).




