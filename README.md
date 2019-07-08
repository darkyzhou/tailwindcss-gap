# Gap Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-gap
```

## Usage

```js
// tailwind.config.js
{
  theme: {
    gap: { // defaults to {}
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
    },
  },
  variants: {
    gap: ['responsive'], // defaults to ['responsive']
  },
  plugins: [
    require('tailwindcss-gap')({
      legacy: false, // defaults to false, set to true to output IE-compatible CSS (no custom properties, but much larger CSS for the same functionality)
    }),
  ],
}
```

This plugin generates the following classes (in the `@tailwind components` slot, so that padding and margin utilities can override them):

```css
.gap, .gap-padding {
  --gap-x: 0px;
  --gap-y: 0px;
  --gap-x-half: calc(var(--gap-x) / 2);
  --gap-x-half-negative: calc(var(--gap-x-half) * -1);
  --gap-y-half: calc(var(--gap-y) / 2);
  --gap-y-half-negative: calc(var(--gap-y-half) * -1);
  margin: var(--gap-y-half-negative) var(--gap-x-half-negative);
}
.gap > * {
  margin: var(--gap-y-half) var(--gap-x-half);
}
.gap-padding > * {
  padding: var(--gap-y-half) var(--gap-x-half);
}

.gap-1 {
  --gap-x: 0.25rem;
  --gap-y: 0.25rem;
}
.gap-2 {
  --gap-x: 0.5rem;
  --gap-y: 0.5rem;
}
/* etc. */

.gap-x-1 {
  --gap-x: 0.25rem;
}
.gap-y-1 {
  --gap-y: 0.25rem;
}
.gap-x-2 {
  --gap-x: 0.5rem;
}
.gap-y-2 {
  --gap-y: 0.5rem;
}
/* etc. */
```

And you can use them like this in your markup:

```html
<div class="flex flex-wrap gap gap-8">
  <div class="w-4 h-4 rounded-full bg-blue"></div>
  <div class="w-4 h-4 rounded-full bg-blue"></div>
  <div class="w-4 h-4 rounded-full bg-blue"></div>
</div>

<div class="sm:flex gap-padding sm:gap-x-8">
  <div class="w-1/2">
    Column 1
  </div>
  <div class="w-1/2">
    Column 2
  </div>
</div>
```

## Known issues

- In `legacy` mode, variants other than `responsive` (e.g. `hover`, `focus`, etc.) don’t work properly, in part due to [this Tailwind CSS issue](https://github.com/tailwindcss/tailwindcss/issues/1009) which may or may not get fixed. As changing the layout on hover/focus is not a common use case, and since it only affects legacy mode (which you would only enable if you need gaps to appear in Internet Explorer), I don’t plan on fixing this.
