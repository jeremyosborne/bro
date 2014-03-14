### messagebro

CORS friendly HTTP API for storing and retrieving messages.

API Endpoint: **api/messagebro**

Storing a new message in the memory cache can be done with the following key:value pairs.

* **user**
    * {String} The user leaving the message.
    * Example: jeremy
* **message**
    * {String} The message being left by the user.
    * Example: was here

Only the last 100 messages are kept. No parsing is done on the messages, you have been warned.

Accessing the messages currently stored in the cache (retrieves as a JSON message with a **"messages"** key pointing to an array of message objects). Messages are returned in descending chronological order.

* **history**
    * {mixed} Any value is allowed.
    * Example: 1

To clear the cache:

* **reset**
    * {mixed} Any value is allowed.
    * Example: 1

