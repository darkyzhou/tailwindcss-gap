const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const gapPlugin = require('./index.js');

const generatePluginCss = (config, pluginOptions = {}) => {
  return postcss(
    tailwindcss(
      _.merge({
        theme: {
          screens: {
            'sm': '640px',
          },
        },
        corePlugins: false,
        plugins: [
          gapPlugin(pluginOptions),
        ],
      }, config)
    )
  )
  .process('@tailwind components; @tailwind utilities', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

const baseCss = `
  .c-gap, .c-gap-padding {
    --gap-x: 0px;
    --gap-y: 0px;
    --gap-x-half: calc(var(--gap-x) / 2);
    --gap-x-half-negative: calc(var(--gap-x-half) * -1);
    --gap-y-half: calc(var(--gap-y) / 2);
    --gap-y-half-negative: calc(var(--gap-y-half) * -1);
    margin: var(--gap-y-half-negative) var(--gap-x-half-negative);
  }
  .c-gap > * {
    margin: var(--gap-y-half) var(--gap-x-half);
  }
  .c-gap-padding > * {
    padding: var(--gap-y-half) var(--gap-x-half);
  }
`;

expect.extend({
  toMatchCss: cssMatcher,
});

test('gaps corresponding to Tailwind’s spacing scale are generated by default', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      ${baseCss}
      .c-gap-0 {
        --gap-x: 0px;
        --gap-y: 0px;
      }
      .c-gap-1 {
        --gap-x: 0.25rem;
        --gap-y: 0.25rem;
      }
      .c-gap-2 {
        --gap-x: 0.5rem;
        --gap-y: 0.5rem;
      }
      .c-gap-3 {
        --gap-x: 0.75rem;
        --gap-y: 0.75rem;
      }
      .c-gap-4 {
        --gap-x: 1rem;
        --gap-y: 1rem;
      }
      .c-gap-5 {
        --gap-x: 1.25rem;
        --gap-y: 1.25rem;
      }
      .c-gap-6 {
        --gap-x: 1.5rem;
        --gap-y: 1.5rem;
      }
      .c-gap-8 {
        --gap-x: 2rem;
        --gap-y: 2rem;
      }
      .c-gap-10 {
        --gap-x: 2.5rem;
        --gap-y: 2.5rem;
      }
      .c-gap-12 {
        --gap-x: 3rem;
        --gap-y: 3rem;
      }
      .c-gap-16 {
        --gap-x: 4rem;
        --gap-y: 4rem;
      }
      .c-gap-20 {
        --gap-x: 5rem;
        --gap-y: 5rem;
      }
      .c-gap-24 {
        --gap-x: 6rem;
        --gap-y: 6rem;
      }
      .c-gap-32 {
        --gap-x: 8rem;
        --gap-y: 8rem;
      }
      .c-gap-40 {
        --gap-x: 10rem;
        --gap-y: 10rem;
      }
      .c-gap-48 {
        --gap-x: 12rem;
        --gap-y: 12rem;
      }
      .c-gap-56 {
        --gap-x: 14rem;
        --gap-y: 14rem;
      }
      .c-gap-64 {
        --gap-x: 16rem;
        --gap-y: 16rem;
      }
      .c-gap-px {
        --gap-x: 1px;
        --gap-y: 1px;
      }
      .c-gap-x-0 {
        --gap-x: 0px;
      }
      .c-gap-y-0 {
        --gap-y: 0px;
      }
      .c-gap-x-1 {
        --gap-x: 0.25rem;
      }
      .c-gap-y-1 {
        --gap-y: 0.25rem;
      }
      .c-gap-x-2 {
        --gap-x: 0.5rem;
      }
      .c-gap-y-2 {
        --gap-y: 0.5rem;
      }
      .c-gap-x-3 {
        --gap-x: 0.75rem;
      }
      .c-gap-y-3 {
        --gap-y: 0.75rem;
      }
      .c-gap-x-4 {
        --gap-x: 1rem;
      }
      .c-gap-y-4 {
        --gap-y: 1rem;
      }
      .c-gap-x-5 {
        --gap-x: 1.25rem;
      }
      .c-gap-y-5 {
        --gap-y: 1.25rem;
      }
      .c-gap-x-6 {
        --gap-x: 1.5rem;
      }
      .c-gap-y-6 {
        --gap-y: 1.5rem;
      }
      .c-gap-x-8 {
        --gap-x: 2rem;
      }
      .c-gap-y-8 {
        --gap-y: 2rem;
      }
      .c-gap-x-10 {
        --gap-x: 2.5rem;
      }
      .c-gap-y-10 {
        --gap-y: 2.5rem;
      }
      .c-gap-x-12 {
        --gap-x: 3rem;
      }
      .c-gap-y-12 {
        --gap-y: 3rem;
      }
      .c-gap-x-16 {
        --gap-x: 4rem;
      }
      .c-gap-y-16 {
        --gap-y: 4rem;
      }
      .c-gap-x-20 {
        --gap-x: 5rem;
      }
      .c-gap-y-20 {
        --gap-y: 5rem;
      }
      .c-gap-x-24 {
        --gap-x: 6rem;
      }
      .c-gap-y-24 {
        --gap-y: 6rem;
      }
      .c-gap-x-32 {
        --gap-x: 8rem;
      }
      .c-gap-y-32 {
        --gap-y: 8rem;
      }
      .c-gap-x-40 {
        --gap-x: 10rem;
      }
      .c-gap-y-40 {
        --gap-y: 10rem;
      }
      .c-gap-x-48 {
        --gap-x: 12rem;
      }
      .c-gap-y-48 {
        --gap-y: 12rem;
      }
      .c-gap-x-56 {
        --gap-x: 14rem;
      }
      .c-gap-y-56 {
        --gap-y: 14rem;
      }
      .c-gap-x-64 {
        --gap-x: 16rem;
      }
      .c-gap-y-64 {
        --gap-y: 16rem;
      }
      .c-gap-x-px {
        --gap-x: 1px;
      }
      .c-gap-y-px {
        --gap-y: 1px;
      }
      @media (min-width: 640px) {
        .sm\\:c-gap-0 {
          --gap-x: 0px;
          --gap-y: 0px;
        }
        .sm\\:c-gap-1 {
          --gap-x: 0.25rem;
          --gap-y: 0.25rem;
        }
        .sm\\:c-gap-2 {
          --gap-x: 0.5rem;
          --gap-y: 0.5rem;
        }
        .sm\\:c-gap-3 {
          --gap-x: 0.75rem;
          --gap-y: 0.75rem;
        }
        .sm\\:c-gap-4 {
          --gap-x: 1rem;
          --gap-y: 1rem;
        }
        .sm\\:c-gap-5 {
          --gap-x: 1.25rem;
          --gap-y: 1.25rem;
        }
        .sm\\:c-gap-6 {
          --gap-x: 1.5rem;
          --gap-y: 1.5rem;
        }
        .sm\\:c-gap-8 {
          --gap-x: 2rem;
          --gap-y: 2rem;
        }
        .sm\\:c-gap-10 {
          --gap-x: 2.5rem;
          --gap-y: 2.5rem;
        }
        .sm\\:c-gap-12 {
          --gap-x: 3rem;
          --gap-y: 3rem;
        }
        .sm\\:c-gap-16 {
          --gap-x: 4rem;
          --gap-y: 4rem;
        }
        .sm\\:c-gap-20 {
          --gap-x: 5rem;
          --gap-y: 5rem;
        }
        .sm\\:c-gap-24 {
          --gap-x: 6rem;
          --gap-y: 6rem;
        }
        .sm\\:c-gap-32 {
          --gap-x: 8rem;
          --gap-y: 8rem;
        }
        .sm\\:c-gap-40 {
          --gap-x: 10rem;
          --gap-y: 10rem;
        }
        .sm\\:c-gap-48 {
          --gap-x: 12rem;
          --gap-y: 12rem;
        }
        .sm\\:c-gap-56 {
          --gap-x: 14rem;
          --gap-y: 14rem;
        }
        .sm\\:c-gap-64 {
          --gap-x: 16rem;
          --gap-y: 16rem;
        }
        .sm\\:c-gap-px {
          --gap-x: 1px;
          --gap-y: 1px;
        }
        .sm\\:c-gap-x-0 {
          --gap-x: 0px;
        }
        .sm\\:c-gap-y-0 {
          --gap-y: 0px;
        }
        .sm\\:c-gap-x-1 {
          --gap-x: 0.25rem;
        }
        .sm\\:c-gap-y-1 {
          --gap-y: 0.25rem;
        }
        .sm\\:c-gap-x-2 {
          --gap-x: 0.5rem;
        }
        .sm\\:c-gap-y-2 {
          --gap-y: 0.5rem;
        }
        .sm\\:c-gap-x-3 {
          --gap-x: 0.75rem;
        }
        .sm\\:c-gap-y-3 {
          --gap-y: 0.75rem;
        }
        .sm\\:c-gap-x-4 {
          --gap-x: 1rem;
        }
        .sm\\:c-gap-y-4 {
          --gap-y: 1rem;
        }
        .sm\\:c-gap-x-5 {
          --gap-x: 1.25rem;
        }
        .sm\\:c-gap-y-5 {
          --gap-y: 1.25rem;
        }
        .sm\\:c-gap-x-6 {
          --gap-x: 1.5rem;
        }
        .sm\\:c-gap-y-6 {
          --gap-y: 1.5rem;
        }
        .sm\\:c-gap-x-8 {
          --gap-x: 2rem;
        }
        .sm\\:c-gap-y-8 {
          --gap-y: 2rem;
        }
        .sm\\:c-gap-x-10 {
          --gap-x: 2.5rem;
        }
        .sm\\:c-gap-y-10 {
          --gap-y: 2.5rem;
        }
        .sm\\:c-gap-x-12 {
          --gap-x: 3rem;
        }
        .sm\\:c-gap-y-12 {
          --gap-y: 3rem;
        }
        .sm\\:c-gap-x-16 {
          --gap-x: 4rem;
        }
        .sm\\:c-gap-y-16 {
          --gap-y: 4rem;
        }
        .sm\\:c-gap-x-20 {
          --gap-x: 5rem;
        }
        .sm\\:c-gap-y-20 {
          --gap-y: 5rem;
        }
        .sm\\:c-gap-x-24 {
          --gap-x: 6rem;
        }
        .sm\\:c-gap-y-24 {
          --gap-y: 6rem;
        }
        .sm\\:c-gap-x-32 {
          --gap-x: 8rem;
        }
        .sm\\:c-gap-y-32 {
          --gap-y: 8rem;
        }
        .sm\\:c-gap-x-40 {
          --gap-x: 10rem;
        }
        .sm\\:c-gap-y-40 {
          --gap-y: 10rem;
        }
        .sm\\:c-gap-x-48 {
          --gap-x: 12rem;
        }
        .sm\\:c-gap-y-48 {
          --gap-y: 12rem;
        }
        .sm\\:c-gap-x-56 {
          --gap-x: 14rem;
        }
        .sm\\:c-gap-y-56 {
          --gap-y: 14rem;
        }
        .sm\\:c-gap-x-64 {
          --gap-x: 16rem;
        }
        .sm\\:c-gap-y-64 {
          --gap-y: 16rem;
        }
        .sm\\:c-gap-x-px {
          --gap-x: 1px;
        }
        .sm\\:c-gap-y-px {
          --gap-y: 1px;
        }
      }
    `);
  });
});

test('gaps can be customized', () => {
  return generatePluginCss({
    theme: {
      gap: {
        '1': '0.25rem',
        '2': '0.5rem',
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
      ${baseCss}
      .c-gap-1 {
        --gap-x: 0.25rem;
        --gap-y: 0.25rem;
      }
      .c-gap-2 {
        --gap-x: 0.5rem;
        --gap-y: 0.5rem;
      }
      .c-gap-x-1 {
        --gap-x: 0.25rem;
      }
      .c-gap-y-1 {
        --gap-y: 0.25rem;
      }
      .c-gap-x-2 {
        --gap-x: 0.5rem;
      }
      .c-gap-y-2 {
        --gap-y: 0.5rem;
      }
      @media (min-width: 640px) {
        .sm\\:c-gap-1 {
          --gap-x: 0.25rem;
          --gap-y: 0.25rem;
        }
        .sm\\:c-gap-2 {
          --gap-x: 0.5rem;
          --gap-y: 0.5rem;
        }
        .sm\\:c-gap-x-1 {
          --gap-x: 0.25rem;
        }
        .sm\\:c-gap-y-1 {
          --gap-y: 0.25rem;
        }
        .sm\\:c-gap-x-2 {
          --gap-x: 0.5rem;
        }
        .sm\\:c-gap-y-2 {
          --gap-y: 0.5rem;
        }
      }
    `);
  });
});

test('variants can be customized', () => {
  return generatePluginCss({
    theme: {
      gap: {
        '0': '0rem',
        '1': '0.25rem',
      },
    },
    variants: {
      gap: ['hover'],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      ${baseCss}
      .c-gap-0 {
        --gap-x: 0rem;
        --gap-y: 0rem;
      }
      .c-gap-1 {
        --gap-x: 0.25rem;
        --gap-y: 0.25rem;
      }
      .c-gap-x-0 {
        --gap-x: 0rem;
      }
      .c-gap-y-0 {
        --gap-y: 0rem;
      }
      .c-gap-x-1 {
        --gap-x: 0.25rem;
      }
      .c-gap-y-1 {
        --gap-y: 0.25rem;
      }
      .hover\\:c-gap-0:hover {
        --gap-x: 0rem;
        --gap-y: 0rem;
      }
      .hover\\:c-gap-1:hover {
        --gap-x: 0.25rem;
        --gap-y: 0.25rem;
      }
      .hover\\:c-gap-x-0:hover {
        --gap-x: 0rem;
      }
      .hover\\:c-gap-y-0:hover {
        --gap-y: 0rem;
      }
      .hover\\:c-gap-x-1:hover {
        --gap-x: 0.25rem;
      }
      .hover\\:c-gap-y-1:hover {
        --gap-y: 0.25rem;
      }
    `);
  });
});

test('gaps can be extended', () => {
  return generatePluginCss({
    theme: {
      extend: {
        gap: {
          '72': '18rem',
        },
      },
    },
    variants: {
      gap: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
    ${baseCss}
      .c-gap-0 {
        --gap-x: 0px;
        --gap-y: 0px;
      }
      .c-gap-1 {
        --gap-x: 0.25rem;
        --gap-y: 0.25rem;
      }
      .c-gap-2 {
        --gap-x: 0.5rem;
        --gap-y: 0.5rem;
      }
      .c-gap-3 {
        --gap-x: 0.75rem;
        --gap-y: 0.75rem;
      }
      .c-gap-4 {
        --gap-x: 1rem;
        --gap-y: 1rem;
      }
      .c-gap-5 {
        --gap-x: 1.25rem;
        --gap-y: 1.25rem;
      }
      .c-gap-6 {
        --gap-x: 1.5rem;
        --gap-y: 1.5rem;
      }
      .c-gap-8 {
        --gap-x: 2rem;
        --gap-y: 2rem;
      }
      .c-gap-10 {
        --gap-x: 2.5rem;
        --gap-y: 2.5rem;
      }
      .c-gap-12 {
        --gap-x: 3rem;
        --gap-y: 3rem;
      }
      .c-gap-16 {
        --gap-x: 4rem;
        --gap-y: 4rem;
      }
      .c-gap-20 {
        --gap-x: 5rem;
        --gap-y: 5rem;
      }
      .c-gap-24 {
        --gap-x: 6rem;
        --gap-y: 6rem;
      }
      .c-gap-32 {
        --gap-x: 8rem;
        --gap-y: 8rem;
      }
      .c-gap-40 {
        --gap-x: 10rem;
        --gap-y: 10rem;
      }
      .c-gap-48 {
        --gap-x: 12rem;
        --gap-y: 12rem;
      }
      .c-gap-56 {
        --gap-x: 14rem;
        --gap-y: 14rem;
      }
      .c-gap-64 {
        --gap-x: 16rem;
        --gap-y: 16rem;
      }
      .c-gap-72 {
        --gap-x: 18rem;
        --gap-y: 18rem;
      }
      .c-gap-px {
        --gap-x: 1px;
        --gap-y: 1px;
      }
      .c-gap-x-0 {
        --gap-x: 0px;
      }
      .c-gap-y-0 {
        --gap-y: 0px;
      }
      .c-gap-x-1 {
        --gap-x: 0.25rem;
      }
      .c-gap-y-1 {
        --gap-y: 0.25rem;
      }
      .c-gap-x-2 {
        --gap-x: 0.5rem;
      }
      .c-gap-y-2 {
        --gap-y: 0.5rem;
      }
      .c-gap-x-3 {
        --gap-x: 0.75rem;
      }
      .c-gap-y-3 {
        --gap-y: 0.75rem;
      }
      .c-gap-x-4 {
        --gap-x: 1rem;
      }
      .c-gap-y-4 {
        --gap-y: 1rem;
      }
      .c-gap-x-5 {
        --gap-x: 1.25rem;
      }
      .c-gap-y-5 {
        --gap-y: 1.25rem;
      }
      .c-gap-x-6 {
        --gap-x: 1.5rem;
      }
      .c-gap-y-6 {
        --gap-y: 1.5rem;
      }
      .c-gap-x-8 {
        --gap-x: 2rem;
      }
      .c-gap-y-8 {
        --gap-y: 2rem;
      }
      .c-gap-x-10 {
        --gap-x: 2.5rem;
      }
      .c-gap-y-10 {
        --gap-y: 2.5rem;
      }
      .c-gap-x-12 {
        --gap-x: 3rem;
      }
      .c-gap-y-12 {
        --gap-y: 3rem;
      }
      .c-gap-x-16 {
        --gap-x: 4rem;
      }
      .c-gap-y-16 {
        --gap-y: 4rem;
      }
      .c-gap-x-20 {
        --gap-x: 5rem;
      }
      .c-gap-y-20 {
        --gap-y: 5rem;
      }
      .c-gap-x-24 {
        --gap-x: 6rem;
      }
      .c-gap-y-24 {
        --gap-y: 6rem;
      }
      .c-gap-x-32 {
        --gap-x: 8rem;
      }
      .c-gap-y-32 {
        --gap-y: 8rem;
      }
      .c-gap-x-40 {
        --gap-x: 10rem;
      }
      .c-gap-y-40 {
        --gap-y: 10rem;
      }
      .c-gap-x-48 {
        --gap-x: 12rem;
      }
      .c-gap-y-48 {
        --gap-y: 12rem;
      }
      .c-gap-x-56 {
        --gap-x: 14rem;
      }
      .c-gap-y-56 {
        --gap-y: 14rem;
      }
      .c-gap-x-64 {
        --gap-x: 16rem;
      }
      .c-gap-y-64 {
        --gap-y: 16rem;
      }
      .c-gap-x-72 {
        --gap-x: 18rem;
      }
      .c-gap-y-72 {
        --gap-y: 18rem;
      }
      .c-gap-x-px {
        --gap-x: 1px;
      }
      .c-gap-y-px {
        --gap-y: 1px;
      }
    `);
  });
});

test('gaps can be referenced from the theme with a closure', () => {
  return generatePluginCss({
    theme: {
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
      },
      gap: theme => theme('spacing'),
    },
    variants: {
      gap: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      ${baseCss}
      .c-gap-0 {
        --gap-x: 0px;
        --gap-y: 0px;
      }
      .c-gap-1 {
        --gap-x: 0.25rem;
        --gap-y: 0.25rem;
      }
      .c-gap-2 {
        --gap-x: 0.5rem;
        --gap-y: 0.5rem;
      }
      .c-gap-3 {
        --gap-x: 0.75rem;
        --gap-y: 0.75rem;
      }
      .c-gap-4 {
        --gap-x: 1rem;
        --gap-y: 1rem;
      }
      .c-gap-x-0 {
        --gap-x: 0px;
      }
      .c-gap-y-0 {
        --gap-y: 0px;
      }
      .c-gap-x-1 {
        --gap-x: 0.25rem;
      }
      .c-gap-y-1 {
        --gap-y: 0.25rem;
      }
      .c-gap-x-2 {
        --gap-x: 0.5rem;
      }
      .c-gap-y-2 {
        --gap-y: 0.5rem;
      }
      .c-gap-x-3 {
        --gap-x: 0.75rem;
      }
      .c-gap-y-3 {
        --gap-y: 0.75rem;
      }
      .c-gap-x-4 {
        --gap-x: 1rem;
      }
      .c-gap-y-4 {
        --gap-y: 1rem;
      }
    `);
  });
});

test('the prefix can be customized', () => {
  return generatePluginCss({
    theme: {
      gap: {
        '0': 0,
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
      },
    },
    variants: {
      gap: [],
    },
  }, {
    prefix: '',
  }).then(css => {
    expect(css).toMatchCss(`
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
      .gap-0 {
        --gap-x: 0px;
        --gap-y: 0px;
      }
      .gap-1 {
        --gap-x: 0.25rem;
        --gap-y: 0.25rem;
      }
      .gap-2 {
        --gap-x: 0.5rem;
        --gap-y: 0.5rem;
      }
      .gap-3 {
        --gap-x: 0.75rem;
        --gap-y: 0.75rem;
      }
      .gap-4 {
        --gap-x: 1rem;
        --gap-y: 1rem;
      }
      .gap-x-0 {
        --gap-x: 0px;
      }
      .gap-y-0 {
        --gap-y: 0px;
      }
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
      .gap-x-3 {
        --gap-x: 0.75rem;
      }
      .gap-y-3 {
        --gap-y: 0.75rem;
      }
      .gap-x-4 {
        --gap-x: 1rem;
      }
      .gap-y-4 {
        --gap-y: 1rem;
      }
    `);
  });
});

test('legacy mode outputs IE-compatible CSS', () => {
  return generatePluginCss({
    theme: {
      gap: {
        '1': '0.25rem',
        '2': '0.5rem',
      },
    },
    variants: {
      gap: [],
    },
  }, {
    legacy: true,
  }).then(css => {
    expect(css).toMatchCss(`
      .c-gap-1 {
        margin: -0.125rem;
      }
      .c-gap-1:not([class*="gap-padding"]) > * {
        margin: 0.125rem;
      }
      .c-gap-1[class*="gap-padding"] > * {
        padding: 0.125rem;
      }
      .c-gap-2 {
        margin: -0.25rem;
      }
      .c-gap-2:not([class*="gap-padding"]) > * {
        margin: 0.25rem;
      }
      .c-gap-2[class*="gap-padding"] > * {
        padding: 0.25rem;
      }
      .c-gap-x-1 {
        margin-left: -0.125rem;
        margin-right: -0.125rem;
      }
      .c-gap-x-1:not([class*="gap-padding"]) > * {
        margin-left: 0.125rem;
        margin-right: 0.125rem;
      }
      .c-gap-x-1[class*="gap-padding"] > * {
        padding-left: 0.125rem;
        padding-right: 0.125rem;
      }
      .c-gap-y-1 {
        margin-top: -0.125rem;
        margin-bottom: -0.125rem;
      }
      .c-gap-y-1:not([class*="gap-padding"]) > * {
        margin-top: 0.125rem;
        margin-bottom: 0.125rem;
      }
      .c-gap-y-1[class*="gap-padding"] > * {
        padding-top: 0.125rem;
        padding-bottom: 0.125rem;
      }
      .c-gap-x-2 {
        margin-left: -0.25rem;
        margin-right: -0.25rem;
      }
      .c-gap-x-2:not([class*="gap-padding"]) > * {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
      }
      .c-gap-x-2[class*="gap-padding"] > * {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }
      .c-gap-y-2 {
        margin-top: -0.25rem;
        margin-bottom: -0.25rem;
      }
      .c-gap-y-2:not([class*="gap-padding"]) > * {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      }
      .c-gap-y-2[class*="gap-padding"] > * {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }
    `);
  });
});

test('legacy mode works with variants', () => {
  return generatePluginCss({
    theme: {
      gap: {
        '1': '0.25rem',
        '2': '0.5rem',
      },
    },
    variants: {
      gap: ['responsive', 'hover'],
    },
  }, {
    legacy: true,
  }).then(css => {
    expect(css).toMatchCss(`
      .c-gap-1 {
        margin: -0.125rem;
      }
      .c-gap-1:not([class*="gap-padding"]) > * {
        margin: 0.125rem;
      }
      .c-gap-1[class*="gap-padding"] > * {
        padding: 0.125rem;
      }
      .c-gap-2 {
        margin: -0.25rem;
      }
      .c-gap-2:not([class*="gap-padding"]) > * {
        margin: 0.25rem;
      }
      .c-gap-2[class*="gap-padding"] > * {
        padding: 0.25rem;
      }
      .c-gap-x-1 {
        margin-left: -0.125rem;
        margin-right: -0.125rem;
      }
      .c-gap-x-1:not([class*="gap-padding"]) > * {
        margin-left: 0.125rem;
        margin-right: 0.125rem;
      }
      .c-gap-x-1[class*="gap-padding"] > * {
        padding-left: 0.125rem;
        padding-right: 0.125rem;
      }
      .c-gap-y-1 {
        margin-top: -0.125rem;
        margin-bottom: -0.125rem;
      }
      .c-gap-y-1:not([class*="gap-padding"]) > * {
        margin-top: 0.125rem;
        margin-bottom: 0.125rem;
      }
      .c-gap-y-1[class*="gap-padding"] > * {
        padding-top: 0.125rem;
        padding-bottom: 0.125rem;
      }
      .c-gap-x-2 {
        margin-left: -0.25rem;
        margin-right: -0.25rem;
      }
      .c-gap-x-2:not([class*="gap-padding"]) > * {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
      }
      .c-gap-x-2[class*="gap-padding"] > * {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }
      .c-gap-y-2 {
        margin-top: -0.25rem;
        margin-bottom: -0.25rem;
      }
      .c-gap-y-2:not([class*="gap-padding"]) > * {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      }
      .c-gap-y-2[class*="gap-padding"] > * {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }
      .hover\\:c-gap-1:hover {
        margin: -0.125rem;
      }
      .hover\\:c-gap-1:hover:not([class*="gap-padding"]) > * {
        margin: 0.125rem;
      }
      .hover\\:c-gap-1:hover[class*="gap-padding"] > * {
        padding: 0.125rem;
      }
      .hover\\:c-gap-2:hover {
        margin: -0.25rem;
      }
      .hover\\:c-gap-2:hover:not([class*="gap-padding"]) > * {
        margin: 0.25rem;
      }
      .hover\\:c-gap-2:hover[class*="gap-padding"] > * {
        padding: 0.25rem;
      }
      .hover\\:c-gap-x-1:hover {
        margin-left: -0.125rem;
        margin-right: -0.125rem;
      }
      .hover\\:c-gap-x-1:hover:not([class*="gap-padding"]) > * {
        margin-left: 0.125rem;
        margin-right: 0.125rem;
      }
      .hover\\:c-gap-x-1:hover[class*="gap-padding"] > * {
        padding-left: 0.125rem;
        padding-right: 0.125rem;
      }
      .hover\\:c-gap-y-1:hover {
        margin-top: -0.125rem;
        margin-bottom: -0.125rem;
      }
      .hover\\:c-gap-y-1:hover:not([class*="gap-padding"]) > * {
        margin-top: 0.125rem;
        margin-bottom: 0.125rem;
      }
      .hover\\:c-gap-y-1:hover[class*="gap-padding"] > * {
        padding-top: 0.125rem;
        padding-bottom: 0.125rem;
      }
      .hover\\:c-gap-x-2:hover {
        margin-left: -0.25rem;
        margin-right: -0.25rem;
      }
      .hover\\:c-gap-x-2:hover:not([class*="gap-padding"]) > * {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
      }
      .hover\\:c-gap-x-2:hover[class*="gap-padding"] > * {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }
      .hover\\:c-gap-y-2:hover {
        margin-top: -0.25rem;
        margin-bottom: -0.25rem;
      }
      .hover\\:c-gap-y-2:hover:not([class*="gap-padding"]) > * {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      }
      .hover\\:c-gap-y-2:hover[class*="gap-padding"] > * {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }
      @media (min-width: 640px) {
        .sm\\:c-gap-1 {
          margin: -0.125rem;
        }
        .sm\\:c-gap-1:not([class*="gap-padding"]) > * {
          margin: 0.125rem;
        }
        .sm\\:c-gap-1[class*="gap-padding"] > * {
          padding: 0.125rem;
        }
        .sm\\:c-gap-2 {
          margin: -0.25rem;
        }
        .sm\\:c-gap-2:not([class*="gap-padding"]) > * {
          margin: 0.25rem;
        }
        .sm\\:c-gap-2[class*="gap-padding"] > * {
          padding: 0.25rem;
        }
        .sm\\:c-gap-x-1 {
          margin-left: -0.125rem;
          margin-right: -0.125rem;
        }
        .sm\\:c-gap-x-1:not([class*="gap-padding"]) > * {
          margin-left: 0.125rem;
          margin-right: 0.125rem;
        }
        .sm\\:c-gap-x-1[class*="gap-padding"] > * {
          padding-left: 0.125rem;
          padding-right: 0.125rem;
        }
        .sm\\:c-gap-y-1 {
          margin-top: -0.125rem;
          margin-bottom: -0.125rem;
        }
        .sm\\:c-gap-y-1:not([class*="gap-padding"]) > * {
          margin-top: 0.125rem;
          margin-bottom: 0.125rem;
        }
        .sm\\:c-gap-y-1[class*="gap-padding"] > * {
          padding-top: 0.125rem;
          padding-bottom: 0.125rem;
        }
        .sm\\:c-gap-x-2 {
          margin-left: -0.25rem;
          margin-right: -0.25rem;
        }
        .sm\\:c-gap-x-2:not([class*="gap-padding"]) > * {
          margin-left: 0.25rem;
          margin-right: 0.25rem;
        }
        .sm\\:c-gap-x-2[class*="gap-padding"] > * {
          padding-left: 0.25rem;
          padding-right: 0.25rem;
        }
        .sm\\:c-gap-y-2 {
          margin-top: -0.25rem;
          margin-bottom: -0.25rem;
        }
        .sm\\:c-gap-y-2:not([class*="gap-padding"]) > * {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
        .sm\\:c-gap-y-2[class*="gap-padding"] > * {
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }
        .sm\\:hover\\:c-gap-1:hover {
          margin: -0.125rem;
        }
        .sm\\:hover\\:c-gap-1:hover:not([class*="gap-padding"]) > * {
          margin: 0.125rem;
        }
        .sm\\:hover\\:c-gap-1:hover[class*="gap-padding"] > * {
          padding: 0.125rem;
        }
        .sm\\:hover\\:c-gap-2:hover {
          margin: -0.25rem;
        }
        .sm\\:hover\\:c-gap-2:hover:not([class*="gap-padding"]) > * {
          margin: 0.25rem;
        }
        .sm\\:hover\\:c-gap-2:hover[class*="gap-padding"] > * {
          padding: 0.25rem;
        }
        .sm\\:hover\\:c-gap-x-1:hover {
          margin-left: -0.125rem;
          margin-right: -0.125rem;
        }
        .sm\\:hover\\:c-gap-x-1:hover:not([class*="gap-padding"]) > * {
          margin-left: 0.125rem;
          margin-right: 0.125rem;
        }
        .sm\\:hover\\:c-gap-x-1:hover[class*="gap-padding"] > * {
          padding-left: 0.125rem;
          padding-right: 0.125rem;
        }
        .sm\\:hover\\:c-gap-y-1:hover {
          margin-top: -0.125rem;
          margin-bottom: -0.125rem;
        }
        .sm\\:hover\\:c-gap-y-1:hover:not([class*="gap-padding"]) > * {
          margin-top: 0.125rem;
          margin-bottom: 0.125rem;
        }
        .sm\\:hover\\:c-gap-y-1:hover[class*="gap-padding"] > * {
          padding-top: 0.125rem;
          padding-bottom: 0.125rem;
        }
        .sm\\:hover\\:c-gap-x-2:hover {
          margin-left: -0.25rem;
          margin-right: -0.25rem;
        }
        .sm\\:hover\\:c-gap-x-2:hover:not([class*="gap-padding"]) > * {
          margin-left: 0.25rem;
          margin-right: 0.25rem;
        }
        .sm\\:hover\\:c-gap-x-2:hover[class*="gap-padding"] > * {
          padding-left: 0.25rem;
          padding-right: 0.25rem;
        }
        .sm\\:hover\\:c-gap-y-2:hover {
          margin-top: -0.25rem;
          margin-bottom: -0.25rem;
        }
        .sm\\:hover\\:c-gap-y-2:hover:not([class*="gap-padding"]) > * {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
        .sm\\:hover\\:c-gap-y-2:hover[class*="gap-padding"] > * {
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }
      }
    `);
  });
});
