# CODE REVIEW

Code review is one of the most important steps in developing software. It’s the process which written code is being reviewed and corrected by other developers.

The main goal of code reviews is to catch problems that will lower the quality of the code. Other goals that make code reviews important are:

1. Better quality code
2. Checking code for better performance and security
3. Educating developers and exchange of knowledge
4. Increase responsibility of both parties, reviewer and developer
5. Finding new and better solutions
6. Make code comply with QA guidelines and ISO/IEC standards

You can detect errors in code earlier with a proper code review process. They also streamline the code styling and makes sure that every piece of written code is within the defined code style.
On the contrary, a bad executed code review process leads to time and effort loss, resulting on a bad impact on developer and the product.
To avoid the bad execution and focus on value, here are a few principles you can apply with your team:

## PRINCIPLES

### 1. Be kind and respectful

Don’t forget that a human and a member of your team wrote the code you’re reviewing. To keep the communication health within your team, you have to be respectful and kind to others. One way to do this is to make sure you criticise only the code, and not the person who wrote it. The same applies to your code as well. If somebody else is criticising your code, don’t take it personally.

Bad example: “It’s clear that concurrency won’t do any good here. Why did you use multi-thread here?”

Good example: “Concurrency choice here, as far as I can see, doesn't provide a real benefit on performance, and it complicates the system. Since there isn’t a performance benefit, I think using a single-thread solution would be better option.”

### 2. Clearly indicate why

When advising what to do, always state the reason. This way the author of the code would understand the subject and why you want the change. This also helps the authors to improve themselves. If you don’t state reasons, the team will halt developing their own thinking and start apply everything you tell them, no questions asked.

### 3. Find the balance

It’s the author’s job to improve the code after it’s reviewed. But code reviews are not just comments on code, they also direct and support the author. Sometimes a simple comment would suffice, but there are cases where you need to clearly explain the things that need to be done, or maybe write the code yourself.

Finding the balance here is important. If you intervene and write the code yourself on all reviews, the author might get offended. If it’s a complicated subject in contrast to the author’s skills, and you refrain from writing the code, you might delay the product development.

In short, get involved when you must, and keep the balance.

### 4. Be democratic

In a democratic code review process, everybody’s code gets reviewed. It’s not just the team leads reviewing other’s code, but others reviewing the team lead’s code as well.

In other words, experience, title and position shouldn’t alter the process. Everybody can make mistakes. The more eyes on code, the higher chance to spot mistakes early on. Detecting errors as a team is all that matters.

### 5. Be brave

Within a democratic code review process, a junior developer (1-3 years of experience) may find herself reviewing a senior developer’s (10+ years of experience) code. In this case the experienced should not lose themselves to their ego and encourage the less experienced. Less experienced should feel encouraged about making comments on mistakes of more experienced. If they refrain from calling out mistakes, fixing them later would cause bigger problems.

### 6. Ask questions and explain

Don’t hesitate to ask questions. Asking questions may mean that the code written isn’t very clear to another person. This is fine, and may require explanation. When making changes after the first review, you might want to explain the solution inside the code as a comment so that other reviewers might see why and what you changed on their reviews. Comments on code review tools will be forgotten, so keep a balance on what needs to be explained for future reference.

### 7. Emphasize the positive

You shouldn’t focus only on mistakes. Always look for good and comment on them as well. A simple praise or a thank-you impacts the author more than you think.

“Nice catch!”

“I didn't know this method existed. Very useful. Thank you!”

“I’ll implement like this from now on. This is more clear and concise.”

### 8. As long as it takes
   You must not rush code reviews. It should last until the very last comments are handled and closed. Not fixing things because a deadline is approaching, or not having discussions on a piece of code that might benefit the attention leads to more serious problems in the future. Fixing mistakes in production or after a release is more expensive.
   


## 3 PHASES OF CODE REVIEW

There are at least three phases of reviewing code.

### 1. Getting to know why this code is written in the first place
In this phase, we are trying to find an answer to “Why is the code written in the first place?” before reviewing what and how it is written. Our aim in this phase is to find whether the PR author provides us with the necessary context to help us do the review better. Therefore, we need to make sure that PR gives the "YES" answer to the following questions:

Is there enough context regarding the problem definition the developer was trying to solve?

Can we answer “WHY” with this given context?

If the developer didn’t give a sufficient explanation or problem definition in the PR’s description, is there a Jira task id or link related to the PR, so we can get more context?

Does the Jira task have sufficient detail to help us understand the PR context?

If you don’t have enough detail to review the PR, feel free to ask for more context from the PR owner or hit the reject button (PR owners are expected to provide this context already, so this won’t be a problem).

### 2. Light reviewing
In this second phase, we typically look for the following:

Obvious things: typos, poor variable names, unclear function names, long function bodies, large function signatures, long parameter lists, large classes (aka God Objects), etc.

At least one test. Because tests are part of our development culture.

Commented out code that should be deleted.

Violations of our style guide that linters don’t catch yet.

### 3. In-depth reviewing
This is the most important part of reviewing process and potentially takes a lot of time. Most PR reviewers tend to stop reviewing the code and hit the approve button because they don’t want to spend their time here. However, code reviews are one of the things that we value the most here in Binalyze. Let’s remember why code reviews are important to us:

Code reviews are one of the most important quality checks in writing new code. Since we value writing quality code, code reviews are our quality gate to ensure that our codebase is in good shape, and we don’t ship a piece of crap to our customers. Therefore, if there is one quality control practice we prioritize above all others, it’s a culture of good code reviewing.

So if you are added as a reviewer to a PR, this is your responsibility to take your time and review the code in detail. Don’t worry about how much time you spend reviewing. Always remember that this is one of Binalyze Engineering’s core values, and every second is worth it!

In this in-depth phase, we’re looking for the following:

Code duplications (Unless duplication is far cheaper than the wrong abstraction).

Usage of global variables. Global variables must be avoided unless absolutely necessary. Even question “absolutely necessary cases” and try to find out if we can solve problems without global variables. Global variables add to intercomponent coupling, which increases complexity if a large number of components are using them. Another problem with global variables is that since every function has access to these, it becomes increasingly hard to figure out which functions actually read and write these variables. The problem with global variables is that since every function has access to these, it becomes increasingly hard to figure out which functions actually read and write these variables. To understand how the application works, you pretty much have to take into account every function which modifies the global state. That can be done, but as the application grows, it will get harder to the point of being virtually impossible (or at least a complete waste of time).

More idiomatic ways of using our frameworks/libraries.

Whether there is sufficent logging or not. Especially for the critical parts of code. We encourage intensive logging, especially for our software that works on the client side.

Whether written comments explain “why” rather than “what.” If there are long written comments, this may be a sign that the code needs to be refactored to simplify the logic. Question why the long comment is written in the first place. Ask the author for clarification.

Whether there is/are part(s) that need to be commented out.

Alternative implementations or refactors that increase readability/understandability and/or maintainability.

Whether the way modules/packages interact correctly. Are integration points correct?

Dependencies between modules/packages. The less dependency a module has, the more decoupled it is.

Unhandled edge cases based on data-type/data-existence assumptions in a function.

Whether the overall coding style is aligned with our coding guide.

Can you gather context for that PR? i.e., if you’re totally unfamiliar with that part of the codebase, could you roughly tell what that part of the system does and how PR affects it?

Whether the behaviors of functions designed for general purposes (project-wide shared functions, exported functions from a module/package, etc.) are not affected by where they are called, for example, assume that a function is designed to be called in multiple parts of code. If a function starts having some custom logic/behaviors affected by where it is called, this is a sign that something wrong is going on here. Usually, in these cases, the developers try to control the function’s behavior by some “if blocks” to satisfy the need where the function is called. Any time you encounter such a function, the solution is to make the function more general purpose and remove all custom behaviors.

Whether functions are designed as side effect free or not.

Whether repeating strings are declared as constant or not.

Whether there is/are spec omission(s), If you know the feature requirements. “Shouldn’t this component also do X?”

That the tests (non-trivially) pass, assert a valuable behavior and do not (if you can help it) test implementation details.

Adequate test coverage for changed lines or critical code paths.

Ways of strengthening tests.

Logical omissions or errors.
