NSW - NetSuite Simple Sync utility With Watcher
===============================================
All Credit goes to https://github.com/ExploreConsulting/netsuite-sync

I have just implement the watcher on it and remove the unneccessary validations from it
=============================================================================================================
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
all suitescripts in a single folder if possible or event multipile folder will worknpm adduser.

3. Generate a config file with the `-g` or `--gen-config` option
    nsw -g

Answer the prompts and supply the internal id of the destination folder you noted in step 1. This will generate both
the NetSuiteConfig file.

4. Upload a file


    nsw -u SomeScriptFile.js

5. Confirm the file is there in NetSuite.

# More Detail
Although generating a config with the `--gen-config` option is the easiest way to go, you can do it more
manually with steps described in this section.

## Create NetSuite Config
This tool uses SuiteTalk (NetSuite web services) to send files to the file cabinet. Hence it needs some configuration
connection info stored locally. This connection info is stored in a file named *NetSuiteConfig.js*

To generate a config file run with the `--gen-config` option:

    nsw -g

Answer the prompts. You can review the settings in the generated NetSuiteConfig.js file. You can also configure the watcher using this prompt



To help setup a new config file:

    nsw --geturl

## Upload a suitescript file to NS

    nsw -u filename
or


    nsw --upload filename


...pushes __filename__ to the NS file cabinet under the folder specified in _NetSuiteConfig.js_

## Upload a suitescript with watcher 

        nsw -w 


#### Development/Tech notes

First step: `npm install` to pull in all dependencies.

##### XML files
XML files under `/lib` named \<operation\>Template.xml are SOAP snippets representing the NetSuite web service _operation_

For example, _getTemplate.xml_ is the **get** operation as described in the NetSuite [wsdl](https://webservices.netsuite.com/wsdl/v2014_2_0/netsuite.wsdl).




