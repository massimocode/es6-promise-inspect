import * as chai from "chai";
const expect = chai.expect;
import * as inspect from "../lib/inspect";
import * as bluebird from "bluebird";
import * as q from "q";

describe("ES6 Promise Inspect", () => {
  describe("When getting the status of a promise synchronously", () => {
    it("It should report pending for a pending promise", () => {
      let promise = new Promise(() => {});
      expect(inspect.getStatus(promise)).to.equal("pending");
    });

    it("It should report resolved for a resolved promise", () => {
      let promise = Promise.resolve(true);
      expect(inspect.getStatus(promise)).to.equal("resolved");
    });

    it("It should report rejected for a rejected promise", () => {
      let promise = Promise.reject(new Error("Something went wrong"));
      expect(inspect.getStatus(promise)).to.equal("rejected");
    });

    it("It should report rejected for a promise that was resolved with a rejected promise", () => {
      let promise = Promise.resolve(
        Promise.reject(new Error("Something went wrong"))
      );
      expect(inspect.getStatus(promise)).to.equal("rejected");
    });

    [
      null,
      undefined,
      true,
      false,
      0,
      1,
      "",
      "hello",
      Symbol.iterator,
      {},
      function() {},
      [],
      { then: function() {} },
      q.resolve(""),
      bluebird.resolve("")
    ].forEach(nonPromise => {
      it("It should throw an error for anything that is not an ES6 promise", () => {
        expect(() => inspect.getStatus(nonPromise as any)).to.throw(
          "The provided argument was not an ES6 promise"
        );
      });
    });

    describe("And the environment has polyfilled Promise", () => {
      let oldPromise;

      beforeEach(() => {
        oldPromise = Promise;
        Promise = bluebird;
      });

      afterEach(() => {
        Promise = oldPromise;
      });

      it("It should throw an error", () => {
        expect(() => inspect.getStatus(new Promise(() => {}))).to.throw(
          "Promise has been polyfilled so cannot be inspected with this utility"
        );
      });
    });
  });
});
