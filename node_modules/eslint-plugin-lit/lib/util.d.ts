import * as ESTree from 'estree';
/**
 * Get the name of a node
 *
 * @param {ESTree.Node} node Node to retrieve name of
 * @return {?string}
 */
export declare function getIdentifierName(node: ESTree.Node): string | undefined;
/**
 * Get the properties object of an element class
 *
 * @param {ESTree.Class} node Class to retrieve map from
 * @return {ReadonlyMap<string, ESTreeObjectExpression>}
 */
export declare function getPropertyMap(node: ESTree.Class): ReadonlyMap<string, ESTree.ObjectExpression>;
/**
 * Generates a placeholder string for a given quasi
 *
 * @param {ESTree.TaggedTemplateExpression} node Root node
 * @param {ESTree.TemplateElement} quasi Quasi to generate placeholder
 * for
 * @return {string}
 */
export declare function getExpressionPlaceholder(node: ESTree.TaggedTemplateExpression, quasi: ESTree.TemplateElement): string;
/**
 * Tests whether a string is a placeholder or not
 *
 * @param {string} value Value to test
 * @return {boolean}
 */
export declare function isExpressionPlaceholder(value: string): boolean;
/**
 * Converts a template expression into HTML
 *
 * @param {ESTree.TaggedTemplateExpression} node Node to convert
 * @return {string}
 */
export declare function templateExpressionToHtml(node: ESTree.TaggedTemplateExpression): string;
