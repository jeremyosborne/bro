### lorembro

CORS friendly HTTP GET API for retrieving dummy data.

API Endpoint: [/api/lorembro](/api/lorembro)

Accepted query string key:value pairs.

* **data**
    * {String} Which of the data samples to retrieve.
    * Accepted Values:
        * accesslog
        * hearthstone (data from [game of same name](http://battle.net/hearthstone/), json copied [from here](https://gist.github.com/krainboltgreene/8500786))
        * html
        * json
        * longtext
        * **text (default)**
        * wordlist
        * xml
        * yaml

