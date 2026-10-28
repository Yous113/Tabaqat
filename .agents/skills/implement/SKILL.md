---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

If the user passes a ticket reference, fetch it from the issue tracker and state its title before starting. If the reference is ambiguous, ask.

Before editing, record the starting commit SHA, working-tree status, and initial contents or diffs of files the task touches. Keep the agreed spec from the conversation or tickets, including later user corrections, with this baseline.

Call the Skill tool with "tdd" where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, call the Skill tool with "code-review" using its **implementation handoff**: pass the baseline, exact task diff and file list (including untracked files), and agreed spec. Keep pre-existing changes outside the review unless the user included them in the task. Address findings before committing.

Commit your work to the current branch.
