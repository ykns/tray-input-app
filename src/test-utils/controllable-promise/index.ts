export function createControllablePromise<T>(): {
    resolve: ((value: T | PromiseLike<T>) => void),
    reject: ((reason?: any) => void);
    promise: Promise<T>
} {
    let resolve: ((value: T | PromiseLike<T>) => void) = () => { throw new Error('Not implemented')};
    let reject: ((reason?: any) => void) = () => { throw new Error('Not implemented')};
    const promise = new Promise<T>((resolveFn, rejectFn) => {
        resolve = resolveFn;
        reject = rejectFn;
    });

    return {
        resolve,
        reject,
        promise
    }
}