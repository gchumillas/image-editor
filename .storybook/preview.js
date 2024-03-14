// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  viewport: {
    defaultViewport: 'largeMobile',
    viewports: {
      smallMobile: {
        // iPhone SE 1st gen
        name: 'Mobile - Small',
        styles: {
          height: '568px',
          width: '320px'
        },
        type: 'mobile'
      },
      // iPhone 14
      largeMobile: {
        name: 'Mobile - Large',
        styles: {
          height: '844px',
          width: '390px'
        },
        type: 'mobile'
      },
      smallTablet: {
        name: 'Tablet - Small',
        styles: {
          height: '528px',
          width: '704px'
        },
        type: 'tablet'
      },
      largeTablet: {
        name: 'Tablet - Large',
        styles: {
          height: '672px',
          width: '896px',
          isRotated: true
        },
        type: 'tablet'
      },
      desktop: {
        name: 'Desktop',
        styles: {
          height: '864px',
          width: '1152px',
          isRotated: true
        },
        type: 'desktop'
      }
    }
  }
}

const theme = {
  breakpoints: {
    xs: 769
  }
}

export const decorators = [
  Story => {
    return (
      <>
        <Story />
      </>
    )
  }
]
