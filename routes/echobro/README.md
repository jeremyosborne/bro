### echobro

CORS friendly HTTP API for echoing the HTTP request sent.

API Endpoint: [/api/echobro](/api/echobro)

Send any HTTP request that you would like. The server will respond with a dissected version of the request.

While this is designed to be an echo, the following query string key:value pairs will affect the output.

* **format**
    * {String} Format of the response data.
    * Accepted Values:
        * html
            * An entire HTML page will be returned. Should you wish to just grab the data minus the page, I suggest looking at the structure tables and selecting what you wish.
        * **json (default)**
