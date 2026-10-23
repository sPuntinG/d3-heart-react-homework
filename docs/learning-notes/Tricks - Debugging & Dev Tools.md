# Tricks: Debugging & Dev Tools

A growing collection of small tricks for figuring out what the code is *actually* doing.
One section per trick: what it is, how to use it, and the real case where I learned it.

**Opening the browser dev tools:** press **F12** (or right-click the page → *Inspect*).

---

## `console.log()` — print a value and look at it

**Date:** 2026-10-23

**What it is:** a line of JavaScript that prints whatever you give it into the browser's
**Console** tab. It changes nothing on the page; it just lets you *see* a value.

**When to use it:** something "just doesn't work" and there's no error message. Instead of
guessing, print the value you *think* is right and check it.

**How:**

1. Add the line right after the value you want to check:
   ```js
   const highlighted = data[Math.floor(Math.random() * data.length)].country;
   console.log(highlighted);
   ```
2. Save, open dev tools (**F12**) → **Console** tab.
3. Read what got printed. Delete the line when you're done.

**Tips:**
- Label it so you know which print is which: `console.log("highlighted:", highlighted);`
- You can print whole objects or lists too (`console.log(data)`) — click the little arrow in
  the Console to expand them.
- In React, a component can run more than once, so seeing the same print 2× is normal in
  development.

**The real case (Module 1 barplot):** no bar was turning red. I had written
`Math.floor(Math.random() * data.length).country` — that asks a *number* for its country,
which gives `undefined` (JavaScript's "nothing here"), silently, with no error.
`console.log` would have shown `undefined` straight away. The fix was to look up the row
first: `data[ ...number... ].country`.

**Lesson:** `undefined` with no error usually means *"you asked something for a property it
doesn't have"* — check that you're looking at the thing you think you're looking at.

---

<!-- Next trick goes here, same shape: what it is / when / how / the real case. -->
