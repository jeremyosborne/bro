### templatebro

CORS friendly HTTP GET API for retrieving templates.

API Endpoint: **api/templatebro**

Accepted query string key:value pairs:

* **type**
    * {String} Which of the templates to retrieve.
    * Accepted Values:
        * **html (default)**
        * **bare** (virtually empty HTML file)
        * **readme** (empty markdown readme with MIT license embedded)

#### Recommended usage

    # The default is the HTML template...
    wget -O index.html http://bro.somedomain.com/api/templatebro
    # or
    curl -O index.html http://bro.somedomain.com/api/templatebro

    # The readme file
    curl -O README.md http://bro.somedomain.com/api/templatebro?type=readme
