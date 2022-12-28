import { isPlainObject, isEmpty, isDate } from 'lodash-es'


function format(obj: any): string {
    return JSON.stringify(obj);
}


function isArrayOfTables(simplePairs: any[]): boolean {
    return simplePairs.some(function (array) {
        const value = array[1];
        return Array.isArray(value) && isPlainObject(value[0]);
    });
}


function isObjectArrayOfTables(obj: any[]): boolean {
    return Array.isArray(obj) && obj.length === 2 && isPlainObject(obj[1][0]);
}


function isLastObjectArrayOfTables(simplePairs: any[]): boolean {
    const array = simplePairs[simplePairs.length - 1];
    return isObjectArrayOfTables(array);
}

function escapeKey(key: string): string {
    return /^[a-zA-Z0-9-_]*$/.test(key)
        ? key
        : `"${key}"`;
}

export function json2toml({
    code,
    options = {}
}: {
    code: any,
    options?: {
        indent?: number,
        newlineAfterSection?: boolean
    }
}): string {
    function visit(code: any, prefix: string) {
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