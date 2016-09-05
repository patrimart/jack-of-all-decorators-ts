
import assert = require("assert");

import { dateFormat } from "../../lib/decorators/dates";


class MyTest {

    @dateFormat("dddd, mmmm dS, yyyy, h:MM:ss TT", true)
    public getDate () {
        return new Date(1472965878944);
    }

}


describe ("Dates decorator", function () {

    const c = new MyTest();

    it ("dateFormat", function () {
        assert.deepEqual(c.getDate(), "Sunday, September 4th, 2016, 5:11:18 AM");
    });

});
