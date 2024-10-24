# Example Module for Pub/Sub

This project contains several examples for various use cases, but the FAQs module serves as the primary guide for future developers.

It’s a straightforward module that demonstrates key features like forms and data tables, which are commonly used across the project.

The back-end code is located in `/imports/modules/faqs/`, while the front-end code can be found in `/imports/help/Faqs.jsx` and `/imports/ui/pages/admin/faqs`.

## Back-end Code

While some parts of the code are isomorphic, we’ll refer to this section as the back-end, as it handles both business logic and database operations. Inside, you'll find a `server` folder—this is the *private area* that isn't shared with the client and acts as the entry point for server-side code.

> All modules must be imported in `/server/modules.js`.

You'll come across `faqRepository` and `faqService`, which follow a classic layered architecture. Both extend base classes, and this is where all business logic and algorithms should be implemented.

The `faqs.methods` file acts as the controller. Each method has a namespace and is imported into `imports/faqs/server/faqs.rateLimiter.js`. This file not only rate-limits the methods but also registers them on the server.

## Front-end Code

Since we're using React, we aim to minimize code duplication. While nothing particularly unique is here, let’s look at a few key parts.

You’ll notice definitions like `_module` and `columns`. The `_module` object contains the definitions we use in module.

```js
const _module = faqModule;
```

The `columns` array is used for the data grid and restricts the publish function to return only the specified fields. However, **passing columns into a publish function can pose a security risk**, so it must be done cautiously.

```js
const columns = [
    {key: 'question', label: 'Question'},
    {key: 'answer', label: 'Answer'},
];
```
