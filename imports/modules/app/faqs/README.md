# Example Module for (pub/sub)
You can find many examples for different cases in the project. 
However, FAQs module is the one we will give instructions for further developers.

It's a simple module, but it covers mostly used features such as form and data-table.

The back-end code can be found in `/imports/modules/faqs/`. 

The front-end code is in `/imports/help/Faqs.jsx` and `/imports/ui/pages/admin/faqs`

## Back-end code
It also includes isomorphic codes but we can call it back-end as it's the place of both business logic and database operations.
You will notice it has a `server` folder. This is the *private area* which is not shared with the client and the entry point of server.

> All modules should be imported in `/server/modules.js`

You will see `faqRepository` and `faqService`. These are classic layers and both of them extend base classes. The business logic and algorithms should be placed into these files.

`faqs.methods` is the controller of our design. You will notice all methods have a namespace and all methods are imported in `imports/faqs/server/faqs.rateLimiter.js`. It's not only rate-limiting all methods but also define them in the server side.

## Front-end code
As we are using react we are trying to minimize code duplication. There is nothing special in there but let's dig some parts.

You will see _self and columns definitions. 
The _self includes the definition that we are using in list components. 

```js
const _self = {
    publisher: FAQS_PUBLICATION.ALL,
    repository: faqRepository,
    methods: faqsMethod,
    formRoute: ROUTE.SETTINGS_FAQS_FORM,
}
```

And the columns array is for data-grid. It also limits the publish function to return only provided methods. 
Passing columns into a publish function ***can create a security risk*** so use it wisely.

```js
const columns = [
    {key: 'question', label: 'Question'},
    {key: 'answer', label: 'Answer'},
];
```
