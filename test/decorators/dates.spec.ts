
import assert = require("assert");

import { dateFormat } from "../../lib/decorators/dates";


class MyTest {

    @dateFormat("dddd, mmmm dS, yyyy, h:MM:ss TT")
    public getDate () {
        return new Date(1472965878944);
    }

}


describe ("Dates decorator", function () {

    const c = new MyTest();

    it ("dateFormat", function () {
        assert.deepEqual(c.getDate(), "Saturday, September 3rd, 2016, 10:11:18 PM");
    });

});
