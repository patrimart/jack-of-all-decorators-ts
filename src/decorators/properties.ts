
export function setterGetter (...decorators: any[]) {

    decorators = decorators.reverse();

    return function (target: any, propertyKey: string | symbol) {

        let propValue = target[propertyKey];

        Object.defineProperty(target, String(propertyKey), {
            configurable: false,
            enumerable: true,
            get: function () {
                if (decorators.length === 0) { return propValue; }
                return decorators.reduce((v, f) => {
                    const descriptor = { get: () => v };
                    f.call(this, target, propertyKey, descriptor);
                    return descriptor.get();
                }, propValue);
            },
            set: function (value: any) {
                propValue = value;
            }
        });
    }
}

export function getterSetter (...decorators: any[]) {

    decorators = decorators.reverse();

    return function (target: any, propertyKey: string | symbol) {

        let propValue = target[propertyKey];

        Object.defineProperty(target, String(propertyKey), {
            configurable: false,
            enumerable: true,
            get: function () {
                return propValue;
            },
            set: function (value: any) {
                if (decorators.length === 0) {
                    propValue = value;
                    return;
                }
                propValue = decorators.reduce((v, f) => {
                    const descriptor = { get: () => v };
                    f.call(this, target, propertyKey, descriptor);
                    return descriptor.get();
                }, value);
            }
        });
    }
}
