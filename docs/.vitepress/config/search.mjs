// Shared by the build, browser configuration, and search regression checks.
export const miniSearch = {
  options: {
    tokenize: (text) => Array.from(
      new Intl.Segmenter('zh', { granularity: 'word' }).segment(text)
    ).filter((part) => part.isWordLike).map((part) => part.segment)
  },
  searchOptions: {
    combineWith: 'AND',
    boostDocument: (id) => /\/(guide|reference)\//.test(id) ? 2 : /\/tweets\//.test(id) ? 0.5 : 1
  }
}
