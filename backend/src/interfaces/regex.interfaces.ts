export interface IRegexOfThatSearch {
  result?: string
  indexOfResult?: string | number
  input?: string
}

export interface IRegex {
  exists(word: string): boolean
  getResultsOfThatSearch(word: string): IRegexOfThatSearch
}
