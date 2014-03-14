### proxybro

CORS friendly HTTP API for proxying requests.

API Endpoint: **api/proxybro**

Accepted webform key:value pairs.

* **url**
    * {String} Where to send the request to.
    * Example: http://where.to.send.request.com/
* **method**
    * {String} Which HTTP method to use to send the url. Defaults to GET.
    * Example: GET || POST
* **headers**
    * {JSON} Header overrides for the outgoing request. Must be passed as serialized JSON.
    * Example: {"Fake-Header": "Yes"}
* **form**
    * {JSON} Form contents of the outgoing request. Must be passed as serialized JSON.
    * Example: {"someKey": "someValue"}

