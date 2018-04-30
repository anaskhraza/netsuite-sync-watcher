
module.exports = {
    // netsuite account number
    "account": "<%=account%>",
    // netsuite login
    "email": "<%=email%>",
    "password": "<%=password%>",
    // can leave this set to null if a default role is defined, otherwise specify netsuite role id here
    "role": "<%=role%>",
    // web services endpoint, e.g. https://webservices.na1.netsuite.com
    "endpoint": "<%=webserviceshost%>/services/NetSuitePort_2014_2",
    // internal id of the base folder to which we add files.
    // ... can override from the command line
    "folderid": "<%=folderid%>",

    "enableWatcher": "<%=enableWatcher%>",

    "watchPath": "<%=watchPath%>",

    "watchFiles": "<%=watchFiles%>",
    
    "unWatchedFiles": "<%=unWatchedFiles%>"

};