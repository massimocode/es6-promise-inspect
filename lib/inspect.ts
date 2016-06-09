'use strict';
import * as vm from 'vm';

const Debug = vm.runInDebugContext('Debug');

export function getStatus<T>(promise: Promise<T>): string {
    if (Promise.toString().indexOf('[native code]') === -1) {
        throw new Error('Promise has been polyfilled so cannot be inspected with this utility');
    }

    if (promise instanceof Promise === false) {
        throw new Error('The provided argument was not an ES6 promise');
    }

    return Debug.MakeMirror(promise, true).status();
}