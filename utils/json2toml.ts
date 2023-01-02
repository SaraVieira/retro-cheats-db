import { isPlainObject, isEmpty } from 'lodash-es'


const format = (obj: any) => JSON.stringify(obj);

const isArrayOfTables = (simplePairs: any[]) => simplePairs.some((array) => Array.isArray(array[1]) && isPlainObject(array[1][0]))


const isObjectArrayOfTables = (obj: any[]): boolean => Array.isArray(obj) && obj.length === 2 && isPlainObject(obj[1][0])


const isLastObjectArrayOfTables = (simplePairs: any[]) => isObjectArrayOfTables(simplePairs[simplePairs.length - 1]);

const escapeKey = (key: string) => /^[a-zA-Z0-9-_]*$/.test(key)
    ? key
    : `"${key}"`;


type Json2TomlProps = {
    code: any,
    options?: {
        indent?: number,
        newlineAfterSection?: boolean
    }
}

export const json2toml = ({
    code,
    options = {}
}: Json2TomlProps): string => {
    const visit = (code: any, prefix: string) => {
        const nestedPairs: any[] = [];
        const simplePairs: any[] = [];
        const indentStr = options.indent ? ''.padStart(options.indent, ' ') : "";

        Object.keys(code).sort().forEach((key) => {
            const value = code[key];
            (isPlainObject(value) ? nestedPairs : simplePairs).push([key, value]);
        });

        if (!isEmpty(prefix) && !isEmpty(simplePairs)
            && !isArrayOfTables(simplePairs)) {
            toml += '[' + prefix + ']\n';
        }

        simplePairs.forEach((array) => {
            const key = array[0];
            const value = array[1];

            if (isObjectArrayOfTables(array)) {
                if (simplePairs.indexOf(array) > 0 && options.newlineAfterSection) {
                    const lastObj = simplePairs[simplePairs.indexOf(array) - 1];
                    if (!isObjectArrayOfTables(lastObj)) {
                        toml += '\n';
                    }
                }
                value.forEach((obj: any) => {
                    if (!isEmpty(prefix)) {
                        toml += '[[' + prefix + '.' + key + ']]\n';
                    }
                    else {
                        toml += '[[' + key + ']]\n';
                    }
                    visit(obj, '');
                });
            }
            else {
                toml += indentStr + escapeKey(key) + ' = ' + format(value) + '\n';
            }
        });

        if (!isEmpty(simplePairs) && !isLastObjectArrayOfTables(simplePairs)
            && options.newlineAfterSection) {
            toml += '\n';
        }

        nestedPairs.forEach((array) => {
            const key = array[0];
            const value = array[1];

            visit(
                value,
                isEmpty(prefix)
                    ? escapeKey(key.toString())
                    : `${prefix}.${escapeKey(key.toString())}`
            );
        });
    }

    let toml = '';

    visit(code, '');

    return toml;
};