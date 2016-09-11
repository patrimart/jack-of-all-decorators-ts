
import {DI_MAP} from "./module";
export namespace DI {


    export function injectById (id: string, target: any) {

        const i: IInjectable = DI_MAP.find(di => di[id])[2];
        inject(i, target);
    }


    export function inject (clazz: IInjectable, target: any) {



    }
}
