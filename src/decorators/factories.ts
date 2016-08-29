

export function methodFactory<T> (wrapper: (...a: any[]) => T, descriptor: TypedPropertyDescriptor<T>) {

    const func = function (w: (...a: any[]) => T, f: () => T) {
        return function (...a: any[]) {
            return w.call(this, f.apply(this, a));
        }
    };

    if (!! descriptor.value) {
        descriptor.value = func(wrapper, descriptor.value as any) as any;
    }
    else if (!! descriptor.get) {
        descriptor.get = func(wrapper, descriptor.get);
    }
    else {
        throw new TypeError("Only put a decorator on a method or get accessor.");
    }
}


export function methodFactoryBind<T> (wrapper: (...a: any[]) => T, descriptor: TypedPropertyDescriptor<T>) {

    const func = function (w: (...a: any[]) => T, f: () => T) {
        return function (...a: any[]) {
            return w.call(this, f.bind(this, ...a));
        }
    };

    if (!! descriptor.value) {
        descriptor.value = func(wrapper, descriptor.value as any) as any;
    }
    else if (!! descriptor.get) {
        descriptor.get = func(wrapper, descriptor.get);
    }
    else {
        throw new TypeError("Only put a decorator on a method or get accessor.");
    }
}
