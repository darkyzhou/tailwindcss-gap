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
`;

expect.extend({
  toMatchCss: cssMatcher,
});

test('no gaps are generated by default', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(baseCss);
  });
});

test('responsive variants are generated by default', () => {
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
      .gap-1 {
        --gap-x: 0.25rem;
        --gap-y: 0.25rem;
      }
      .gap-2 {
        --gap-x: 0.5rem;
        --gap-y: 0.5rem;
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
      @media (min-width: 640px) {
        .sm\\:gap-1 {
          --gap-x: 0.25rem;
          --gap-y: 0.25rem;
        }
        .sm\\:gap-2 {
          --gap-x: 0.5rem;
          --gap-y: 0.5rem;
        }
        .sm\\:gap-x-1 {
          --gap-x: 0.25rem;
        }
        .sm\\:gap-y-1 {
          --gap-y: 0.25rem;
        }
        .sm\\:gap-x-2 {
          --gap-x: 0.5rem;
        }
        .sm\\:gap-y-2 {
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
        '1': '0.25rem',
        '2': '0.5rem',
      },
    },
    variants: {
      gap: ['hover'],
    }
  }).then(css => {
    expect(css).toMatchCss(`
      ${baseCss}
      .gap-1 {
        --gap-x: 0.25rem;
        --gap-y: 0.25rem;
      }
      .gap-2 {
        --gap-x: 0.5rem;
        --gap-y: 0.5rem;
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
      .hover\\:gap-1:hover {
        --gap-x: 0.25rem;
        --gap-y: 0.25rem;
      }
      .hover\\:gap-2:hover {
        --gap-x: 0.5rem;
        --gap-y: 0.5rem;
      }
      .hover\\:gap-x-1:hover {
        --gap-x: 0.25rem;
      }
      .hover\\:gap-y-1:hover {
        --gap-y: 0.25rem;
      }
      .hover\\:gap-x-2:hover {
        --gap-x: 0.5rem;
      }
      .hover\\:gap-y-2:hover {
        --gap-y: 0.5rem;
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
      .gap-0 {
        --gap-x: 0;
        --gap-y: 0;
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
        --gap-x: 0;
      }
      .gap-y-0 {
        --gap-y: 0;
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
  }, {
    legacy: true,
  }).then(css => {
    expect(css).toMatchCss(`
      .gap.gap-1, .gap-padding.gap-1 {
        margin: -0.125rem;
      }
      .gap.gap-1 > * {
        margin: 0.125rem;
      }
      .gap-padding.gap-1 > * {
        padding: 0.125rem;
      }
      .gap.gap-2, .gap-padding.gap-2 {
        margin: -0.25rem;
      }
      .gap.gap-2 > * {
        margin: 0.25rem;
      }
      .gap-padding.gap-2 > * {
        padding: 0.25rem;
      }
      .gap.gap-x-1, .gap-padding.gap-x-1 {
        margin-left: -0.125rem;
        margin-right: -0.125rem;
      }
      .gap.gap-x-1 > * {
        margin-left: 0.125rem;
        margin-right: 0.125rem;
      }
      .gap-padding.gap-x-1 > * {
        padding-left: 0.125rem;
        padding-right: 0.125rem;
      }
      .gap.gap-y-1, .gap-padding.gap-y-1 {
        margin-top: -0.125rem;
        margin-bottom: -0.125rem;
      }
      .gap.gap-y-1 > * {
        margin-top: 0.125rem;
        margin-bottom: 0.125rem;
      }
      .gap-padding.gap-y-1 > * {
        padding-top: 0.125rem;
        padding-bottom: 0.125rem;
      }
      .gap.gap-x-2, .gap-padding.gap-x-2 {
        margin-left: -0.25rem;
        margin-right: -0.25rem;
      }
      .gap.gap-x-2 > * {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
      }
      .gap-padding.gap-x-2 > * {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }
      .gap.gap-y-2, .gap-padding.gap-y-2 {
        margin-top: -0.25rem;
        margin-bottom: -0.25rem;
      }
      .gap.gap-y-2 > * {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      }
      .gap-padding.gap-y-2 > * {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }
      @media (min-width: 640px) {
        .gap.sm\\:gap-1, .gap-padding.sm\\:gap-1 {
          margin: -0.125rem;
        }
        .gap.sm\\:gap-1 > * {
          margin: 0.125rem;
        }
        .gap-padding.sm\\:gap-1 > * {
          padding: 0.125rem;
        }
        .gap.sm\\:gap-2, .gap-padding.sm\\:gap-2 {
          margin: -0.25rem;
        }
        .gap.sm\\:gap-2 > * {
          margin: 0.25rem;
        }
        .gap-padding.sm\\:gap-2 > * {
          padding: 0.25rem;
        }
        .gap.sm\\:gap-x-1, .gap-padding.sm\\:gap-x-1 {
          margin-left: -0.125rem;
          margin-right: -0.125rem;
        }
        .gap.sm\\:gap-x-1 > * {
          margin-left: 0.125rem;
          margin-right: 0.125rem;
        }
        .gap-padding.sm\\:gap-x-1 > * {
          padding-left: 0.125rem;
          padding-right: 0.125rem;
        }
        .gap.sm\\:gap-y-1, .gap-padding.sm\\:gap-y-1 {
          margin-top: -0.125rem;
          margin-bottom: -0.125rem;
        }
        .gap.sm\\:gap-y-1 > * {
          margin-top: 0.125rem;
          margin-bottom: 0.125rem;
        }
        .gap-padding.sm\\:gap-y-1 > * {
          padding-top: 0.125rem;
          padding-bottom: 0.125rem;
        }
        .gap.sm\\:gap-x-2, .gap-padding.sm\\:gap-x-2 {
          margin-left: -0.25rem;
          margin-right: -0.25rem;
        }
        .gap.sm\\:gap-x-2 > * {
          margin-left: 0.25rem;
          margin-right: 0.25rem;
        }
        .gap-padding.sm\\:gap-x-2 > * {
          padding-left: 0.25rem;
          padding-right: 0.25rem;
        }
        .gap.sm\\:gap-y-2, .gap-padding.sm\\:gap-y-2 {
          margin-top: -0.25rem;
          margin-bottom: -0.25rem;
        }
        .gap.sm\\:gap-y-2 > * {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
        .gap-padding.sm\\:gap-y-2 > * {
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }
      }
    `);
  });
});
