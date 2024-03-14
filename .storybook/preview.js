// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
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
