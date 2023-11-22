interface Expression {
    minute: string[];
    hour: string[];
    dayOfTheMonth: string[];
    month: string[];
    dayOfTheWeek: string[];
}
interface MinMax {
    min: number;
    max: number;
}
interface ValidatorMeasureOfTimeMap {
    minute: MinMax;
    hour: MinMax;
    dayOfTheMonth: MinMax;
    month: MinMax;
    dayOfTheWeek: MinMax;
}
declare class CronValidator {
    /**
     * Contains the position-to-name mapping of the cron expression
     * @type {Object}
     * @const
     */
    measureOfTimeMap: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
    };
    /**
     * contains every permissible 'measureOfTime' string constant
     * @const
     * @type {Array}
     */
    measureOfTimeValues: string[];
    /**
     * validates a given cron expression (object) for length, then calls validateValue on each value
     * @param {!{
        minute: Array<string>,
        hour: Array<string>,
        dayOfTheMonth: Array<string>,
        month: Array<string>,
        dayOfTheWeek: Array<string>,
     * }} expression - rich object containing the state of the cron expression
     * @throws {Error} if expression contains more than 5 keys
     */
    validateExpression(expression: Expression): void;
    /**
     * validates a given cron expression (string) for length, then calls validateValue on each value
     * @param {!String} expression - an optionally empty string containing at most 5 space delimited expressions.
     * @throws {Error} if the string contains more than 5 space delimited parts.
     */
    validateString(expression: string): void;
    /**
     * validates any given measureOfTime and corresponding value
     * @param {!String} measureOfTime - as expected
     * @param {!String} value - the cron-ish interval specifier
     * @throws {Error} if measureOfTime is bogus
     * @throws {Error} if value contains an unsupported character
     */
    validateValue(measureOfTime: keyof ValidatorMeasureOfTimeMap, value: string): void;
}
/**
 * Initializes a CronBuilder with an optional initial cron expression.
 * @param {String=} initialExpression - if provided, it must be up to 5 space delimited parts
 * @throws {Error} if the initialExpression is bogus
 * @constructor
 */
export declare class CronBuilder {
    expression: Expression;
    cronValidator: CronValidator;
    constructor(initialExpression?: string);
    /**
     * builds a working cron expression based on the state of the cron object
     * @returns {string} - working cron expression
     */
    build(): string;
    /**
     * adds a value to what exists currently (builds)
     * @param {!String} measureOfTime
     * @param {!String} value
     * @throws {Error} if measureOfTime or value fail validation
     */
    addValue(measureOfTime: keyof Expression, value: string): void;
    /**
     * removes a single explicit value (subtracts)
     * @param {!String} measureOfTime - as you might guess
     * @param {!String} value - the offensive value
     * @throws {Error} if measureOfTime is bogus.
     */
    removeValue(measureOfTime: keyof Expression, value: string): string | undefined;
    /**
     * returns the current state of a given measureOfTime
     * @param {!String} measureOfTime one of "minute", "hour", etc
     * @returns {!String} comma separated blah blah
     * @throws {Error} if the measureOfTime is not one of the permitted values.
     */
    get(measureOfTime: keyof Expression): string;
    /**
     * sets the state of a given measureOfTime
     * @param {!String} measureOfTime - yup
     * @param {!Array.<String>} value - the 5 tuple array of values to set
     * @returns {!String} the comma separated version of the value that you passed in
     * @throws {Error} if your "value" is not an Array&lt;String&gt;
     * @throws {Error} when any item in your value isn't a legal cron-ish descriptor
     */
    set(measureOfTime: keyof Expression, value: string[]): string;
    /**
     * Returns a rich object that describes the current state of the cron expression.
     * @returns {!{
            minute: Array<string>,
            hour: Array<string>,
            dayOfTheMonth: Array<string>,
            month: Array<string>,
            dayOfTheWeek: Array<string>,
     * }}
     */
    getAll(): Expression;
    /**
     * sets the state for the entire cron expression
     * @param {!{
            minute: Array<string>,
            hour: Array<string>,
            dayOfTheMonth: Array<string>,
            month: Array<string>,
            dayOfTheWeek: Array<string>,
           }} expToSet - the entirety of the cron expression.
     * @throws {Error} as usual
     */
    setAll(expToSet: Expression): void;
}
export {};
