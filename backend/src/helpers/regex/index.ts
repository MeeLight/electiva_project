import type {
  IRegex,
  IRegexOfThatSearch
} from '@interfaces/regex.interfaces'

export default class Regex implements IRegex {
  private pattern: RegExp

  constructor(pattern: RegExp) {
    this.pattern = pattern
  }

  public exists(word: string): boolean {
    return this.pattern.test(word)
  }

  public getResultsOfThatSearch(word: string): IRegexOfThatSearch {
    const results = <RegExpExecArray>this.pattern.exec(word)

    return {
      result: results[0],
      indexOfResult: results.index,
      input: results.input
    }
  }
}
