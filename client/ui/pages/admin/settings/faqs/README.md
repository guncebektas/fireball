# Faqs component
Since we're using React, we aim to minimize code duplication. While nothing particularly unique is here, let’s look at a few key parts.

The component will be loaded by the help of router. Routes are defined in `/client/routes/Router.js`. 
The project is following simple naming and using enums as much as possible. You will see `enums` folder nearly everywhere. 
Define constants in these folders to use ide with full-power.

We have two components in faqs module. One for editing and one for listing. The project tries to simplify these two components as much as possible. 

## Form
`_id` param has a special meaning when it's value is *NOT* `new`. It means we need to fill the form with data.

## List
You’ll notice definitions like `_self` and `columns`. The `_self` object contains the definitions we use in list components.

```js
const _self = {
    publisher: FAQS_PUBLICATION.ALL,
    repository: faqRepository,
    methods: faqsMethod,
    formRoute: ROUTE.SETTINGS_FAQS_FORM,
}
```

The `columns` array is used for the data grid and restricts the publish function to return only the specified fields. However, **passing columns into a publish function can pose a security risk**, so it must be done cautiously.

```js
const columns = [
    {key: 'question', label: 'Question'},
    {key: 'answer', label: 'Answer'},
];
```
