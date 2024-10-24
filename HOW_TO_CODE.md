# HOW TO CODE
How to make a change to the codebase
When multiple developers are working on the same codebase, it’s important that everyone follow the same procedure for making changes.

### How to make a change?

Create a local branch from the main (server) or master (client) branch. It’s where the up-to-date code lives and features and bug fixes start from.

Make a small, incremental change, and test it locally.

Review your own code before sending it to someone else to review.

Assign a code reviewer and ask them for a code review.

Respond to or acknowledge every code review comment from the reviewer and ask them to look again until they approve.

Merge the branch into the main.

Repeat.

That’s the basic procedure. Here are the rules on how to do this workflow well…

Changes should be as small as possible while still doing something meaningful
Small, incremental changes are

Easier to review: it’s easier for a reviewer to grok a small change and also less of an interrupt, so you are likely to get a review more quickly

Easier to test: smaller changes mean less surface area for testing and more confidence that they work

Less likely to have merge conflicts when you sync locally

Less likely to cause merge conflicts for others when you submit

Easier to roll back

Pretty much better in every respect

But don’t make the change so small that the overhead of the review and commit would make it make sense for the change to be bigger. Be pragmatic.

### Use feature-flags
The most common reason we see big changes is because engineers don’t want to check in half-working code. Feature flags are the solution here.

It’s fine for code that is not fully functional to be committed so long as it is not executed.

Feature flags also have other important uses for staged rollouts and canarying, so it’s good to get them in place right from the start.

### Thoroughly test your own code
It's great to have others help test, but ultimately you are responsible for the quality of what you launch.

### Get code reviewed early on
The beginning of a feature is the most important time to get a code review. It is preferable to make an initial commit on a new feature as early as possible because most of the important design decisions are made at the beginning of implementation.

A common mistake we see in feature development is not getting the code reviewed until way too much of it has been written, at which point it becomes much more painful to adjust in case a reviewer requests a big design change.

We’ve seen a lot of sub-par code checked in because the initial change was too big and the author didn’t want to redo it, and the code reviewer didn’t want to push the author because of the amount of time it would take. That’s a bad outcome.

### Don’t group unrelated changes in a single review
It makes the change harder for a reviewer to understand.

It makes it harder to selectively roll back if one part of it causes an issue, but the other part is fine.

But again, be pragmatic. You don’t need to send five distinct code reviews if that would end up taking everyone a lot more time.

Code should make it all the way to the main on every review
Don’t have code incrementally reviewed on a single branch as you build out a feature and then submit that one branch once the feature is fully built

This leads to committing one big change at the end, which, for the reasons stated above, is bad.

Use feature flags to submit incomplete code – that way you can separate committing and pushing the code from enabling the code.

### Keep working while your code is being reviewed
The technique we recommend is “branching off of your current branch” to keep going.

E.g., if you are having “feature_branch” reviewed, then you should locally do “git checkout -b feature_branch_2” from feature_branch and keep working.

As you make changes for the initial review in “feature_branch”, you merge them into feature_branch_2, so it picks them up.

Finally, when you submit feature_branch, you merge master into feature_branch_2, and it becomes the next thing you have reviewed.

### Do not share feature branches
Under no circumstances should engineers share feature branches. By “sharing”, we mean if two or more engineers are working on a single feature off of a non-head branch.

There are many reasons this is a bad idea, but the primary one is that this encourages the submission of very large changes, and for the reasons listed above, large changes are bad.

It also makes it hard for other engineers on the team to review code early enough to catch errors.

### Use a linter to enforce style
Using a linter like eslint or prettier that enforces a particular code style saves a lot of time commenting on style issues in code reviews and also keeps the code consistent.

I’ve seen teams perform presubmit checks that verify the code style is followed. We don’t recommend this because it’s likely to annoy anyone external to your team who is trying to make a small fix in your codebase and doesn’t have your linter configured. Either make it so the linting is automatic or don’t rigorously enforce it at check-in time. Someone will fix it on the next PR.

Make sure your IDE is connected to SonarCloud. All our pipelines are connected to SonarCloud. Connecting locally will provide an early warning advantage.

### Code reviews
Code reviews are one of the most important quality checks in writing new code. Since we value writing quality code, code reviews are our quality gate to ensure that our codebase is in good shape, and we don’t ship a piece of crap to our customers. Therefore, if there is one quality control practice we prioritize above all others, it’s a culture of good code reviewing. In code reviews:

We share our knowledge with other developers.

We learn from each other.

We give feedback to each other and have a chance to improve ourselves.

We contribute to our engineering culture and present our culture to new developers.

We contribute to each other’s personal growth.

For the author:

Always merge main into your feature branch before starting the review process – otherwise, your diff might show spurious changes, and you could end up with a change that needs merge conflict resolution after the review

Review your own code before you ask someone else to review it! Make sure what you present to the code reviewer doesn’t have changes you know you should make.

Do not expect code reviewers to find bugs! They sometimes will, but that is not their job.

Assign the review to the person who knows the area of code you are working on best, not the person who does the easiest reviews. But try to spread your reviews around if you can.

New team members should act as “secondary” reviewers on a bunch of code reviews before reviewing code on their own.

At some point, we may introduce the concept of “readability;” any engineer who has “readability” in a programming language is allowed to approve a change on his or her own. Otherwise, they need another reviewer to approve. Google has this process in place, but they also have a huge codebase they are trying to scale. We don’t need this yet.

Continue working by branching off of your feature branch while you are waiting. This is a powerful way not to get blocked. See the technique of branching off a branch above.

If you are blocked on a review, you should be aggressive in pinging the reviewer and, if that doesn’t work, a manager. Fast code reviewing is a key part of a healthy team, and everyone should feel responsible for reviewing code quickly. Speed of review is inversely correlated with the size of the change, so if you want your changes reviewed quickly, keep them small.

When a review comes back, address every comment, even if just acknowledging that you made the suggested change.

Test your code again after you have made the suggested changes! Blindly committing the reviewer’s suggested change is a common source of bugs and build breaks.

Code reviews from more senior engineers are how you become a better coder – remember that. Don’t get defensive when an engineer requests changes.

For the reviewer:

Treat code reviews as a high priority. If you can’t immediately direct your attention to the review, you should let the author know when you expect to get to it. We don’t think any review should sit for more than a couple of hours unaddressed.

Focus on design issues first and foremost.  The most impactful reviews ask a few key questions about design issues that are likely to cause problems down the line if not addressed early on.

Keep the tone focused on learning and improvement and not critical. Engineers are sensitive about criticism, and the more you focus on making the code better and not pointing out what someone has done wrong, the better – We usually frame my feedback as suggestions.

Example good feedback:

“It looks like this might run in n^2 time – is there a way to make it linear?”

“I think this is making a network call within a tight loop. Maybe add a bulk API on the server side, so you can do the work in one call?”

“I’d think about putting all these methods into their own class and memoizing the calls if you can.”

And not so good feedback

“Style guide for JS Doc calls for two newlines between top-level file comments.”

“NPE”

“I didn’t understand how this worked but if you’re sure it produces the right results, then ok.”

### Presubmit checks
A “presubmit” check is a trigger that automatically runs before your code gets merged and deployed.

Examples of presubmit checks are scripts that check the formatting and linting of code, ones that check the code has been reviewed, etc.

The most valuable presubmit routine you can have is one that takes the code you are about to merge, integrates it into the production “head” in another sandbox environment, and builds and runs all of your tests against it. The important thing is that this happens before the code is merged, so you avoid breaking the build and tests. We currently implement this via GitHub actions.

See this awesome post by Josh Haas on how they implement this at Bubble.

### After submitting and pushing the code
Code is almost never “done.” There are always bugs that arise, which brings me to my next point…

FIX YOUR BUGS. If you push a bug, fix it. If you create a bug somewhere else in the product because of your change, fix it or roll back your change. Great engineers are always fixing not only their own bugs but other bugs they find in the product.

IF YOU BREAK A BUILD, ROLL BACK. This depends somewhat on the nature of the break, but a broken build slows everyone down, and your default should be to roll back your change rather than trying to roll forward with a fix.
